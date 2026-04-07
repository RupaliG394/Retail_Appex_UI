import { 
  Plus, 
  Search, 
  Filter,
  Play,
  Pause,
  Copy,
  MoreVertical,
  Users,
  Target,
  TrendingUp,
  Mail,
  Calendar,
  Activity
} from "lucide-react";

const campaigns = [
  {
    id: 'camp-001',
    name: 'CRITICAL Risk Recovery',
    status: 'active',
    target: 'Risk Score ≥ 85',
    audience: 847,
    sent: 6284,
    engaged: 4512,
    redeemed: 2847,
    conversionRate: 45.3,
    startDate: '2026-01-15',
    lastSend: '2026-04-07T14:32:00Z',
    offers: ['Personal Outreach', 'First Redemption'],
    riskLevel: 'CRITICAL'
  },
  {
    id: 'camp-002',
    name: 'Session Collapse Prevention',
    status: 'active',
    target: 'GA Sessions < 3 (30d)',
    audience: 1203,
    sent: 3847,
    engaged: 2912,
    redeemed: 1634,
    conversionRate: 42.5,
    startDate: '2026-02-01',
    lastSend: '2026-04-07T12:18:00Z',
    offers: ['Double Points', 'Free Returns'],
    riskLevel: 'HIGH'
  },
  {
    id: 'camp-003',
    name: 'Zero Redemption Rescue',
    status: 'active',
    target: 'Loyalty member, 0 redemptions',
    audience: 2841,
    sent: 8912,
    engaged: 6234,
    redeemed: 4156,
    conversionRate: 46.6,
    startDate: '2025-12-10',
    lastSend: '2026-04-07T10:45:00Z',
    offers: ['First Redemption', '10% Discount'],
    riskLevel: 'MEDIUM'
  },
  {
    id: 'camp-004',
    name: 'Discount Dependency Weaning',
    status: 'paused',
    target: 'Only purchases with offers',
    audience: 1642,
    sent: 4523,
    engaged: 3156,
    redeemed: 1892,
    conversionRate: 41.8,
    startDate: '2026-03-01',
    lastSend: '2026-04-05T16:22:00Z',
    offers: ['Personal Outreach'],
    riskLevel: 'MEDIUM'
  },
  {
    id: 'camp-005',
    name: 'AOV Decline Recovery',
    status: 'active',
    target: 'AOV down >30% vs baseline',
    audience: 892,
    sent: 2641,
    engaged: 1847,
    redeemed: 1123,
    conversionRate: 42.5,
    startDate: '2026-02-15',
    lastSend: '2026-04-07T09:12:00Z',
    offers: ['Double Points', 'Free Returns'],
    riskLevel: 'HIGH'
  },
  {
    id: 'camp-006',
    name: 'Support Ticket Intervention',
    status: 'draft',
    target: '≥2 support tickets (14d)',
    audience: 456,
    sent: 0,
    engaged: 0,
    redeemed: 0,
    conversionRate: 0,
    startDate: null,
    lastSend: null,
    offers: ['Personal Outreach', 'Free Returns'],
    riskLevel: 'HIGH'
  },
];

const getRiskColor = (level: string) => {
  switch (level) {
    case 'CRITICAL': return 'text-critical bg-critical-light';
    case 'HIGH': return 'text-high bg-high-light';
    case 'MEDIUM': return 'text-medium bg-medium-light';
    case 'LOW': return 'text-low bg-low-light';
    default: return 'text-gray-3 bg-gray-1';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'text-low bg-low-light';
    case 'paused': return 'text-medium bg-medium-light';
    case 'draft': return 'text-gray-3 bg-gray-1';
    default: return 'text-gray-3 bg-gray-1';
  }
};

