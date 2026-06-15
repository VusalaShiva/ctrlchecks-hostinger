import { memo, useMemo } from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { cn } from '@/lib/utils';
import { FileText, Clock, CheckCircle2, XCircle, Bug } from 'lucide-react';
import { useDebugStore } from '@/stores/debugStore';
import { useTheme } from '@/hooks/useTheme';
import { ThemedBorderGlow } from '@/components/ui/themed-border-glow';

interface FormField {
  id: string;
  label: string;
  name: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio';
  required: boolean;
  options?: Array<{ label: string; value: string }>;
  placeholder?: string;
  defaultValue?: string;
}

interface FormTriggerNodeData extends Record<string, unknown> {
  type: 'form';
  label: string;
  category: string;
  icon: string;
  config: {
    formTitle: string;
    formDescription: string;
    fields: FormField[];
    submitButtonText: string;
    successMessage: string;
    redirectUrl: string;
  };
  executionStatus?: 'idle' | 'running' | 'success' | 'error' | 'waiting';
}

type FormTriggerNodeProps = Node<FormTriggerNodeData>;

const FormTriggerNode = memo(({ data, selected, id }: NodeProps<FormTriggerNodeProps>) => {
  const { openDebug } = useDebugStore();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const config = data?.config || {
    formTitle: 'Form Submission',
    formDescription: '',
    fields: [],
    submitButtonText: 'Submit',
    successMessage: 'Thank you for your submission!',
    redirectUrl: '',
  };

  const status = data?.executionStatus || 'idle';
  const fields = Array.isArray(config.fields) ? config.fields : [];

  const glowOverrides = useMemo(() => {
    let colors: string[] | undefined;
    let glowColor: string | undefined;
    let glowIntensity: number | undefined;
    let animated = false;

    if (status === 'waiting') {
      colors = isLight
        ? ['#a16207', '#ca8a04', '#eab308']
        : ['#eab308', '#facc15', '#fde047'];
      glowColor = isLight ? '45 93 38' : '48 96 65';
      glowIntensity = 1.45;
    } else if (status === 'success') {
      colors = isLight
        ? ['#166534', '#0f766e', '#15803d']
        : ['#22c55e', '#2dd4bf', '#4ade80'];
      glowColor = isLight ? '142 76 32' : '142 76 62';
      glowIntensity = 1.42;
    } else if (status === 'error') {
      colors = isLight ? ['#b91c1c', '#dc2626', '#ef4444'] : ['#ef4444', '#f87171', '#fca5a5'];
      glowColor = isLight ? '0 84 42' : '0 84 62';
      glowIntensity = 1.48;
    } else if (status === 'running') {
      colors = isLight
        ? ['#1e40af', '#2563eb', '#0284c7']
        : ['#2563eb', '#3b82f6', '#60a5fa'];
      glowColor = isLight ? '217 91 40' : '217 91 68';
      glowIntensity = 1.52;
      animated = true;
    } else if (selected) {
      glowIntensity = isLight ? 1.52 : 1.58;
      glowColor = isLight ? '174 60 40' : '174 60 68';
    }

    return { colors, glowColor, glowIntensity, animated };
  }, [status, selected, isLight]);

  // Get field count for display
  const fieldCount = fields.length;
  const formTitle = config.formTitle || 'Form Submission';

  const handleDebugClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    openDebug(id);
  };

  return (
    <ThemedBorderGlow
      variant="canvas-node"
      className="shadow-md transition-all"
      style={{ width: 240, minHeight: 70 }}
      colors={glowOverrides.colors}
      glowColor={glowOverrides.glowColor}
      glowIntensity={glowOverrides.glowIntensity}
      animated={glowOverrides.animated}
    >
      <div
        className={cn(
          'px-5 py-4 rounded-[inherit] bg-card transition-all relative',
          status === 'running' && 'motion-safe:animate-pulse'
        )}
      >
      {/* Top handle (input) – mostly unused for triggers but kept for consistency */}
      <Handle
        type="target"
        id="input"
        position={Position.Top}
        isConnectable={true}
        className="!w-4 !h-4 !bg-muted-foreground !border-2 !border-background"
      />

      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-primary flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm leading-tight break-words hyphens-auto">
            {formTitle}
          </div>
          <div className="text-xs text-muted-foreground leading-tight break-words mt-0.5">
            {fieldCount} {fieldCount === 1 ? 'field' : 'fields'}
            {status === 'waiting' && ' • Waiting...'}
            {status === 'success' && ' • Submitted'}
            {status === 'error' && ' • Error'}
          </div>
        </div>
        {status === 'waiting' && (
          <Clock className="h-4 w-4 text-yellow-600 flex-shrink-0 animate-pulse" />
        )}
        {status === 'success' && (
          <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0" />
        )}
        {status === 'error' && (
          <XCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
        )}
        {/* Debug button – same behavior as other nodes */}
        <button
          onClick={handleDebugClick}
          className={cn(
            'h-6 w-6 flex items-center justify-center rounded-md flex-shrink-0',
            'text-muted-foreground/60 hover:text-foreground/80 hover:bg-muted/60',
            'transition-colors duration-150',
            'border border-border/40 hover:border-border',
          )}
          title="Debug Node"
          aria-label="Debug Node"
        >
          <Bug className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Bottom handle (output) – this is where edges should start from */}
      <Handle
        type="source"
        id="output"
        position={Position.Bottom}
        isConnectable={true}
        className="!w-4 !h-4 !bg-muted-foreground !border-2 !border-background"
      />
      </div>
    </ThemedBorderGlow>
  );
});

FormTriggerNode.displayName = 'FormTriggerNode';

export default FormTriggerNode;

