import { useState } from "react";
import { ChevronDown, ChevronUp, Search, Filter, CheckCircle2, Edit3, X, Zap, ExternalLink, Mail, MessageSquare, Bell } from "lucide-react";
import { Link } from "react-router";
import { usePendingApprovals, useApproval } from "../hooks/useWorkflow";
import { WorkflowStatusModal } from "./WorkflowStatusModal";
import type { WorkflowRun } from "../services/api";

export function ApprovalQueue() {
  const [expandedBrief, setExpandedBrief] = useState<string | null>(null);
  const { runs: pendingRuns, isLoading, refetch } = usePendingApprovals();
  const { submit: submitApproval, isSubmitting } = useApproval();
  const [activeRunId, setActiveRunId] = useState<string | null>(null);

  const handleApprove = async (runId: string, approved: boolean) => {
    await submitApproval(runId, { approved, reason: '', approver: 'retention_manager' });
    refetch();
  };

  const criticalCount = pendingRuns.filter(r => r.risk_level === 'HIGH' && (r.composite_score ?? 0) >= 85).length;
  const highCount = pendingRuns.filter(r => r.risk_level === 'HIGH' && (r.composite_score ?? 0) < 85).length;
  const mediumCount = pendingRuns.filter(r => r.risk_level === 'MEDIUM').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-navy mb-1">Approval Queue</h1>
          <p className="text-gray-3" style={{ fontSize: '14px' }}>
            {pendingRuns.length} brief{pendingRuns.length !== 1 ? 's' : ''} awaiting your decision — sorted by churn risk
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-2 text-navy rounded-lg hover:bg-gray-1 transition-colors" style={{ fontSize: '14px', fontWeight: '500' }}>
            Mark all reviewed
          </button>
          <button className="px-4 py-2 bg-white border border-gray-2 text-navy rounded-lg hover:bg-gray-1 transition-colors flex items-center gap-2" style={{ fontSize: '14px', fontWeight: '500' }}>
            <Filter size={16} />
            Filter
          </button>
          <button className="px-4 py-2 bg-white border border-gray-2 text-navy rounded-lg hover:bg-gray-1 transition-colors flex items-center gap-2" style={{ fontSize: '14px', fontWeight: '500' }}>
            Sort
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard icon="🔴" label="CRITICAL" value={String(criticalCount)} />
        <StatCard icon="🟠" label="HIGH" value={String(highCount)} />
        <StatCard icon="🟡" label="MEDIUM" value={String(mediumCount)} />
        <StatCard icon="⏱" label="Total Pending" value={String(pendingRuns.length)} />
      </div>

      {/* Search & Filter Row */}
      <div className="bg-white border border-gray-2 rounded-xl p-4">
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-3" size={18} />
            <input
              type="text"
              placeholder="Search customer name or ID..."
              className="w-full h-11 pl-10 pr-4 bg-white border border-gray-2 rounded-lg focus:border-teal focus:outline-none"
              style={{ fontSize: '14px' }}
            />
          </div>
          <button className="px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal-mid transition-colors" style={{ fontSize: '14px', fontWeight: '500' }}>
            Search
          </button>
        </div>
        <div className="flex gap-2 flex-wrap">
          <FilterChip label="All" active />
          <FilterChip label="CRITICAL" />
          <FilterChip label="HIGH" />
          <FilterChip label="Date" />
          <FilterChip label="Signal type" />
        </div>
      </div>

      {/* Loading state */}
      {isLoading && pendingRuns.length === 0 && (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3 text-gray-3">
            <span className="w-5 h-5 border-2 border-teal border-t-transparent rounded-full animate-spin" />
            Loading pending approvals…
          </div>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && pendingRuns.length === 0 && (
        <div className="bg-white border border-gray-2 rounded-xl p-12 text-center">
          <div className="text-gray-3 mb-2" style={{ fontSize: '48px' }}>✅</div>
          <h3 className="text-navy mb-2">No pending approvals</h3>
          <p className="text-gray-3" style={{ fontSize: '14px' }}>All HIGH-risk briefs have been reviewed.</p>
        </div>
      )}

      {/* Brief Cards */}
      <div className="space-y-4">
        {pendingRuns.map((run) => (
          <BriefCard
            key={run.run_id}
            run={run}
            isExpanded={expandedBrief === run.run_id}
            onToggle={() => setExpandedBrief(expandedBrief === run.run_id ? null : run.run_id)}
            onApprove={(approved) => handleApprove(run.run_id, approved)}
            onViewDetails={() => setActiveRunId(run.run_id)}
            isSubmitting={isSubmitting}
          />
        ))}
      </div>

      {activeRunId && (
        <WorkflowStatusModal
          runId={activeRunId}
          customerName={pendingRuns.find(r => r.run_id === activeRunId)?.customer_name ?? undefined}
          onClose={() => setActiveRunId(null)}
        />
      )}
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="bg-white border border-gray-2 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-1">
        <span style={{ fontSize: '20px' }}>{icon}</span>
        <span className="text-gray-3" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {label}
        </span>
      </div>
      <div className="text-navy font-mono" style={{ fontSize: '24px', fontWeight: '700' }}>
        {value}
      </div>
    </div>
  );
}

