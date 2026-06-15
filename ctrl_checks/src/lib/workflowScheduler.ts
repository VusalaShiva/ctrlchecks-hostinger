import { awsClient } from '@/integrations/aws/client';
import { ENDPOINTS } from '@/config/endpoints';

interface ScheduledWorkflow {
  workflowId: string;
  cronExpression: string;
  intervalMs: number;
  interval: number;
  unit: 'minutes' | 'hours';
}

class WorkflowScheduler {
  private schedulers: Map<string, NodeJS.Timeout> = new Map();
  private activeWorkflows: Map<string, ScheduledWorkflow> = new Map();
  private initialized = false;
  private startingWorkflows: Set<string> = new Set(); // Track workflows being started to prevent duplicates
  private executingWorkflows: Set<string> = new Set(); // Execution lock to prevent parallel executions
  private firstRunTimeouts: Set<string> = new Set(); // Track workflows with first-run timeouts (not intervals yet)
  // High-level health flag so UI can degrade scheduling-only features gracefully
  private schedulerHealthy = true;

  // Calculate milliseconds until next scheduled time for time-based cron (e.g., "49 10 * * *")
  private calculateDelayUntilNextTime(cron: string): number | null {
    const parts = cron.trim().split(/\s+/);
    if (parts.length !== 5) return null;

    const [minute, hour, dayOfMonth, month, dayOfWeek] = parts;

    // Only handle daily schedules for now (dayOfMonth, month, dayOfWeek are all *)
    if (dayOfMonth !== '*' || month !== '*' || dayOfWeek !== '*') {
      return null; // Not a simple daily schedule
    }

    // Check if hour and minute are simple numbers (not ranges or wildcards)
    const hourMatch = hour.match(/^(\d+)$/);
    const minuteMatch = minute.match(/^(\d+)$/);

    if (!hourMatch || !minuteMatch) {
      return null; // Not a simple time-based schedule
    }

    const scheduledHour = parseInt(hourMatch[1], 10);
    const scheduledMinute = parseInt(minuteMatch[1], 10);

    if (scheduledHour < 0 || scheduledHour > 23 || scheduledMinute < 0 || scheduledMinute > 59) {
      return null;
    }

    // Calculate next scheduled time
    const now = new Date();
    const scheduledTime = new Date();
    scheduledTime.setHours(scheduledHour, scheduledMinute, 0, 0);

    // If scheduled time has passed today, schedule for tomorrow
    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    const delayMs = scheduledTime.getTime() - now.getTime();
    return delayMs > 0 ? delayMs : null;
  }

  // Convert cron to interval in milliseconds (for interval-based schedules)
  private cronToIntervalMs(cron: string): number | null {
    const parts = cron.split(' ');
    if (parts.length !== 5) return null;

    const [minute, hour] = parts;

    // Every N minutes: */N * * * *
    if (minute.startsWith('*/') && hour === '*') {
      const minutes = parseInt(minute.slice(2));
      if (!isNaN(minutes) && minutes > 0) {
        return minutes * 60 * 1000;
      }
    }

    // Every minute: * * * * *
    if (cron === '* * * * *') {
      return 60 * 1000;
    }

    // Every N hours: 0 */N * * *
    if (minute === '0' && hour.startsWith('*/')) {
      const hours = parseInt(hour.slice(2));
      if (!isNaN(hours) && hours > 0) {
        return hours * 60 * 60 * 1000;
      }
    }

    // Every hour: 0 * * * *
    if (cron === '0 * * * *') {
      return 60 * 60 * 1000;
    }

    return null;
  }

  // Parse interval from cron
  private parseInterval(cron: string): { value: number; unit: 'minutes' | 'hours' } | null {
    const parts = cron.split(' ');
    if (parts.length !== 5) return null;

    const [minute, hour] = parts;

    if (minute.startsWith('*/') && hour === '*') {
      const minutes = parseInt(minute.slice(2));
      if (!isNaN(minutes) && minutes > 0) {
        return { value: minutes, unit: 'minutes' };
      }
    }

    if (cron === '* * * * *') {
      return { value: 1, unit: 'minutes' };
    }

    if (minute === '0' && hour.startsWith('*/')) {
      const hours = parseInt(hour.slice(2));
      if (!isNaN(hours) && hours > 0) {
        return { value: hours, unit: 'hours' };
      }
    }

    if (cron === '0 * * * *') {
      return { value: 1, unit: 'hours' };
    }

    return null;
  }

