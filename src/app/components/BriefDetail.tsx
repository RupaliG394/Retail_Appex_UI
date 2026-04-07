import { Link, useParams } from "react-router";
import { ArrowLeft, CheckCircle2, Edit3, X, Zap, TrendingDown, TrendingUp, AlertTriangle, MessageSquare, Mail, ShoppingCart, User, ExternalLink } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

// Mock data for different briefs
const briefsData: Record<string, any> = {
  '4821': {
    id: 4821,
    customer: { name: 'Sam Chen', id: 'SC-00291', email: 'sam.chen@email.com', joined: '2022-03-15', tier: 'Gold' },
    score: 91,
    scoreType: 'CRITICAL',
    timeInQueue: '3h 42m',
    queuedAt: '2026-04-07 07:00:00',
    signals: [
      { icon: '⚡', label: 'GA Collapse', system: 'GA4', weight: 25, severity: 'CRITICAL' },
      { icon: '🎯', label: 'Zero Redemption', system: 'Yotpo', weight: 20, severity: 'CRITICAL' },
      { icon: '🎫', label: 'Open Ticket', system: 'Zendesk', weight: 12, severity: 'HIGH' }
    ],
    offer: 'Double Points + Free Returns',
    offerDetails: {
      type: 'Hybrid Incentive',
      value: '$18.40',
      channel: 'Email + SMS',
      timing: 'Send in 2h (after ticket resolution)'
    }
  },
  '4820': {
    id: 4820,
    customer: { name: 'Marcus Lee', id: 'ML-00445', email: 'marcus.lee@email.com', joined: '2021-11-20', tier: 'Platinum' },
    score: 88,
    scoreType: 'CRITICAL',
    timeInQueue: '2h 18m',
    queuedAt: '2026-04-07 08:24:00',
    signals: [
      { icon: '💰', label: 'AOV Decline', system: 'Shopify', weight: 18, severity: 'HIGH' },
      { icon: '🎫', label: 'Support Issue', system: 'Zendesk', weight: 12, severity: 'HIGH' }
    ],
    offer: 'Personal Outreach',
    offerDetails: {
      type: 'High-touch',
      value: '$0',
      channel: 'Agent Call',
      timing: 'Today before 5pm'
    }
  }
};

// Chart data
const sessionTrendData = [
  { date: 'Feb 5', sessions: 18, pageviews: 52 },
  { date: 'Feb 12', sessions: 16, pageviews: 48 },
  { date: 'Feb 19', sessions: 14, pageviews: 42 },
  { date: 'Feb 26', sessions: 12, pageviews: 35 },
  { date: 'Mar 5', sessions: 9, pageviews: 28 },
  { date: 'Mar 12', sessions: 7, pageviews: 22 },
  { date: 'Mar 19', sessions: 5, pageviews: 15 },
  { date: 'Mar 26', sessions: 3, pageviews: 9 },
  { date: 'Apr 2', sessions: 2, pageviews: 6 },
];

const purchaseHistoryData = [
  { month: 'Oct', aov: 142, orders: 3 },
  { month: 'Nov', aov: 156, orders: 4 },
  { month: 'Dec', aov: 178, orders: 5 },
  { month: 'Jan', aov: 134, orders: 3 },
  { month: 'Feb', aov: 98, orders: 2 },
  { month: 'Mar', aov: 76, orders: 2 },
];

const loyaltyPointsData = [
  { week: 'Wk 1', earned: 85, redeemed: 0 },
  { week: 'Wk 2', earned: 120, redeemed: 0 },
  { week: 'Wk 3', earned: 95, redeemed: 0 },
  { week: 'Wk 4', earned: 60, redeemed: 0 },
  { week: 'Wk 5', earned: 40, redeemed: 0 },
  { week: 'Wk 6', earned: 20, redeemed: 0 },
];

const emailEngagementData = [
  { date: 'Mar 1', opens: 45, clicks: 12 },
  { date: 'Mar 8', opens: 38, clicks: 8 },
  { date: 'Mar 15', opens: 22, clicks: 4 },
  { date: 'Mar 22', opens: 15, clicks: 2 },
  { date: 'Mar 29', opens: 8, clicks: 0 },
  { date: 'Apr 5', opens: 0, clicks: 0 },
];

