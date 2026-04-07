import { 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  DollarSign,
  Users,
  Mail,
  TrendingUp,
  Edit2,
  Plus,
  Archive,
  BarChart3,
  Sparkles,
  AlertCircle
} from "lucide-react";
import { useState } from "react";

interface Guardrail {
  id: string;
  name: string;
  category: 'budget' | 'customer' | 'campaign' | 'compliance' | 'approval';
  status: 'active' | 'warning' | 'inactive';
  threshold: string;
  current: string;
  utilization: number;
  lastTriggered?: string;
  triggerCount: number;
  description: string;
}

interface Violation {
  id: string;
  guardrailId: string;
  guardrailName: string;
  timestamp: string;
  severity: 'critical' | 'high' | 'medium';
  action: string;
  outcome: string;
  details: string;
}

const guardrails: Guardrail[] = [
  {
    id: 'GR-001',
    name: 'Monthly Campaign Budget Cap',
    category: 'budget',
    status: 'warning',
    threshold: '$50,000',
    current: '$44,500',
    utilization: 89,
    lastTriggered: '2 days ago',
    triggerCount: 3,
    description: 'Prevents monthly spend from exceeding approved budget allocation'
  },
  {
    id: 'GR-002',
    name: 'Minimum Manual Approval Score',
    category: 'approval',
    status: 'active',
    threshold: '≥85 composite',
    current: 'N/A',
    utilization: 0,
    triggerCount: 47,
    description: 'Requires human approval for any customer with composite score 85 or higher'
  },
  {
    id: 'GR-003',
    name: 'Maximum Discount Value',
    category: 'campaign',
    status: 'active',
    threshold: '$200 per offer',
    current: 'N/A',
    utilization: 0,
    lastTriggered: '12 days ago',
    triggerCount: 8,
    description: 'Caps individual discount offers to prevent excessive spend on single customers'
  },
  {
    id: 'GR-004',
    name: 'Contact Frequency Limit',
    category: 'customer',
    status: 'active',
    threshold: '3 emails/week',
    current: 'N/A',
    utilization: 0,
    triggerCount: 124,
    description: 'Prevents over-communication with individual customers to avoid fatigue'
  },
  {
    id: 'GR-005',
    name: 'Minimum Customer Lifetime Value',
    category: 'customer',
    status: 'active',
    threshold: '≥$500 LTV',
    current: 'N/A',
    utilization: 0,
    triggerCount: 89,
    description: 'Only targets customers meeting minimum lifetime value threshold'
  },
  {
    id: 'GR-006',
    name: 'Campaign Send Volume Limit',
    category: 'campaign',
    status: 'active',
    threshold: '2,000/day',
    current: '1,247',
    utilization: 62,
    triggerCount: 2,
    description: 'Limits daily campaign sends to maintain deliverability and compliance'
  },
  {
    id: 'GR-007',
    name: 'Offer Stack Prevention',
    category: 'compliance',
    status: 'active',
    threshold: '1 active offer',
    current: 'N/A',
    utilization: 0,
    triggerCount: 34,
    description: 'Prevents customers from receiving multiple simultaneous offers'
  },
  {
    id: 'GR-008',
    name: 'Redemption Window Minimum',
    category: 'compliance',
    status: 'active',
    threshold: '≥7 days',
    current: 'N/A',
    utilization: 0,
    triggerCount: 0,
    description: 'Ensures all offers have minimum 7-day redemption window'
  },
  {
    id: 'GR-009',
    name: 'Weekly Review Budget',
    category: 'budget',
    status: 'active',
    threshold: '$12,500',
    current: '$8,340',
    utilization: 67,
    triggerCount: 1,
    description: 'Weekly spend cap with automatic pause if exceeded'
  },
  {
    id: 'GR-010',
    name: 'Excluded Segment Protection',
    category: 'compliance',
    status: 'active',
    threshold: '0 sends',
    current: '0',
    utilization: 0,
    lastTriggered: '4 days ago',
    triggerCount: 3,
    description: 'Blocks campaigns to customers in exclusion list (VIP, suppression, etc.)'
  }
];

