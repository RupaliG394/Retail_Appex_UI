import { 
  Calendar,
  TrendingUp,
  TrendingDown,
  Target,
  Users,
  Mail,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Download,
  ChevronRight
} from "lucide-react";

const weekSummary = {
  period: 'Mar 31 - Apr 6, 2026',
  highlights: [
    {
      metric: 'Churn Rate',
      value: '21.4%',
      change: -0.3,
      trend: 'down',
      status: 'good',
      detail: 'Down 0.3 pts from last week'
    },
    {
      metric: 'At-Risk Customers',
      value: '2,050',
      change: -147,
      trend: 'down',
      status: 'good',
      detail: '147 fewer than last week'
    },
    {
      metric: 'Interventions Sent',
      value: '1,247',
      change: 98,
      trend: 'up',
      status: 'good',
      detail: '+8.5% vs last week'
    },
    {
      metric: 'Success Rate',
      value: '73.2%',
      change: 1.8,
      trend: 'up',
      status: 'good',
      detail: 'Above 70% target'
    }
  ],
  wins: [
    {
      title: 'CRITICAL Risk Campaign Hit 91% Conversion',
      description: 'Personal Outreach strategy delivered exceptional results with high-value customers',
      impact: 'Saved $127K in potential churn',
      icon: Target
    },
    {
      title: 'Zero Redemption Campaign Milestone',
      description: '847 loyalty members redeemed points for first time this week',
      impact: '83% conversion rate achieved',
      icon: CheckCircle2
    },
    {
      title: 'AI Agent Automation Reached 91%',
      description: 'Majority of briefs now auto-approved and sent without human review',
      impact: 'Reduced manual review time by 64%',
      icon: TrendingUp
    }
  ],
  concerns: [
    {
      title: 'Support Ticket Volume Increasing',
      description: 'Support-related churn triggers up 23% week-over-week',
      action: 'Recommend enabling Support Ticket Recovery campaign',
      priority: 'medium',
      icon: AlertTriangle
    },
    {
      title: 'Discount Dependency Growing',
      description: '1,456 customers now flagged as discount-dependent (+12%)',
      action: 'Review discount strategy and frequency caps',
      priority: 'medium',
      icon: AlertTriangle
    }
  ],
  campaignPerformance: [
    {
      name: 'CRITICAL Risk Recovery',
      sent: 234,
      engaged: 198,
      redeemed: 178,
      conversionRate: 76.1,
      status: 'excellent'
    },
    {
      name: 'Session Collapse Prevention',
      sent: 412,
      engaged: 321,
      redeemed: 247,
      conversionRate: 60.0,
      status: 'good'
    },
    {
      name: 'Zero Redemption Rescue',
      sent: 601,
      engaged: 523,
      redeemed: 498,
      conversionRate: 82.9,
      status: 'excellent'
    }
  ],
  topActions: [
    { action: 'Review and approve new Support Ticket Recovery campaign', priority: 'high' },
    { action: 'Analyze discount dependency segment for strategy adjustment', priority: 'medium' },
    { action: 'Schedule A/B test for new subject lines (in progress)', priority: 'low' },
    { action: 'Update Personal Outreach template based on feedback', priority: 'low' }
  ]
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'excellent': return 'text-low bg-low-light';
    case 'good': return 'text-teal bg-teal-light';
    case 'attention': return 'text-medium bg-medium-light';
    default: return 'text-gray-3 bg-gray-1';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'text-critical bg-critical-light';
    case 'medium': return 'text-medium bg-medium-light';
    case 'low': return 'text-gray-3 bg-gray-1';
    default: return 'text-gray-3 bg-gray-1';
  }
};

