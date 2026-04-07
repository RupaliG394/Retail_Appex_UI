import { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, Clock, Send, Shield, Sparkles, ChevronRight, Mail, MessageSquare, Bell, Search, BarChart2, Gift, UserCheck, UserX, Zap, Radio } from 'lucide-react';
import { useWorkflowStatus, useApproval } from '../hooks/useWorkflow';
import type { WorkflowRun } from '../services/api';

interface Props {
  runId: string;
  customerName?: string;
  onClose: () => void;
}

const STEPS = ['init', 'signal_aggregation', 'scoring', 'offer_personalisation', 'human_approval', 'outreach_execution', 'completed'];
const STEP_LABELS: Record<string, string> = {
  init: 'Init',
  signal_aggregation: 'Signals',
  scoring: 'Scoring',
  offer_personalisation: 'Offer',
  human_approval: 'Approval',
  outreach_execution: 'Outreach',
  completed: 'Done',
};

function StepIndicator({ run }: { run: WorkflowRun }) {
  const currentIdx = STEPS.indexOf(run.current_step);
  return (
    <div className="flex items-center gap-1 mb-6 flex-wrap">
      {STEPS.map((step, idx) => {
        const isDone = idx < currentIdx || run.workflow_status === 'completed';
        const isCurrent = idx === currentIdx && run.workflow_status !== 'completed';
        // skip approval step for non-HIGH
        if (step === 'human_approval' && run.risk_level !== 'HIGH') return null;
        return (
          <div key={step} className="flex items-center gap-1">
            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
              isDone ? 'bg-teal text-white' :
              isCurrent ? 'bg-teal-light text-teal border border-teal' :
              'bg-gray-1 text-gray-3'
            }`}>
              {isDone ? <CheckCircle2 size={12} /> : isCurrent ? <span className="w-2 h-2 bg-teal rounded-full animate-ping inline-block" /> : <Clock size={12} />}
              {STEP_LABELS[step]}
            </div>
            {idx < STEPS.length - 1 && <ChevronRight size={12} className="text-gray-3 flex-shrink-0" />}
          </div>
        );
      })}
    </div>
  );
}

function ScoreDisplay({ run }: { run: WorkflowRun }) {
  if (!run.composite_score) return null;
  const riskColors: Record<string, string> = {
    HIGH: 'text-critical bg-critical-light border-critical',
    MEDIUM: 'text-high bg-high-light border-high',
    LOW: 'text-low bg-low-light border-low',
  };
  const color = riskColors[run.risk_level ?? ''] ?? 'text-gray-3 bg-gray-1';
  return (
    <div className="mb-5">
      <div className="flex items-center gap-4 mb-3">
        <div>
          <div className="text-gray-3 text-xs mb-1">Composite Churn Score</div>
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded border-l-4 ${color}`}>
            <span className="font-mono text-2xl font-bold">{run.composite_score}</span>
            <span className="font-bold text-sm">{run.risk_level}</span>
          </div>
        </div>
        {run.intervention_type && (
          <div>
            <div className="text-gray-3 text-xs mb-1">Intervention</div>
            <div className="px-3 py-1.5 bg-teal-light text-teal rounded text-sm font-medium capitalize">
              {run.intervention_type.replace('_', ' ')}
            </div>
          </div>
        )}
      </div>
      {run.score_breakdown && (
        <div className="space-y-1.5">
          {Object.entries(run.score_breakdown).map(([key, val]) => (
            <div key={key} className="flex items-center gap-2">
              <div className="w-20 text-right text-xs text-gray-3 capitalize">{key}</div>
              <div className="flex-1 bg-gray-1 rounded-full h-4">
                <div
                  className={`h-4 rounded-full ${val > 70 ? 'bg-critical' : val > 40 ? 'bg-high' : 'bg-teal'}`}
                  style={{ width: `${val}%` }}
                />
              </div>
              <div className="w-10 text-xs font-mono text-right">{val}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ConflictsDisplay({ conflicts }: { conflicts: string[] }) {
  if (!conflicts?.length) return null;
  return (
    <div className="mb-4 p-3 bg-high-light border border-high rounded-lg">
      <div className="flex items-center gap-2 mb-2 text-high text-sm font-medium">
        <AlertTriangle size={14} />
        {conflicts.length} Signal Conflict{conflicts.length > 1 ? 's' : ''} Detected
      </div>
      {conflicts.map((c, i) => (
        <div key={i} className="text-xs text-high mb-1">• {c}</div>
      ))}
    </div>
  );
}

function OfferDisplay({ run }: { run: WorkflowRun }) {
  if (!run.offer) return null;
  return (
    <div className="mb-4 p-4 bg-teal-light border border-teal rounded-lg">
      <div className="flex items-center gap-2 mb-2 text-teal text-sm font-semibold">
        <Sparkles size={14} />
        Selected Offer
      </div>
      <div className="font-medium text-navy mb-1">{run.offer.offer_title}</div>
      <div className="text-sm text-gray-3 mb-2">{run.offer.offer_value}</div>
      <div className="flex gap-3 text-xs">
        <span className="font-mono bg-white px-2 py-1 rounded border border-teal">{run.offer.offer_code}</span>
        <span className="text-gray-3">Expires in {run.offer.expiry_days}d</span>
        {!run.offer.margin_safe && (
          <span className="text-high flex items-center gap-1"><Shield size={10} /> Margin Warning</span>
        )}
      </div>
    </div>
  );
}

function OutreachDisplay({ run }: { run: WorkflowRun }) {
  if (!run.outreach_content) return null;
  const oc = run.outreach_content;
  const isPreview = run.awaiting_human && !run.outreach_sent;
  const borderCls = isPreview ? 'border-high bg-high-light' : 'border-low bg-low-light';
  const textCls = isPreview ? 'text-high' : 'text-low';

  return (
    <div className={`mb-4 p-4 border rounded-lg ${borderCls}`}>
      <div className={`flex items-center gap-2 mb-3 text-sm font-semibold ${textCls}`}>
        <Send size={14} />
        {isPreview
          ? `Campaign Preview — ${oc.channels_used.join(' + ').toUpperCase()} (pending approval)`
          : `Campaign Sent — ${oc.channels_used.join(' + ').toUpperCase()}`}
      </div>

      {oc.email && (
        <div className="mb-3 bg-white rounded-lg p-3 border border-gray-2">
          <div className="flex items-center gap-1.5 text-xs font-medium text-navy mb-2">
            <Mail size={12} />
            Email
          </div>
          {oc.email.subject && (
            <div className="text-xs font-semibold text-navy mb-1">Subject: {oc.email.subject}</div>
          )}
          <div className="text-xs text-gray-3 whitespace-pre-line leading-relaxed">{oc.email.body}</div>
          {oc.email.cta && (
            <div className="mt-2 inline-block px-3 py-1 bg-teal text-white text-xs rounded font-medium">{oc.email.cta}</div>
          )}
        </div>
      )}

      {oc.sms && (
        <div className="mb-3 bg-white rounded-lg p-3 border border-gray-2">
          <div className="flex items-center gap-1.5 text-xs font-medium text-navy mb-2">
            <MessageSquare size={12} />
            SMS
          </div>
          <div className="text-xs text-gray-3 leading-relaxed">{oc.sms.body}</div>
        </div>
      )}

      {oc.push && (
        <div className="mb-3 bg-white rounded-lg p-3 border border-gray-2">
          <div className="flex items-center gap-1.5 text-xs font-medium text-navy mb-2">
            <Bell size={12} />
            Push Notification
          </div>
          {oc.push.subject && (
            <div className="text-xs font-semibold text-navy mb-1">{oc.push.subject}</div>
          )}
          <div className="text-xs text-gray-3">{oc.push.body}</div>
        </div>
      )}

      <div className={`text-xs ${textCls}`}>Send timing: {oc.send_timing}</div>
    </div>
  );
}

function ApprovalForm({ run, onApprove }: { run: WorkflowRun; onApprove: (approved: boolean, reason: string) => void }) {
  const [reason, setReason] = useState('');
  return (
    <div className="mb-4 p-4 bg-high-light border-2 border-high rounded-lg">
      <div className="flex items-center gap-2 mb-3 text-high font-semibold">
        <AlertTriangle size={16} />
        Human Approval Required
      </div>
      <p className="text-sm text-navy mb-3">
        This HIGH-risk customer requires your approval before the retention campaign fires.
      </p>
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Optional: add a note or reason..."
        className="w-full border border-gray-2 rounded-lg p-2 text-sm mb-3 focus:outline-none focus:border-teal resize-none"
        rows={2}
      />
      <div className="flex gap-3">
        <button
          onClick={() => onApprove(true, reason)}
          className="flex-1 py-2 bg-low text-white rounded-lg hover:bg-low/80 transition-colors font-medium text-sm flex items-center justify-center gap-2"
        >
          <CheckCircle2 size={16} />
          Approve &amp; Send
        </button>
        <button
          onClick={() => onApprove(false, reason)}
          className="flex-1 py-2 bg-white border border-critical text-critical rounded-lg hover:bg-critical-light transition-colors font-medium text-sm flex items-center justify-center gap-2"
        >
          <X size={16} />
          Reject
        </button>
      </div>
    </div>
  );
}

type AuditMeta = { label: string; detail: string; icon: React.ReactNode; color: string };

function humaniseAudit(agent: string, action: string): AuditMeta {
  const a = action.toLowerCase();

  if (a.includes('workflow_initiated') || a.includes('workflow initiated'))
    return { label: 'Workflow kicked off', detail: 'The retention orchestrator started a new workflow run for this customer.', icon: <Zap size={14} />, color: 'text-teal bg-teal-light' };

  if (a.includes('dispatch') && a.includes('signalaggreation') || a.includes('dispatch') && a.includes('signal'))
    return { label: 'Handing off to Signal Analysis', detail: 'Orchestrator dispatched the job to the Signal Aggregation Agent to start collecting behavioural data.', icon: <Radio size={14} />, color: 'text-ai-purple bg-ai-purple-light' };

  if (a.includes('parallel_utility_fan_out') || a.includes('fan_out') || a.includes('fan out'))
    return { label: 'Scanning data sources in parallel', detail: 'Signal Agent fanned out across purchase history, web sessions, email engagement, and loyalty activity simultaneously.', icon: <Search size={14} />, color: 'text-ai-purple bg-ai-purple-light' };

  if (a.includes('composite_score_computed') || a.includes('score computed') || a.includes('score_computed'))
    return { label: 'Churn risk score computed', detail: 'Orchestrator combined all signal inputs and calculated a composite churn risk score for this customer.', icon: <BarChart2 size={14} />, color: 'text-high bg-high-light' };

  if (a.includes('dispatch') && a.includes('offer'))
    return { label: 'Selecting the best offer', detail: 'Orchestrator handed off to the Offer Personalisation Agent to identify the most relevant retention offer.', icon: <Gift size={14} />, color: 'text-teal bg-teal-light' };

  if (a.includes('offer_selected') || a.includes('offer selected'))
    return { label: 'Offer chosen', detail: "Offer Agent reviewed the customer's loyalty tier, purchase history, and margin constraints — selected the optimal offer.", icon: <Gift size={14} />, color: 'text-teal bg-teal-light' };

  if (a.includes('dispatch') && a.includes('outreach'))
    return { label: 'Drafting campaign content', detail: 'Orchestrator sent the approved offer to the Outreach Execution Agent to generate personalised messaging.', icon: <Send size={14} />, color: 'text-teal bg-teal-light' };

  if (a.includes('outreach_content_generated') || a.includes('content generated'))
    return { label: 'Campaign content drafted', detail: 'Outreach Agent generated personalised email, SMS, and push notification copy tailored to this customer.', icon: <Mail size={14} />, color: 'text-teal bg-teal-light' };

  if (a.includes('awaiting_human') || a.includes('awaiting human') || a.includes('human_approval_required'))
    return { label: 'Paused — waiting for manager approval', detail: 'This customer is HIGH risk. Workflow is holding and waiting for a human decision before sending the campaign.', icon: <AlertTriangle size={14} />, color: 'text-high bg-high-light' };

  if (a.includes('approval_received') || a.includes('approved'))
    return { label: 'Manager approved the campaign', detail: 'A retention manager reviewed the brief and approved sending. Workflow is now proceeding to outreach.', icon: <UserCheck size={14} />, color: 'text-low bg-low-light' };

  if (a.includes('rejected') || a.includes('rejection'))
    return { label: 'Manager rejected the campaign', detail: 'A retention manager reviewed the brief and decided not to send. Workflow has been stopped and logged.', icon: <UserX size={14} />, color: 'text-critical bg-critical-light' };

  if (a.includes('outreach_sent') || a.includes('campaign sent') || a.includes('sent'))
    return { label: 'Campaign delivered', detail: 'The retention campaign was successfully dispatched across all selected channels (email, SMS, push).', icon: <CheckCircle2 size={14} />, color: 'text-low bg-low-light' };

  if (a.includes('workflow_completed') || a.includes('completed'))
    return { label: 'Workflow completed', detail: 'All steps finished successfully. Results have been logged and the customer record updated.', icon: <CheckCircle2 size={14} />, color: 'text-low bg-low-light' };

  if (a.includes('conflict') || a.includes('signal_conflict'))
    return { label: 'Signal conflict detected', detail: `Conflicting signals found during aggregation — ${action}. Orchestrator resolved these before scoring.`, icon: <AlertTriangle size={14} />, color: 'text-high bg-high-light' };

  if (a.includes('guardrail') || a.includes('blocked'))
    return { label: 'Guardrail triggered', detail: `A safety guardrail blocked this step — ${action}. No message was sent.`, icon: <Shield size={14} />, color: 'text-critical bg-critical-light' };

  // Fallback — make the raw action readable
  const readable = action.replace(/_/g, ' ').replace(/→/g, '→').replace(/\b\w/g, c => c.toUpperCase());
  return { label: readable, detail: `${agent} completed this step.`, icon: <Zap size={14} />, color: 'text-gray-3 bg-gray-1' };
}

function StatusBadge({ status }: { status: string }) {
  const cfg: Record<string, { label: string; cls: string }> = {
    running:            { label: 'Running',           cls: 'bg-teal-light text-teal' },
    awaiting_approval:  { label: 'Needs Approval',    cls: 'bg-high-light text-high' },
    completed:          { label: 'Completed',         cls: 'bg-low-light text-low' },
    failed:             { label: 'Failed',            cls: 'bg-critical-light text-critical' },
    rejected:           { label: 'Rejected',          cls: 'bg-gray-1 text-gray-3' },
  };
  const c = cfg[status] ?? { label: status, cls: 'bg-gray-1 text-gray-3' };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${c.cls}`}>
      {status === 'running' && <span className="w-1.5 h-1.5 bg-teal rounded-full animate-ping inline-block mr-1.5" />}
      {c.label}
    </span>
  );
}

export function WorkflowStatusPanel({ runId, customerName, onClose }: Props) {
  const run = useWorkflowStatus(runId);
  const { submit: submitApproval, isSubmitting } = useApproval();

  const handleApprove = async (approved: boolean, reason: string) => {
    await submitApproval(runId, { approved, reason, approver: 'retention_manager' });
  };

  return (
    <div
      className="h-full w-[580px] flex-shrink-0 flex flex-col bg-white border-l border-gray-2 shadow-xl overflow-hidden"
      style={{ animation: 'slideInRight 0.25s ease-out' }}
    >
      {/* Header */}
      <div className="bg-white border-b border-gray-2 px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-navy font-semibold">Retention Workflow</h2>
            {run && (
              <StatusBadge status={run.workflow_status} />
            )}
            {run?.completed_at && run?.started_at && (() => {
              const ms = new Date(run.completed_at).getTime() - new Date(run.started_at).getTime();
              const secs = Math.round(ms / 1000);
              const label = secs >= 60 ? `${Math.floor(secs / 60)}m ${secs % 60}s` : `${secs}s`;
              return (
                <span className="text-xs font-bold text-teal bg-teal-light px-2 py-1 rounded-full flex items-center gap-1">
                  <Clock size={11} />
                  Completed in {label}
                </span>
              );
            })()}
          </div>
          <p className="text-gray-3 text-sm mt-0.5">
            {customerName ?? 'Customer'} — Run {runId.slice(0, 8)}…
          </p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-1 rounded-lg transition-colors">
          <X size={20} />
        </button>
      </div>

      <div className="p-6 overflow-y-auto flex-1">
        {!run ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-gray-3">
              <span className="w-5 h-5 border-2 border-teal border-t-transparent rounded-full animate-spin" />
              Starting workflow…
            </div>
          </div>
        ) : (
          <>
            <StepIndicator run={run} />
            <ScoreDisplay run={run} />
            <ConflictsDisplay conflicts={run.signal_conflicts ?? []} />
            <OfferDisplay run={run} />
            <OutreachDisplay run={run} />
            {run.awaiting_human && !isSubmitting && (
              <ApprovalForm run={run} onApprove={handleApprove} />
            )}
            {isSubmitting && (
              <div className="mb-4 p-4 bg-teal-light text-teal rounded-lg text-sm flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-teal border-t-transparent rounded-full animate-spin" />
                Submitting decision…
              </div>
            )}

            {/* Audit trail — huddle feed */}
            {(run.audit_trail ?? []).length > 0 && (
              <div>
                <div className="text-xs text-gray-3 font-semibold uppercase tracking-wider mb-3">Audit Trail</div>
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-4 top-4 bottom-2 w-px bg-gray-2" />
                  <div className="space-y-4 pr-1">
                    {(run.audit_trail ?? []).map((entry, i) => {
                      const meta = humaniseAudit(entry.agent, entry.action);
                      return (
                        <div key={i} className="flex items-start gap-3 relative">
                          {/* Icon bubble */}
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${meta.color}`}>
                            {meta.icon}
                          </div>
                          {/* Content */}
                          <div className="flex-1 pt-0.5 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-0.5">
                              <span className="text-navy font-semibold" style={{ fontSize: '13px' }}>{meta.label}</span>
                              <span className="text-gray-3 flex-shrink-0" style={{ fontSize: '11px' }}>
                                {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                              </span>
                            </div>
                            <p className="text-gray-3 leading-relaxed" style={{ fontSize: '12px' }}>{meta.detail}</p>
                            <span className="text-gray-3 mt-1 inline-block" style={{ fontSize: '11px', fontStyle: 'italic' }}>{entry.agent}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// Keep old name as alias for any other imports
export { WorkflowStatusPanel as WorkflowStatusModal };
