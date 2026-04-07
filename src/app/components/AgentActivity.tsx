import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Download,
  Sparkles,
  Send,
  CheckCircle2,
  XCircle,
  Shield,
  AlertTriangle,
  FileText,
  Clock,
  User,
  ExternalLink
} from "lucide-react";
import { useRecentRuns } from "../hooks/useWorkflow";
import { WorkflowStatusModal } from "./WorkflowStatusModal";
import type { WorkflowRun } from "../services/api";

const staticActivityLog = [
  {
    id: 'act-001',
    timestamp: '2026-04-07T14:32:15Z',
    agent: 'AI Agent',
    action: 'Brief Sent',
    customer: 'Sam Chen (SC-00291)',
    riskScore: 91,
    riskLevel: 'CRITICAL',
    offer: 'Personal Outreach',
    outcome: 'Delivered',
    details: 'Email delivered successfully. Customer opened email 2m after send.',
    icon: Send,
    color: 'teal',
    runId: null as string | null,
  },
  {
    id: 'act-002',
    timestamp: '2026-04-07T14:18:42Z',
    agent: 'AI Agent',
    action: 'Alert Generated',
    customer: 'Marcus Lee (ML-00445)',
    riskScore: 88,
    riskLevel: 'CRITICAL',
    offer: null,
    outcome: 'Pending Review',
    details: 'Churn risk increased from 72 → 88 due to AOV decline + support tickets.',
    icon: AlertTriangle,
    color: 'critical',
    runId: null as string | null,
  },
  {
    id: 'act-003',
    timestamp: '2026-04-07T13:45:20Z',
    agent: 'AI Agent',
    action: 'Offer Redeemed',
    customer: 'Jennifer Kim (JK-00782)',
    riskScore: 22,
    riskLevel: 'LOW',
    offer: 'Double Points',
    outcome: 'Success',
    details: 'Customer redeemed offer. Risk score improved from 91 → 22.',
    icon: CheckCircle2,
    color: 'low',
    runId: null as string | null,
  },
  {
    id: 'act-004',
    timestamp: '2026-04-07T12:30:11Z',
    agent: 'Jordan (Override)',
    action: 'Manual Override',
    customer: 'Alex Morgan (AM-01234)',
    riskScore: 76,
    riskLevel: 'HIGH',
    offer: 'Custom Discount',
    outcome: 'Logged',
    details: 'CSM override: Applied custom 15% discount due to shipping issue.',
    icon: FileText,
    color: 'gray-3',
    runId: null as string | null,
  },
  {
    id: 'act-005',
    timestamp: '2026-04-07T12:15:33Z',
    agent: 'AI Agent',
    action: 'Guardrail Blocked',
    customer: 'Sarah Johnson (SJ-00456)',
    riskScore: 84,
    riskLevel: 'HIGH',
    offer: '25% Discount',
    outcome: 'Blocked',
    details: 'Offer blocked by margin protection guardrail (>20% discount threshold).',
    icon: Shield,
    color: 'gray-3',
    runId: null as string | null,
  },
  {
    id: 'act-006',
    timestamp: '2026-04-07T11:58:17Z',
    agent: 'AI Agent',
    action: 'Brief Dismissed',
    customer: 'Michael Brown (MB-00892)',
    riskScore: 79,
    riskLevel: 'HIGH',
    offer: null,
    outcome: 'Duplicate',
    details: 'Duplicate brief dismissed. Customer already received offer within 7 days.',
    icon: XCircle,
    color: 'gray-3',
    runId: null as string | null,
  },
  {
    id: 'act-007',
    timestamp: '2026-04-07T11:22:45Z',
    agent: 'AI Agent',
    action: 'Brief Approved',
    customer: 'Emma Davis (ED-01156)',
    riskScore: 73,
    riskLevel: 'HIGH',
    offer: 'Free Returns',
    outcome: 'Sent',
    details: 'Brief auto-approved and sent. Confidence score: 94%.',
    icon: CheckCircle2,
    color: 'teal',
    runId: null as string | null,
  },
  {
    id: 'act-008',
    timestamp: '2026-04-07T10:45:29Z',
    agent: 'AI Agent',
    action: 'Insight Generated',
    customer: 'Kevin Patel (KP-01203)',
    riskScore: 81,
    riskLevel: 'HIGH',
    offer: null,
    outcome: 'Analysis',
    details: 'AI detected session collapse pattern. Recommend engagement offer.',
    icon: Sparkles,
    color: 'ai-purple',
    runId: null as string | null,
  },
  {
    id: 'act-009',
    timestamp: '2026-04-07T10:12:03Z',
    agent: 'AI Agent',
    action: 'Brief Sent',
    customer: 'Lisa Anderson (LA-00334)',
    riskScore: 67,
    riskLevel: 'MEDIUM',
    offer: 'First Redemption',
    outcome: 'Delivered',
    details: 'Email delivered. Customer clicked CTA link 15m after send.',
    icon: Send,
    color: 'teal',
    runId: null as string | null,
  },
  {
    id: 'act-010',
    timestamp: '2026-04-07T09:48:52Z',
    agent: 'AI Agent',
    action: 'Offer Redeemed',
    customer: 'David Wilson (DW-00521)',
    riskScore: 18,
    riskLevel: 'LOW',
    offer: '10% Discount',
    outcome: 'Success',
    details: 'Customer redeemed offer and made purchase. AOV: $142.',
    icon: CheckCircle2,
    color: 'low',
    runId: null as string | null,
  },
  {
    id: 'act-011',
    timestamp: '2026-04-07T09:15:38Z',
    agent: 'AI Agent',
    action: 'Alert Generated',
    customer: 'Amy Wong (AW-00654)',
    riskScore: 79,
    riskLevel: 'HIGH',
    offer: null,
    outcome: 'Pending Review',
    details: 'Discount dependency detected. Customer only purchases with offers.',
    icon: AlertTriangle,
    color: 'high',
    runId: null as string | null,
  },
  {
    id: 'act-012',
    timestamp: '2026-04-07T08:42:11Z',
    agent: 'AI Agent',
    action: 'Brief Approved',
    customer: 'Robert Taylor (RT-00789)',
    riskScore: 71,
    riskLevel: 'MEDIUM',
    offer: 'Personal Outreach',
    outcome: 'Sent',
    details: 'Brief sent with personalized message based on purchase history.',
    icon: CheckCircle2,
    color: 'teal',
    runId: null as string | null,
  },
];