export function BriefDetail() {
  const { id } = useParams();
  const brief = briefsData[id as string];

  if (!brief) {
    return (
      <div className="p-8">
        <h1 className="text-navy mb-4">Brief Not Found</h1>
        <Link to="/approval-queue" className="text-teal hover:underline">
          ← Back to Approval Queue
        </Link>
      </div>
    );
  }

  const borderColor = brief.scoreType === 'CRITICAL' ? 'border-critical' : 'border-high';
  const scoreColor = brief.scoreType === 'CRITICAL' ? 'bg-critical text-white' : 'bg-high text-white';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link 
          to="/approval-queue" 
          className="inline-flex items-center gap-2 text-gray-3 hover:text-black transition-colors mb-4"
          style={{ fontSize: '14px' }}
        >
          <ArrowLeft size={16} />
          Back to Queue
        </Link>
        
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-navy">Brief #{brief.id}</h1>
              <div className={`px-4 py-1.5 rounded font-mono ${scoreColor}`} style={{ fontSize: '16px', fontWeight: '700' }}>
                {brief.scoreType} {brief.score}
              </div>
            </div>
            <p className="text-gray-3" style={{ fontSize: '14px' }}>
              Queued {brief.queuedAt} • {brief.timeInQueue} in queue
            </p>
          </div>
          
          <div className="flex gap-3">
            <button className="px-5 py-2.5 bg-low text-white rounded-lg hover:bg-low/80 transition-colors flex items-center gap-2" style={{ fontSize: '14px', fontWeight: '500' }}>
              <CheckCircle2 size={18} />
              Approve & Send
            </button>
            <button className="px-4 py-2.5 bg-white border border-gray-2 text-navy rounded-lg hover:bg-gray-1 transition-colors flex items-center gap-2" style={{ fontSize: '14px', fontWeight: '500' }}>
              <Edit3 size={16} />
              Override
            </button>
            <button className="px-4 py-2.5 bg-white border border-gray-2 text-critical rounded-lg hover:bg-critical-light transition-colors flex items-center gap-2" style={{ fontSize: '14px', fontWeight: '500' }}>
              <X size={16} />
              Dismiss
            </button>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Customer Overview */}
          <div className="bg-white border border-gray-2 rounded-xl p-6">
            <h3 className="text-navy mb-4">Customer Overview</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-teal to-teal-dark rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {brief.customer.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-medium mb-1" style={{ fontSize: '16px' }}>{brief.customer.name}</div>
                    <div className="text-gray-3" style={{ fontSize: '13px' }}>{brief.customer.id}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <InfoRow icon={<Mail size={16} />} label="Email" value={brief.customer.email} />
                  <InfoRow icon={<User size={16} />} label="Tier" value={brief.customer.tier} />
                  <InfoRow icon={<ShoppingCart size={16} />} label="Customer since" value={brief.customer.joined} />
                </div>
              </div>
              <div>
                <div className="space-y-3">
                  <MetricCard label="LTV" value="$4,832" change="-12%" trend="down" />
                  <MetricCard label="Orders (90d)" value="7" change="-38%" trend="down" />
                  <MetricCard label="Avg Order Value" value="$76" change="-34%" trend="down" />
                  <MetricCard label="Last Purchase" value="18 days ago" />
                </div>
              </div>
            </div>
          </div>

          {/* Composite Score Breakdown */}
          <div className="bg-white border border-gray-2 rounded-xl p-6">
            <h3 className="text-navy mb-4">Composite Score Breakdown</h3>
            <div className="space-y-3">
              <ScoreSegment label="GA Sessions" points={25} color="bg-critical" percent={100} />
              <ScoreSegment label="Zero Redemption" points={20} color="bg-high" percent={80} />
              <ScoreSegment label="Open Ticket" points={12} color="bg-high" percent={48} />
              <ScoreSegment label="AOV Decline" points={18} color="bg-high" percent={72} />
              <ScoreSegment label="Email Engagement" points={15} color="bg-medium" percent={60} />
              <ScoreSegment label="CRM Recency" points={1} color="bg-gray-2" percent={4} note="Excluded from composite" />
            </div>
            <div className="mt-4 pt-4 border-t border-gray-2 flex items-center justify-between">
              <span className="font-medium" style={{ fontSize: '14px' }}>TOTAL COMPOSITE SCORE</span>
              <span className={`font-mono ${scoreColor} px-3 py-1 rounded`} style={{ fontSize: '20px', fontWeight: '700' }}>
                {brief.score}/100
              </span>
            </div>
          </div>

          {/* Signal Deep Dive */}
          <div className="bg-white border border-gray-2 rounded-xl p-6">
            <h3 className="text-navy mb-4">Signal Deep Dive</h3>
            <div className="space-y-6">
              {brief.signals.map((signal: any, idx: number) => (
                <SignalCard key={idx} signal={signal} briefId={brief.id} />
              ))}
            </div>
          </div>

          {/* Data Trends */}
          <div className="bg-white border border-gray-2 rounded-xl p-6">
            <h3 className="text-navy mb-4">Behavioral Trends</h3>
            <div className="grid grid-cols-2 gap-6">
              <ChartCard title="Session Collapse (GA4)" data={sessionTrendData}>
                <ResponsiveContainer width="100%" height={180}>
                  <AreaChart data={sessionTrendData}>
                    <defs>
                      <linearGradient id="sessionGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#6B7280" />
                    <YAxis tick={{ fontSize: 11 }} stroke="#6B7280" />
                    <Tooltip />
                    <Area type="monotone" dataKey="sessions" stroke="#EF4444" strokeWidth={2} fill="url(#sessionGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Purchase Behavior (Shopify)" data={purchaseHistoryData}>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={purchaseHistoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#6B7280" />
                    <YAxis tick={{ fontSize: 11 }} stroke="#6B7280" />
                    <Tooltip />
                    <Bar dataKey="aov" fill="#FF9F43" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Loyalty Points (Yotpo)" data={loyaltyPointsData}>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={loyaltyPointsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="week" tick={{ fontSize: 11 }} stroke="#6B7280" />
                    <YAxis tick={{ fontSize: 11 }} stroke="#6B7280" />
                    <Tooltip />
                    <Bar dataKey="earned" fill="#9333EA" />
                    <Bar dataKey="redeemed" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Email Engagement (Klaviyo)" data={emailEngagementData}>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={emailEngagementData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#6B7280" />
                    <YAxis tick={{ fontSize: 11 }} stroke="#6B7280" />
                    <Tooltip />
                    <Line type="monotone" dataKey="opens" stroke="#34D399" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="clicks" stroke="#60A5FA" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </div>

          {/* Signal Evidence Table */}
          <div className="bg-white border border-gray-2 rounded-xl p-6">
            <h3 className="text-navy mb-4">Complete Signal Evidence</h3>
            <div className="border border-gray-2 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-navy text-white">
                  <tr>
                    <th className="text-left px-4 py-3" style={{ fontSize: '13px', fontWeight: '500' }}>System</th>
                    <th className="text-left px-4 py-3" style={{ fontSize: '13px', fontWeight: '500' }}>Finding</th>
                    <th className="text-left px-4 py-3" style={{ fontSize: '13px', fontWeight: '500' }}>Weight</th>
                    <th className="text-left px-4 py-3" style={{ fontSize: '13px', fontWeight: '500' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <EvidenceRow 
                    system="GA4" 
                    systemColor="bg-ga-orange"
                    finding="Sessions –60% over 30d, homepage-only visits" 
                    weight="25pts"
                    indicator="🔴"
                  />
                  <EvidenceRow 
                    system="Yotpo" 
                    systemColor="bg-yotpo"
                    finding="420 points accumulated, 0 redeemed in 8 weeks" 
                    weight="20pts"
                    indicator="🔴"
                    alt
                  />
                  <EvidenceRow 
                    system="Shopify" 
                    systemColor="bg-shopify"
                    finding="AOV –34%, 3 of last 5 orders used discount codes" 
                    weight="18pts"
                    indicator="🟠"
                  />
                  <EvidenceRow 
                    system="Klaviyo" 
                    systemColor="bg-klaviyo"
                    finding="14 emails sent, 8.2% open rate, expiry emails ignored" 
                    weight="15pts"
                    indicator="🟠"
                    alt
                  />
                  <EvidenceRow 
                    system="Zendesk" 
                    systemColor="bg-zendesk"
                    finding="Ticket #4421 open for 6 days (shipping delay)" 
                    weight="12pts"
                    indicator="🟠"
                  />
                  <EvidenceRow 
                    system="Salesforce" 
                    systemColor="bg-salesforce"
                    finding="Health Score 72/100 — overridden by composite model" 
                    weight="1pt"
                    indicator="🟢"
                    alt
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* AI Recommendation */}
          <div className="bg-ai-purple-light border border-ai-purple/20 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span>✨</span>
              <span className="font-medium text-ai-purple" style={{ fontSize: '14px' }}>AI Recommendation</span>
            </div>
            <div className="mb-4">
              <div className="font-medium mb-2" style={{ fontSize: '14px' }}>
                {brief.offer}
              </div>
              <p className="text-black mb-3" style={{ fontSize: '13px', lineHeight: '1.6' }}>
                "3 of last 5 orders used discount codes. Generic discount would increase dependency 
                further — margin erodes. Offer addresses zero-redemption signal (highest weight after GA) instead."
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="text-gray-3">Type</div>
                  <div className="font-medium">{brief.offerDetails.type}</div>
                </div>
                <div>
                  <div className="text-gray-3">Value</div>
                  <div className="font-medium">{brief.offerDetails.value}</div>
                </div>
                <div>
                  <div className="text-gray-3">Channel</div>
                  <div className="font-medium">{brief.offerDetails.channel}</div>
                </div>
                <div>
                  <div className="text-gray-3">Timing</div>
                  <div className="font-medium">{brief.offerDetails.timing}</div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-3" style={{ fontSize: '12px' }}>Confidence</span>
              <div className="flex-1 bg-white/50 rounded-full h-2">
                <div className="bg-ai-purple h-2 rounded-full" style={{ width: '87%' }} />
              </div>
              <span className="font-mono font-bold" style={{ fontSize: '12px' }}>87%</span>
            </div>
          </div>

          {/* Why GA is #1 */}
          <div className="bg-[#FFF7ED] border-l-4 border-ga-orange rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={16} className="text-ga-orange" />
              <span className="font-medium text-ga-orange" style={{ fontSize: '14px' }}>
                Why GA is Signal #1
              </span>
            </div>
            <p className="text-[#92400E]" style={{ fontSize: '12px', lineHeight: '1.6' }}>
              "Salesforce returned 72/100 — healthy. It only reads last-purchase recency. 
              GA session data shows behavioral intent collapse 2–3 weeks earlier. 
              GA is weighted at 25pts — highest single signal. This creates the +14 day lead time."
            </p>
          </div>

          {/* Guardrails */}
          <div className="bg-white border border-gray-2 rounded-xl p-5">
            <h4 className="text-navy mb-3" style={{ fontSize: '14px', fontWeight: '600' }}>Guardrail Status</h4>
            <div className="space-y-2.5">
              <GuardrailItem status="pass" text="No offer sent in last 7 days" />
              <GuardrailItem status="warning" text="Ticket #4421 open — resolve first" />
              <GuardrailItem status="pass" text="Email + push opted in" />
              <GuardrailItem status="pass" text="Budget: $18.40 of $24 cap" />
              <GuardrailItem status="pass" text="10:42 AM — send permitted" />
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white border border-gray-2 rounded-xl p-5">
            <h4 className="text-navy mb-3" style={{ fontSize: '14px', fontWeight: '600' }}>Activity Timeline</h4>
            <div className="space-y-3">
              <TimelineItem time="3h 42m ago" event="Brief entered queue" type="system" />
              <TimelineItem time="6 days ago" event="Support ticket opened" type="alert" />
              <TimelineItem time="18 days ago" event="Last purchase ($76)" type="purchase" />
              <TimelineItem time="3 weeks ago" event="Session decline detected" type="warning" />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-gray-2 rounded-xl p-5">
            <h4 className="text-navy mb-3" style={{ fontSize: '14px', fontWeight: '600' }}>Quick Actions</h4>
            <div className="space-y-2">
              <Link to={`/customers/${brief.customer.id}`} className="block w-full px-4 py-2 bg-gray-1 text-navy rounded-lg hover:bg-gray-2 transition-colors text-center" style={{ fontSize: '13px', fontWeight: '500' }}>
                View Full Profile
              </Link>
              <button className="w-full px-4 py-2 bg-gray-1 text-navy rounded-lg hover:bg-gray-2 transition-colors" style={{ fontSize: '13px', fontWeight: '500' }}>
                View in Zendesk
              </button>
              <button className="w-full px-4 py-2 bg-gray-1 text-navy rounded-lg hover:bg-gray-2 transition-colors" style={{ fontSize: '13px', fontWeight: '500' }}>
                Send to DRI
              </button>
              <button className="w-full px-4 py-2 bg-gray-1 text-navy rounded-lg hover:bg-gray-2 transition-colors" style={{ fontSize: '13px', fontWeight: '500' }}>
                Add to Watch List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 text-gray-3">
      {icon}
      <span style={{ fontSize: '13px' }}>{label}:</span>
      <span className="text-black font-medium" style={{ fontSize: '13px' }}>{value}</span>
    </div>
  );
}

function MetricCard({ label, value, change, trend }: { label: string; value: string; change?: string; trend?: 'up' | 'down' }) {
  return (
    <div className="bg-gray-1 rounded-lg p-3">
      <div className="text-gray-3 mb-1" style={{ fontSize: '11px' }}>{label}</div>
      <div className="flex items-center justify-between">
        <span className="text-navy font-mono" style={{ fontSize: '18px', fontWeight: '700' }}>{value}</span>
        {change && (
          <div className={`flex items-center gap-1 ${trend === 'down' ? 'text-critical' : 'text-low'}`}>
            {trend === 'down' ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
            <span style={{ fontSize: '12px', fontWeight: '600' }}>{change}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function ScoreSegment({ label, points, color, percent, note }: {
  label: string;
  points: number;
  color: string;
  percent: number;
  note?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-32 text-right text-gray-3" style={{ fontSize: '12px' }}>{label}</div>
      <div className="flex-1 bg-gray-1 rounded-full h-6 flex items-center px-1">
        <div className={`${color} h-4 rounded-full flex items-center justify-end px-2`} style={{ width: `${percent}%` }}>
          <span className="text-white font-mono" style={{ fontSize: '11px', fontWeight: '700' }}>{points}pts</span>
        </div>
      </div>
      {note && <span className="text-gray-3 italic" style={{ fontSize: '11px' }}>{note}</span>}
    </div>
  );
}

function SignalCard({ signal, briefId }: { signal: any; briefId: number }) {
  const severityColors = {
    CRITICAL: 'border-l-critical bg-critical-light',
    HIGH: 'border-l-high bg-high-light',
    MEDIUM: 'border-l-medium bg-medium-light'
  };

  return (
    <div className={`border-l-4 ${severityColors[signal.severity as keyof typeof severityColors]} border border-gray-2 rounded-lg p-4`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span style={{ fontSize: '20px' }}>{signal.icon}</span>
          <div>
            <div className="font-medium" style={{ fontSize: '14px' }}>{signal.label}</div>
            <div className="text-gray-3" style={{ fontSize: '12px' }}>{signal.system}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono font-bold" style={{ fontSize: '16px' }}>{signal.weight}pts</div>
          <div className="text-gray-3" style={{ fontSize: '11px' }}>{signal.severity}</div>
        </div>
      </div>
      <Link 
        to={`/approval-queue/${briefId}/signal/${signal.system.toLowerCase()}`}
        className="inline-flex items-center gap-1 text-teal hover:underline mt-2"
        style={{ fontSize: '13px', fontWeight: '500' }}
      >
        View detailed analysis
        <ExternalLink size={12} />
      </Link>
    </div>
  );
}

function ChartCard({ title, children, data }: { title: string; children: React.ReactNode; data: any[] }) {
  return (
    <div>
      <h4 className="text-navy mb-3" style={{ fontSize: '13px', fontWeight: '600' }}>{title}</h4>
      <div className="bg-gray-1 rounded-lg p-3">
        {children}
      </div>
    </div>
  );
}

function EvidenceRow({ system, systemColor, finding, weight, indicator, alt }: {
  system: string;
  systemColor: string;
  finding: string;
  weight: string;
  indicator: string;
  alt?: boolean;
}) {
  return (
    <tr className={alt ? 'bg-gray-1' : 'bg-white'}>
      <td className="px-4 py-3">
        <span className={`inline-block px-2 py-0.5 ${systemColor} text-white rounded font-mono`} style={{ fontSize: '11px' }}>
          {system}
        </span>
      </td>
      <td className="px-4 py-3" style={{ fontSize: '13px' }}>{finding}</td>
      <td className="px-4 py-3">
        <span className="font-mono font-bold" style={{ fontSize: '13px' }}>{weight}</span>
      </td>
      <td className="px-4 py-3">
        <span style={{ fontSize: '18px' }}>{indicator}</span>
      </td>
    </tr>
  );
}

function GuardrailItem({ status, text }: { status: 'pass' | 'warning'; text: string }) {
  return (
    <div className="flex items-center gap-2">
      {status === 'pass' ? (
        <CheckCircle2 size={16} className="text-low flex-shrink-0" />
      ) : (
        <AlertTriangle size={16} className="text-high flex-shrink-0" />
      )}
      <span style={{ fontSize: '12px' }}>{text}</span>
    </div>
  );
}

function TimelineItem({ time, event, type }: { time: string; event: string; type: 'system' | 'alert' | 'purchase' | 'warning' }) {
  const icons = {
    system: <CheckCircle2 size={14} className="text-gray-3" />,
    alert: <AlertTriangle size={14} className="text-high" />,
    purchase: <ShoppingCart size={14} className="text-teal" />,
    warning: <Zap size={14} className="text-critical" />
  };

  return (
    <div className="flex gap-2">
      <div className="flex-shrink-0 mt-0.5">{icons[type]}</div>
      <div>
        <div className="text-gray-3" style={{ fontSize: '11px' }}>{time}</div>
        <div style={{ fontSize: '12px' }}>{event}</div>
      </div>
    </div>
  );
}
