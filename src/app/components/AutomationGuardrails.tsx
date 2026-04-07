import { 
  Shield, 
  AlertTriangle,
  CheckCircle2,
  XCircle,
  DollarSign,
  Users,
  Mail,
  Clock,
  Target,
  TrendingDown,
  Settings
} from "lucide-react";

const guardrails = [
  {
    id: 'guard-001',
    name: 'Margin Protection',
    category: 'Financial',
    description: 'Block offers that exceed discount thresholds or risk margin erosion',
    icon: DollarSign,
    iconColor: 'critical',
    status: 'active',
    rules: [
      { condition: 'Discount > 20%', action: 'Block and alert', enabled: true },
      { condition: 'Cumulative discount (30d) > $500', action: 'Require approval', enabled: true },
      { condition: 'Margin < 15%', action: 'Block offer', enabled: true }
    ],
    triggers: {
      total: 847,
      blocked: 234,
      approved: 613
    },
    lastTriggered: '2026-04-07T12:15:00Z'
  },
  {
    id: 'guard-002',
    name: 'Communication Frequency Cap',
    category: 'Customer Experience',
    description: 'Prevent over-communication and customer fatigue',
    icon: Mail,
    iconColor: 'high',
    status: 'active',
    rules: [
      { condition: 'More than 2 emails in 7 days', action: 'Block send', enabled: true },
      { condition: 'Already received offer in 14 days', action: 'Skip customer', enabled: true },
      { condition: 'Unsubscribe risk score > 80', action: 'Reduce frequency', enabled: true }
    ],
    triggers: {
      total: 1456,
      blocked: 1203,
      approved: 253
    },
    lastTriggered: '2026-04-07T14:22:00Z'
  },
  {
    id: 'guard-003',
    name: 'Segment Eligibility',
    category: 'Targeting',
    description: 'Ensure offers only go to appropriate customer segments',
    icon: Users,
    iconColor: 'medium',
    status: 'active',
    rules: [
      { condition: 'LTV < $500 + discount > 15%', action: 'Block offer', enabled: true },
      { condition: 'Not in loyalty program + loyalty offer', action: 'Skip customer', enabled: true },
      { condition: 'VIP customer + generic offer', action: 'Escalate to CSM', enabled: true }
    ],
    triggers: {
      total: 623,
      blocked: 387,
      approved: 236
    },
    lastTriggered: '2026-04-07T13:42:00Z'
  },
  {
    id: 'guard-004',
    name: 'Timing & Cadence',
    category: 'Customer Experience',
    description: 'Optimize send times and respect customer preferences',
    icon: Clock,
    iconColor: 'teal',
    status: 'active',
    rules: [
      { condition: 'Send time outside 8 AM - 8 PM', action: 'Delay to next window', enabled: true },
      { condition: 'Customer in different timezone', action: 'Adjust for local time', enabled: true },
      { condition: 'Holiday or weekend (B2B)', action: 'Delay to Monday', enabled: false }
    ],
    triggers: {
      total: 2847,
      blocked: 0,
      approved: 2847
    },
    lastTriggered: '2026-04-07T14:32:00Z'
  },
  {
    id: 'guard-005',
    name: 'Duplicate Prevention',
    category: 'Efficiency',
    description: 'Prevent sending duplicate or conflicting offers',
    icon: Target,
    iconColor: 'ai-purple',
    status: 'active',
    rules: [
      { condition: 'Customer in multiple campaigns', action: 'Send highest priority only', enabled: true },
      { condition: 'Identical offer sent < 30 days', action: 'Block duplicate', enabled: true },
      { condition: 'Conflicting offers queued', action: 'Merge or prioritize', enabled: true }
    ],
    triggers: {
      total: 1842,
      blocked: 1456,
      approved: 386
    },
    lastTriggered: '2026-04-07T11:58:00Z'
  },
  {
    id: 'guard-006',
    name: 'Risk Score Validation',
    category: 'Data Quality',
    description: 'Ensure churn risk scores are reliable before acting',
    icon: AlertTriangle,
    iconColor: 'high',
    status: 'active',
    rules: [
      { condition: 'Risk score changed > 30 pts in 24h', action: 'Require human review', enabled: true },
      { condition: 'Data freshness > 48 hours', action: 'Block until updated', enabled: true },
      { condition: 'Missing critical signals (> 2)', action: 'Flag low confidence', enabled: true }
    ],
    triggers: {
      total: 342,
      blocked: 127,
      approved: 215
    },
    lastTriggered: '2026-04-07T10:34:00Z'
  }
];

const getIconColor = (color: string) => {
  const colorMap: Record<string, string> = {
    'critical': 'text-critical bg-critical-light',
    'high': 'text-high bg-high-light',
    'medium': 'text-medium bg-medium-light',
    'teal': 'text-teal bg-teal-light',
    'ai-purple': 'text-ai-purple bg-ai-purple-light',
    'low': 'text-low bg-low-light'
  };
  return colorMap[color] || 'text-gray-3 bg-gray-1';
};

const getCategoryColor = (category: string) => {
  const colorMap: Record<string, string> = {
    'Financial': 'text-critical bg-critical-light',
    'Customer Experience': 'text-teal bg-teal-light',
    'Targeting': 'text-medium bg-medium-light',
    'Efficiency': 'text-ai-purple bg-ai-purple-light',
    'Data Quality': 'text-high bg-high-light'
  };
  return colorMap[category] || 'text-gray-3 bg-gray-1';
};

const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
};

