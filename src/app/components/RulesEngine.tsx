import { 
  Plus,
  Search,
  Filter,
  GitBranch,
  Play,
  Pause,
  Copy,
  Edit2,
  MoreVertical,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Target
} from "lucide-react";

const rules = [
  {
    id: 'rule-001',
    name: 'High-Value CRITICAL Customer Fast Track',
    description: 'Auto-approve and send personal outreach for high-LTV critical risk customers',
    status: 'active',
    priority: 1,
    triggers: 2847,
    successRate: 91,
    conditions: [
      { field: 'Churn Risk Score', operator: '≥', value: '85', type: 'CRITICAL' },
      { field: 'Customer LTV', operator: '≥', value: '$2,000', type: 'AND' },
      { field: 'Last Contact', operator: '>', value: '14 days', type: 'AND' }
    ],
    actions: [
      { type: 'Send Offer', value: 'Personal Outreach', icon: Zap },
      { type: 'Auto-Approve', value: 'Skip review queue', icon: CheckCircle2 },
      { type: 'Notify CSM', value: 'High-priority alert', icon: AlertTriangle }
    ],
    lastRun: '2026-04-07T14:32:00Z'
  },
  {
    id: 'rule-002',
    name: 'Session Collapse Intervention',
    description: 'Detect and respond to sudden drops in customer engagement',
    status: 'active',
    priority: 2,
    triggers: 1923,
    successRate: 73,
    conditions: [
      { field: 'GA Sessions (30d)', operator: '<', value: '3', type: 'PRIMARY' },
      { field: 'Previous Avg Sessions', operator: '≥', value: '8', type: 'AND' },
      { field: 'Days Since Last Visit', operator: '≥', value: '21', type: 'AND' },
      { field: 'Loyalty Member', operator: '=', value: 'Yes', type: 'AND' }
    ],
    actions: [
      { type: 'Send Offer', value: 'Double Points', icon: Zap },
      { type: 'Set Risk Level', value: 'HIGH', icon: AlertTriangle },
      { type: 'Add to Segment', value: 'Re-engagement', icon: Target }
    ],
    lastRun: '2026-04-07T13:21:00Z'
  },
  {
    id: 'rule-003',
    name: 'Zero Redemption Loyalty Rescue',
    description: 'Target loyalty members who have never redeemed points',
    status: 'active',
    priority: 3,
    triggers: 3641,
    successRate: 83,
    conditions: [
      { field: 'Loyalty Member', operator: '=', value: 'Yes', type: 'PRIMARY' },
      { field: 'Total Redemptions', operator: '=', value: '0', type: 'AND' },
      { field: 'Points Balance', operator: '>', value: '500', type: 'AND' },
      { field: 'Member Duration', operator: '≥', value: '60 days', type: 'AND' }
    ],
    actions: [
      { type: 'Send Offer', value: 'First Redemption Bonus', icon: Zap },
      { type: 'Set Priority', value: 'Medium', icon: Target },
      { type: 'Schedule Follow-up', value: '+7 days if not redeemed', icon: CheckCircle2 }
    ],
    lastRun: '2026-04-07T11:45:00Z'
  },
  {
    id: 'rule-004',
    name: 'Discount Dependency Detection',
    description: 'Identify customers who only buy with discounts and adjust strategy',
    status: 'active',
    priority: 4,
    triggers: 1456,
    successRate: 62,
    conditions: [
      { field: 'Orders with Discount', operator: '≥', value: '80%', type: 'PRIMARY' },
      { field: 'Total Orders', operator: '≥', value: '5', type: 'AND' },
      { field: 'Avg Discount Used', operator: '≥', value: '15%', type: 'AND' }
    ],
    actions: [
      { type: 'Send Offer', value: 'Personal Outreach (no discount)', icon: Zap },
      { type: 'Add to Segment', value: 'Discount Dependent', icon: Target },
      { type: 'Apply Guardrail', value: 'Limit discount offers', icon: AlertTriangle }
    ],
    lastRun: '2026-04-07T10:12:00Z'
  },
  {
    id: 'rule-005',
    name: 'AOV Decline Early Warning',
    description: 'Catch customers whose average order value is declining',
    status: 'active',
    priority: 5,
    triggers: 892,
    successRate: 68,
    conditions: [
      { field: 'AOV Trend (90d)', operator: 'Declining', value: '> 30%', type: 'PRIMARY' },
      { field: 'Historical AOV', operator: '≥', value: '$150', type: 'AND' },
      { field: 'Current AOV', operator: '<', value: '$105', type: 'AND' }
    ],
    actions: [
      { type: 'Send Offer', value: 'Free Returns Extension', icon: Zap },
      { type: 'Set Risk Level', value: 'HIGH', icon: AlertTriangle },
      { type: 'Notify CSM', value: 'AOV decline alert', icon: AlertTriangle }
    ],
    lastRun: '2026-04-07T09:34:00Z'
  },
  {
    id: 'rule-006',
    name: 'Support Ticket Recovery',
    description: 'Proactive outreach for customers with multiple support issues',
    status: 'paused',
    priority: 6,
    triggers: 234,
    successRate: 71,
    conditions: [
      { field: 'Support Tickets (14d)', operator: '≥', value: '2', type: 'PRIMARY' },
      { field: 'Ticket Sentiment', operator: '=', value: 'Negative', type: 'AND' },
      { field: 'Ticket Resolved', operator: '=', value: 'Yes', type: 'AND' }
    ],
    actions: [
      { type: 'Send Offer', value: 'Personal Apology + Free Returns', icon: Zap },
      { type: 'Escalate to', value: 'Customer Success Team', icon: AlertTriangle },
      { type: 'Add Tag', value: 'Service Recovery', icon: Target }
    ],
    lastRun: '2026-04-05T16:22:00Z'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'text-low bg-low-light';
    case 'paused': return 'text-medium bg-medium-light';
    case 'draft': return 'text-gray-3 bg-gray-1';
    default: return 'text-gray-3 bg-gray-1';
  }
};

