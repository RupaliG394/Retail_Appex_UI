import { useState, useEffect, useCallback, useRef } from 'react';
import { api, createWorkflowSocket, WorkflowRun, ApprovalRequest } from '../services/api';

// ── useTriggerWorkflow ────────────────────────────────────────────────────────

export interface TriggerState {
  isLoading: boolean;
  runId: string | null;
  error: string | null;
  trigger: (customerId: string, eventType?: string) => Promise<string | null>;
}

export function useTriggerWorkflow(): TriggerState {
  const [isLoading, setIsLoading] = useState(false);
  const [runId, setRunId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const trigger = useCallback(async (
    customerId: string,
    eventType = 'session_collapse',
  ): Promise<string | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.trigger({
        customer_id: customerId,
        event_type: eventType,
        source: 'ui_manual_trigger',
      });
      setRunId(res.run_id);
      return res.run_id;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to trigger workflow');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, runId, error, trigger };
}

// ── useWorkflowStatus ─────────────────────────────────────────────────────────

export function useWorkflowStatus(runId: string | null): WorkflowRun | null {
  const [status, setStatus] = useState<WorkflowRun | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!runId) return;

    // Initial fetch
    api.getRun(runId).then(setStatus).catch(console.error);

    // WebSocket for live updates
    wsRef.current = createWorkflowSocket(
      runId,
      (data) => setStatus(data),
      (err) => console.error('WebSocket error', err),
    );

    return () => {
      wsRef.current?.close();
    };
  }, [runId]);

  return status;
}

// ── useApproval ───────────────────────────────────────────────────────────────

export interface ApprovalState {
  isSubmitting: boolean;
  error: string | null;
  submit: (runId: string, req: ApprovalRequest) => Promise<boolean>;
}

export function useApproval(): ApprovalState {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(async (
    runId: string,
    req: ApprovalRequest,
  ): Promise<boolean> => {
    setIsSubmitting(true);
    setError(null);
    try {
      await api.approve(runId, req);
      return true;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to submit approval');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return { isSubmitting, error, submit };
}

// ── usePendingApprovals ───────────────────────────────────────────────────────

export function usePendingApprovals(pollIntervalMs = 5000) {
  const [runs, setRuns] = useState<WorkflowRun[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPending = useCallback(async () => {
    setIsLoading(true);
    try {
      const { runs: summaries } = await api.listRuns('awaiting_approval', 50);
      // Fetch full detail for each pending run
      const full = await Promise.allSettled(
        summaries.map((s) => api.getRun(s.run_id)),
      );
      setRuns(
        full
          .filter((r): r is PromiseFulfilledResult<WorkflowRun> => r.status === 'fulfilled')
          .map((r) => r.value),
      );
    } catch (e) {
      console.error('Failed to fetch pending approvals', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPending();
    const interval = setInterval(fetchPending, pollIntervalMs);
    return () => clearInterval(interval);
  }, [fetchPending, pollIntervalMs]);

  return { runs, isLoading, refetch: fetchPending };
}

// ── useRecentRuns ─────────────────────────────────────────────────────────────

export function useRecentRuns(pollIntervalMs = 8000, limit = 20) {
  const [runs, setRuns] = useState<WorkflowRun[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetch_ = useCallback(async () => {
    setIsLoading(true);
    try {
      const { runs: summaries } = await api.listRuns(undefined, limit);
      const full = await Promise.allSettled(
        summaries.slice(0, 12).map((s) => api.getRun(s.run_id)),
      );
      setRuns(
        full
          .filter((r): r is PromiseFulfilledResult<WorkflowRun> => r.status === 'fulfilled')
          .map((r) => r.value),
      );
    } catch (e) {
      console.error('Failed to fetch runs', e);
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetch_();
    const interval = setInterval(fetch_, pollIntervalMs);
    return () => clearInterval(interval);
  }, [fetch_, pollIntervalMs]);

  return { runs, isLoading, refetch: fetch_ };
}
