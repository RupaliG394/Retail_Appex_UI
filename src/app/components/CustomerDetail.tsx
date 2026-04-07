import { useState } from "react";
import { useParams, Link } from "react-router";
import {
  ChevronLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  Star,
  Send,
  FileText,
  Activity
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { WorkflowStatusModal } from "./WorkflowStatusModal";
import { useTriggerWorkflow } from "../hooks/useWorkflow";

// Mock customer data - in real app this would come from API
const customerData = {
  id: 'SC-00291',
  name: 'Sam Chen',
  email: 'sam.chen@email.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  joinDate: '2024-03-15',
  currentRiskScore: 91,
  previousRiskScore: 72,
  riskLevel: 'CRITICAL',
  ltv: 2847,
  totalOrders: 24,
  avgOrderValue: 142,
  lastPurchase: '2026-02-18',
  loyaltyMember: true,
  loyaltyPoints: 3450,
  redemptions: 3,
  segment: 'High Value',
  churnSignals: [
    { signal: 'GA Sessions Collapsed', severity: 'CRITICAL', detected: '2026-04-01', detail: 'From 12 to 1 session in 30d' },
    { signal: 'Zero Redemptions (60d)', severity: 'HIGH', detected: '2026-03-28', detail: 'Has 3,450 unused points' },
    { signal: 'Purchase Frequency Down', severity: 'MEDIUM', detected: '2026-03-15', detail: '45 days since last order' }
  ],
  interventions: [
    {
      date: '2026-04-07T14:32:00Z',
      type: 'Brief Sent',
      offer: 'Personal Outreach',
      status: 'Delivered',
      result: 'Opened (2m after send)',
      agent: 'AI Agent'
    },
    {
      date: '2026-04-07T14:18:00Z',
      type: 'Alert Generated',
      offer: null,
      status: 'Pending Review',
      result: 'Risk score increased 72 → 91',
      agent: 'AI Agent'
    },
    {
      date: '2026-03-12T10:45:00Z',
      type: 'Brief Sent',
      offer: 'Double Points',
      status: 'Delivered',
      result: 'No engagement',
      agent: 'AI Agent'
    }
  ],
  purchaseHistory: [
    { month: 'Oct 25', orders: 3, aov: 156, total: 468 },
    { month: 'Nov', orders: 4, aov: 142, total: 568 },
    { month: 'Dec', orders: 5, aov: 178, total: 890 },
    { month: 'Jan 26', orders: 2, aov: 134, total: 268 },
    { month: 'Feb', orders: 1, aov: 98, total: 98 },
    { month: 'Mar', orders: 0, aov: 0, total: 0 }
  ],
  engagementTrend: [
    { month: 'Oct', sessions: 12, emails: 8, redemptions: 1 },
    { month: 'Nov', sessions: 14, emails: 9, redemptions: 1 },
    { month: 'Dec', sessions: 15, emails: 12, redemptions: 1 },
    { month: 'Jan', sessions: 8, emails: 6, redemptions: 0 },
    { month: 'Feb', sessions: 3, emails: 2, redemptions: 0 },
    { month: 'Mar', sessions: 1, emails: 1, redemptions: 0 }
  ]
};

const getRiskColor = (level: string) => {
  switch (level) {
    case 'CRITICAL': return 'text-critical bg-critical-light';
    case 'HIGH': return 'text-high bg-high-light';
    case 'MEDIUM': return 'text-medium bg-medium-light';
    case 'LOW': return 'text-low bg-low-light';
    default: return 'text-gray-3 bg-gray-1';
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

export function CustomerDetail() {
  const { id } = useParams();
  const customer = customerData; // In real app, fetch by ID
  const { trigger, isLoading: isTriggering } = useTriggerWorkflow();
  const [activeRunId, setActiveRunId] = useState<string | null>(null);

  const handleTriggerBrief = async () => {
    const runId = await trigger(customer.id);
    if (runId) setActiveRunId(runId);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Link
        to="/customers"
        className="inline-flex items-center gap-2 text-teal hover:text-teal-mid transition-colors"
        style={{ fontSize: '14px', fontWeight: '500' }}
      >
        <ChevronLeft size={16} />
        Customer List
      </Link>

      {/* Header Card */}
      <div className="bg-white rounded-xl border border-gray-2 p-6" style={{ boxShadow: 'var(--shadow-l1)' }}>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-6 flex-1">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-xl bg-teal-light flex items-center justify-center flex-shrink-0">
              <span className="text-teal" style={{ fontSize: '28px', fontWeight: '600' }}>
                {customer.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-navy">{customer.name}</h1>
                <span className={`px-3 py-1 rounded ${getRiskColor(customer.riskLevel)}`} style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '0.5px' }}>
                  {customer.riskLevel}
                </span>
                {customer.loyaltyMember && (
                  <span className="px-3 py-1 rounded bg-ai-purple-light text-ai-purple" style={{ fontSize: '12px', fontWeight: '600' }}>
                    <Star className="w-3 h-3 inline mr-1" />
                    LOYALTY MEMBER
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-6 text-gray-3" style={{ fontSize: '14px' }}>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{customer.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {formatDate(customer.joinDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Last order: {formatDate(customer.lastPurchase)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  <span>Customer ID: {customer.id}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Score */}
          <div className="text-center px-6 py-4 bg-critical-light rounded-xl">
            <p className="text-gray-3 mb-2" style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Churn Risk Score
            </p>
            <div className="flex items-center justify-center gap-2 mb-2">
              <p className="text-critical font-mono" style={{ fontSize: '48px', fontWeight: '700', lineHeight: '1' }}>
                {customer.currentRiskScore}
              </p>
              <div className="flex flex-col items-start">
                <TrendingUp className="w-5 h-5 text-critical" />
                <span className="text-critical" style={{ fontSize: '14px', fontWeight: '600' }}>
                  +{customer.currentRiskScore - customer.previousRiskScore}
                </span>
              </div>
            </div>
            <p className="text-gray-3" style={{ fontSize: '12px' }}>
              Up from {customer.previousRiskScore} last week
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-3" style={{ fontSize: '13px', fontWeight: '500' }}>Lifetime Value</p>
            <DollarSign className="w-5 h-5 text-teal" />
          </div>
          <p className="text-navy mb-1" style={{ fontSize: '28px', fontWeight: '600' }}>
            ${customer.ltv.toLocaleString()}
          </p>
          <p className="text-gray-3" style={{ fontSize: '13px' }}>Top 15% of customers</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-3" style={{ fontSize: '13px', fontWeight: '500' }}>Total Orders</p>
            <ShoppingCart className="w-5 h-5 text-teal" />
          </div>
          <p className="text-navy mb-1" style={{ fontSize: '28px', fontWeight: '600' }}>
            {customer.totalOrders}
          </p>
          <p className="text-gray-3" style={{ fontSize: '13px' }}>Avg ${customer.avgOrderValue} per order</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-3" style={{ fontSize: '13px', fontWeight: '500' }}>Loyalty Points</p>
            <Star className="w-5 h-5 text-ai-purple" />
          </div>
          <p className="text-navy mb-1" style={{ fontSize: '28px', fontWeight: '600' }}>
            {customer.loyaltyPoints.toLocaleString()}
          </p>
          <p className="text-gray-3" style={{ fontSize: '13px' }}>{customer.redemptions} redemptions total</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-3" style={{ fontSize: '13px', fontWeight: '500' }}>Segment</p>
            <Activity className="w-5 h-5 text-teal" />
          </div>
          <p className="text-navy mb-1" style={{ fontSize: '28px', fontWeight: '600' }}>
            {customer.segment}
          </p>
          <p className="text-gray-3" style={{ fontSize: '13px' }}>Premium tier</p>
        </div>
      </div>

      {/* Churn Signals */}
      <div className="bg-white rounded-xl border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
        <div className="p-5 border-b border-gray-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-critical" />
            <h3 className="text-navy">Active Churn Signals</h3>
          </div>
        </div>
        <div className="divide-y divide-gray-2">
          {customer.churnSignals.map((signal, idx) => (
            <div key={idx} className="p-5 hover:bg-gray-1 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-navy">{signal.signal}</h3>
                    <span className={`px-2 py-1 rounded ${getRiskColor(signal.severity)}`} style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.5px' }}>
                      {signal.severity}
                    </span>
                  </div>
                  <p className="text-gray-3 mb-2" style={{ fontSize: '14px' }}>
                    {signal.detail}
                  </p>
                  <p className="text-gray-3" style={{ fontSize: '13px' }}>
                    Detected {formatDate(signal.detected)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6">
        {/* Purchase History */}
        <div className="bg-white rounded-xl border border-gray-2 p-6" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <h3 className="text-navy mb-4">Purchase History</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={customer.purchaseHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D0D5DD" />
              <XAxis
                dataKey="month"
                tick={{ fill: '#8896A7', fontSize: 12 }}
                stroke="#D0D5DD"
              />
              <YAxis
                tick={{ fill: '#8896A7', fontSize: 12 }}
                stroke="#D0D5DD"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D0D5DD',
                  borderRadius: '8px',
                  fontSize: '13px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '13px' }} />
              <Bar dataKey="orders" fill="#006D77" name="Orders" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Engagement Trend */}
        <div className="bg-white rounded-xl border border-gray-2 p-6" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <h3 className="text-navy mb-4">Engagement Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={customer.engagementTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D0D5DD" />
              <XAxis
                dataKey="month"
                tick={{ fill: '#8896A7', fontSize: 12 }}
                stroke="#D0D5DD"
              />
              <YAxis
                tick={{ fill: '#8896A7', fontSize: 12 }}
                stroke="#D0D5DD"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D0D5DD',
                  borderRadius: '8px',
                  fontSize: '13px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '13px' }} />
              <Line
                type="monotone"
                dataKey="sessions"
                stroke="#006D77"
                strokeWidth={2}
                name="Sessions"
              />
              <Line
                type="monotone"
                dataKey="emails"
                stroke="#7C3AED"
                strokeWidth={2}
                name="Emails Opened"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Intervention History */}
      <div className="bg-white rounded-xl border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
        <div className="p-5 border-b border-gray-2">
          <div className="flex items-center justify-between">
            <h3 className="text-navy">Intervention History</h3>
            <button
              onClick={handleTriggerBrief}
              disabled={isTriggering}
              className="px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal-mid transition-colors flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ fontSize: '13px', fontWeight: '500' }}
            >
              <Send className="w-4 h-4" />
              {isTriggering ? 'Triggering…' : 'Send New Brief'}
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-2">
          {customer.interventions.map((intervention, idx) => (
            <div key={idx} className="p-5 hover:bg-gray-1 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    intervention.type === 'Brief Sent' ? 'bg-teal-light' : 'bg-critical-light'
                  }`}>
                    {intervention.type === 'Brief Sent' ? (
                      <Send className={`w-5 h-5 ${intervention.status === 'Delivered' ? 'text-teal' : 'text-gray-3'}`} />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-critical" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="text-navy" style={{ fontSize: '15px', fontWeight: '500' }}>
                        {intervention.type}
                      </p>
                      {intervention.offer && (
                        <span className="px-2 py-1 bg-gray-1 text-gray-3 rounded" style={{ fontSize: '12px', fontWeight: '500' }}>
                          {intervention.offer}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-3 mb-2" style={{ fontSize: '14px' }}>
                      {intervention.result}
                    </p>
                    <div className="flex items-center gap-3 text-gray-3" style={{ fontSize: '13px' }}>
                      <span>{formatDateTime(intervention.date)}</span>
                      <span>•</span>
                      <span>{intervention.agent}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full ${
                  intervention.status === 'Delivered' ? 'bg-low-light text-low' : 'bg-medium-light text-medium'
                }`} style={{ fontSize: '12px', fontWeight: '600' }}>
                  {intervention.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-ai-purple-light border border-ai-purple rounded-xl p-5">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-ai-purple flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-navy mb-3" style={{ fontSize: '15px', fontWeight: '600' }}>
              AI Insights &amp; Recommendations
            </p>
            <ul className="space-y-2 text-navy" style={{ fontSize: '14px' }}>
              <li className="flex items-start gap-2">
                <span className="text-ai-purple mt-1">•</span>
                <span><strong>Immediate action recommended:</strong> This customer shows classic "session collapse" pattern with engagement dropping from 15 → 1 sessions. Personal outreach has 91% success rate with this profile.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ai-purple mt-1">•</span>
                <span><strong>Loyalty opportunity:</strong> Customer has 3,450 unused points but zero redemptions in 60 days. First Redemption Bonus offer historically works well.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-ai-purple mt-1">•</span>
                <span><strong>High-value customer:</strong> $2,847 LTV puts them in top 15%. Prioritize retention - losing this customer would require 8-10 new customers to replace revenue.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {activeRunId && (
        <WorkflowStatusModal
          runId={activeRunId}
          customerName={customer.name}
          onClose={() => setActiveRunId(null)}
        />
      )}
    </div>
  );
}