function FilterChip({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      className={`px-3 py-1.5 rounded-lg transition-colors ${
        active
          ? 'bg-teal text-white'
          : 'bg-gray-1 text-black hover:bg-gray-2'
      }`}
      style={{ fontSize: '13px', fontWeight: '500' }}
    >
      {label}
    </button>
  );
}

function BriefCard({
  run,
  isExpanded,
  onToggle,
  onApprove,
  onViewDetails,
  isSubmitting,
}: {
  run: WorkflowRun;
  isExpanded: boolean;
  onToggle: () => void;
  onApprove: (approved: boolean) => void;
  onViewDetails: () => void;
  isSubmitting: boolean;
}) {
  const score = run.composite_score ?? 0;
  const isCritical = score >= 85;
  const scoreType = isCritical ? 'CRITICAL' : run.risk_level ?? 'HIGH';
  const borderColor = isCritical ? 'border-l-critical' : 'border-l-high';
  const scoreColor = isCritical
    ? 'bg-critical-light text-critical border-critical'
    : 'bg-high-light text-high border-high';

  const customerName = run.customer_name ?? run.customer_id;
  const startedAt = run.started_at ? new Date(run.started_at) : null;
  const now = new Date();
  const waitMs = startedAt ? now.getTime() - startedAt.getTime() : 0;
  const waitH = Math.floor(waitMs / 3600000);
  const waitM = Math.floor((waitMs % 3600000) / 60000);
  const timeInQueue = startedAt ? `${waitH}h ${waitM}m` : '—';

  // Build signal chips from signal_conflicts or audit trail
  const signals = (run.signal_conflicts ?? []).length > 0
    ? (run.signal_conflicts ?? []).slice(0, 3).map(c => ({ label: c.slice(0, 20), system: 'System' }))
    : [{ label: `Score: ${score}`, system: 'Scoring' }];

  return (
    <div
      className={`bg-white border border-gray-2 border-l-4 ${borderColor} rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:border-teal transition-all`}
    >
      {/* Header - Always Visible */}
      <div className="p-5">
        <div className="flex items-start gap-6">
          {/* Left - Customer Info */}
          <div className="flex-shrink-0">
            <div className={`inline-block px-3 py-1 rounded border-l-4 ${scoreColor} font-mono mb-2`} style={{ fontSize: '14px', fontWeight: '700' }}>
              {scoreType} {score}
            </div>
            <div className="font-medium mb-1" style={{ fontSize: '15px' }}>{customerName}</div>
            <div className="text-gray-3 mb-1" style={{ fontSize: '12px' }}>{run.customer_id}</div>
            <div className="text-gray-3" style={{ fontSize: '12px' }}>{timeInQueue} in queue</div>
          </div>

          {/* Center - Signals & Offer */}
          <div className="flex-1">
            <div className="flex gap-2 mb-2 flex-wrap">
              {signals.map((signal, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-1 rounded-full border border-gray-2"
                >
                  <span style={{ fontSize: '12px', fontWeight: '500' }}>{signal.label}</span>
                </div>
              ))}
            </div>
            <div className="text-gray-3" style={{ fontSize: '13px' }}>
              {run.offer ? run.offer.offer_title : run.intervention_type ?? 'Pending offer selection'}
            </div>
          </div>

          {/* Right - Actions */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <button
              onClick={onViewDetails}
              className="px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal-mid transition-colors flex items-center gap-2"
              style={{ fontSize: '13px', fontWeight: '500' }}
            >
              <ExternalLink size={16} />
              View Details
            </button>
            <button
              onClick={() => onApprove(true)}
              disabled={isSubmitting}
              className="px-4 py-2 bg-low text-white rounded-lg hover:bg-low/80 transition-colors flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ fontSize: '13px', fontWeight: '500' }}
            >
              <CheckCircle2 size={16} />
              Approve
            </button>
            <button className="px-4 py-2 bg-white border border-gray-2 text-navy rounded-lg hover:bg-gray-1 transition-colors flex items-center gap-2" style={{ fontSize: '13px', fontWeight: '500' }}>
              <Edit3 size={16} />
              Override
            </button>
            <button
              onClick={() => onApprove(false)}
              disabled={isSubmitting}
              className="px-4 py-2 bg-white border border-gray-2 text-critical rounded-lg hover:bg-critical-light transition-colors flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ fontSize: '13px', fontWeight: '500' }}
            >
              <X size={16} />
              Dismiss
            </button>
            <button
              onClick={onToggle}
              className="p-2 text-gray-3 hover:text-black transition-colors"
            >
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-2 p-5 space-y-6">
          {/* Why GA is Trigger #1 */}
          <div className="bg-[#FFF7ED] border-l-4 border-ga-orange rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={16} className="text-ga-orange" />
              <span className="font-medium text-ga-orange" style={{ fontSize: '14px' }}>
                Risk Assessment
              </span>
            </div>
            <p className="text-[#92400E]" style={{ fontSize: '13px', lineHeight: '1.6' }}>
              Composite churn score of {score} ({scoreType}) — this customer has been routed to the approval queue
              because the risk level exceeds the auto-approval threshold. Review the offer details and signal
              breakdown before approving the retention campaign.
            </p>
          </div>

          {/* Composite Score Breakdown */}
          {run.score_breakdown && (
            <div>
              <h4 className="text-navy mb-3">Composite Score Breakdown</h4>
              <div className="space-y-2">
                {Object.entries(run.score_breakdown).map(([key, val]) => (
                  <ScoreSegment
                    key={key}
                    label={key}
                    points={val}
                    color={val > 70 ? 'bg-critical' : val > 40 ? 'bg-high' : 'bg-medium'}
                  />
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-2 flex items-center justify-between">
                <span className="font-medium" style={{ fontSize: '14px' }}>TOTAL</span>
                <span className={`font-mono ${isCritical ? 'text-critical' : 'text-high'}`} style={{ fontSize: '18px', fontWeight: '700' }}>
                  {score}/100 {scoreType}
                </span>
              </div>
            </div>
          )}

          {/* Offer Details */}
          {run.offer && (
            <div className="bg-teal-light border border-teal rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <span>✨</span>
                <span className="font-medium text-teal" style={{ fontSize: '14px' }}>Selected Offer</span>
              </div>
              <div className="mb-2">
                <div className="font-medium mb-1" style={{ fontSize: '13px' }}>
                  {run.offer.offer_title}
                </div>
                <div className="text-gray-3 mb-2" style={{ fontSize: '12px' }}>{run.offer.offer_value}</div>
                <div className="flex gap-3 text-xs">
                  <span className="font-mono bg-white px-2 py-1 rounded border border-teal">{run.offer.offer_code}</span>
                  <span className="text-gray-3">Expires in {run.offer.expiry_days}d</span>
                  {!run.offer.margin_safe && (
                    <span className="text-high font-medium">⚠️ Margin Warning</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Signal Conflicts */}
          {(run.signal_conflicts ?? []).length > 0 && (
            <div>
              <h4 className="text-navy mb-3">Signal Conflicts</h4>
              <div className="space-y-2">
                {(run.signal_conflicts ?? []).map((conflict, idx) => (
                  <GuardrailItem key={idx} status="warning" text={conflict} />
                ))}
              </div>
            </div>
          )}

          {/* Campaign Preview — email/SMS body before approval */}
          {run.outreach_content && (
            <div>
              <h4 className="text-navy mb-3">Campaign Preview</h4>
              <div className="space-y-3">
                {run.outreach_content.email && (
                  <div className="bg-white border border-gray-2 rounded-lg p-4">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-navy mb-2">
                      <Mail size={13} />
                      Email
                    </div>
                    {run.outreach_content.email.subject && (
                      <div className="text-sm font-semibold text-navy mb-2">
                        Subject: {run.outreach_content.email.subject}
                      </div>
                    )}
                    <div className="text-sm text-gray-3 whitespace-pre-line leading-relaxed">
                      {run.outreach_content.email.body}
                    </div>
                    {run.outreach_content.email.cta && (
                      <div className="mt-3 inline-block px-4 py-1.5 bg-teal text-white text-xs rounded font-medium">
                        {run.outreach_content.email.cta}
                      </div>
                    )}
                  </div>
                )}
                {run.outreach_content.sms && (
                  <div className="bg-white border border-gray-2 rounded-lg p-4">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-navy mb-2">
                      <MessageSquare size={13} />
                      SMS
                    </div>
                    <div className="text-sm text-gray-3 leading-relaxed">
                      {run.outreach_content.sms.body}
                    </div>
                  </div>
                )}
                {run.outreach_content.push && (
                  <div className="bg-white border border-gray-2 rounded-lg p-4">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-navy mb-2">
                      <Bell size={13} />
                      Push Notification
                    </div>
                    {run.outreach_content.push.subject && (
                      <div className="text-sm font-semibold text-navy mb-1">{run.outreach_content.push.subject}</div>
                    )}
                    <div className="text-sm text-gray-3">{run.outreach_content.push.body}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-2">
            <div className="flex gap-3">
              <button className="text-gray-3 hover:text-black transition-colors" style={{ fontSize: '14px' }}>
                Escalate to DRI
              </button>
              <button
                onClick={() => onApprove(false)}
                disabled={isSubmitting}
                className="text-critical hover:text-critical/80 transition-colors flex items-center gap-1 disabled:opacity-60"
                style={{ fontSize: '14px' }}
              >
                <X size={16} />
                Dismiss
              </button>
            </div>
            <div className="flex gap-3">
              <button className="px-5 py-2 bg-white border border-gray-2 text-navy rounded-lg hover:bg-gray-1 transition-colors flex items-center gap-2" style={{ fontSize: '14px', fontWeight: '500' }}>
                <Edit3 size={16} />
                Override
              </button>
              <button
                onClick={() => onApprove(true)}
                disabled={isSubmitting}
                className="px-6 py-2 bg-teal text-white rounded-lg hover:bg-teal-mid transition-colors flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ fontSize: '14px', fontWeight: '500' }}
              >
                <CheckCircle2 size={18} />
                {isSubmitting ? 'Submitting…' : 'Approve and Send'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ScoreSegment({ label, points, color, note }: {
  label: string;
  points: number;
  color: string;
  note?: string;
}) {
  const width = Math.min((points / 100) * 100, 100);

  return (
    <div className="flex items-center gap-3">
      <div className="w-32 text-right text-gray-3 capitalize" style={{ fontSize: '12px' }}>{label}</div>
      <div className="flex-1 bg-gray-1 rounded-full h-6 flex items-center px-1">
        <div className={`${color} h-4 rounded-full flex items-center justify-end px-2`} style={{ width: `${width}%` }}>
          <span className="text-white font-mono" style={{ fontSize: '11px', fontWeight: '700' }}>{points}pts</span>
        </div>
      </div>
      {note && <span className="text-gray-3 text-xs italic">{note}</span>}
    </div>
  );
}

function GuardrailItem({ status, text }: { status: 'pass' | 'warning'; text: string }) {
  return (
    <div className="flex items-center gap-2">
      {status === 'pass' ? (
        <CheckCircle2 size={18} className="text-low flex-shrink-0" />
      ) : (
        <span className="text-high flex-shrink-0" style={{ fontSize: '18px' }}>⚠️</span>
      )}
      <span style={{ fontSize: '13px' }}>{text}</span>
    </div>
  );
}