const getConditionColor = (type: string) => {
  switch (type) {
    case 'PRIMARY': return 'text-teal bg-teal-light';
    case 'CRITICAL': return 'text-critical bg-critical-light';
    case 'AND': return 'text-gray-3 bg-gray-1';
    default: return 'text-gray-3 bg-gray-1';
  }
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

export function RulesEngine() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-navy mb-1">Rules Engine</h1>
          <p className="text-gray-3" style={{ fontSize: '14px' }}>
            Define conditional logic and automated workflows for retention operations
          </p>
        </div>
        <button className="px-5 py-2 bg-teal text-white rounded-lg hover:bg-teal-mid transition-colors flex items-center gap-2" style={{ fontSize: '14px', fontWeight: '500' }}>
          <Plus className="w-4 h-4" />
          Create Rule
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-3" style={{ fontSize: '13px', fontWeight: '500' }}>Active Rules</p>
            <GitBranch className="w-5 h-5 text-teal" />
          </div>
          <p className="text-navy mb-1" style={{ fontSize: '28px', fontWeight: '600' }}>5</p>
          <p className="text-gray-3" style={{ fontSize: '13px' }}>1 paused, 0 draft</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-3" style={{ fontSize: '13px', fontWeight: '500' }}>Total Triggers (30d)</p>
            <Zap className="w-5 h-5 text-medium" />
          </div>
          <p className="text-navy mb-1" style={{ fontSize: '28px', fontWeight: '600' }}>10,993</p>
          <p className="text-low" style={{ fontSize: '13px' }}>+23% vs last month</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-3" style={{ fontSize: '13px', fontWeight: '500' }}>Avg Success Rate</p>
            <Target className="w-5 h-5 text-low" />
          </div>
          <p className="text-navy mb-1" style={{ fontSize: '28px', fontWeight: '600' }}>75.3%</p>
          <p className="text-low" style={{ fontSize: '13px' }}>Above 70% target</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-3" style={{ fontSize: '13px', fontWeight: '500' }}>Automation Rate</p>
            <CheckCircle2 className="w-5 h-5 text-low" />
          </div>
          <p className="text-navy mb-1" style={{ fontSize: '28px', fontWeight: '600' }}>91%</p>
          <p className="text-gray-3" style={{ fontSize: '13px' }}>Auto-approved actions</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-3" />
            <input
              type="text"
              placeholder="Search rules..."
              className="w-full pl-10 pr-4 py-2 border border-gray-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
              style={{ fontSize: '14px' }}
            />
          </div>
          <select className="px-4 py-2 bg-white border border-gray-2 rounded-lg text-black" style={{ fontSize: '14px' }}>
            <option>All Status</option>
            <option>Active</option>
            <option>Paused</option>
            <option>Draft</option>
          </select>
          <select className="px-4 py-2 bg-white border border-gray-2 rounded-lg text-black" style={{ fontSize: '14px' }}>
            <option>All Priorities</option>
            <option>High Priority</option>
            <option>Medium Priority</option>
            <option>Low Priority</option>
          </select>
          <button className="px-4 py-2 bg-white border border-gray-2 text-navy rounded-lg hover:bg-gray-1 transition-colors flex items-center gap-2" style={{ fontSize: '14px', fontWeight: '500' }}>
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Rules List */}
      <div className="space-y-4">
        {rules.map((rule) => (
          <div key={rule.id} className="bg-white rounded-xl border border-gray-2 overflow-hidden" style={{ boxShadow: 'var(--shadow-l1)' }}>
            {/* Header */}
            <div className="p-5 border-b border-gray-2 bg-gray-1 bg-opacity-30">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-teal-light flex items-center justify-center flex-shrink-0">
                    <GitBranch className="w-5 h-5 text-teal" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-0.5 bg-navy text-white rounded font-mono" style={{ fontSize: '11px', fontWeight: '600' }}>
                        P{rule.priority}
                      </span>
                      <h3 className="text-navy">{rule.name}</h3>
                      <span className={`px-3 py-1 rounded-full ${getStatusColor(rule.status)}`} style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {rule.status}
                      </span>
                    </div>
                    <p className="text-gray-3" style={{ fontSize: '14px' }}>
                      {rule.description}
                    </p>
                  </div>
                </div>

                {/* Stats & Actions */}
                <div className="flex items-center gap-4 ml-6">
                  <div className="text-center px-4 py-2 bg-white rounded-lg border border-gray-2">
                    <p className="text-gray-3 mb-1" style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Triggers
                    </p>
                    <p className="text-navy font-mono" style={{ fontSize: '16px', fontWeight: '600' }}>
                      {rule.triggers.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center px-4 py-2 bg-white rounded-lg border border-gray-2">
                    <p className="text-gray-3 mb-1" style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Success
                    </p>
                    <p className={`font-mono ${rule.successRate >= 70 ? 'text-low' : 'text-navy'}`} style={{ fontSize: '16px', fontWeight: '600' }}>
                      {rule.successRate}%
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {rule.status === 'active' ? (
                      <button className="p-2 hover:bg-gray-2 rounded-lg transition-colors" title="Pause">
                        <Pause className="w-4 h-4 text-gray-3" />
                      </button>
                    ) : (
                      <button className="p-2 hover:bg-gray-2 rounded-lg transition-colors" title="Activate">
                        <Play className="w-4 h-4 text-teal" />
                      </button>
                    )}
                    <button className="p-2 hover:bg-gray-2 rounded-lg transition-colors" title="Edit">
                      <Edit2 className="w-4 h-4 text-gray-3" />
                    </button>
                    <button className="p-2 hover:bg-gray-2 rounded-lg transition-colors" title="Duplicate">
                      <Copy className="w-4 h-4 text-gray-3" />
                    </button>
                    <button className="p-2 hover:bg-gray-2 rounded-lg transition-colors" title="More">
                      <MoreVertical className="w-4 h-4 text-gray-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Rule Logic */}
            <div className="p-5">
              <div className="grid grid-cols-2 gap-6">
                {/* Conditions */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <p className="text-gray-3" style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Conditions (IF)
                    </p>
                  </div>
                  <div className="space-y-2">
                    {rule.conditions.map((condition, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        {idx > 0 && (
                          <span className={`px-2 py-0.5 rounded text-center ${getConditionColor(condition.type)}`} style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.5px' }}>
                            {condition.type}
                          </span>
                        )}
                        <div className="flex-1 px-3 py-2 bg-gray-1 rounded-lg">
                          <p className="text-navy" style={{ fontSize: '13px' }}>
                            <span className="font-mono font-semibold">{condition.field}</span>
                            {' '}<span className="text-gray-3">{condition.operator}</span>{' '}
                            <span className="font-mono font-semibold">{condition.value}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <p className="text-gray-3" style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Actions (THEN)
                    </p>
                  </div>
                  <div className="space-y-2">
                    {rule.actions.map((action, idx) => {
                      const Icon = action.icon;
                      return (
                        <div key={idx} className="flex items-center gap-3 px-3 py-2 bg-teal-light rounded-lg">
                          <Icon className="w-4 h-4 text-teal flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-navy" style={{ fontSize: '13px' }}>
                              <span className="font-semibold">{action.type}:</span> {action.value}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-4 border-t border-gray-2 flex items-center justify-between">
                <span className="text-gray-3" style={{ fontSize: '13px' }}>
                  Last executed {formatTimeAgo(rule.lastRun)}
                </span>
                <button className="px-4 py-2 text-teal hover:bg-teal-light rounded-lg transition-colors" style={{ fontSize: '13px', fontWeight: '500' }}>
                  View Execution History →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Banner */}
      <div className="bg-ai-purple-light border border-ai-purple rounded-xl p-5">
        <div className="flex items-start gap-3">
          <GitBranch className="w-5 h-5 text-ai-purple flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-navy mb-2" style={{ fontSize: '15px', fontWeight: '600' }}>
              Build sophisticated automation workflows
            </p>
            <p className="text-navy" style={{ fontSize: '14px' }}>
              Rules execute automatically in priority order. Each rule evaluates its conditions and triggers actions when matched. 
              Combine multiple conditions with AND logic, and chain multiple actions together. 
              Rules work alongside Guardrails - rules define what <em>should</em> happen, guardrails define what <em>shouldn't</em> happen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
