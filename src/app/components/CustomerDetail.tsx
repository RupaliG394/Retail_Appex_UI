import { useState } from "react";
import { useParams, Link, useSearchParams } from "react-router";
import {
  ChevronLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Sparkles,
  Star,
  Send,
  FileText,
  Activity,
  Award,
  MessageSquare,
  Bell,
  CheckCircle2,
  Zap,
  Gift,
  RefreshCw,
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
import { WorkflowStatusContent } from "./WorkflowStatusModal";
import { useTriggerWorkflow } from "../hooks/useWorkflow";
import { toast } from "sonner";

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
  ],
  activityLog: [
    {
      id: 'al-001',
      date: '2026-04-06T10:00:00Z',
      type: 'risk_change',
      channel: 'System',
      title: 'Churn Risk Decreased',
      description: 'Risk score improved from 89 to 78 after email engagement',
      badge: { label: 'Risk Score: 78', variant: 'amber' }
    },
    {
      id: 'al-002',
      date: '2026-04-06T09:30:00Z',
      type: 'loyalty',
      channel: 'System',
      title: 'Loyalty Points Awarded',
      description: 'Bonus points added as part of retention campaign',
      badge: { label: '+500 points', variant: 'amber' }
    },
    {
      id: 'al-003',
      date: '2026-04-06T08:15:00Z',
      type: 'email',
      channel: 'Emails',
      title: 'Email Sent: Win-Back Campaign',
      description: 'Subject: "We miss you! Exclusive offer inside" — Opened after 2 hours',
      badge: { label: 'Email', variant: 'teal' }
    },
    {
      id: 'al-004',
      date: '2026-04-05T15:42:00Z',
      type: 'alert',
      channel: 'System',
      title: 'Churn Risk Alert Generated',
      description: 'Risk score escalated from 72 to 89 — assigned for immediate review',
      badge: { label: 'Risk Score: 89', variant: 'red' }
    },
    {
      id: 'al-005',
      date: '2026-04-04T11:00:00Z',
      type: 'sms',
      channel: 'SMS',
      title: 'SMS Sent: Loyalty Reminder',
      description: 'You have 3,450 points ready to use — reminder sent',
      badge: { label: 'SMS', variant: 'purple' }
    },
    {
      id: 'al-006',
      date: '2026-03-28T09:00:00Z',
      type: 'loyalty',
      channel: 'System',
      title: 'Zero Redemption Signal Detected',
      description: 'No loyalty redemptions in 60 days — flagged for outreach',
      badge: { label: 'Loyalty Signal', variant: 'amber' }
    },
    {
      id: 'al-007',
      date: '2026-03-12T10:45:00Z',
      type: 'email',
      channel: 'Emails',
      title: 'Email Sent: Double Points Offer',
      description: 'Promotional email delivered — no engagement recorded',
      badge: { label: 'Email', variant: 'teal' }
    }
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

const getRelativeTime = (dateString: string) => {
  const now = new Date('2026-04-07T12:00:00Z');
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return '1 day ago';
  return `${diffDays} days ago`;
};

const activityIcon = (type: string) => {
  switch (type) {
    case 'email': return <Mail className="w-5 h-5 text-teal" />;
    case 'sms': return <MessageSquare className="w-5 h-5 text-ai-purple" />;
    case 'loyalty': return <Award className="w-5 h-5 text-amber-500" />;
    case 'risk_change': return <TrendingDown className="w-5 h-5 text-critical" />;
    case 'alert': return <Bell className="w-5 h-5 text-critical" />;
    default: return <Activity className="w-5 h-5 text-gray-3" />;
  }
};

const activityIconBg = (type: string) => {
  switch (type) {
    case 'email': return 'bg-teal-light';
    case 'sms': return 'bg-ai-purple-light';
    case 'loyalty': return 'bg-amber-50';
    case 'risk_change': return 'bg-critical-light';
    case 'alert': return 'bg-critical-light';
    default: return 'bg-gray-1';
  }
};

const badgeStyle = (variant: string) => {
  switch (variant) {
    case 'teal': return 'bg-teal-light text-teal border border-teal/20';
    case 'amber': return 'bg-amber-50 text-amber-700 border border-amber-200';
    case 'red': return 'bg-critical-light text-critical border border-critical/20';
    case 'purple': return 'bg-ai-purple-light text-ai-purple border border-ai-purple/20';
    default: return 'bg-gray-1 text-gray-3 border border-gray-2';
  }
};

const suggestedOffers = [
  {
    icon: <Sparkles className="w-5 h-5 text-ai-purple" />,
    bg: 'bg-ai-purple-light',
    title: 'Personal Outreach',
    description: 'Personalised email + SMS from a retention specialist. 91% success rate with this profile.',
    tag: 'Recommended',
    tagColor: 'bg-ai-purple-light text-ai-purple',
  },
  {
    icon: <Gift className="w-5 h-5 text-teal" />,
    bg: 'bg-teal-light',
    title: 'First Redemption Bonus',
    description: 'Unlock 500 bonus points on first loyalty redemption. Targets unused 3,450 pt balance.',
    tag: 'Loyalty',
    tagColor: 'bg-teal-light text-teal',
  },
  {
    icon: <DollarSign className="w-5 h-5 text-high" />,
    bg: 'bg-high-light',
    title: 'Double Points Weekend',
    description: '2× points on next purchase this weekend. Historically effective for session-collapse profiles.',
    tag: 'Promotion',
    tagColor: 'bg-high-light text-high',
  },
];

export function CustomerDetail() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const customer = customerData;
  const { trigger, isLoading: isTriggering } = useTriggerWorkflow();
  const [logChannelFilter, setLogChannelFilter] = useState<string>('All');
  const [logTimeFilter, setLogTimeFilter] = useState<string>('Last 90 Days');

  const activeTab = searchParams.get('tab') ?? 'summary';
  const runParam = searchParams.get('run');

  const setTab = (tab: string, run?: string) => {
    const params: Record<string, string> = { tab };
    if (run) params.run = run;
    else if (runParam && tab === 'actions') params.run = runParam;
    setSearchParams(params);
  };

  const handleTriggerBrief = async () => {
    const backendId = id ?? customer.id;
    const toastId = toast.loading(`Starting retention workflow for ${customer.name}…`);
    const runId = await trigger(backendId);
    if (runId) {
      toast.success(`Workflow started for ${customer.name}`, {
        id: toastId,
        description: `Run ID: ${runId.slice(0, 8)}…`,
      });
      setSearchParams({ tab: 'actions', run: runId });
    } else {
      toast.error(`Failed to start workflow for ${customer.name}`, { id: toastId });
    }
  };

  const filteredActivityLog = customer.activityLog.filter(entry => {
    const channelMatch = logChannelFilter === 'All' || entry.channel === logChannelFilter;
    const now = new Date('2026-04-07T12:00:00Z');
    const entryDate = new Date(entry.date);
    const diffDays = (now.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24);
    const timeMatch =
      logTimeFilter === 'All Time' ? true :
      logTimeFilter === 'Last 7 Days' ? diffDays <= 7 :
      logTimeFilter === 'Last 30 Days' ? diffDays <= 30 :
      diffDays <= 90;
    return channelMatch && timeMatch;
  });

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
                  <span>Customer ID: {id ?? customer.id}</span>
                </div>
              </div>


            </div>
          </div>

          {/* Risk Score */}
          <div className="text-center px-6 py-4 bg-critical-light rounded-xl flex-shrink-0">
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

      {/* Tab Navigation */}
      <div className="flex gap-1 p-1 bg-white rounded-xl border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
        <button
          onClick={() => setTab('summary')}
          className={`flex-1 py-2.5 rounded-lg transition-colors font-medium ${
            activeTab === 'summary'
              ? 'bg-navy text-white'
              : 'text-gray-3 hover:text-navy hover:bg-gray-1'
          }`}
          style={{ fontSize: '14px' }}
        >
          Summary
        </button>
        <button
          onClick={() => setTab('actions')}
          className={`flex-1 py-2.5 rounded-lg transition-colors font-medium flex items-center justify-center gap-2 ${
            activeTab === 'actions'
              ? 'bg-navy text-white'
              : 'text-gray-3 hover:text-navy hover:bg-gray-1'
          }`}
          style={{ fontSize: '14px' }}
        >
          Actions
          {runParam && (
            <span className={`w-2 h-2 rounded-full ${activeTab === 'actions' ? 'bg-low' : 'bg-teal'} animate-pulse`} />
          )}
        </button>
      </div>

      {/* ── SUMMARY TAB ───────────────────────────────────────────────────────── */}
      {activeTab === 'summary' && (
        <>
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
                      <p className="text-gray-3 mb-2" style={{ fontSize: '14px' }}>{signal.detail}</p>
                      <p className="text-gray-3" style={{ fontSize: '13px' }}>Detected {formatDate(signal.detected)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-2 p-6" style={{ boxShadow: 'var(--shadow-l1)' }}>
              <h3 className="text-navy mb-4">Purchase History</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={customer.purchaseHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D0D5DD" />
                  <XAxis dataKey="month" tick={{ fill: '#8896A7', fontSize: 12 }} stroke="#D0D5DD" />
                  <YAxis tick={{ fill: '#8896A7', fontSize: 12 }} stroke="#D0D5DD" />
                  <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #D0D5DD', borderRadius: '8px', fontSize: '13px' }} />
                  <Legend wrapperStyle={{ fontSize: '13px' }} />
                  <Bar dataKey="orders" fill="#006D77" name="Orders" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-xl border border-gray-2 p-6" style={{ boxShadow: 'var(--shadow-l1)' }}>
              <h3 className="text-navy mb-4">Engagement Trend</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={customer.engagementTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#D0D5DD" />
                  <XAxis dataKey="month" tick={{ fill: '#8896A7', fontSize: 12 }} stroke="#D0D5DD" />
                  <YAxis tick={{ fill: '#8896A7', fontSize: 12 }} stroke="#D0D5DD" />
                  <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #D0D5DD', borderRadius: '8px', fontSize: '13px' }} />
                  <Legend wrapperStyle={{ fontSize: '13px' }} />
                  <Line type="monotone" dataKey="sessions" stroke="#006D77" strokeWidth={2} name="Sessions" />
                  <Line type="monotone" dataKey="emails" stroke="#7C3AED" strokeWidth={2} name="Emails Opened" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Intervention History */}
          <div className="bg-white rounded-xl border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
            <div className="p-5 border-b border-gray-2">
              <h3 className="text-navy">Intervention History</h3>
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
                          <p className="text-navy" style={{ fontSize: '15px', fontWeight: '500' }}>{intervention.type}</p>
                          {intervention.offer && (
                            <span className="px-2 py-1 bg-gray-1 text-gray-3 rounded" style={{ fontSize: '12px', fontWeight: '500' }}>
                              {intervention.offer}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-3 mb-2" style={{ fontSize: '14px' }}>{intervention.result}</p>
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
                    <span><strong>High-value customer:</strong> $2,847 LTV puts them in top 15%. Prioritize retention — losing this customer would require 8-10 new customers to replace revenue.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-white rounded-xl border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
            <div className="p-5 border-b border-gray-2">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h3 className="text-navy">Activity Log</h3>
                  <p className="text-gray-3 mt-1" style={{ fontSize: '13px' }}>
                    Complete timeline of interactions and events for {customer.name}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={logChannelFilter}
                    onChange={e => setLogChannelFilter(e.target.value)}
                    className="border border-gray-2 rounded-lg px-3 py-2 text-navy bg-white cursor-pointer hover:border-teal transition-colors"
                    style={{ fontSize: '13px', fontWeight: '500', outline: 'none' }}
                  >
                    {['All', 'Emails', 'SMS', 'Push', 'System'].map(opt => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                  <select
                    value={logTimeFilter}
                    onChange={e => setLogTimeFilter(e.target.value)}
                    className="border border-gray-2 rounded-lg px-3 py-2 text-navy bg-white cursor-pointer hover:border-teal transition-colors"
                    style={{ fontSize: '13px', fontWeight: '500', outline: 'none' }}
                  >
                    {['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'All Time'].map(opt => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {filteredActivityLog.length === 0 ? (
              <div className="p-10 text-center text-gray-3" style={{ fontSize: '14px' }}>
                No activity found for the selected filters.
              </div>
            ) : (
              <div className="p-5">
                <div className="relative">
                  <div className="absolute left-5 top-5 bottom-5 w-px bg-gray-2" style={{ marginLeft: '-0.5px' }} />
                  <div className="space-y-6">
                    {filteredActivityLog.map((entry) => (
                      <div key={entry.id} className="flex items-start gap-4 relative">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${activityIconBg(entry.type)}`}>
                          {activityIcon(entry.type)}
                        </div>
                        <div className="flex-1 min-w-0 pt-1">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="text-navy" style={{ fontSize: '15px', fontWeight: '600' }}>{entry.title}</p>
                                <CheckCircle2 className="w-4 h-4 text-low flex-shrink-0" />
                              </div>
                              <p className="text-gray-3 mb-2" style={{ fontSize: '14px' }}>{entry.description}</p>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeStyle(entry.badge.variant)}`}>
                                {entry.badge.label}
                              </span>
                            </div>
                            <span className="text-gray-3 flex-shrink-0 pt-0.5" style={{ fontSize: '13px' }}>
                              {getRelativeTime(entry.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* ── ACTIONS TAB ───────────────────────────────────────────────────────── */}
      {activeTab === 'actions' && (
        <div className="space-y-6">
          {runParam ? (
            /* ── Workflow in progress / completed ── */
            <div className="bg-white rounded-xl border border-gray-2 p-6" style={{ boxShadow: 'var(--shadow-l1)' }}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-navy">Retention Workflow</h3>
                  <p className="text-gray-3 mt-0.5" style={{ fontSize: '13px' }}>
                    {customer.name} — started via AI retention orchestrator
                  </p>
                </div>
                <button
                  onClick={handleTriggerBrief}
                  disabled={isTriggering}
                  className="px-3 py-1.5 bg-white border border-gray-2 text-navy rounded-lg hover:bg-gray-1 transition-colors flex items-center gap-2 disabled:opacity-60"
                  style={{ fontSize: '12px', fontWeight: '500' }}
                >
                  {isTriggering ? (
                    <span className="w-3.5 h-3.5 border-2 border-navy border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <RefreshCw className="w-3.5 h-3.5" />
                  )}
                  Start New Action
                </button>
              </div>
              <WorkflowStatusContent runId={runParam} />
            </div>
          ) : (
            /* ── No action taken yet ── */
            <>
              {/* Prompt card */}
              <div className="bg-white rounded-xl border border-gray-2 p-6" style={{ boxShadow: 'var(--shadow-l1)' }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-critical-light flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-6 h-6 text-critical" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-navy mb-1">No action has been taken yet</h3>
                    <p className="text-gray-3 mb-4" style={{ fontSize: '14px' }}>
                      {customer.name} is at <strong className="text-critical">CRITICAL</strong> risk (score {customer.currentRiskScore}).
                      Starting a retention workflow will analyse churn signals, select the optimal offer, and prepare a personalised campaign for your review.
                    </p>
                    <button
                      onClick={handleTriggerBrief}
                      disabled={isTriggering}
                      className="px-5 py-2.5 bg-teal text-white rounded-lg hover:bg-teal-mid transition-colors flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{ fontSize: '14px', fontWeight: '600' }}
                    >
                      {isTriggering ? (
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Zap className="w-4 h-4" />
                      )}
                      {isTriggering ? 'Starting workflow…' : 'Take Action'}
                    </button>
                  </div>
                </div>
              </div>

              {/* AI Recommendation */}
              <div className="bg-ai-purple-light border border-ai-purple/20 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-ai-purple flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-navy mb-2" style={{ fontSize: '14px', fontWeight: '600' }}>AI Recommendation</p>
                    <p className="text-navy" style={{ fontSize: '13px' }}>
                      Based on session-collapse pattern and 3,450 unused loyalty points, <strong>Personal Outreach</strong> is recommended.
                      Historical success rate with this profile: <strong className="text-teal">91%</strong>.
                      Acting within the next 24h increases retention probability by 34%.
                    </p>
                  </div>
                </div>
              </div>

              {/* Suggested Actions */}
              <div className="bg-white rounded-xl border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
                <div className="p-5 border-b border-gray-2">
                  <h3 className="text-navy">Available Actions</h3>
                  <p className="text-gray-3 mt-0.5" style={{ fontSize: '13px' }}>
                    The orchestrator will automatically select the best option based on real-time scoring.
                  </p>
                </div>
                <div className="divide-y divide-gray-2">
                  {suggestedOffers.map((offer, i) => (
                    <div key={i} className="p-5 flex items-start gap-4 hover:bg-gray-1 transition-colors">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${offer.bg}`}>
                        {offer.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-navy font-medium" style={{ fontSize: '14px' }}>{offer.title}</p>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${offer.tagColor}`}>
                            {offer.tag}
                          </span>
                        </div>
                        <p className="text-gray-3" style={{ fontSize: '13px' }}>{offer.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-5 border-t border-gray-2 bg-gray-1 rounded-b-xl">
                  <div className="flex items-center gap-2 text-gray-3" style={{ fontSize: '12px' }}>
                    <FileText className="w-4 h-4" />
                    The AI orchestrator scores and selects from all available offers. Click <strong className="text-navy">Take Action</strong> to start.
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