const recentViolations: Violation[] = [
  {
    id: 'V-142',
    guardrailId: 'GR-001',
    guardrailName: 'Monthly Campaign Budget Cap',
    timestamp: '2 days ago',
    severity: 'high',
    action: 'Campaign pause triggered',
    outcome: 'Held for review',
    details: 'Attempted to launch "Spring Refresh" campaign ($6,200) which would exceed monthly budget. Campaign held in queue.'
  },
  {
    id: 'V-141',
    guardrailId: 'GR-010',
    guardrailName: 'Excluded Segment Protection',
    timestamp: '4 days ago',
    severity: 'critical',
    action: 'Brief blocked',
    outcome: 'Prevented',
    details: 'Attempted to send offer to customer #SC-00291 who is in VIP exclusion segment. Brief automatically cancelled.'
  },
  {
    id: 'V-140',
    guardrailId: 'GR-004',
    guardrailName: 'Contact Frequency Limit',
    timestamp: '5 days ago',
    severity: 'medium',
    action: 'Send delayed 48h',
    outcome: 'Rescheduled',
    details: '18 customers hit 3-email weekly limit. Briefs automatically rescheduled to next eligibility window.'
  },
  {
    id: 'V-139',
    guardrailId: 'GR-007',
    guardrailName: 'Offer Stack Prevention',
    timestamp: '1 week ago',
    severity: 'medium',
    action: 'Brief cancelled',
    outcome: 'Prevented',
    details: '12 customers already had active offers. New brief generation blocked until existing offers expire or redeem.'
  },
  {
    id: 'V-138',
    guardrailId: 'GR-003',
    guardrailName: 'Maximum Discount Value',
    timestamp: '12 days ago',
    severity: 'high',
    action: 'Discount capped',
    outcome: 'Modified',
    details: 'Agent proposed $250 offer for customer #ML-00445. Auto-adjusted to $200 maximum per policy.'
  }
];

const categoryConfig = {
  budget: { icon: DollarSign, color: 'text-high', bgColor: 'bg-high-light', label: 'Budget' },
  customer: { icon: Users, color: 'text-teal', bgColor: 'bg-teal-light', label: 'Customer' },
  campaign: { icon: Mail, color: 'text-ai-purple', bgColor: 'bg-ai-purple-light', label: 'Campaign' },
  compliance: { icon: Shield, color: 'text-navy', bgColor: 'bg-navy/10', label: 'Compliance' },
  approval: { icon: CheckCircle2, color: 'text-low', bgColor: 'bg-low-light', label: 'Approval' }
};

export function GuardrailSettings() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'rules' | 'violations'>('rules');

  const filteredGuardrails = selectedCategory === 'all' 
    ? guardrails 
    : guardrails.filter(g => g.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-navy mb-1">Guardrail Settings</h1>
          <p className="text-gray-3" style={{ fontSize: '14px' }}>
            Safety rules and compliance controls for agent automation
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-gray-2 text-navy rounded-lg hover:bg-gray-1 transition-colors flex items-center gap-2" style={{ fontSize: '14px', fontWeight: '500' }}>
            <BarChart3 size={16} />
            View Analytics
          </button>
          <button className="px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal-mid transition-colors flex items-center gap-2" style={{ fontSize: '14px', fontWeight: '500' }}>
            <Plus size={16} />
            New Guardrail
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-5 gap-4">
        <StatCard
          label="Active Rules"
          value="10"
          trend="+1 this month"
          icon={Shield}
          color="teal"
        />
        <StatCard
          label="Total Triggers (30d)"
          value="311"
          trend="vs 287 last mo"
          icon={AlertTriangle}
          color="high"
        />
        <StatCard
          label="Prevented Actions"
          value="156"
          trend="50% of triggers"
          icon={CheckCircle2}
          color="low"
        />
        <StatCard
          label="Avg Response Time"
          value="<100ms"
          trend="real-time"
          icon={Clock}
          color="navy"
        />
        <StatCard
          label="Budget Utilization"
          value="89%"
          trend="$44.5K / $50K"
          icon={DollarSign}
          color="high"
        />
      </div>

      {/* View Toggle & Category Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('rules')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'rules'
                ? 'bg-navy text-white'
                : 'bg-white border border-gray-2 text-navy hover:bg-gray-1'
            }`}
            style={{ fontSize: '14px', fontWeight: '500' }}
          >
            Active Rules
          </button>
          <button
            onClick={() => setViewMode('violations')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'violations'
                ? 'bg-navy text-white'
                : 'bg-white border border-gray-2 text-navy hover:bg-gray-1'
            }`}
            style={{ fontSize: '14px', fontWeight: '500' }}
          >
            Recent Triggers
          </button>
        </div>

        {viewMode === 'rules' && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-navy text-white'
                  : 'bg-white border border-gray-2 text-navy hover:bg-gray-1'
              }`}
              style={{ fontSize: '13px', fontWeight: '500' }}
            >
              All
            </button>
            {Object.entries(categoryConfig).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                  selectedCategory === key
                    ? 'bg-navy text-white'
                    : 'bg-white border border-gray-2 text-navy hover:bg-gray-1'
                }`}
                style={{ fontSize: '13px', fontWeight: '500' }}
              >
                <config.icon size={14} />
                {config.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      {viewMode === 'rules' ? (
        <div className="space-y-4">
          {filteredGuardrails.map((guardrail) => (
            <GuardrailCard key={guardrail.id} guardrail={guardrail} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {recentViolations.map((violation) => (
            <ViolationCard key={violation.id} violation={violation} />
          ))}
        </div>
      )}

      {/* AI Recommendations */}
      <div className="bg-ai-purple-light border border-ai-purple/20 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={18} className="text-ai-purple" />
          <h3 className="text-ai-purple">AI Recommendations</h3>
        </div>
        <div className="space-y-3">
          <AIRecommendation
            text="Budget cap triggered 3× in last 2 weeks. Consider increasing monthly allocation to $60K or tightening offer values."
            confidence={92}
          />
          <AIRecommendation
            text="Contact frequency rule prevented 124 sends. Success rate improves when spacing is 5 days vs 3 days minimum."
            confidence={87}
          />
          <AIRecommendation
            text="Zero violations on Redemption Window Minimum in 90 days. This rule may be redundant with current workflow."
            confidence={78}
          />
        </div>
      </div>
    </div>
  );
}

