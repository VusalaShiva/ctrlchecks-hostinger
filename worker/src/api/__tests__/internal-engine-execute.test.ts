/**
 * Tests for /api/internal/engine-execute (server-to-server route).
 * Validates: key auth, 400 on missing workflowId, fake req/res plumbing,
 * success/fail from executeWorkflowHandler, and userId forwarding.
 */

// Must mock execute-workflow before importing the handler to avoid loading 18K lines
const mockExecuteWorkflowHandler = jest.fn();
jest.mock('../execute-workflow', () => ({
  __esModule: true,
  default: mockExecuteWorkflowHandler,
}));

import { Request, Response } from 'express';
import internalEngineExecuteRoute from '../internal-engine-execute';

function makeReq(overrides: Partial<Request> = {}): Request {
  return {
    headers: { 'x-internal-engine-key': 'test-key' },
    body: {
      workflowId: 'wf_test',
      executionId: 'exec_test',
      input: { foo: 'bar' },
      userId: 'user_123',
    },
    ...overrides,
  } as unknown as Request;
}

function makeRes(): { res: Response; status: jest.Mock; json: jest.Mock } {
  const json = jest.fn();
  const status = jest.fn().mockReturnValue({ json });
  return { res: { status, json } as unknown as Response, status, json };
}

beforeEach(() => {
  jest.clearAllMocks();
  process.env.WORKER_INTERNAL_KEY = 'test-key';
});

afterEach(() => {
  delete process.env.WORKER_INTERNAL_KEY;
});

describe('internalEngineExecuteRoute', () => {
  describe('authentication', () => {
    it('returns 401 when key is missing', async () => {
      const { res, status, json } = makeRes();
      const req = makeReq({ headers: {} });
      await internalEngineExecuteRoute(req, res);
      expect(status).toHaveBeenCalledWith(401);
      expect(json).toHaveBeenCalledWith(expect.objectContaining({ code: 'INVALID_ENGINE_KEY' }));
    });

    it('returns 401 when wrong key provided', async () => {
      const { res, status, json } = makeRes();
      const req = makeReq({ headers: { 'x-internal-engine-key': 'wrong-key' } });
      await internalEngineExecuteRoute(req, res);
      expect(status).toHaveBeenCalledWith(401);
    });

    it('passes through when key is correct', async () => {
      mockExecuteWorkflowHandler.mockImplementation((_req: any, fakeRes: any) => {
        fakeRes.status(200).json({ status: 'ok' });
      });
      const req = makeReq();
      const { res } = makeRes();
      await internalEngineExecuteRoute(req, res);
      expect(mockExecuteWorkflowHandler).toHaveBeenCalled();
    });

    it('passes through when WORKER_INTERNAL_KEY is empty (dev mode)', async () => {
      delete process.env.WORKER_INTERNAL_KEY;
      mockExecuteWorkflowHandler.mockImplementation((_req: any, fakeRes: any) => {
        fakeRes.status(200).json({ status: 'ok' });
      });
      const req = makeReq({ headers: {} }); // no key
      const { res } = makeRes();
      await internalEngineExecuteRoute(req, res);
      expect(mockExecuteWorkflowHandler).toHaveBeenCalled();
    });
  });

  describe('input validation', () => {
    it('returns 400 when workflowId is missing', async () => {
      const { res, status, json } = makeRes();
      const req = makeReq({ body: { executionId: 'exec', input: {} } });
      await internalEngineExecuteRoute(req, res);
      expect(status).toHaveBeenCalledWith(400);
      expect(json).toHaveBeenCalledWith(expect.objectContaining({ code: 'MISSING_WORKFLOW_ID' }));
    });

    it('returns 400 when workflowId is not a string', async () => {
      const { res, status, json } = makeRes();
      const req = makeReq({ body: { workflowId: 123, executionId: 'exec', input: {} } });
      await internalEngineExecuteRoute(req, res);
      expect(status).toHaveBeenCalledWith(400);
    });
  });

  describe('handler delegation', () => {
    it('calls executeWorkflowHandler with x-internal-engine-execution header', async () => {
      let capturedFakeReq: any;
      mockExecuteWorkflowHandler.mockImplementation((fakeReq: any, fakeRes: any) => {
        capturedFakeReq = fakeReq;
        fakeRes.status(200).json({ status: 'ok' });
      });

      const req = makeReq();
      const { res } = makeRes();
      await internalEngineExecuteRoute(req, res);

      expect(capturedFakeReq.headers['x-internal-engine-execution']).toBe('true');
    });

    it('forwards workflowId, executionId, input, userId to handler', async () => {
      let capturedFakeReq: any;
      mockExecuteWorkflowHandler.mockImplementation((fakeReq: any, fakeRes: any) => {
        capturedFakeReq = fakeReq;
        fakeRes.status(200).json({ status: 'ok' });
      });

      const req = makeReq({
        body: { workflowId: 'wf_fwd', executionId: 'exec_fwd', input: { key: 'val' }, userId: 'user_fwd' },
      });
      const { res } = makeRes();
      await internalEngineExecuteRoute(req, res);

      expect(capturedFakeReq.body.workflowId).toBe('wf_fwd');
      expect(capturedFakeReq.body.executionId).toBe('exec_fwd');
      expect(capturedFakeReq.body.input).toEqual({ key: 'val' });
      expect(capturedFakeReq.body.userId).toBe('user_fwd');
      expect(capturedFakeReq.body.useQueue).toBe(false);
    });

    it('returns success:true when handler returns 200', async () => {
      mockExecuteWorkflowHandler.mockImplementation((_req: any, fakeRes: any) => {
        fakeRes.status(200).json({ status: 'completed', executionId: 'exec_test' });
      });

      const req = makeReq();
      const json = jest.fn();
      const res = { status: jest.fn().mockReturnValue({ json }), json } as unknown as Response;
      await internalEngineExecuteRoute(req, res);

      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
      const call = (res.json as jest.Mock).mock.calls[0][0];
      expect(call.durationMs).toBeGreaterThanOrEqual(0);
    });

    it('returns success:false with error when handler returns 4xx', async () => {
      mockExecuteWorkflowHandler.mockImplementation((_req: any, fakeRes: any) => {
        fakeRes.status(500).json({ error: 'Node execution failed' });
      });

      const req = makeReq();
      const json = jest.fn();
      const res = { status: jest.fn().mockReturnValue({ json }), json } as unknown as Response;
      await internalEngineExecuteRoute(req, res);

      const call = (res.json as jest.Mock).mock.calls[0][0];
      expect(call.success).toBe(false);
      expect(call.error).toBe('Node execution failed');
    });

    it('returns success:false when handler throws', async () => {
      mockExecuteWorkflowHandler.mockRejectedValueOnce(new Error('Unexpected crash'));

      const req = makeReq();
      const json = jest.fn();
      const res = { status: jest.fn().mockReturnValue({ json }), json } as unknown as Response;
      await internalEngineExecuteRoute(req, res);

      const call = (res.json as jest.Mock).mock.calls[0][0];
      expect(call.success).toBe(false);
      expect(call.error).toContain('Unexpected crash');
    });
  });
});
