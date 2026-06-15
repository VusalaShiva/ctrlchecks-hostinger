/**
 * useFieldOwnership Hook Tests
 * 
 * Tests the field ownership hook logic including:
 * - Mode change functionality
 * - Value restoration
 * - Unlock functionality
 * - Error handling
 * - API integration
 * 
 * Requirements Coverage: 4.2, 4.3, 4.4, 4.5, 4.7
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useFieldOwnership } from '../useFieldOwnership';
import type { FieldFillMode } from '@/lib/fillMode';

// Mock awsClient
vi.mock('@/integrations/aws/client', () => ({
  awsClient: {
    auth: {
      getSession: vi.fn(),
    },
  },
}));

// Mock ENDPOINTS
vi.mock('@/config/endpoints', () => ({
  ENDPOINTS: {
    itemBackend: 'http://localhost:3000',
  },
}));

// Import after mocks
import { awsClient } from '@/integrations/aws/client';

describe('useFieldOwnership Hook', () => {
  const mockOnConfigUpdate = vi.fn();
  const mockOnError = vi.fn();
  const mockFetch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = mockFetch;
    
    // Mock successful auth by default
    vi.mocked(awsClient.auth.getSession).mockResolvedValue({
      data: {
        session: {
          access_token: 'mock-token',
          user: { id: 'user-123' },
        },
      },
    } as any);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Initial State', () => {
    it('should return correct initial state', () => {
      const { result } = renderHook(() =>
        useFieldOwnership({
          workflowId: 'wf_123',
          nodeId: 'node_456',
          fieldName: 'subject',
          currentMode: 'buildtime_ai_once',
          currentValue: 'Welcome Email',
          isLocked: false,
          isUnlockable: false,
          isUnlocked: false,
          onConfigUpdate: mockOnConfigUpdate,
          onError: mockOnError,
        })
      );

      expect(result.current.currentMode).toBe('buildtime_ai_once');
      expect(result.current.originalValue).toBe('Welcome Email');
      expect(result.current.isEffectivelyLocked).toBe(false);
      expect(result.current.isUnlocked).toBe(false);
      expect(result.current.isChangingMode).toBe(false);
      expect(result.current.isUnlocking).toBe(false);
    });

    it('should store original AI-built value on mount', () => {
      const { result } = renderHook(() =>
        useFieldOwnership({
          workflowId: 'wf_123',
          nodeId: 'node_456',
          fieldName: 'subject',
          currentMode: 'buildtime_ai_once',
          currentValue: 'Original AI Value',
          onConfigUpdate: mockOnConfigUpdate,
        })
      );

      expect(result.current.originalValue).toBe('Original AI Value');
    });

    it('should calculate isEffectivelyLocked correctly for locked field', () => {
      const { result } = renderHook(() =>
        useFieldOwnership({
          workflowId: 'wf_123',
          nodeId: 'node_456',
          fieldName: 'apiKey',
          currentMode: 'manual_static',
          isLocked: true,
          isUnlockable: false,
          isUnlocked: false,
          onConfigUpdate: mockOnConfigUpdate,
        })
      );

      expect(result.current.isEffectivelyLocked).toBe(true);
    });

    it('should calculate isEffectivelyLocked correctly for unlocked field', () => {
      const { result } = renderHook(() =>
        useFieldOwnership({
          workflowId: 'wf_123',
          nodeId: 'node_456',
          fieldName: 'webhookUrl',
          currentMode: 'manual_static',
          isLocked: true,
          isUnlockable: true,
          isUnlocked: true,
          onConfigUpdate: mockOnConfigUpdate,
        })
      );

      expect(result.current.isEffectivelyLocked).toBe(false);
    });
  });

  describe('Mode Change Functionality', () => {
    it('should change mode and call API successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const { result } = renderHook(() =>
        useFieldOwnership({
          workflowId: 'wf_123',
          nodeId: 'node_456',
          fieldName: 'subject',
          currentMode: 'buildtime_ai_once',
          currentValue: 'AI Value',
          onConfigUpdate: mockOnConfigUpdate,
          onError: mockOnError,
        })
      );

      await act(async () => {
        await result.current.changeMode('manual_static');
      });

      // Should update config optimistically
      expect(mockOnConfigUpdate).toHaveBeenCalledWith({
        _fillMode: { subject: 'manual_static' },
      });

      // Should call API with correct payload
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/workflows/wf_123/attach-inputs',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            Authorization: 'Bearer mock-token',
          }),
          body: JSON.stringify({
            inputs: {
              mode_node_456_subject: 'manual_static',
            },
          }),
        })
      );

      expect(mockOnError).not.toHaveBeenCalled();
    });

    it('should restore value when switching to AI-built mode', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const { result } = renderHook(() =>
        useFieldOwnership({
          workflowId: 'wf_123',
          nodeId: 'node_456',
          fieldName: 'subject',
          currentMode: 'manual_static',
          currentValue: 'Manual Value',
          onConfigUpdate: mockOnConfigUpdate,
          onError: mockOnError,
        })
      );

      const restoredValue = 'Original AI Value';

      await act(async () => {
        await result.current.changeMode('buildtime_ai_once', restoredValue);
      });

      // Should call API with both mode and restored value
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/workflows/wf_123/attach-inputs',
        expect.objectContaining({
          body: JSON.stringify({
            inputs: {
              mode_node_456_subject: 'buildtime_ai_once',
              input_node_456_subject: restoredValue,
            },
          }),
        })
      );
    });

    it('should handle API error and revert optimistic update', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: 'Server error' }),
      });

      const { result } = renderHook(() =>
        useFieldOwnership({
          workflowId: 'wf_123',
          nodeId: 'node_456',
          fieldName: 'subject',
          currentMode: 'buildtime_ai_once',
          currentValue: 'AI Value',
          onConfigUpdate: mockOnConfigUpdate,
          onError: mockOnError,
        })
      );

      await act(async () => {
        await result.current.changeMode('manual_static');
      });

      // Should revert the optimistic update
      expect(mockOnConfigUpdate).toHaveBeenCalledTimes(2);
      expect(mockOnConfigUpdate).toHaveBeenLastCalledWith({
        _fillMode: { subject: 'buildtime_ai_once' },
      });

      // Should call error handler
      expect(mockOnError).toHaveBeenCalledWith('Server error');
    });

    it('should not change mode if workflowId is missing', async () => {
      const { result } = renderHook(() =>
        useFieldOwnership({
          workflowId: null,
          nodeId: 'node_456',
          fieldName: 'subject',
          currentMode: 'buildtime_ai_once',
          onConfigUpdate: mockOnConfigUpdate,
          onError: mockOnError,
        })
      );

      await act(async () => {
        await result.current.changeMode('manual_static');
      });

      expect(mockFetch).not.toHaveBeenCalled();
      expect(mockOnError).toHaveBeenCalledWith('Workflow ID is required to change mode');
    });

    it('should not change mode if field is locked', async () => {
      const { result } = renderHook(() =>
        useFieldOwnership({
          workflowId: 'wf_123',
          nodeId: 'node_456',
          fieldName: 'apiKey',
          currentMode: 'buildtime_ai_once',
          isLocked: true,
          isUnlockable: false,
          isUnlocked: false,
          onConfigUpdate: mockOnConfigUpdate,
          onError: mockOnError,
        })
      );

      await act(async () => {
        await result.current.changeMode('manual_static');
      });

      expect(mockFetch).not.toHaveBeenCalled();
      expect(mockOnError).toHaveBeenCalledWith('Cannot change mode for locked field');
    });

    it('should set loading state during mode change', async () => {
      let resolvePromise: (value: any) => void;
      const promise = new Promise((resolve) => {
        resolvePromise = resolve;
      });

      mockFetch.mockReturnValueOnce(promise);

      const { result } = renderHook(() =>
        useFieldOwnership({
          workflowId: 'wf_123',
          nodeId: 'node_456',
          fieldName: 'subject',
          currentMode: 'buildtime_ai_once',
          onConfigUpdate: mockOnConfigUpdate,
        })
      );

      // Start mode change
      act(() => {
        result.current.changeMode('manual_static');
      });

      // Should be loading
      await waitFor(() => {
        expect(result.current.isChangingMode).toBe(true);
      });

      // Resolve the promise
      await act(async () => {
        resolvePromise!({
          ok: true,
          json: async () => ({ success: true }),
        });
      });

      // Should no longer be loading
      await waitFor(() => {
        expect(result.current.isChangingMode).toBe(false);
      });
    });
  });

  describe('Value Restoration', () => {
    it('should restore original AI-built value and call API', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const { result } = renderHook(() =>
        useFieldOwnership({
          workflowId: 'wf_123',
          nodeId: 'node_456',
          fieldName: 'subject',
          currentMode: 'buildtime_ai_once',
          currentValue: 'Original AI Value',
          onConfigUpdate: mockOnConfigUpdate,
        })
      );

      await act(async () => {
        await result.current.restoreValue();
      });

      // Should update config optimistically with the restored value
      expect(mockOnConfigUpdate).toHaveBeenCalledWith({
        subject: 'Original AI Value',
      });

      // Should call API with both mode and restored value
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/workflows/wf_123/attach-inputs',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            inputs: {
              mode_node_456_subject: 'buildtime_ai_once',
              input_node_456_subject: 'Original AI Value',
            },
          }),
        })
      );
    });

    it('should not restore if original value was not stored', async () => {
      const { result } = renderHook(() =>
        useFieldOwnership({
          workflowId: 'wf_123',
          nodeId: 'node_456',
          fieldName: 'subject',
          currentMode: 'manual_static',
          currentValue: 'Manual Value',
          onConfigUpdate: mockOnConfigUpdate,
        })
      );

      await act(async () => {
        await result.current.restoreValue();
      });

      // Should not call onConfigUpdate or API since no original value was stored
      expect(mockOnConfigUpdate).not.toHaveBeenCalled();
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should handle undefined original value', async () => {
      const { result } = renderHook(() =>
        useFieldOwnership({
          workflowId: 'wf_123',
          nodeId: 'node_456',
          fieldName: 'subject',
          currentMode: 'buildtime_ai_once',
          currentValue: undefined,
          onConfigUpdate: mockOnConfigUpdate,
        })
      );

      // Original value should be undefined
      expect(result.current.originalValue).toBeUndefined();

      await act(async () => {
        await result.current.restoreValue();
      });

      // Should not call onConfigUpdate or API since value is undefined
      expect(mockOnConfigUpdate).not.toHaveBeenCalled();
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should handle API error during value restoration', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: 'Server error' }),
      });

      const { result } = renderHook(() =>
        useFieldOwnership({
          workflowId: 'wf_123',
          nodeId: 'node_456',
          fieldName: 'subject',
          currentMode: 'buildtime_ai_once',
          currentValue: 'Original AI Value',
          onConfigUpdate: mockOnConfigUpdate,
          onError: mockOnError,
        })
      );

      await act(async () => {
        await result.current.restoreValue();
      });

      // Should have called API
      expect(mockFetch).toHaveBeenCalled();

      // Should have called error handler
      expect(mockOnError).toHaveBeenCalledWith('Server error');
    });
  });

  describe('Unlock Functionality', () => {
    it('should unlock field and call API successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const { result } = renderHook(() =>
        useFieldOwnership({
          workflowId: 'wf_123',
          nodeId: 'node_456',
          fieldName: 'webhookUrl',
          currentMode: 'manual_static',
          isLocked: true,
          isUnlockable: true,
          isUnlocked: false,
          onConfigUpdate: mockOnConfigUpdate,
          onError: mockOnError,
        })
      );

      await act(async () => {
        await result.current.unlock();
      });

      // Should update config optimistically
      expect(mockOnConfigUpdate).toHaveBeenCalledWith({
        _ownershipUnlock: { webhookUrl: true },
      });

      // Should call API with correct payload
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/workflows/wf_123/attach-inputs',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            inputs: {
              unlock_node_456_webhookUrl: true,
            },
          }),
        })
      );

      expect(mockOnError).not.toHaveBeenCalled();
    });

    it('should handle unlock API error and revert optimistic update', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: 'Server error' }),
      });

      const { result } = renderHook(() =>
        useFieldOwnership({
          workflowId: 'wf_123',
          nodeId: 'node_456',
          fieldName: 'webhookUrl',
          currentMode: 'manual_static',
          isLocked: true,
          isUnlockable: true,
          isUnlocked: false,
          onConfigUpdate: mockOnConfigUpdate,
          onError: mockOnError,
        })
      );

      await act(async () => {
        await result.current.unlock();
      });

      // Should revert the optimistic update
      expect(mockOnConfigUpdate).toHaveBeenCalledTimes(2);
      expect(mockOnConfigUpdate).toHaveBeenLastCalledWith({
        _ownershipUnlock: { webhookUrl: false },
      });

      // Should call error handler
      expect(mockOnError).toHaveBeenCalledWith('Server error');
    });

    it('should not unlock if workflowId is missing', async () => {
      const { result } = renderHook(() =>
        useFieldOwnership({
          workflowId: null,
          nodeId: 'node_456',
          fieldName: 'webhookUrl',
          currentMode: 'manual_static',
          isUnlockable: true,
          onConfigUpdate: mockOnConfigUpdate,
          onError: mockOnError,
        })
      );

      await act(async () => {
        await result.current.unlock();
      });

      expect(mockFetch).not.toHaveBeenCalled();
      expect(mockOnError).toHaveBeenCalledWith('Workflow ID is required to unlock field');
    });

    it('should not unlock if field is not unlockable', async () => {
      const { result } = renderHook(() =>
        useFieldOwnership({
          workflowId: 'wf_123',
          nodeId: 'node_456',
          fieldName: 'apiKey',
          currentMode: 'manual_static',
          isLocked: true,
          isUnlockable: false,
          onConfigUpdate: mockOnConfigUpdate,
          onError: mockOnError,
        })
      );

      await act(async () => {
        await result.current.unlock();
      });

      expect(mockFetch).not.toHaveBeenCalled();
      expect(mockOnError).toHaveBeenCalledWith('Field is not unlockable');
    });

    it('should set loading state during unlock', async () => {
      let resolvePromise: (value: any) => void;
      const promise = new Promise((resolve) => {
        resolvePromise = resolve;
      });

      mockFetch.mockReturnValueOnce(promise);

      const { result } = renderHook(() =>
        useFieldOwnership({
          workflowId: 'wf_123',
          nodeId: 'node_456',
          fieldName: 'webhookUrl',
          currentMode: 'manual_static',
          isUnlockable: true,
          onConfigUpdate: mockOnConfigUpdate,
        })
      );

      // Start unlock
      act(() => {
        result.current.unlock();
      });

      // Should be loading
      await waitFor(() => {
        expect(result.current.isUnlocking).toBe(true);
      });

      // Resolve the promise
      await act(async () => {
        resolvePromise!({
          ok: true,
          json: async () => ({ success: true }),
        });
      });

      // Should no longer be loading
      await waitFor(() => {
        expect(result.current.isUnlocking).toBe(false);
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle missing auth token', async () => {
      vi.mocked(awsClient.auth.getSession).mockResolvedValueOnce({
        data: { session: null },
      } as any);

      const { result } = renderHook(() =>
        useFieldOwnership({
          workflowId: 'wf_123',
          nodeId: 'node_456',
          fieldName: 'subject',
          currentMode: 'buildtime_ai_once',
          onConfigUpdate: mockOnConfigUpdate,
          onError: mockOnError,
        })
      );

      await act(async () => {
        await result.current.changeMode('manual_static');
      });

      expect(mockFetch).not.toHaveBeenCalled();
      expect(mockOnError).toHaveBeenCalledWith('Authentication required');
    });

    it('should handle network error during mode change', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const { result } = renderHook(() =>
        useFieldOwnership({
          workflowId: 'wf_123',
          nodeId: 'node_456',
          fieldName: 'subject',
          currentMode: 'buildtime_ai_once',
          onConfigUpdate: mockOnConfigUpdate,
          onError: mockOnError,
        })
      );

      await act(async () => {
        await result.current.changeMode('manual_static');
      });

      expect(mockOnError).toHaveBeenCalledWith('Network error');
    });

    it('should handle network error during unlock', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const { result } = renderHook(() =>
        useFieldOwnership({
          workflowId: 'wf_123',
          nodeId: 'node_456',
          fieldName: 'webhookUrl',
          currentMode: 'manual_static',
          isUnlockable: true,
          onConfigUpdate: mockOnConfigUpdate,
          onError: mockOnError,
        })
      );

      await act(async () => {
        await result.current.unlock();
      });

      expect(mockOnError).toHaveBeenCalledWith('Network error');
    });
  });

  describe('Multiple Fields', () => {
    it('should handle multiple field instances independently', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      });

      const { result: result1 } = renderHook(() =>
        useFieldOwnership({
          workflowId: 'wf_123',
          nodeId: 'node_456',
          fieldName: 'subject',
          currentMode: 'buildtime_ai_once',
          currentValue: 'Subject Value',
          onConfigUpdate: mockOnConfigUpdate,
        })
      );

      const { result: result2 } = renderHook(() =>
        useFieldOwnership({
          workflowId: 'wf_123',
          nodeId: 'node_456',
          fieldName: 'body',
          currentMode: 'manual_static',
          currentValue: 'Body Value',
          onConfigUpdate: mockOnConfigUpdate,
        })
      );

      // Each field should have its own state
      expect(result1.current.originalValue).toBe('Subject Value');
      expect(result2.current.originalValue).toBeUndefined();

      await act(async () => {
        await result1.current.changeMode('manual_static');
      });

      await act(async () => {
        await result2.current.changeMode('runtime_ai');
      });

      // Should have called API twice with different payloads
      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(mockFetch).toHaveBeenNthCalledWith(
        1,
        expect.any(String),
        expect.objectContaining({
          body: JSON.stringify({
            inputs: { mode_node_456_subject: 'manual_static' },
          }),
        })
      );
      expect(mockFetch).toHaveBeenNthCalledWith(
        2,
        expect.any(String),
        expect.objectContaining({
          body: JSON.stringify({
            inputs: { mode_node_456_body: 'runtime_ai' },
          }),
        })
      );
    });
  });
});
