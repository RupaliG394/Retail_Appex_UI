import { Link, useParams } from "react-router";
import { ArrowLeft, AlertTriangle, TrendingDown, ExternalLink, Calendar, Activity, Target } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

// Mock signal details by system
const signalData: Record<string, any> = {
  ga4: {
    system: 'GA4',
    systemColor: 'bg-ga-orange',
    title: 'Session Collapse',
    icon: '⚡',
    severity: 'CRITICAL',
    weight: 25,
    detected: '2026-03-19',
    summary: 'Sessions declined 60% over 30 days. User visiting only homepage, no product interaction. Clear behavioral disengagement pattern.',
    keyMetrics: [
      { label: 'Session Decline', value: '-60%', status: 'critical' },
      { label: 'Pageviews per Session', value: '2.1', previous: '5.8', status: 'critical' },
      { label: 'Avg Session Duration', value: '0:42', previous: '3:24', status: 'critical' },
      { label: 'Bounce Rate', value: '78%', previous: '32%', status: 'high' }
    ],
    insights: [
      'User only visiting homepage in last 14 sessions',
      'Zero product detail page views in 3 weeks',
      'No add-to-cart events since March 1',
      'Session duration dropped from 3m 24s to 42s'
    ],
    recommendation: 'This is the primary churn signal. GA tracks behavioral intent earlier than purchase-based CRM systems. Session collapse indicates disengagement 2-3 weeks before churn typically occurs in Salesforce.',
    rawData: {
      sessions: [
        { date: 'Feb 5', sessions: 18, pageviews: 105, duration: 204, bounceRate: 28 },
        { date: 'Feb 12', sessions: 17, pageviews: 98, duration: 196, bounceRate: 31 },
        { date: 'Feb 19', sessions: 15, pageviews: 87, duration: 180, bounceRate: 35 },
        { date: 'Feb 26', sessions: 13, pageviews: 68, duration: 152, bounceRate: 42 },
        { date: 'Mar 5', sessions: 10, pageviews: 52, duration: 98, bounceRate: 54 },
        { date: 'Mar 12', sessions: 8, pageviews: 38, duration: 76, bounceRate: 62 },
        { date: 'Mar 19', sessions: 6, pageviews: 24, duration: 58, bounceRate: 68 },
        { date: 'Mar 26', sessions: 4, pageviews: 14, duration: 48, bounceRate: 72 },
        { date: 'Apr 2', sessions: 3, pageviews: 8, duration: 42, bounceRate: 78 }
      ],
      pageTypes: [
        { page: 'Homepage', visits: 42, percent: 87 },
        { page: 'Account', visits: 4, percent: 8 },
        { page: 'Products', visits: 2, percent: 4 },
        { page: 'Cart', visits: 0, percent: 0 }
      ]
    }
  },
  yotpo: {
    system: 'Yotpo',
    systemColor: 'bg-yotpo',
    title: 'Zero Redemption Pattern',
    icon: '🎯',
    severity: 'CRITICAL',
    weight: 20,
    detected: '2026-03-12',
    summary: '420 loyalty points accumulated with zero redemptions over 8 weeks. Customer earning but not engaging with loyalty program.',
    keyMetrics: [
      { label: 'Points Balance', value: '420', status: 'neutral' },
      { label: 'Points Redeemed', value: '0', status: 'critical' },
      { label: 'Weeks Unredeemed', value: '8', status: 'critical' },
      { label: 'Redemption Rate', value: '0%', previous: '45%', status: 'critical' }
    ],
    insights: [
      'Customer previously redeemed 45% of points within 2 weeks of earning',
      'Has 3 available rewards worth 300, 400, and 500 points',
      'Received 6 reminder emails about expiring points — all ignored',
      'Last redemption was 62 days ago (2x Free Shipping reward)'
    ],
    recommendation: 'Zero redemption despite point accumulation indicates disconnection from value proposition. This is second-highest weighted signal after GA. Offer should re-engage with loyalty program.',
    rawData: {
      points: [
        { week: 'Wk 1', earned: 85, redeemed: 0, balance: 250 },
        { week: 'Wk 2', earned: 120, redeemed: 0, balance: 370 },
        { week: 'Wk 3', earned: 95, redeemed: 0, balance: 465 },
        { week: 'Wk 4', earned: 60, redeemed: 100, balance: 425 },
        { week: 'Wk 5', earned: 40, redeemed: 0, balance: 465 },
        { week: 'Wk 6', earned: 20, redeemed: 0, balance: 485 },
        { week: 'Wk 7', earned: 0, redeemed: 0, balance: 485 },
        { week: 'Wk 8', earned: 35, redeemed: 0, balance: 420 }
      ],
      rewards: [
        { name: 'Free Shipping', points: 300, available: true, expires: '14 days' },
        { name: '$15 Off', points: 400, available: true, expires: '21 days' },
        { name: '2x Points Weekend', points: 500, available: true, expires: '28 days' }
      ]
    }
  },
  shopify: {
    system: 'Shopify',
    systemColor: 'bg-shopify',
    title: 'AOV Decline & Discount Dependency',
    icon: '💰',
    severity: 'HIGH',
    weight: 18,
    detected: '2026-03-08',
    summary: 'Average order value declined 34% over 6 months. 3 of last 5 orders used discount codes, indicating margin erosion.',
    keyMetrics: [
      { label: 'AOV (Current)', value: '$76', status: 'high' },
      { label: 'AOV (6mo avg)', value: '$142', status: 'neutral' },
      { label: 'AOV Decline', value: '-34%', status: 'high' },
      { label: 'Discount Usage', value: '60%', previous: '12%', status: 'high' }
    ],
    insights: [
      'AOV peaked at $178 in December, now at $76',
      '3 of last 5 orders used 15-20% discount codes',
      'Product category shift: accessories only (was full outfits)',
      'Cart abandonment increased to 68% (was 32%)'
    ],
    recommendation: 'Customer showing price sensitivity and trading down. Additional discount would worsen dependency pattern. Focus on value perception rather than price reduction.',
    rawData: {
      orders: [
        { month: 'Oct', aov: 142, orders: 3, discountUsed: 0 },
        { month: 'Nov', aov: 156, orders: 4, discountUsed: 1 },
        { month: 'Dec', aov: 178, orders: 5, discountUsed: 1 },
        { month: 'Jan', aov: 134, orders: 3, discountUsed: 2 },
        { month: 'Feb', aov: 98, orders: 2, discountUsed: 2 },
        { month: 'Mar', aov: 76, orders: 2, discountUsed: 1 }
      ],
      categories: [
        { category: 'Full Outfits', before: 68, after: 12 },
        { category: 'Accessories', before: 18, after: 72 },
        { category: 'Sale Items', before: 14, after: 16 }
      ]
    }
  },
  klaviyo: {
    system: 'Klaviyo',
    systemColor: 'bg-klaviyo',
    title: 'Email Disengagement',
    icon: '📧',
    severity: 'HIGH',
    weight: 15,
    detected: '2026-03-15',
    summary: 'Open rate declined from 42% to 8.2% over 6 weeks. Customer ignoring promotional and transactional emails.',
    keyMetrics: [
      { label: 'Open Rate', value: '8.2%', previous: '42%', status: 'high' },
      { label: 'Click Rate', value: '0.3%', previous: '12%', status: 'high' },
      { label: 'Emails Sent (30d)', value: '14', status: 'neutral' },
      { label: 'Last Engagement', value: '22 days ago', status: 'high' }
    ],
    insights: [
      'Last email open was 22 days ago (cart reminder)',
      'Zero clicks on last 8 promotional emails',
      'Ignored 3 loyalty point expiry warnings',
      'Previously highly engaged (top 15% of subscribers)'
    ],
    recommendation: 'Email channel effectiveness declining. May indicate inbox fatigue or content misalignment. Alternative outreach channel recommended.',
    rawData: {
      engagement: [
        { date: 'Mar 1', opens: 45, clicks: 12, sent: 4 },
        { date: 'Mar 8', opens: 38, clicks: 8, sent: 3 },
        { date: 'Mar 15', opens: 22, clicks: 4, sent: 2 },
        { date: 'Mar 22', opens: 15, clicks: 2, sent: 3 },
        { date: 'Mar 29', opens: 8, clicks: 0, sent: 2 },
        { date: 'Apr 5', opens: 0, clicks: 0, sent: 0 }
      ],
      campaigns: [
        { name: 'Point Expiry Warning', sent: '3 days ago', opened: false, clicked: false },
        { name: 'New Arrivals', sent: '7 days ago', opened: false, clicked: false },
        { name: 'Cart Reminder', sent: '22 days ago', opened: true, clicked: false },
        { name: 'Weekly Newsletter', sent: '28 days ago', opened: true, clicked: true }
      ]
    }
  },
  zendesk: {
    system: 'Zendesk',
    systemColor: 'bg-zendesk',
    title: 'Open Support Ticket',
    icon: '🎫',
    severity: 'HIGH',
    weight: 12,
    detected: '2026-04-01',
    summary: 'Support ticket #4421 open for 6 days regarding shipping delay. Unresolved issue blocking retention outreach.',
    keyMetrics: [
      { label: 'Ticket Age', value: '6 days', status: 'high' },
      { label: 'Priority', value: 'High', status: 'high' },
      { label: 'Response Time', value: '18 hours', status: 'high' },
      { label: 'Resolution SLA', value: 'Breached', status: 'critical' }
    ],
    insights: [
      'Ticket opened April 1: "Order still not shipped after 8 days"',
      'Customer replied 3 times expressing frustration',
      'Last agent update 2 days ago',
      'Order finally shipped yesterday but customer not notified'
    ],
    recommendation: 'Active support issue must be resolved before any retention outreach. Sending promotional content while issue is open creates negative experience.',
    rawData: {
      timeline: [
        { date: 'Apr 1 9:14 AM', event: 'Ticket created', type: 'customer', message: 'Order #8821 not shipped yet, been 8 days' },
        { date: 'Apr 1 2:30 PM', event: 'Agent responded', type: 'agent', message: 'Looking into this, checking with warehouse' },
        { date: 'Apr 2 10:45 AM', event: 'Customer replied', type: 'customer', message: 'Any update? Really need this soon' },
        { date: 'Apr 3 4:12 PM', event: 'Agent update', type: 'agent', message: 'Still waiting on warehouse team' },
        { date: 'Apr 4 8:30 AM', event: 'Customer escalated', type: 'customer', message: 'This is unacceptable, want refund' },
        { date: 'Apr 5 11:20 AM', event: 'Agent note', type: 'internal', message: 'Order shipped, updating customer' },
        { date: 'Apr 6 10:42 AM', event: 'Current status', type: 'system', message: 'Awaiting agent response' }
      ],
      relatedTickets: [
        { id: '#3892', date: '2024-02-14', subject: 'Sizing question', status: 'Resolved', satisfaction: 'Good' },
        { id: '#3124', date: '2023-11-08', subject: 'Return request', status: 'Resolved', satisfaction: 'Great' }
      ]
    }
  },
  salesforce: {
    system: 'Salesforce',
    systemColor: 'bg-salesforce',
    title: 'CRM Health Score',
    icon: '📊',
    severity: 'LOW',
    weight: 1,
    detected: '2026-04-07',
    summary: 'Salesforce health score is 72/100 (healthy range). However, this score only considers recency and is overridden by composite model.',
    keyMetrics: [
      { label: 'Health Score', value: '72/100', status: 'neutral' },
      { label: 'Last Purchase', value: '18 days', status: 'neutral' },
      { label: 'Purchase Frequency', value: 'Normal', status: 'neutral' },
      { label: 'Composite Weight', value: '1pt', status: 'low' }
    ],
    insights: [
      'Salesforce reads last purchase recency only',
      'Does not capture behavioral intent from GA4',
      'Missing loyalty and email engagement data',
      'Composite model intentionally down-weights this signal'
    ],
    recommendation: 'Salesforce score is lagging indicator. Composite model weights GA4 and Yotpo higher because they detect churn risk 2-3 weeks earlier.',
    rawData: {
      history: [
        { metric: 'Health Score', current: 72, previous: 84, change: -12 },
        { metric: 'Engagement', current: 'Medium', previous: 'High', change: -1 },
        { metric: 'Recency', current: 18, previous: 12, change: +6 },
        { metric: 'Frequency', current: 'Normal', previous: 'High', change: -1 }
      ],
      comparison: [
        { source: 'Salesforce', score: 72, reasoning: 'Recency-based only' },
        { source: 'Composite AI', score: 91, reasoning: 'Multi-signal behavioral' }
      ]
    }
  }
};