export function AutomationGuardrails() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-navy mb-1">Automation & Guardrails</h1>
          <p className="text-gray-3" style={{ fontSize: '14px' }}>
            Safety rules and constraints that protect customers and business objectives
          </p>
        </div>
        <button className="px-5 py-2 bg-teal text-white rounded-lg hover:bg-teal-mid transition-colors flex items-center gap-2" style={{ fontSize: '14px', fontWeight: '500' }}>
          <Shield className="w-4 h-4" />
          Create Guardrail
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-3" style={{ fontSize: '13px', fontWeight: '500' }}>Active Guardrails</p>
            <Shield className="w-5 h-5 text-teal" />
          </div>
          <p className="text-navy mb-1" style={{ fontSize: '28px', fontWeight: '600' }}>6</p>
          <p className="text-gray-3" style={{ fontSize: '13px' }}>18 rules configured</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-3" style={{ fontSize: '13px', fontWeight: '500' }}>Triggers (30d)</p>
            <AlertTriangle className="w-5 h-5 text-high" />
          </div>
          <p className="text-navy mb-1" style={{ fontSize: '28px', fontWeight: '600' }}>7,957</p>
          <p className="text-gray-3" style={{ fontSize: '13px' }}>Avg 265/day</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-3" style={{ fontSize: '13px', fontWeight: '500' }}>Blocked Actions</p>
            <XCircle className="w-5 h-5 text-critical" />
          </div>
          <p className="text-navy mb-1" style={{ fontSize: '28px', fontWeight: '600' }}>3,407</p>
          <p className="text-critical" style={{ fontSize: '13px' }}>42.8% blocked</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-3" style={{ fontSize: '13px', fontWeight: '500' }}>Protected Value</p>
            <DollarSign className="w-5 h-5 text-low" />
          </div>
          <p className="text-navy mb-1" style={{ fontSize: '28px', fontWeight: '600' }}>$127K</p>
          <p className="text-low" style={{ fontSize: '13px' }}>Margin protected</p>
        </div>
      </div>

      {/* Guardrails List */}
      <div className="space-y-4">
        {guardrails.map((guardrail) => {
          const Icon = guardrail.icon;
          const activeRules = guardrail.rules.filter(r => r.enabled).length;
          const totalRules = guardrail.rules.length;
          const blockRate = guardrail.triggers.total > 0 
            ? ((guardrail.triggers.blocked / guardrail.triggers.total) * 100).toFixed(1)
            : '0.0';

          return (
            <div key={guardrail.id} className="bg-white rounded-xl border border-gray-2 overflow-hidden" style={{ boxShadow: 'var(--shadow-l1)' }}>
              {/* Header */}
              <div className="p-5 border-b border-gray-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getIconColor(guardrail.iconColor)}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-navy">{guardrail.name}</h3>
                        <span className={`px-2 py-1 rounded ${getCategoryColor(guardrail.category)}`} style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.5px' }}>
                          {guardrail.category}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-low-light text-low" style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          {guardrail.status}
                        </span>
                      </div>
                      <p className="text-gray-3 mb-3" style={{ fontSize: '14px' }}>
                        {guardrail.description}
                      </p>
                      <div className="flex items-center gap-6 text-gray-3" style={{ fontSize: '13px' }}>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{activeRules} of {totalRules} rules active</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>Last triggered {formatTimeAgo(guardrail.lastTriggered)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 ml-6">
                    <div className="text-center px-4 py-2 bg-gray-1 rounded-lg">
                      <p className="text-gray-3 mb-1" style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Triggers
                      </p>
                      <p className="text-navy font-mono" style={{ fontSize: '18px', fontWeight: '600' }}>
                        {guardrail.triggers.total.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-center px-4 py-2 bg-critical-light rounded-lg">
                      <p className="text-gray-3 mb-1" style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Blocked
                      </p>
                      <p className="text-critical font-mono" style={{ fontSize: '18px', fontWeight: '600' }}>
                        {guardrail.triggers.blocked.toLocaleString()}
                      </p>
                      <p className="text-critical" style={{ fontSize: '11px' }}>
                        {blockRate}%
                      </p>
                    </div>
                    <div className="text-center px-4 py-2 bg-low-light rounded-lg">
                      <p className="text-gray-3 mb-1" style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Approved
                      </p>
                      <p className="text-low font-mono" style={{ fontSize: '18px', fontWeight: '600' }}>
                        {guardrail.triggers.approved.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rules */}
              <div className="divide-y divide-gray-2">
                {guardrail.rules.map((rule, idx) => (
                  <div key={idx} className="px-5 py-4 hover:bg-gray-1 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${rule.enabled ? 'bg-low text-white' : 'bg-gray-2 text-gray-3'}`}>
                          {rule.enabled ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <XCircle className="w-4 h-4" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <p className="text-navy" style={{ fontSize: '14px', fontWeight: '500' }}>
                              IF: {rule.condition}
                            </p>
                            <span className="text-gray-3">→</span>
                            <p className="text-gray-3" style={{ fontSize: '14px' }}>
                              THEN: {rule.action}
                            </p>
                          </div>
                        </div>
                      </div>
                      <button className="px-4 py-2 text-gray-3 hover:bg-gray-2 rounded-lg transition-colors flex items-center gap-2" style={{ fontSize: '13px', fontWeight: '500' }}>
                        <Settings className="w-4 h-4" />
                        Configure
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Banner */}
      <div className="bg-teal-light border border-teal rounded-xl p-5">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-navy mb-2" style={{ fontSize: '15px', fontWeight: '600' }}>
              Guardrails are your safety net
            </p>
            <p className="text-navy" style={{ fontSize: '14px' }}>
              These automated rules protect against common risks like margin erosion, customer fatigue, and poor targeting. 
              They run continuously in the background and can block, delay, or escalate actions that don't meet your criteria. 
              Review the Rules Engine to create custom conditional logic for more complex scenarios.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