function mapRunToActivity(run: WorkflowRun) {
  return {
    id: run.run_id,
    timestamp: run.completed_at ?? run.started_at ?? new Date().toISOString(),
    agent: 'Retention Orchestrator',
    action: run.workflow_status === 'completed' ? 'Brief Sent' :
            run.workflow_status === 'awaiting_approval' ? 'Awaiting Approval' :
            run.workflow_status === 'rejected' ? 'Brief Rejected' :
            run.workflow_status === 'failed' ? 'Workflow Failed' : 'Processing',
    customer: `${run.customer_name ?? run.customer_id} (${run.customer_id})`,
    riskScore: run.composite_score ?? 0,
    riskLevel: run.risk_level ?? 'LOW',
    offer: run.offer?.offer_title ?? null,
    outcome: run.workflow_status === 'completed' ? 'Sent' :
             run.workflow_status === 'awaiting_approval' ? 'Pending Review' :
             run.workflow_status === 'rejected' ? 'Rejected' : 'Running',
    details: run.offer ? `Offer: ${run.offer.offer_title} (${run.offer.offer_code})` :
             (run.signal_conflicts ?? []).length ? `${run.signal_conflicts.length} conflicts detected` :
             `Score: ${run.composite_score ?? 'computing…'}`,
    icon: run.workflow_status === 'completed' ? Send :
          run.workflow_status === 'awaiting_approval' ? AlertTriangle :
          run.workflow_status === 'rejected' ? XCircle :
          run.workflow_status === 'failed' ? Shield : Sparkles,
    color: run.workflow_status === 'completed' ? 'teal' :
           run.workflow_status === 'awaiting_approval' ? 'high' :
           run.workflow_status === 'rejected' ? 'gray-3' :
           run.workflow_status === 'failed' ? 'critical' : 'ai-purple',
    runId: run.run_id,
  };
}

