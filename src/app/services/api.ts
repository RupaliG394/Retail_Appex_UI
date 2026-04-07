// API client for Apex Retail Retention Orchestrator
// Backend: http://localhost:8000

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';
const WS_BASE = import.meta.env.VITE_WS_URL ?? 'ws://localhost:8000';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface TriggerRequest {
  customer_id: string;
  event_type?: string;
  source?: string;
  raw_data?: Record<string, unknown>;
}

export interface TriggerResponse {
  run_id: string;
  customer_id: string;
  status: string;
  message: string;
  track_url: string;
  ws_url: string;
}

export interface ApprovalRequest {
  approved: boolean;
  reason?: string;
  approver?: string;
}

export interface ApprovalResponse {
  run_id: string;
  message: string;
  approved: boolean;
  approver: string;
}

export interface OfferDetails {
  offer_type: string;
  offer_title: string;
  offer_value: string;
  offer_code: string;
  expiry_days: number;
  margin_safe: boolean;
  blocked_reason: string | null;
}

export interface OutreachChannel {
  subject: string | null;
  body: string;
  cta: string;
}

export interface OutreachContent {
  email: OutreachChannel | null;
  sms: OutreachChannel | null;
  push: OutreachChannel | null;
  channels_used: string[];
  send_timing: string;
  personalization_tokens: Record<string, string>;
}

export interface AuditEntry {
  timestamp: string;
  agent: string;
  action: string;
  status: string;
  data: Record<string, unknown>;
}

export interface WorkflowRun {
  run_id: string;
  customer_id: string;
  customer_name: string | null;
  workflow_status: 'running' | 'awaiting_approval' | 'completed' | 'failed' | 'rejected';
  current_step: string;
  next_nodes: string[];
  awaiting_human: boolean;
  composite_score: number | null;
  risk_level: 'HIGH' | 'MEDIUM' | 'LOW' | null;
  score_breakdown: Record<string, number> | null;
  signal_conflicts: string[];
  intervention_type: string | null;
  offer: OfferDetails | null;
  outreach_content: OutreachContent | null;
  outreach_sent: boolean;
  requires_approval: boolean;
  approval_status: 'pending' | 'approved' | 'rejected' | null;
  approval_reason: string | null;
  approver: string | null;
  trigger_event: Record<string, unknown> | null;
  audit_trail: AuditEntry[];
  started_at: string | null;
  completed_at: string | null;
}

export interface RunSummary {
  run_id: string;
  customer_id: string;
  customer_name: string | null;
  workflow_status: string;
  risk_level: string | null;
  composite_score: number | null;
  intervention_type: string | null;
  outreach_sent: boolean;
  awaiting_human: boolean;
  started_at: string | null;
  completed_at: string | null;
}

export interface MockCustomer {
  customer_id: string;
  name: string;
  email: string;
  phone: string;
  profile: string;
  session_collapse_detected: boolean;
  conversion_probability: number | null;
}

export interface DashboardStats {
  summary: {
    total_runs: number;
    completed: number;
    awaiting_approval: number;
    running: number;
    failed: number;
    rejected: number;
    campaigns_sent: number;
  };
  risk_distribution: { HIGH: number; MEDIUM: number; LOW: number };
  avg_churn_score: number;
  recent_runs: RunSummary[];
}

// ── HTTP helpers ──────────────────────────────────────────────────────────────

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail ?? `HTTP ${res.status}`);
  }
  return res.json();
}

// ── API surface ───────────────────────────────────────────────────────────────

export const api = {
  /** Trigger retention workflow for a customer */
  trigger(req: TriggerRequest): Promise<TriggerResponse> {
    return request('/api/trigger', { method: 'POST', body: JSON.stringify(req) });
  },

  /** Get full workflow run state */
  getRun(runId: string): Promise<WorkflowRun> {
    return request(`/api/run/${runId}`);
  },

  /** Submit human approval / rejection */
  approve(runId: string, req: ApprovalRequest): Promise<ApprovalResponse> {
    return request(`/api/run/${runId}/approve`, { method: 'POST', body: JSON.stringify(req) });
  },

  /** List all workflow runs */
  listRuns(status?: string, limit = 50): Promise<{ runs: RunSummary[]; total: number }> {
    const params = new URLSearchParams({ limit: String(limit) });
    if (status) params.set('status', status);
    return request(`/api/runs?${params}`);
  },

  /** List mock customers */
  listCustomers(): Promise<{ customers: MockCustomer[]; total: number }> {
    return request('/api/customers');
  },

  /** Dashboard statistics */
  getDashboard(): Promise<DashboardStats> {
    return request('/api/dashboard');
  },

  /** Health check */
  health(): Promise<{ status: string }> {
    return request('/api/health');
  },
};

// ── WebSocket factory ─────────────────────────────────────────────────────────

export function createWorkflowSocket(
  runId: string,
  onMessage: (data: WorkflowRun) => void,
  onError?: (err: Event) => void,
): WebSocket {
  const ws = new WebSocket(`${WS_BASE}/ws/${runId}`);
  ws.onmessage = (ev) => {
    try {
      const data = JSON.parse(ev.data);
      if (data.type !== 'ping') onMessage(data as WorkflowRun);
    } catch {
      // ignore parse errors
    }
  };
  if (onError) ws.onerror = onError;
  return ws;
}
