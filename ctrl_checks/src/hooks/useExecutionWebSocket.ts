import { useEffect, useRef, useState, useCallback } from 'react';
import { ENDPOINTS } from '@/config/endpoints';

export interface UseExecutionWebSocketOptions {
  executionId: string | null;
  token: string | null;
  onMessage: (msg: unknown) => void;
}

const BACKOFF_STEPS = [1000, 2000, 4000, 8000, 30000];

export function useExecutionWebSocket({ executionId, token, onMessage }: UseExecutionWebSocketOptions) {
  const [connected, setConnected] = useState(false);
  const [reconnecting, setReconnecting] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const attemptRef = useRef(0);
  const cleanedUpRef = useRef(false);
  const onMessageRef = useRef(onMessage);
  onMessageRef.current = onMessage;

  const buildWsUrl = useCallback((id: string, tok: string | null): string => {
    try {
      const url = new URL(ENDPOINTS.itemBackend);
      const proto = url.protocol === 'https:' ? 'wss:' : 'ws:';
      const base = `${proto}//${url.host}/ws/executions?executionId=${id}`;
      return tok ? `${base}&token=${encodeURIComponent(tok)}` : base;
    } catch {
      const base = `ws://localhost:3001/ws/executions?executionId=${id}`;
      return tok ? `${base}&token=${encodeURIComponent(tok)}` : base;
    }
  }, []);

  const connect = useCallback(() => {
    if (cleanedUpRef.current || !executionId) return;

    const ws = new WebSocket(buildWsUrl(executionId, token));
    wsRef.current = ws;

    ws.onopen = () => {
      if (cleanedUpRef.current) { ws.close(); return; }
      setConnected(true);
      setReconnecting(false);
      attemptRef.current = 0;
      ws.send(JSON.stringify({ type: 'SUBSCRIBE', executionId }));
    };

    ws.onmessage = (event) => {
      try {
        onMessageRef.current(JSON.parse(event.data));
      } catch { /* ignore malformed */ }
    };

    ws.onerror = () => {
      setConnected(false);
    };

    ws.onclose = () => {
      setConnected(false);
      if (cleanedUpRef.current) return;
      const delay = BACKOFF_STEPS[Math.min(attemptRef.current, BACKOFF_STEPS.length - 1)];
      attemptRef.current += 1;
      setReconnecting(true);
      setTimeout(() => {
        if (!cleanedUpRef.current) connect();
      }, delay);
    };
  }, [executionId, token, buildWsUrl]);

  useEffect(() => {
    if (!executionId) {
      setConnected(false);
      setReconnecting(false);
      return;
    }
    cleanedUpRef.current = false;
    attemptRef.current = 0;
    connect();

    return () => {
      cleanedUpRef.current = true;
      setConnected(false);
      setReconnecting(false);
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, [executionId, connect]);

  return { connected, reconnecting };
}