const formatDate = (dateString: string | null) => {
  if (!dateString) return 'Not scheduled';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const formatTimeAgo = (dateString: string | null) => {
  if (!dateString) return 'Never';
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

export function CampaignManager() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-navy mb-1">Campaign Manager</h1>
          <p className="text-gray-3" style={{ fontSize: '14px' }}>
            Design, deploy, and monitor automated retention campaigns
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2 bg-teal text-white rounded-lg hover:bg-teal-mid transition-colors flex items-center gap-2" style={{ fontSize: '14px', fontWeight: '500' }}>
            <Plus className="w-4 h-4" />
            New Campaign
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-3" style={{ fontSize: '13px', fontWeight: '500' }}>Active Campaigns</p>
            <Activity className="w-5 h-5 text-teal" />
          </div>
          <p className="text-navy mb-1" style={{ fontSize: '28px', fontWeight: '600' }}>4</p>
          <p className="text-gray-3" style={{ fontSize: '13px' }}>1 paused, 1 draft</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-3" style={{ fontSize: '13px', fontWeight: '500' }}>Total Audience</p>
            <Users className="w-5 h-5 text-teal" />
          </div>
          <p className="text-navy mb-1" style={{ fontSize: '28px', fontWeight: '600' }}>6,831</p>
          <p className="text-low" style={{ fontSize: '13px' }}>+12% this month</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-3" style={{ fontSize: '13px', fontWeight: '500' }}>Messages Sent (30d)</p>
            <Mail className="w-5 h-5 text-teal" />
          </div>
          <p className="text-navy mb-1" style={{ fontSize: '28px', fontWeight: '600' }}>26,207</p>
          <p className="text-low" style={{ fontSize: '13px' }}>94% delivered</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-3" style={{ fontSize: '13px', fontWeight: '500' }}>Avg Conversion</p>
            <TrendingUp className="w-5 h-5 text-low" />
          </div>
          <p className="text-navy mb-1" style={{ fontSize: '28px', fontWeight: '600' }}>43.7%</p>
          <p className="text-low" style={{ fontSize: '13px' }}>+5.2% vs last month</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-3" />
            <input
              type="text"
              placeholder="Search campaigns..."
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
            <option>All Risk Levels</option>
            <option>CRITICAL</option>
            <option>HIGH</option>
            <option>MEDIUM</option>
            <option>LOW</option>
          </select>
          <button className="px-4 py-2 bg-white border border-gray-2 text-navy rounded-lg hover:bg-gray-1 transition-colors flex items-center gap-2" style={{ fontSize: '14px', fontWeight: '500' }}>
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-xl border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-2">
                <th className="text-left p-4 text-gray-3" style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Campaign</th>
                <th className="text-left p-4 text-gray-3" style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
                <th className="text-left p-4 text-gray-3" style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Target Criteria</th>
                <th className="text-right p-4 text-gray-3" style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Audience</th>
                <th className="text-right p-4 text-gray-3" style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sent</th>
                <th className="text-right p-4 text-gray-3" style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Engaged</th>
                <th className="text-right p-4 text-gray-3" style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Redeemed</th>
                <th className="text-right p-4 text-gray-3" style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Conv. Rate</th>
                <th className="text-left p-4 text-gray-3" style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Last Send</th>
                <th className="text-right p-4 text-gray-3" style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-2">
              {campaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-1 transition-colors">
                  <td className="p-4">
                    <div>
                      <p className="text-navy mb-1" style={{ fontSize: '14px', fontWeight: '500' }}>
                        {campaign.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-center ${getRiskColor(campaign.riskLevel)}`} style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.5px' }}>
                          {campaign.riskLevel}
                        </span>
                        <span className="text-gray-3" style={{ fontSize: '12px' }}>
                          {campaign.offers.join(', ')}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-center inline-block ${getStatusColor(campaign.status)}`} style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <p className="text-navy" style={{ fontSize: '13px' }}>{campaign.target}</p>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Users className="w-4 h-4 text-gray-3" />
                      <span className="text-navy font-mono" style={{ fontSize: '14px', fontWeight: '500' }}>
                        {campaign.audience.toLocaleString()}
                      </span>
                    </div>
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
                      {campaign.sent > 0 && (
                        <p className="text-gray-3" style={{ fontSize: '12px' }}>
                          {((campaign.engaged / campaign.sent) * 100).toFixed(1)}%
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div>
                      <span className="text-navy font-mono" style={{ fontSize: '14px', fontWeight: '500' }}>
                        {campaign.redeemed.toLocaleString()}
                      </span>
                      {campaign.sent > 0 && (
                        <p className="text-gray-3" style={{ fontSize: '12px' }}>
                          {((campaign.redeemed / campaign.sent) * 100).toFixed(1)}%
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <span className={`text-navy font-mono ${campaign.conversionRate > 40 ? 'text-low' : ''}`} style={{ fontSize: '15px', fontWeight: '600' }}>
                      {campaign.conversionRate > 0 ? `${campaign.conversionRate.toFixed(1)}%` : '—'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="text-navy" style={{ fontSize: '13px' }}>
                        {formatTimeAgo(campaign.lastSend)}
                      </p>
                      {campaign.startDate && (
                        <p className="text-gray-3" style={{ fontSize: '12px' }}>
                          Started {formatDate(campaign.startDate)}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {campaign.status === 'active' ? (
                        <button className="p-2 hover:bg-gray-2 rounded-lg transition-colors" title="Pause">
                          <Pause className="w-4 h-4 text-gray-3" />
                        </button>
                      ) : campaign.status === 'paused' ? (
                        <button className="p-2 hover:bg-gray-2 rounded-lg transition-colors" title="Resume">
                          <Play className="w-4 h-4 text-teal" />
                        </button>
                      ) : (
                        <button className="p-2 hover:bg-gray-2 rounded-lg transition-colors" title="Activate">
                          <Play className="w-4 h-4 text-teal" />
                        </button>
                      )}
                      <button className="p-2 hover:bg-gray-2 rounded-lg transition-colors" title="Duplicate">
                        <Copy className="w-4 h-4 text-gray-3" />
                      </button>
                      <button className="p-2 hover:bg-gray-2 rounded-lg transition-colors" title="More">
                        <MoreVertical className="w-4 h-4 text-gray-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