function GuardrailCard({ guardrail }: { guardrail: Guardrail }) {
  const config = categoryConfig[guardrail.category];
  const Icon = config.icon;

  return (
    <div className="bg-white border border-gray-2 rounded-xl p-6 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div className={`p-2 rounded-lg ${config.bgColor}`}>
            <Icon size={20} className={config.color} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-navy" style={{ fontSize: '16px', fontWeight: '600' }}>
                {guardrail.name}
              </h3>
              <span className={`px-2 py-0.5 rounded text-xs font-medium uppercase ${
                guardrail.status === 'active' 
                  ? 'bg-low-light text-low' 
                  : guardrail.status === 'warning'
                  ? 'bg-high-light text-high'
                  : 'bg-gray-1 text-gray-3'
              }`} style={{ fontSize: '10px', letterSpacing: '0.5px' }}>
                {guardrail.status}
              </span>
            </div>
            <p className="text-gray-3 mb-3" style={{ fontSize: '13px' }}>
              {guardrail.description}
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-gray-3 mb-1" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Threshold
                </div>
                <div className="text-navy font-mono" style={{ fontSize: '14px', fontWeight: '600' }}>
                  {guardrail.threshold}
                </div>
              </div>
              <div>
                <div className="text-gray-3 mb-1" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Current
                </div>
                <div className="text-navy font-mono" style={{ fontSize: '14px', fontWeight: '600' }}>
                  {guardrail.current}
                </div>
              </div>
              <div>
                <div className="text-gray-3 mb-1" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Triggers (30d)
                </div>
                <div className="text-navy font-mono" style={{ fontSize: '14px', fontWeight: '600' }}>
                  {guardrail.triggerCount}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <button className="p-2 text-gray-3 hover:text-navy hover:bg-gray-1 rounded-lg transition-colors">
            <Edit2 size={16} />
          </button>
          <button className="p-2 text-gray-3 hover:text-navy hover:bg-gray-1 rounded-lg transition-colors">
            <Archive size={16} />
          </button>
        </div>
      </div>

      {/* Utilization Bar (if applicable) */}
      {guardrail.utilization > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-3" style={{ fontSize: '12px' }}>Utilization</span>
            <span className={`font-mono font-bold ${
              guardrail.utilization >= 90 ? 'text-critical' :
              guardrail.utilization >= 75 ? 'text-high' :
              'text-teal'
            }`} style={{ fontSize: '13px' }}>
              {guardrail.utilization}%
            </span>
          </div>
          <div className="w-full bg-gray-1 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all ${
                guardrail.utilization >= 90 ? 'bg-critical' :
                guardrail.utilization >= 75 ? 'bg-high' :
                'bg-teal'
              }`}
              style={{ width: `${guardrail.utilization}%` }}
            />
          </div>
          {guardrail.lastTriggered && (
            <div className="flex items-center gap-1 mt-2 text-gray-3" style={{ fontSize: '11px' }}>
              <Clock size={12} />
              Last triggered: {guardrail.lastTriggered}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ViolationCard({ violation }: { violation: Violation }) {
  return (
    <div className={`bg-white border-l-4 rounded-xl p-6 ${
      violation.severity === 'critical' ? 'border-critical' :
      violation.severity === 'high' ? 'border-high' :
      'border-medium'
    } shadow-sm hover:shadow-md transition-all`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          <div className={`p-2 rounded-lg ${
            violation.severity === 'critical' ? 'bg-critical-light' :
            violation.severity === 'high' ? 'bg-high-light' :
            'bg-medium-light'
          }`}>
            <AlertTriangle size={18} className={
              violation.severity === 'critical' ? 'text-critical' :
              violation.severity === 'high' ? 'text-high' :
              'text-medium'
            } />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-navy" style={{ fontSize: '15px', fontWeight: '600' }}>
                {violation.guardrailName}
              </h3>
              <span className={`px-2 py-0.5 rounded text-xs font-medium uppercase ${
                violation.severity === 'critical' ? 'bg-critical-light text-critical' :
                violation.severity === 'high' ? 'bg-high-light text-high' :
                'bg-medium-light text-medium'
              }`} style={{ fontSize: '10px', letterSpacing: '0.5px' }}>
                {violation.severity}
              </span>
            </div>
            <p className="text-black mb-2" style={{ fontSize: '13px' }}>
              {violation.details}
            </p>
            <div className="flex items-center gap-4 text-gray-3" style={{ fontSize: '12px' }}>
              <div className="flex items-center gap-1">
                <Clock size={12} />
                {violation.timestamp}
              </div>
              <div className="flex items-center gap-1">
                <Shield size={12} />
                Action: {violation.action}
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 size={12} />
                Outcome: {violation.outcome}
              </div>
            </div>
          </div>
        </div>
        <div className="text-gray-3 font-mono" style={{ fontSize: '11px' }}>
          {violation.id}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, trend, icon: Icon, color }: {
  label: string;
  value: string;
  trend: string;
  icon: any;
  color: string;
}) {
  const colorClasses = {
    teal: 'text-teal bg-teal-light',
    high: 'text-high bg-high-light',
    low: 'text-low bg-low-light',
    navy: 'text-navy bg-navy/10'
  };

  return (
    <div className="bg-white border border-gray-2 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="text-gray-3" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {label}
        </div>
        <div className={`p-1.5 rounded ${colorClasses[color as keyof typeof colorClasses]}`}>
          <Icon size={14} />
        </div>
      </div>
      <div className="text-navy font-mono mb-1" style={{ fontSize: '24px', fontWeight: '700', lineHeight: '1' }}>
        {value}
      </div>
      <div className="text-gray-3" style={{ fontSize: '11px' }}>
        {trend}
      </div>
    </div>
  );
}

function AIRecommendation({ text, confidence }: { text: string; confidence: number }) {
  return (
    <div className="bg-white/80 rounded-lg p-4">
      <div className="flex gap-2 mb-2">
        <Sparkles size={14} className="text-ai-purple flex-shrink-0 mt-0.5" />
        <p className="text-black flex-1" style={{ fontSize: '13px', lineHeight: '1.5' }}>{text}</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-gray-3" style={{ fontSize: '11px' }}>Confidence:</div>
          <div className="w-24 bg-white rounded-full h-1.5">
            <div 
              className="h-1.5 rounded-full bg-ai-purple"
              style={{ width: `${confidence}%` }}
            />
          </div>
          <span className="text-ai-purple font-mono font-bold" style={{ fontSize: '11px' }}>
            {confidence}%
          </span>
        </div>
        <button className="text-ai-purple hover:underline" style={{ fontSize: '12px', fontWeight: '500' }}>
          Review →
        </button>
      </div>
    </div>
  );
}
