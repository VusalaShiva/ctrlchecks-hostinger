/**
 * Workflow API Client
 * Handles workflow execution and backend communication
 */

import { api, testConnection } from './client';
import { awsClient } from '@/integrations/aws/client';

export const workflowAPI = {
  async executeWorkflow(workflowId: string, triggerData: any = {}) {
    // First check backend connection
    const isConnected = await testConnection();
    
    if (!isConnected) {
      const backendUrl = api.getBaseUrl();
      throw new Error(
        `Backend server is not reachable at ${backendUrl}. ` +
        'Please ensure the backend is running and accessible. ' +
        'Check your VITE_API_URL environment variable in .env file.'
      );
    }
    
    try {
      console.log(`🚀 Executing workflow ${workflowId}...`);
      
      // Get auth token if available
      const { data: sessionData } = await awsClient.auth.getSession();
      const headers: Record<string, string> = {};
      
      if (sessionData?.session?.access_token) {
        headers['Authorization'] = `Bearer ${sessionData.session.access_token}`;
      }
      
      const response = await api.post('/api/execute-workflow', {
        workflowId,
        triggerData,
        input: triggerData,
        _trigger: 'manual',
        _user_id: sessionData?.session?.user?.id || 'anonymous',
        _workflow_id: workflowId,
        executed_at: new Date().toISOString()
      }, headers);
      
      console.log(`✅ Workflow ${workflowId} executed successfully`);
      return response;
      
    } catch (error: any) {
      console.error(`❌ Failed to execute workflow ${workflowId}:`, error);
      
      // Enhanced error messages
      if (error.message?.includes('Failed to fetch') || 
          error.message?.includes('ERR_CONNECTION_REFUSED')) {
        const backendUrl = api.getBaseUrl();
        throw new Error(
          `Cannot connect to backend API at ${backendUrl}. ` +
          'Make sure: \n' +
          '1. Backend server is running and accessible\n' +
          `2. Backend URL is correct: ${backendUrl}\n` +
          '3. Check your VITE_API_URL in .env file\n' +
          '4. Check browser console for CORS errors'
        );
      }
      
      throw error;
    }
  },
  
  async testBackendConnection() {
    try {
      const response = await api.get('/api/test-connection');
      console.log('✅ Backend test connection:', response);
      return response;
    } catch (error) {
      console.error('❌ Backend test connection failed:', error);
      return null;
    }
  },
  
  async deleteWorkflow(id: string) {
    const { data: sessionData } = await awsClient.auth.getSession();
    const authHeader = sessionData?.session?.access_token
      ? { 'Authorization': `Bearer ${sessionData.session.access_token}` }
      : {};
    return api.request(`/api/workflows/${id}`, {
      method: 'DELETE',
      headers: authHeader,
    });
  },

  async getBackendInfo() {
    try {
      const response = await api.get('/health');
      return response;
    } catch (error: any) {
      // Return error info without logging (client.ts handles logging)
      return {
        status: 'unreachable',
        error: error.message || 'Unknown error',
        suggestion: 'Start backend server: cd worker && npm run dev'
      };
    }
  }
};