export function WeeklyReview() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-navy mb-1">Weekly Review</h1>
          <p className="text-gray-3" style={{ fontSize: '14px' }}>
            {weekSummary.period}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 bg-white border border-gray-2 rounded-lg text-black" style={{ fontSize: '14px' }}>
            <option>This Week</option>
            <option>Last Week</option>
            <option>2 Weeks Ago</option>
            <option>3 Weeks Ago</option>
          </select>
          <button className="px-5 py-2 bg-teal text-white rounded-lg hover:bg-teal-mid transition-colors flex items-center gap-2" style={{ fontSize: '14px', fontWeight: '500' }}>
            <Download className="w-4 h-4" />
            Export Review
          </button>
        </div>
      </div>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-4 gap-4">
        {weekSummary.highlights.map((highlight, idx) => (
          <div key={idx} className="bg-white rounded-xl p-5 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
            <p className="text-gray-3 mb-2" style={{ fontSize: '13px', fontWeight: '500' }}>
              {highlight.metric}
            </p>
            <p className="text-navy mb-2" style={{ fontSize: '28px', fontWeight: '600' }}>
              {highlight.value}
            </p>
            <div className="flex items-center gap-2">
              {highlight.trend === 'down' ? (
                <TrendingDown className={`w-4 h-4 ${highlight.status === 'good' ? 'text-low' : 'text-critical'}`} />
              ) : (
                <TrendingUp className={`w-4 h-4 ${highlight.status === 'good' ? 'text-low' : 'text-critical'}`} />
              )}
              <span className={highlight.status === 'good' ? 'text-low' : 'text-critical'} style={{ fontSize: '13px', fontWeight: '600' }}>
                {highlight.change > 0 ? '+' : ''}{highlight.change}
              </span>
            </div>
            <p className="text-gray-3 mt-1" style={{ fontSize: '12px' }}>
              {highlight.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Wins This Week */}
      <div className="bg-white rounded-xl border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
        <div className="p-5 border-b border-gray-2 bg-low-light bg-opacity-30">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-low" />
            <h3 className="text-navy">Wins This Week</h3>
          </div>
        </div>
        <div className="divide-y divide-gray-2">
          {weekSummary.wins.map((win, idx) => {
            const Icon = win.icon;
            return (
              <div key={idx} className="p-5 hover:bg-gray-1 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-low-light flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-low" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-navy mb-2">{win.title}</h3>
                    <p className="text-gray-3 mb-2" style={{ fontSize: '14px' }}>
                      {win.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-low-light text-low rounded-full" style={{ fontSize: '12px', fontWeight: '600' }}>
                        {win.impact}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Concerns & Actions */}
      <div className="bg-white rounded-xl border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
        <div className="p-5 border-b border-gray-2 bg-medium-light bg-opacity-30">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-medium" />
            <h3 className="text-navy">Concerns & Recommended Actions</h3>
          </div>
        </div>
        <div className="divide-y divide-gray-2">
          {weekSummary.concerns.map((concern, idx) => {
            const Icon = concern.icon;
            return (
              <div key={idx} className="p-5 hover:bg-gray-1 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-medium-light flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-medium" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-navy">{concern.title}</h3>
                      <span className={`px-2 py-1 rounded ${getPriorityColor(concern.priority)}`} style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {concern.priority}
                      </span>
                    </div>
                    <p className="text-gray-3 mb-3" style={{ fontSize: '14px' }}>
                      {concern.description}
                    </p>
                    <div className="flex items-center gap-2 text-navy" style={{ fontSize: '14px', fontWeight: '500' }}>
                      <Target className="w-4 h-4" />
                      <span>Action: {concern.action}</span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal-mid transition-colors" style={{ fontSize: '13px', fontWeight: '500' }}>
                    Take Action
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Campaign Performance */}
      <div className="bg-white rounded-xl border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
        <div className="p-5 border-b border-gray-2">
          <h3 className="text-navy">Campaign Performance This Week</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-2">
                <th className="text-left p-4 text-gray-3" style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Campaign</th>
                <th className="text-right p-4 text-gray-3" style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sent</th>
                <th className="text-right p-4 text-gray-3" style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Engaged</th>
                <th className="text-right p-4 text-gray-3" style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Redeemed</th>
                <th className="text-right p-4 text-gray-3" style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Conv. Rate</th>
                <th className="text-left p-4 text-gray-3" style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-2">
              {weekSummary.campaignPerformance.map((campaign, idx) => (
                <tr key={idx} className="hover:bg-gray-1 transition-colors">
                  <td className="p-4">
                    <p className="text-navy" style={{ fontSize: '14px', fontWeight: '500' }}>
                      {campaign.name}
                    </p>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-navy font-mono" style={{ fontSize: '14px', fontWeight: '500' }}>
                      {campaign.sent.toLocaleString()}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div>
                      <span className="text-navy font-mono" style={{ fontSize: '14px', fontWeight: '500' }}>
                        {campaign.engaged.toLocaleString()}
                      </span>
                      <p className="text-gray-3" style={{ fontSize: '12px' }}>
                        {((campaign.engaged / campaign.sent) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div>
                      <span className="text-navy font-mono" style={{ fontSize: '14px', fontWeight: '500' }}>
                        {campaign.redeemed.toLocaleString()}
                      </span>
                      <p className="text-gray-3" style={{ fontSize: '12px' }}>
                        {((campaign.redeemed / campaign.sent) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <span className={`font-mono ${campaign.conversionRate >= 70 ? 'text-low' : 'text-navy'}`} style={{ fontSize: '16px', fontWeight: '600' }}>
                      {campaign.conversionRate.toFixed(1)}%
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full ${getStatusColor(campaign.status)}`} style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {campaign.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Items */}
      <div className="bg-white rounded-xl border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
        <div className="p-5 border-b border-gray-2">
          <h3 className="text-navy">Recommended Actions for Next Week</h3>
        </div>
        <div className="divide-y divide-gray-2">
          {weekSummary.topActions.map((action, idx) => (
            <div key={idx} className="p-4 hover:bg-gray-1 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <span className={`px-2 py-1 rounded ${getPriorityColor(action.priority)}`} style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {action.priority}
                  </span>
                  <p className="text-navy" style={{ fontSize: '14px' }}>
                    {action.action}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-3" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Note */}
      <div className="bg-teal-light border border-teal rounded-xl p-5">
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-navy mb-2" style={{ fontSize: '15px', fontWeight: '600' }}>
              Weekly Review Summary
            </p>
            <p className="text-navy" style={{ fontSize: '14px' }}>
              Overall, this was a strong week with continued churn rate improvement and excellent campaign performance. 
              The CRITICAL Risk and Zero Redemption campaigns are delivering exceptional results. 
              Key focus areas for next week: address growing support ticket volume and review discount dependency strategy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
