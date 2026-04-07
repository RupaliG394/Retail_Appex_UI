import { useState, useEffect } from "react";
import {
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Shield,
  FileText
} from "lucide-react";
import { Link } from "react-router";
import { api, DashboardStats } from "../services/api";
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  PieChart, 
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from "recharts";

function formatAgo(iso: string | null): string {
  if (!iso) return '—';
  const ms = Date.now() - new Date(iso).getTime();
  const m = Math.floor(ms / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

const churnTrendData = [
  { month: 'Apr 25', before: 28, after: 28, target: 14 },
  { month: 'May', before: 28, after: 27.5, target: 14 },
  { month: 'Jun', before: 28, after: 26.8, target: 14 },
  { month: 'Jul', before: 28, after: 25.2, target: 14 },
  { month: 'Aug', before: 28, after: 24.1, target: 14 },
  { month: 'Sep', before: 28, after: 23.5, target: 14 },
  { month: 'Oct', before: 28, after: 22.8, target: 14 },
  { month: 'Nov', before: 28, after: 22.1, target: 14 },
  { month: 'Dec', before: 28, after: 21.9, target: 14 },
  { month: 'Jan 26', before: 28, after: 21.6, target: 14 },
  { month: 'Feb', before: 28, after: 21.5, target: 14 },
  { month: 'Mar', before: 28, after: 21.4, target: 14 },
];

const riskDistribution = [
  { name: 'CRITICAL', value: 847, color: '#C0392B', percent: 12.4 },
  { name: 'HIGH', value: 1203, color: '#D35400', percent: 17.6 },
  { name: 'MEDIUM', value: 2841, color: '#D4AC0D', percent: 41.6 },
  { name: 'LOW', value: 1940, color: '#1A6B3C', percent: 28.4 },
];

const offerPerformance = [
  { name: 'Personal Outreach', value: 91 },
  { name: 'First Redemption', value: 83 },
  { name: 'Double Points', value: 71 },
  { name: 'Free Returns', value: 68 },
  { name: '10% Discount', value: 44 },
];

const topAtRisk = [
  { name: 'Sam Chen', id: 'SC-00291', score: 91, scoreType: 'CRITICAL', trigger: 'GA+Redemption' },
  { name: 'Marcus Lee', id: 'ML-00445', score: 88, scoreType: 'CRITICAL', trigger: 'AOV+Support' },
  { name: 'Janet Roy', id: 'JR-00812', score: 85, scoreType: 'HIGH', trigger: 'Zero Redemption' },
  { name: 'Kevin Patel', id: 'KP-01203', score: 81, scoreType: 'HIGH', trigger: 'Session Collapse' },
  { name: 'Amy Wong', id: 'AW-00654', score: 79, scoreType: 'HIGH', trigger: 'Discount Dep.' },
];

const activityFeed = [
  { time: '2m ago', event: 'Brief approved — Sam C.', outcome: 'Sent', icon: CheckCircle2, color: 'low' },
  { time: '14m ago', event: 'CRITICAL alert: Marcus L.', outcome: 'Review', icon: AlertTriangle, color: 'high' },
  { time: '1h ago', event: 'Offer redeemed — Jenny K.', outcome: '91→22', icon: CheckCircle2, color: 'low' },
  { time: '2h ago', event: 'Override logged — Jordan', outcome: 'Noted', icon: FileText, color: 'gray' },
  { time: '3h ago', event: 'Guardrail blocked — ticket', outcome: 'Held', icon: Shield, color: 'gray' },
  { time: '4h ago', event: 'Brief dismissed — duplicate', outcome: 'Logged', icon: XCircle, color: 'gray' },
];

export function GlobalDashboard() {
  const [dashStats, setDashStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const fetchDash = async () => {
      try {
        const data = await api.getDashboard();
        setDashStats(data);
      } catch (e) {
        console.error('Dashboard fetch failed', e);
      }
    };
    fetchDash();
    const interval = setInterval(fetchDash, 30_000);
    return () => clearInterval(interval);
  }, []);

  const pendingCount = dashStats?.summary.awaiting_approval ?? 7;

  // Live activity feed built from recent runs; falls back to static when API returns nothing
  const liveActivityFeed = dashStats && dashStats.recent_runs.length > 0
    ? dashStats.recent_runs.slice(0, 6).map((run) => {
        if (run.awaiting_human) return {
          time: formatAgo(run.started_at),
          event: `CRITICAL alert: ${run.customer_name ?? run.customer_id}`,
          outcome: 'Review', icon: AlertTriangle, color: 'high',
        };
        if (run.workflow_status === 'completed') return {
          time: formatAgo(run.started_at),
          event: `Brief approved — ${run.customer_name ?? run.customer_id}`,
          outcome: 'Sent', icon: CheckCircle2, color: 'low',
        };
        if (run.workflow_status === 'rejected') return {
          time: formatAgo(run.started_at),
          event: `Brief dismissed — ${run.customer_name ?? run.customer_id}`,
          outcome: 'Logged', icon: XCircle, color: 'gray',
        };
        return {
          time: formatAgo(run.started_at),
          event: `Running: ${run.customer_name ?? run.customer_id}`,
          outcome: 'Live', icon: Sparkles, color: 'gray',
        };
      })
    : activityFeed;

  // Risk distribution from API when available, else static
  const liveRiskDistribution = dashStats && dashStats.summary.total_runs > 0
    ? [
        { name: 'HIGH',   value: dashStats.risk_distribution.HIGH,   color: '#D35400', percent: Math.round((dashStats.risk_distribution.HIGH   / dashStats.summary.total_runs) * 100) },
        { name: 'MEDIUM', value: dashStats.risk_distribution.MEDIUM, color: '#D4AC0D', percent: Math.round((dashStats.risk_distribution.MEDIUM / dashStats.summary.total_runs) * 100) },
        { name: 'LOW',    value: dashStats.risk_distribution.LOW,    color: '#1A6B3C', percent: Math.round((dashStats.risk_distribution.LOW    / dashStats.summary.total_runs) * 100) },
      ]
    : riskDistribution;

  const totalRiskCount = dashStats && dashStats.summary.total_runs > 0
    ? dashStats.summary.total_runs
    : 6831;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-navy mb-1">Good morning, Jordan.</h1>
          <p className="text-gray-3" style={{ fontSize: '14px' }}>
            Here is where things stand right now.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 bg-white border border-gray-2 rounded-lg text-black" style={{ fontSize: '14px' }}>
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
          </select>
          <button className="px-5 py-2 bg-white border border-gray-2 text-navy rounded-lg hover:bg-gray-1 transition-colors" style={{ fontSize: '14px', fontWeight: '500' }}>
            Export
          </button>
          <div className="flex items-center gap-2 px-3 py-2 bg-low-light text-low rounded-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-low opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-low" />
            </span>
            <span style={{ fontSize: '13px', fontWeight: '500' }}>Agent Live</span>
          </div>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-6 gap-4">
        <KPICard
          label="Annual Churn"
          value="21.4%"
          target="target <14%"
          trend="down"
          status="bad"
        />
        <KPICard
          label="Active At-Risk"
          value="1,847"
          target="vs 3,200 last mo"
          trend="down"
          status="good"
        />
        <KPICard
          label="Briefs Pending"
          value={String(pendingCount)}
          target="needs action"
          trend="warning"
          status="warning"
        />
        <KPICard
          label="Launch Time"
          value="1m 47s"
          target="target <2min"
          trend="up"
          status="good"
        />
        <KPICard
          label="Redemption Rate"
          value="18%"
          target="target >35%"
          trend="up"
          status="bad"
        />
        <KPICard
          label="Revenue Protected"
          value="$1.2M"
          target="target >$7M"
          trend="up"
          status="bad"
        />
      </div>

      {/* Row 2 - Three Columns */}
      <div className="grid grid-cols-12 gap-4">
        {/* Churn Risk Distribution */}
        <div className="col-span-5 bg-white border border-gray-2 rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)]">
          <h3 className="text-navy mb-4">Churn Risk Distribution</h3>
          <div className="relative flex items-center justify-center mb-6" style={{ height: '200px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={liveRiskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                >
                  {liveRiskDistribution.map((entry, index) => (
                    <Cell key={`cell-${entry.name}-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: 'none' }}>
              <div className="text-center">
                <div className="text-navy font-mono" style={{ fontSize: '18px', fontWeight: '700' }}>{totalRiskCount.toLocaleString()}</div>
                <div className="text-gray-3" style={{ fontSize: '11px' }}>total</div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {liveRiskDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm py-2 hover:bg-gray-1 px-2 rounded cursor-pointer transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
                  <span className="font-medium" style={{ fontSize: '13px' }}>{item.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold" style={{ fontSize: '14px' }}>{item.value}</span>
                  <span className="text-gray-3" style={{ fontSize: '13px' }}>{item.percent}%</span>
                  <ChevronRight size={16} className="text-teal" />
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 text-teal hover:text-teal-mid transition-colors" style={{ fontSize: '14px', fontWeight: '500' }}>
            View full breakdown →
          </button>
        </div>

        {/* Agent Activity Feed */}
        <div className="col-span-4 bg-white border border-gray-2 rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-navy">Agent Activity</h3>
              <p className="text-gray-3" style={{ fontSize: '12px' }}>Last 24 hours</p>
            </div>
            <button className="text-teal hover:text-teal-mid" style={{ fontSize: '13px', fontWeight: '500' }}>
              View all →
            </button>
          </div>
          <div className="space-y-1">
            {liveActivityFeed.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="flex items-center gap-3 p-3 hover:bg-gray-1 rounded-lg cursor-pointer transition-colors"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    item.color === 'low' ? 'bg-low-light text-low' :
                    item.color === 'high' ? 'bg-high-light text-high' :
                    'bg-gray-1 text-gray-3'
                  }`}>
                    <Icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-gray-3" style={{ fontSize: '11px' }}>{item.time}</div>
                    <div className="text-black truncate" style={{ fontSize: '13px' }}>{item.event}</div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    item.outcome === 'Sent' ? 'bg-low-light text-low' :
                    item.outcome === 'Review' ? 'bg-high-light text-high' :
                    'bg-gray-1 text-gray-3'
                  }`} style={{ fontSize: '11px' }}>
                    {item.outcome}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Required */}
        <div className="col-span-3 bg-white border border-gray-2 rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)]">
          <h3 className="text-navy mb-4">Needs Your Attention</h3>
          <div className="space-y-3">
            <ActionCard
              icon="🔴"
              title={`${pendingCount} Brief${pendingCount !== 1 ? 's' : ''} Awaiting Approval`}
              subtitle={pendingCount > 0 ? 'Needs action' : 'All clear'}
              href="/approval-queue"
            />
            <ActionCard
              icon="⚠️"
              title="3 CRITICAL Customers Unactioned"
              subtitle="Scores: 91, 88, 85"
              href="/customers"
            />
            <ActionCard
              icon="📊"
              title="Campaign #14 Results Ready"
              subtitle="Double Points Weekend"
              href="/campaigns"
            />
            <ActionCard
              icon="🛡️"
              title="2 Guardrail Rules Flagged"
              subtitle="Budget cap at 89%"
              href="/guardrails"
            />
          </div>
        </div>
      </div>

      {/* Row 3 - Churn Rate Trend & Top At-Risk */}
      <div className="grid grid-cols-12 gap-4">
        {/* Churn Rate Trend */}
        <div className="col-span-7 bg-white border border-gray-2 rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)]">
          <h3 className="text-navy mb-4">Churn Rate — 12 Month View</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={churnTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D0D5DD" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: '#8896A7', fontSize: 12 }}
                stroke="#D0D5DD"
              />
              <YAxis 
                tick={{ fill: '#8896A7', fontSize: 12 }}
                stroke="#D0D5DD"
                domain={[0, 35]}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #D0D5DD',
                  borderRadius: '8px',
                  fontSize: '13px'
                }}
              />
              <Legend 
                wrapperStyle={{ fontSize: '13px' }}
                iconType="line"
              />
              <Line 
                type="monotone" 
                dataKey="before" 
                stroke="#C0392B" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Before"
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="after" 
                stroke="#006D77" 
                strokeWidth={3}
                name="After"
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#1A6B3C" 
                strokeWidth={2}
                strokeDasharray="3 3"
                name="Target"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top 5 At-Risk */}
        <div className="col-span-5 bg-white border border-gray-2 rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)]">
          <h3 className="text-navy mb-1">Highest Risk — Act Today</h3>
          <p className="text-gray-3 mb-4" style={{ fontSize: '12px' }}>Composite scores above 80</p>
          <div className="space-y-3">
            {topAtRisk.map((customer) => (
              <div 
                key={customer.id}
                className="flex items-center gap-3 p-3 hover:bg-teal-light rounded-lg cursor-pointer transition-colors border border-gray-2"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium" style={{ fontSize: '14px' }}>{customer.name}</span>
                    <span className={`px-2 py-0.5 rounded font-mono text-xs ${
                      customer.scoreType === 'CRITICAL' 
                        ? 'bg-critical-light text-critical border-l-4 border-critical' 
                        : 'bg-high-light text-high border-l-4 border-high'
                    }`} style={{ fontSize: '11px', fontWeight: '700' }}>
                      {customer.scoreType} {customer.score}
                    </span>
                  </div>
                  <div className="text-gray-3" style={{ fontSize: '11px' }}>{customer.id}</div>
                  <div className="text-gray-3" style={{ fontSize: '12px' }}>{customer.trigger}</div>
                </div>
                <button className="px-3 py-1.5 bg-teal text-white rounded-lg hover:bg-teal-mid transition-colors" style={{ fontSize: '12px', fontWeight: '500' }}>
                  Review Brief
                </button>
              </div>
            ))}
          </div>
          <button className="mt-4 text-teal hover:text-teal-mid transition-colors" style={{ fontSize: '14px', fontWeight: '500' }}>
            View all 1,847 at-risk customers →
          </button>
        </div>
      </div>

      {/* Row 4 - Offer Performance, Campaigns, AI Insights */}
      <div className="grid grid-cols-3 gap-4">
        {/* Offer Performance */}
        <div className="bg-white border border-gray-2 rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)]">
          <h3 className="text-navy mb-4">Offer Performance</h3>
          <div className="space-y-3 mb-4">
            {offerPerformance.map((offer) => (
              <div key={offer.name}>
                <div className="flex justify-between mb-1">
                  <span style={{ fontSize: '13px' }}>{offer.name}</span>
                  <span className="font-mono font-bold" style={{ fontSize: '13px' }}>{offer.value}%</span>
                </div>
                <div className="w-full bg-gray-1 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${offer.value < 50 ? 'bg-high' : 'bg-teal'}`}
                    style={{ width: `${offer.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-2 pt-4 border-t border-gray-2">
            <div className="flex justify-between" style={{ fontSize: '12px' }}>
              <span className="text-gray-3">Best:</span>
              <span className="font-medium">Personal Outreach 91%</span>
            </div>
            <div className="flex justify-between" style={{ fontSize: '12px' }}>
              <span className="text-gray-3">Revenue:</span>
              <span className="font-medium">Double Points $68,946</span>
            </div>
          </div>
          <button className="mt-4 text-teal hover:text-teal-mid transition-colors" style={{ fontSize: '14px', fontWeight: '500' }}>
            Manage offers →
          </button>
        </div>

        {/* Active Campaigns */}
        <div className="bg-white border border-gray-2 rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)]">
          <h3 className="text-navy mb-4">Active Campaigns</h3>
          <div className="flex gap-6 mb-4">
            <div>
              <div className="text-navy font-mono" style={{ fontSize: '24px', fontWeight: '700' }}>3</div>
              <div className="text-gray-3" style={{ fontSize: '11px' }}>Active</div>
            </div>
            <div>
              <div className="text-navy font-mono" style={{ fontSize: '24px', fontWeight: '700' }}>2</div>
              <div className="text-gray-3" style={{ fontSize: '11px' }}>Scheduled</div>
            </div>
            <div>
              <div className="text-navy font-mono" style={{ fontSize: '24px', fontWeight: '700' }}>8</div>
              <div className="text-gray-3" style={{ fontSize: '11px' }}>Completed (30d)</div>
            </div>
          </div>
          <div className="space-y-3">
            <CampaignRow name="Double Points Weekend" sent={412} open={38.2} />
            <CampaignRow name="First Redemption Drive" sent={289} open={44.1} />
            <CampaignRow name="Exit Intent Capture" sent={1204} open={12.4} />
          </div>
          <button className="mt-4 text-teal hover:text-teal-mid transition-colors" style={{ fontSize: '14px', fontWeight: '500' }}>
            View all campaigns →
          </button>
        </div>

        {/* AI Insights */}
        <div className="bg-ai-purple-light border border-ai-purple/20 rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)]">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={18} className="text-ai-purple" />
            <h3 className="text-ai-purple">AI Insights</h3>
          </div>
          <p className="text-gray-3 mb-4" style={{ fontSize: '12px' }}>Updated 12 minutes ago</p>
          <div className="space-y-4">
            <AIInsight
              text="Session collapse accelerating in 25–34 age segment. 43 new CRITICAL customers this week vs 28 last week."
              action="View Segment"
            />
            <AIInsight
              text="Double Points offer performs 2× better when sent within 24h of GA trigger vs 72h. Tighten the send window."
              action="View Analysis"
            />
            <AIInsight
              text="Override rate fell from 34% to 18% in 4 weeks. Team trust is growing."
              action="View Overrides"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ label, value, target, trend, status }: {
  label: string;
  value: string;
  target: string;
  trend: string;
  status: 'good' | 'bad' | 'warning';
}) {
  return (
    <div className="bg-white border border-gray-2 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:border-teal transition-all cursor-pointer">
      <div className="text-gray-3 mb-2" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {label}
      </div>
      <div className="text-navy font-mono mb-2" style={{ fontSize: '32px', fontWeight: '700', lineHeight: '1' }}>
        {value}
      </div>
      <div className="flex items-center gap-1 text-gray-3" style={{ fontSize: '12px' }}>
        <span>{target}</span>
        {trend === 'up' && status === 'good' && <TrendingUp size={14} className="text-low" />}
        {trend === 'up' && status === 'bad' && <TrendingUp size={14} className="text-critical" />}
        {trend === 'down' && status === 'good' && <TrendingDown size={14} className="text-low" />}
        {trend === 'down' && status === 'bad' && <TrendingDown size={14} className="text-critical" />}
        {trend === 'warning' && <AlertTriangle size={14} className="text-high" />}
      </div>
    </div>
  );
}

function ActionCard({ icon, title, subtitle, href }: {
  icon: string;
  title: string;
  subtitle: string;
  href: string;
}) {
  return (
    <Link to={href} className="block p-4 bg-gray-1 rounded-lg hover:bg-teal-light transition-colors cursor-pointer border border-gray-2">
      <div className="flex items-start gap-3">
        <span style={{ fontSize: '20px' }}>{icon}</span>
        <div className="flex-1">
          <div className="font-medium mb-1" style={{ fontSize: '13px' }}>{title}</div>
          <div className="text-gray-3" style={{ fontSize: '11px' }}>{subtitle}</div>
        </div>
        <ChevronRight size={16} className="text-teal flex-shrink-0" />
      </div>
    </Link>
  );
}

function CampaignRow({ name, sent, open }: { name: string; sent: number; open: number }) {
  return (
    <div className="flex items-center gap-2 py-2 border-b border-gray-2 last:border-0">
      <div className="w-2 h-2 bg-low rounded-full flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="truncate" style={{ fontSize: '13px' }}>{name}</div>
        <div className="text-gray-3" style={{ fontSize: '11px' }}>{sent} sent • {open}% open</div>
      </div>
    </div>
  );
}

function AIInsight({ text, action }: { text: string; action: string }) {
  return (
    <div className="bg-white/80 rounded-lg p-4">
      <div className="flex gap-2 mb-2">
        <Sparkles size={14} className="text-ai-purple flex-shrink-0 mt-0.5" />
        <p className="text-black" style={{ fontSize: '13px', lineHeight: '1.5' }}>{text}</p>
      </div>
      <button className="text-ai-purple hover:underline" style={{ fontSize: '12px', fontWeight: '500' }}>
        {action} →
      </button>
    </div>
  );
}