const getRiskColor = (level: string) => {
  switch (level) {
    case 'CRITICAL': return 'text-critical bg-critical-light';
    case 'HIGH': return 'text-high bg-high-light';
    case 'MEDIUM': return 'text-medium bg-medium-light';
    case 'LOW': return 'text-low bg-low-light';
    default: return 'text-gray-3 bg-gray-1';
  }
};

const getIconColor = (color: string) => {
  const colorMap: Record<string, string> = {
    'teal': 'text-teal bg-teal-light',
    'critical': 'text-critical bg-critical-light',
    'high': 'text-high bg-high-light',
    'low': 'text-low bg-low-light',
    'ai-purple': 'text-ai-purple bg-ai-purple-light',
    'gray-3': 'text-gray-3 bg-gray-1'
  };
  return colorMap[color] || 'text-gray-3 bg-gray-1';
};

export function AgentActivity() {
  const { runs, isLoading } = useRecentRuns();
  const [activeRunId, setActiveRunId] = useState<string | null>(null);

  const activityLog = runs.length > 0
    ? runs.map(mapRunToActivity)
    : (!isLoading ? staticActivityLog : []);

  const hasLiveData = runs.length > 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-navy mb-1">Agent Activity Log</h1>
          <p className="text-gray-3" style={{ fontSize: '14px' }}>
            Complete audit trail of every action taken by the AI agent
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-gray-2 text-navy rounded-lg hover:bg-gray-1 transition-colors flex items-center gap-2" style={{ fontSize: '14px', fontWeight: '500' }}>
            <Download className="w-4 h-4" />
            Export Log
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-xl p-4 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-3" />
            <input
              type="text"
              placeholder="Search by customer, action, or outcome..."
              className="w-full pl-10 pr-4 py-2 border border-gray-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
              style={{ fontSize: '14px' }}
            />
          </div>
          <select className="px-4 py-2 bg-white border border-gray-2 rounded-lg text-black" style={{ fontSize: '14px' }}>
            <option>All Actions</option>
            <option>Brief Sent</option>
            <option>Alert Generated</option>
            <option>Offer Redeemed</option>
            <option>Manual Override</option>
            <option>Guardrail Blocked</option>
          </select>
          <select className="px-4 py-2 bg-white border border-gray-2 rounded-lg text-black" style={{ fontSize: '14px' }}>
            <option>All Risk Levels</option>
            <option>CRITICAL</option>
            <option>HIGH</option>
            <option>MEDIUM</option>
            <option>LOW</option>
          </select>
          <select className="px-4 py-2 bg-white border border-gray-2 rounded-lg text-black" style={{ fontSize: '14px' }}>
            <option>Last 24 hours</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Custom range</option>
          </select>
          <button className="px-4 py-2 bg-white border border-gray-2 text-navy rounded-lg hover:bg-gray-1 transition-colors flex items-center gap-2" style={{ fontSize: '14px', fontWeight: '500' }}>
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <p className="text-gray-3 mb-1" style={{ fontSize: '13px', fontWeight: '500' }}>Total Actions Today</p>
          <p className="text-navy" style={{ fontSize: '28px', fontWeight: '600' }}>1,247</p>
          <p className="text-low mt-1" style={{ fontSize: '13px' }}>+18% vs yesterday</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <p className="text-gray-3 mb-1" style={{ fontSize: '13px', fontWeight: '500' }}>Briefs Sent</p>
          <p className="text-navy" style={{ fontSize: '28px', fontWeight: '600' }}>842</p>
          <p className="text-low mt-1" style={{ fontSize: '13px' }}>91% auto-approved</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <p className="text-gray-3 mb-1" style={{ fontSize: '13px', fontWeight: '500' }}>Alerts Generated</p>
          <p className="text-navy" style={{ fontSize: '28px', fontWeight: '600' }}>127</p>
          <p className="text-high mt-1" style={{ fontSize: '13px' }}>43 CRITICAL</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <p className="text-gray-3 mb-1" style={{ fontSize: '13px', fontWeight: '500' }}>Success Rate</p>
          <p className="text-navy" style={{ fontSize: '28px', fontWeight: '600' }}>94.2%</p>
          <p className="text-low mt-1" style={{ fontSize: '13px' }}>Above target</p>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-xl border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
        <div className="p-5 border-b border-gray-2">
          <div className="flex items-center justify-between">
            <h3 className="text-navy">Activity Timeline</h3>
            <div className="flex items-center gap-2 text-gray-3" style={{ fontSize: '13px' }}>
              <Clock className="w-4 h-4" />
              <span>{hasLiveData ? 'Live data' : 'Real-time updates'}</span>
              {hasLiveData && !isLoading ? (
                <span className="relative flex h-2 w-2 ml-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
                </span>
              ) : (
                <span className="relative flex h-2 w-2 ml-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal" />
                </span>
              )}
            </div>
          </div>
        </div>

        {isLoading && activityLog.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-gray-3">
              <span className="w-5 h-5 border-2 border-teal border-t-transparent rounded-full animate-spin" />
              Loading activity…
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-2">
            {activityLog.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="p-5 hover:bg-gray-1 transition-colors">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getIconColor(activity.color)}`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <p className="text-navy" style={{ fontSize: '15px', fontWeight: '500' }}>
                            {activity.action}
                          </p>
                          <p className="text-gray-3" style={{ fontSize: '13px' }}>
                            {activity.customer}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          {activity.riskScore > 0 && (
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded text-center ${getRiskColor(activity.riskLevel)}`} style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.5px', minWidth: '70px' }}>
                                {activity.riskLevel}
                              </span>
                              <span className="text-navy font-mono" style={{ fontSize: '15px', fontWeight: '600' }}>
                                {activity.riskScore}
                              </span>
                            </div>
                          )}
                          <span className="text-gray-3" style={{ fontSize: '13px' }}>
                            {new Date(activity.timestamp).toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true
                            })}
                          </span>
                          {activity.runId && (
                            <button
                              onClick={() => setActiveRunId(activity.runId)}
                              className="p-1.5 text-gray-3 hover:text-teal hover:bg-teal-light rounded transition-colors"
                              title="Open workflow details"
                            >
                              <ExternalLink size={14} />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2 text-gray-3" style={{ fontSize: '13px' }}>
                          <User className="w-4 h-4" />
                          <span>{activity.agent}</span>
                        </div>
                        {activity.offer && (
                          <>
                            <span className="text-gray-3">•</span>
                            <span className="text-navy" style={{ fontSize: '13px', fontWeight: '500' }}>
                              {activity.offer}
                            </span>
                          </>
                        )}
                        <span className="text-gray-3">•</span>
                        <span className={`px-2 py-0.5 rounded-full text-center ${
                          activity.outcome === 'Success' || activity.outcome === 'Delivered' || activity.outcome === 'Sent'
                            ? 'bg-low-light text-low'
                            : activity.outcome === 'Blocked' || activity.outcome === 'Duplicate'
                            ? 'bg-gray-1 text-gray-3'
                            : 'bg-high-light text-high'
                        }`} style={{ fontSize: '12px', fontWeight: '500' }}>
                          {activity.outcome}
                        </span>
                      </div>

                      <p className="text-gray-3" style={{ fontSize: '13px' }}>
                        {activity.details}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Load More */}
        <div className="p-4 border-t border-gray-2 text-center">
          <button className="px-6 py-2 text-teal hover:bg-teal-light rounded-lg transition-colors" style={{ fontSize: '14px', fontWeight: '500' }}>
            Load More Activity
          </button>
        </div>
      </div>

      {activeRunId && (
        <WorkflowStatusModal
          runId={activeRunId}
          onClose={() => setActiveRunId(null)}
        />
      )}
    </div>
  );
}