export function SignalDetail() {
  const { id, system } = useParams();
  const signal = signalData[system as string];

  if (!signal) {
    return (
      <div className="p-8">
        <h1 className="text-navy mb-4">Signal Not Found</h1>
        <Link to={`/approval-queue/${id}`} className="text-teal hover:underline">
          ← Back to Brief
        </Link>
      </div>
    );
  }

  const severityColors = {
    CRITICAL: 'bg-critical text-white',
    HIGH: 'bg-high text-white',
    MEDIUM: 'bg-medium text-white',
    LOW: 'bg-low text-white'
  };

  const statusColors = {
    critical: 'text-critical',
    high: 'text-high',
    medium: 'text-medium',
    neutral: 'text-gray-3'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link 
          to={`/approval-queue/${id}`}
          className="inline-flex items-center gap-2 text-gray-3 hover:text-black transition-colors mb-4"
          style={{ fontSize: '14px' }}
        >
          <ArrowLeft size={16} />
          Back to Brief #{id}
        </Link>
        
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <span style={{ fontSize: '32px' }}>{signal.icon}</span>
              <div>
                <h1 className="text-navy">{signal.system}: {signal.title}</h1>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`inline-block px-2 py-0.5 ${signal.systemColor} text-white rounded font-mono`} style={{ fontSize: '11px' }}>
                    {signal.system}
                  </span>
                  <span className={`px-3 py-1 rounded font-mono ${severityColors[signal.severity as keyof typeof severityColors]}`} style={{ fontSize: '12px', fontWeight: '700' }}>
                    {signal.severity}
                  </span>
                  <span className="text-gray-3" style={{ fontSize: '13px' }}>
                    Detected: {signal.detected}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-gray-3 mb-1" style={{ fontSize: '12px' }}>Signal Weight</div>
            <div className="text-navy font-mono" style={{ fontSize: '32px', fontWeight: '700' }}>
              {signal.weight}<span style={{ fontSize: '20px' }}>pts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white border border-gray-2 rounded-xl p-6">
        <h3 className="text-navy mb-3">Executive Summary</h3>
        <p className="text-black" style={{ fontSize: '14px', lineHeight: '1.7' }}>
          {signal.summary}
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-4 gap-4">
        {signal.keyMetrics.map((metric: any, idx: number) => (
          <div key={idx} className="bg-white border border-gray-2 rounded-xl p-4">
            <div className="text-gray-3 mb-1" style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {metric.label}
            </div>
            <div className={`font-mono mb-1 ${statusColors[metric.status as keyof typeof statusColors]}`} style={{ fontSize: '24px', fontWeight: '700' }}>
              {metric.value}
            </div>
            {metric.previous && (
              <div className="text-gray-3" style={{ fontSize: '11px' }}>
                was {metric.previous}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="col-span-2 space-y-6">
          {/* Key Insights */}
          <div className="bg-white border border-gray-2 rounded-xl p-6">
            <h3 className="text-navy mb-4">Key Insights</h3>
            <ul className="space-y-2">
              {signal.insights.map((insight: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3">
                  <AlertTriangle size={16} className="text-high flex-shrink-0 mt-0.5" />
                  <span style={{ fontSize: '14px', lineHeight: '1.6' }}>{insight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Data Visualization */}
          {renderDataVisualization(signal)}

          {/* Raw Data Tables */}
          {renderRawDataTables(signal)}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Why This Matters */}
          <div className="bg-ai-purple-light border border-ai-purple/20 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Target size={16} className="text-ai-purple" />
              <span className="font-medium text-ai-purple" style={{ fontSize: '14px' }}>Why This Matters</span>
            </div>
            <p className="text-black" style={{ fontSize: '13px', lineHeight: '1.6' }}>
              {signal.recommendation}
            </p>
          </div>

          {/* Signal Context */}
          <div className="bg-white border border-gray-2 rounded-xl p-5">
            <h4 className="text-navy mb-3" style={{ fontSize: '14px', fontWeight: '600' }}>Signal Context</h4>
            <div className="space-y-3">
              <ContextRow label="System" value={signal.system} />
              <ContextRow label="Weight" value={`${signal.weight} points`} />
              <ContextRow label="Severity" value={signal.severity} />
              <ContextRow label="Detected" value={signal.detected} />
              <ContextRow label="Status" value="Active" />
            </div>
          </div>

          {/* Related Signals */}
          <div className="bg-white border border-gray-2 rounded-xl p-5">
            <h4 className="text-navy mb-3" style={{ fontSize: '14px', fontWeight: '600' }}>Related Signals</h4>
            <div className="space-y-2">
              <RelatedSignalChip system="GA4" label="Session Collapse" active={system === 'ga4'} />
              <RelatedSignalChip system="Yotpo" label="Zero Redemption" active={system === 'yotpo'} />
              <RelatedSignalChip system="Shopify" label="AOV Decline" active={system === 'shopify'} />
              <RelatedSignalChip system="Klaviyo" label="Email Disengaged" active={system === 'klaviyo'} />
              <RelatedSignalChip system="Zendesk" label="Open Ticket" active={system === 'zendesk'} />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-gray-2 rounded-xl p-5">
            <h4 className="text-navy mb-3" style={{ fontSize: '14px', fontWeight: '600' }}>Quick Actions</h4>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-gray-1 text-navy rounded-lg hover:bg-gray-2 transition-colors text-left flex items-center justify-between" style={{ fontSize: '13px', fontWeight: '500' }}>
                View in {signal.system}
                <ExternalLink size={14} />
              </button>
              <button className="w-full px-4 py-2 bg-gray-1 text-navy rounded-lg hover:bg-gray-2 transition-colors text-left" style={{ fontSize: '13px', fontWeight: '500' }}>
                Export Raw Data
              </button>
              <button className="w-full px-4 py-2 bg-gray-1 text-navy rounded-lg hover:bg-gray-2 transition-colors text-left" style={{ fontSize: '13px', fontWeight: '500' }}>
                Add to Watch List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderDataVisualization(signal: any) {
  const { system, rawData } = signal;

  if (system === 'GA4') {
    return (
      <div className="bg-white border border-gray-2 rounded-xl p-6">
        <h3 className="text-navy mb-4">Session Trend Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={rawData.sessions}>
            <defs>
              <linearGradient id="signal-sessions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="signal-pageviews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#6B7280" />
            <YAxis tick={{ fontSize: 12 }} stroke="#6B7280" />
            <Tooltip />
            <Area type="monotone" dataKey="sessions" stroke="#EF4444" strokeWidth={2} fill="url(#signal-sessions)" name="Sessions" />
            <Area type="monotone" dataKey="pageviews" stroke="#F59E0B" strokeWidth={2} fill="url(#signal-pageviews)" name="Pageviews" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (system === 'Yotpo') {
    return (
      <div className="bg-white border border-gray-2 rounded-xl p-6">
        <h3 className="text-navy mb-4">Loyalty Points Activity</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={rawData.points}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="#6B7280" />
            <YAxis tick={{ fontSize: 12 }} stroke="#6B7280" />
            <Tooltip />
            <Bar dataKey="earned" fill="#9333EA" name="Earned" />
            <Bar dataKey="redeemed" fill="#10B981" name="Redeemed" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (system === 'Shopify') {
    return (
      <div className="bg-white border border-gray-2 rounded-xl p-6">
        <h3 className="text-navy mb-4">Average Order Value Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={rawData.orders}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#6B7280" />
            <YAxis tick={{ fontSize: 12 }} stroke="#6B7280" />
            <Tooltip />
            <Line type="monotone" dataKey="aov" stroke="#FF9F43" strokeWidth={3} dot={{ r: 5 }} name="AOV" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (system === 'Klaviyo') {
    return (
      <div className="bg-white border border-gray-2 rounded-xl p-6">
        <h3 className="text-navy mb-4">Email Engagement Decline</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={rawData.engagement}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#6B7280" />
            <YAxis tick={{ fontSize: 12 }} stroke="#6B7280" />
            <Tooltip />
            <Line type="monotone" dataKey="opens" stroke="#34D399" strokeWidth={2} dot={{ r: 4 }} name="Opens %" />
            <Line type="monotone" dataKey="clicks" stroke="#60A5FA" strokeWidth={2} dot={{ r: 4 }} name="Clicks %" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return null;
}

function renderRawDataTables(signal: any) {
  const { system, rawData } = signal;

  if (system === 'GA4') {
    return (
      <div className="bg-white border border-gray-2 rounded-xl p-6">
        <h3 className="text-navy mb-4">Page Visit Distribution</h3>
        <div className="border border-gray-2 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-navy text-white">
              <tr>
                <th className="text-left px-4 py-3" style={{ fontSize: '13px', fontWeight: '500' }}>Page Type</th>
                <th className="text-right px-4 py-3" style={{ fontSize: '13px', fontWeight: '500' }}>Visits</th>
                <th className="text-right px-4 py-3" style={{ fontSize: '13px', fontWeight: '500' }}>% of Total</th>
              </tr>
            </thead>
            <tbody>
              {rawData.pageTypes.map((page: any, idx: number) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-1'}>
                  <td className="px-4 py-3" style={{ fontSize: '13px' }}>{page.page}</td>
                  <td className="text-right px-4 py-3 font-mono" style={{ fontSize: '13px' }}>{page.visits}</td>
                  <td className="text-right px-4 py-3 font-mono" style={{ fontSize: '13px' }}>{page.percent}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (system === 'Yotpo') {
    return (
      <div className="bg-white border border-gray-2 rounded-xl p-6">
        <h3 className="text-navy mb-4">Available Rewards</h3>
        <div className="space-y-3">
          {rawData.rewards.map((reward: any, idx: number) => (
            <div key={idx} className="border border-gray-2 rounded-lg p-4 flex items-center justify-between">
              <div>
                <div className="font-medium mb-1" style={{ fontSize: '14px' }}>{reward.name}</div>
                <div className="text-gray-3" style={{ fontSize: '12px' }}>{reward.points} points • Expires in {reward.expires}</div>
              </div>
              <div className={`px-3 py-1 rounded ${reward.available ? 'bg-low text-white' : 'bg-gray-2 text-gray-3'}`} style={{ fontSize: '12px', fontWeight: '500' }}>
                {reward.available ? 'Available' : 'Locked'}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (system === 'Shopify') {
    return (
      <div className="bg-white border border-gray-2 rounded-xl p-6">
        <h3 className="text-navy mb-4">Category Purchase Shift</h3>
        <div className="border border-gray-2 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-navy text-white">
              <tr>
                <th className="text-left px-4 py-3" style={{ fontSize: '13px', fontWeight: '500' }}>Category</th>
                <th className="text-right px-4 py-3" style={{ fontSize: '13px', fontWeight: '500' }}>Before (%)</th>
                <th className="text-right px-4 py-3" style={{ fontSize: '13px', fontWeight: '500' }}>After (%)</th>
                <th className="text-right px-4 py-3" style={{ fontSize: '13px', fontWeight: '500' }}>Change</th>
              </tr>
            </thead>
            <tbody>
              {rawData.categories.map((cat: any, idx: number) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-1'}>
                  <td className="px-4 py-3" style={{ fontSize: '13px' }}>{cat.category}</td>
                  <td className="text-right px-4 py-3 font-mono" style={{ fontSize: '13px' }}>{cat.before}%</td>
                  <td className="text-right px-4 py-3 font-mono" style={{ fontSize: '13px' }}>{cat.after}%</td>
                  <td className="text-right px-4 py-3 font-mono" style={{ fontSize: '13px' }}>
                    <span className={cat.after > cat.before ? 'text-low' : 'text-critical'}>
                      {cat.after > cat.before ? '+' : ''}{cat.after - cat.before}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (system === 'Klaviyo') {
    return (
      <div className="bg-white border border-gray-2 rounded-xl p-6">
        <h3 className="text-navy mb-4">Recent Campaign Performance</h3>
        <div className="space-y-2">
          {rawData.campaigns.map((campaign: any, idx: number) => (
            <div key={idx} className="border border-gray-2 rounded-lg p-3 flex items-center justify-between">
              <div>
                <div className="font-medium mb-1" style={{ fontSize: '13px' }}>{campaign.name}</div>
                <div className="text-gray-3" style={{ fontSize: '11px' }}>Sent {campaign.sent}</div>
              </div>
              <div className="flex gap-2">
                <span className={`px-2 py-0.5 rounded text-xs ${campaign.opened ? 'bg-low text-white' : 'bg-gray-2 text-gray-3'}`}>
                  {campaign.opened ? '✓ Opened' : '✗ Not Opened'}
                </span>
                <span className={`px-2 py-0.5 rounded text-xs ${campaign.clicked ? 'bg-teal text-white' : 'bg-gray-2 text-gray-3'}`}>
                  {campaign.clicked ? '✓ Clicked' : '✗ Not Clicked'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (system === 'Zendesk') {
    return (
      <div className="bg-white border border-gray-2 rounded-xl p-6">
        <h3 className="text-navy mb-4">Ticket Timeline</h3>
        <div className="space-y-4">
          {rawData.timeline.map((item: any, idx: number) => (
            <div key={idx} className="flex gap-3">
              <div className="flex-shrink-0 w-20 text-gray-3 text-right" style={{ fontSize: '11px' }}>
                {item.date.split(' ').slice(1).join(' ')}
              </div>
              <div className="flex-shrink-0">
                <div className={`w-2 h-2 rounded-full mt-1.5 ${
                  item.type === 'customer' ? 'bg-critical' : 
                  item.type === 'agent' ? 'bg-teal' : 'bg-gray-3'
                }`} />
              </div>
              <div className="flex-1">
                <div className="font-medium mb-1" style={{ fontSize: '13px' }}>{item.event}</div>
                {item.message && (
                  <div className="text-gray-3" style={{ fontSize: '12px' }}>"{item.message}"</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (system === 'Salesforce') {
    return (
      <div className="bg-white border border-gray-2 rounded-xl p-6">
        <h3 className="text-navy mb-4">Score Comparison</h3>
        <div className="border border-gray-2 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-navy text-white">
              <tr>
                <th className="text-left px-4 py-3" style={{ fontSize: '13px', fontWeight: '500' }}>Source</th>
                <th className="text-right px-4 py-3" style={{ fontSize: '13px', fontWeight: '500' }}>Score</th>
                <th className="text-left px-4 py-3" style={{ fontSize: '13px', fontWeight: '500' }}>Reasoning</th>
              </tr>
            </thead>
            <tbody>
              {rawData.comparison.map((comp: any, idx: number) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-1'}>
                  <td className="px-4 py-3" style={{ fontSize: '13px' }}>{comp.source}</td>
                  <td className="text-right px-4 py-3 font-mono font-bold" style={{ fontSize: '16px' }}>
                    {comp.score}
                  </td>
                  <td className="px-4 py-3 text-gray-3" style={{ fontSize: '12px' }}>{comp.reasoning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return null;
}

function ContextRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-3" style={{ fontSize: '12px' }}>{label}</span>
      <span className="font-medium" style={{ fontSize: '12px' }}>{value}</span>
    </div>
  );
}

function RelatedSignalChip({ system, label, active }: { system: string; label: string; active: boolean }) {
  return (
    <Link
      to={`#`}
      className={`block px-3 py-2 rounded-lg border transition-colors ${
        active 
          ? 'bg-teal text-white border-teal' 
          : 'bg-gray-1 text-navy border-gray-2 hover:border-teal'
      }`}
      style={{ fontSize: '12px', fontWeight: '500' }}
    >
      <div className="flex items-center justify-between">
        <span>{label}</span>
        <span className="text-xs opacity-70">{system}</span>
      </div>
    </Link>
  );
}