  // Execute a workflow with execution lock
  private async executeWorkflow(workflowId: string): Promise<void> {
    // Check if workflow is already executing (prevent parallel executions)
    if (this.executingWorkflows.has(workflowId)) {
      console.warn(`[Scheduler] ⚠️ Workflow ${workflowId} is already executing, skipping duplicate execution`);
      return;
    }

    // Acquire execution lock
    this.executingWorkflows.add(workflowId);

    try {
      console.log(`[Scheduler] 🚀 Executing workflow ${workflowId} (trigger: schedule)`);
      
      const { data: sessionData } = await awsClient.auth.getSession();
      const response = await fetch(`${ENDPOINTS.itemBackend}/api/execute-workflow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(sessionData?.session?.access_token
            ? { Authorization: `Bearer ${sessionData.session.access_token}` }
            : {}),
        },
        body: JSON.stringify({
          workflowId,
          input: { 
            _scheduled: 'true',
            _trigger: 'schedule'
          },
        }),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Execution failed' }));
        console.error(`[Scheduler] ❌ Error executing scheduled workflow ${workflowId}:`, error);
        this.schedulerHealthy = false;
      } else {
        console.log(`[Scheduler] ✅ Successfully executed workflow ${workflowId}`);
        this.schedulerHealthy = true;
      }
    } catch (error) {
      console.error(`[Scheduler] ❌ Error invoking execute-workflow for ${workflowId}:`, error);
      this.schedulerHealthy = false;
    } finally {
      // Release execution lock after a delay to prevent rapid re-execution
      // This ensures the workflow has time to complete before allowing another execution
      setTimeout(() => {
        this.executingWorkflows.delete(workflowId);
      }, 1000); // 1 second cooldown
    }
  }

  // Check if a workflow is currently executing
  isExecuting(workflowId: string): boolean {
    return this.executingWorkflows.has(workflowId);
  }

  // Start scheduler for a workflow (ensures only ONE scheduler per workflow)
  start(workflowId: string, cronExpression: string): void {
    // Prevent duplicate starts
    if (this.startingWorkflows.has(workflowId)) {
      console.warn(`[Scheduler] ⚠️ Workflow ${workflowId} is already being started, skipping duplicate start`);
      return;
    }

    this.startingWorkflows.add(workflowId);

    // CRITICAL: Stop existing scheduler FIRST to ensure only ONE scheduler exists
    if (this.schedulers.has(workflowId)) {
      console.log(`[Scheduler] 🔄 Updating existing scheduler for workflow ${workflowId}`);
      this.stop(workflowId);
      // Small delay to ensure cleanup completes, then start
      setTimeout(() => {
        this.startInternal(workflowId, cronExpression);
        this.startingWorkflows.delete(workflowId);
      }, 100);
    } else {
      this.startInternal(workflowId, cronExpression);
      this.startingWorkflows.delete(workflowId);
    }
  }

  /**
   * Simple health accessor so UI can decide to degrade scheduling-only features
   * without blocking core workflow building when the backend DB is unavailable.
   */
  isHealthy(): boolean {
    return this.schedulerHealthy;
  }

  // Internal method to start scheduler (called after cleanup)
  private startInternal(workflowId: string, cronExpression: string): void {
    // Final check: ensure no scheduler exists
    if (this.schedulers.has(workflowId)) {
      console.error(`[Scheduler] ❌ CRITICAL: Scheduler still exists for ${workflowId} after stop, aborting`);
      return;
    }

    // Try time-based schedule first (e.g., "49 10 * * *")
    const delayUntilNextTime = this.calculateDelayUntilNextTime(cronExpression);
    
    if (delayUntilNextTime !== null) {
      // Time-based schedule (daily at specific time)
      const scheduledTime = new Date(Date.now() + delayUntilNextTime);
      console.log(`[Scheduler] ⏰ Scheduling workflow ${workflowId} for ${scheduledTime.toLocaleString()} (cron: ${cronExpression})`);
      
      // Store workflow info
      this.activeWorkflows.set(workflowId, {
        workflowId,
        cronExpression,
        intervalMs: 24 * 60 * 60 * 1000, // 24 hours for daily schedule
        interval: 24,
        unit: 'hours',
      });

      // Schedule first execution at the calculated time
      const firstTimeout = setTimeout(() => {
        this.executeWorkflow(workflowId);
        
        // After first execution, set up daily recurring execution
        const dailyInterval = 24 * 60 * 60 * 1000; // 24 hours
        const recurringTimer = setInterval(() => {
          this.executeWorkflow(workflowId);
        }, dailyInterval);
        
        // Remove from first-run tracking and store the interval timer
        this.firstRunTimeouts.delete(workflowId);
        this.schedulers.set(workflowId, recurringTimer);
        console.log(`[Scheduler] ✅ Recurring daily schedule started for workflow ${workflowId}`);
      }, delayUntilNextTime);

      // Store the timeout temporarily (will be replaced by interval after first run)
      // Track it as a first-run timeout for proper cleanup
      this.firstRunTimeouts.add(workflowId);
      this.schedulers.set(workflowId, firstTimeout);
      
      return;
    }

    // Fall back to interval-based schedule (e.g., "*/15 * * * *", "0 */2 * * *")
    const intervalMs = this.cronToIntervalMs(cronExpression);
    if (!intervalMs) {
      console.error(`[Scheduler] ❌ Invalid cron expression for workflow ${workflowId}: ${cronExpression}. Only daily time-based (e.g., "49 10 * * *") or interval-based (e.g., "*/15 * * * *") schedules are supported.`);
      return;
    }

    const interval = this.parseInterval(cronExpression);
    if (!interval) {
      console.error(`[Scheduler] ❌ Could not parse interval from cron: ${cronExpression}`);
      return;
    }

    // Store workflow info
    this.activeWorkflows.set(workflowId, {
      workflowId,
      cronExpression,
      intervalMs,
      interval: interval.value,
      unit: interval.unit,
    });

    // For interval-based schedules, execute immediately (first run)
    // This is expected behavior for interval-based schedules
    this.executeWorkflow(workflowId);

    // Set up recurring execution
    const timer = setInterval(() => {
      this.executeWorkflow(workflowId);
    }, intervalMs);

    this.schedulers.set(workflowId, timer);
    console.log(`[Scheduler] ✅ Started interval-based schedule for workflow ${workflowId}: cron="${cronExpression}", interval=${interval.value} ${interval.unit}, ms=${intervalMs}`);
    console.log(`[Scheduler] 📊 Active schedulers:`, this.getAllActiveSchedulers());
  }

  // Stop scheduler for a workflow
  stop(workflowId: string): void {
    const timer = this.schedulers.get(workflowId);
    if (timer) {
      // Clear both setTimeout and setInterval based on tracking
      if (this.firstRunTimeouts.has(workflowId)) {
        clearTimeout(timer);
        this.firstRunTimeouts.delete(workflowId);
      } else {
        clearInterval(timer);
      }
      // Clear the timer reference immediately
      this.schedulers.delete(workflowId);
      const workflow = this.activeWorkflows.get(workflowId);
      this.activeWorkflows.delete(workflowId);
      console.log(`[Scheduler] Stopped for workflow ${workflowId}${workflow ? ` (was: ${workflow.interval} ${workflow.unit}, cron: ${workflow.cronExpression})` : ''}`);
    } else {
      // Even if no timer found, clear from activeWorkflows to be safe
      if (this.activeWorkflows.has(workflowId)) {
        const workflow = this.activeWorkflows.get(workflowId);
        this.activeWorkflows.delete(workflowId);
        console.log(`[Scheduler] Cleaned up workflow ${workflowId} from activeWorkflows${workflow ? ` (was: ${workflow.interval} ${workflow.unit})` : ''}`);
      }
      // Also clean up first-run tracking if it exists
      this.firstRunTimeouts.delete(workflowId);
    }
  }

  // Stop all schedulers
  stopAll(): void {
    console.log(`[Scheduler] Stopping all schedulers (${this.schedulers.size} active)`);
    this.schedulers.forEach((timer, workflowId) => {
      // Clear timeout or interval based on tracking
      if (this.firstRunTimeouts.has(workflowId)) {
        clearTimeout(timer);
      } else {
        clearInterval(timer);
      }
      console.log(`[Scheduler] Stopped scheduler for workflow ${workflowId}`);
    });
    this.schedulers.clear();
    this.activeWorkflows.clear();
    this.startingWorkflows.clear();
    this.executingWorkflows.clear(); // Clear execution locks
    this.firstRunTimeouts.clear(); // Clear first-run tracking
    console.log('[Scheduler] ✅ All schedulers stopped');
  }

  // Check if a workflow is scheduled
  isScheduled(workflowId: string): boolean {
    return this.schedulers.has(workflowId);
  }

  // Get scheduled workflow info
  getScheduledWorkflow(workflowId: string): ScheduledWorkflow | undefined {
    return this.activeWorkflows.get(workflowId);
  }

  // Debug: Get all active schedulers
  getAllActiveSchedulers(): Array<{ workflowId: string; cron: string; interval: string }> {
    return Array.from(this.activeWorkflows.values()).map(w => ({
      workflowId: w.workflowId,
      cron: w.cronExpression,
      interval: `${w.interval} ${w.unit}`
    }));
  }

  // Initialize schedulers for all active workflows (call on app load)
  async initializeAll(): Promise<void> {
    // Prevent multiple initializations
    if (this.initialized) {
      console.log('[Scheduler] Already initialized, skipping');
      return;
    }

    try {
      // Stop all existing schedulers first to prevent duplicates
      this.stopAll();

      const { data: workflows, error } = await awsClient
        .from('workflows')
        .select('id, cron_expression')
        .eq('setup_completed', true)
        .not('cron_expression', 'is', null);

      if (error) {
        console.error('Error loading scheduled workflows:', error);
        this.initialized = true;
        return;
      }

      if (!workflows || workflows.length === 0) {
        this.initialized = true;
        console.log('[Scheduler] No scheduled workflows found');
        return;
      }

      console.log(`[Scheduler] Initializing ${workflows.length} scheduled workflows`);
      workflows.forEach((workflow) => {
        if (workflow.cron_expression) {
          console.log(`[Scheduler] Initializing workflow ${workflow.id} with cron: ${workflow.cron_expression}`);
          // start() will stop any existing scheduler for this workflow
          this.start(workflow.id, workflow.cron_expression);
        }
      });

      this.initialized = true;
      console.log(`[Scheduler] Initialization complete: ${workflows.length} workflows scheduled`);
      console.log(`[Scheduler] Active schedulers after init:`, this.getAllActiveSchedulers());
    } catch (error) {
      console.error('Error initializing schedulers:', error);
      this.initialized = true; // Mark as initialized even on error to prevent retry loops
    }
  }

  // Reset initialization flag (useful for testing or manual re-initialization)
  resetInitialization(): void {
    this.initialized = false;
  }

  // Refresh scheduler for a specific workflow (reload from database)
  async refreshWorkflow(workflowId: string): Promise<void> {
    try {
      const { data: workflow, error } = await awsClient
        .from('workflows')
        .select('id, cron_expression')
        .eq('setup_completed', true)
        .eq('id', workflowId)
        .single();

      if (error) {
        console.error(`[Scheduler] Error loading workflow ${workflowId}:`, error);
        return;
      }

      if (!workflow) {
        console.log(`[Scheduler] Workflow ${workflowId} not found, stopping scheduler`);
        this.stop(workflowId);
        return;
      }

      if (workflow.cron_expression) {
        console.log(`[Scheduler] Refreshing workflow ${workflowId} with cron: ${workflow.cron_expression}`);
        this.start(workflow.id, workflow.cron_expression);
      } else {
        console.log(`[Scheduler] Workflow ${workflowId} has no cron expression, stopping scheduler`);
        this.stop(workflowId);
      }
    } catch (error) {
      console.error(`[Scheduler] Error refreshing workflow ${workflowId}:`, error);
    }
  }
}

// Singleton instance
export const workflowScheduler = new WorkflowScheduler();
