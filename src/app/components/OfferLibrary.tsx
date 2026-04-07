import { 
  Plus, 
  Search, 
  Filter,
  Copy,
  Edit2,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  Gift,
  Percent,
  Star,
  Mail,
  Target
} from "lucide-react";

const offers = [
  {
    id: 'offer-001',
    name: 'Personal Outreach',
    type: 'Engagement',
    description: 'Personalized email with CSM signature, no discount',
    icon: Mail,
    iconColor: 'teal',
    discount: 0,
    usageCount: 6284,
    conversionRate: 91,
    avgRiskReduction: 68,
    status: 'active',
    targeting: 'CRITICAL risk',
    lastUsed: '2026-04-07T14:32:00Z',
    avgAOV: 142
  },
  {
    id: 'offer-002',
    name: 'First Redemption Bonus',
    type: 'Loyalty',
    description: '2X points on first redemption from loyalty program',
    icon: Star,
    iconColor: 'ai-purple',
    discount: 0,
    usageCount: 5847,
    conversionRate: 83,
    avgRiskReduction: 72,
    status: 'active',
    targeting: 'Zero redemption',
    lastUsed: '2026-04-07T13:21:00Z',
    avgAOV: 156
  },
  {
    id: 'offer-003',
    name: 'Double Points Weekend',
    type: 'Loyalty',
    description: 'Double loyalty points on all purchases this weekend',
    icon: Gift,
    iconColor: 'low',
    discount: 0,
    usageCount: 4912,
    conversionRate: 71,
    avgRiskReduction: 58,
    status: 'active',
    targeting: 'Session collapse',
    lastUsed: '2026-04-07T11:45:00Z',
    avgAOV: 134
  },
  {
    id: 'offer-004',
    name: 'Free Returns Extension',
    type: 'Service',
    description: 'Extended 60-day free return window',
    icon: Target,
    iconColor: 'teal',
    discount: 0,
    usageCount: 3641,
    conversionRate: 68,
    avgRiskReduction: 52,
    status: 'active',
    targeting: 'Support tickets',
    lastUsed: '2026-04-07T10:12:00Z',
    avgAOV: 128
  },
  {
    id: 'offer-005',
    name: '10% Discount',
    type: 'Price',
    description: 'Flat 10% off next purchase',
    icon: Percent,
    iconColor: 'high',
    discount: 10,
    usageCount: 2847,
    conversionRate: 44,
    avgRiskReduction: 41,
    status: 'active',
    targeting: 'AOV decline',
    lastUsed: '2026-04-07T09:34:00Z',
    avgAOV: 98
  },
  {
    id: 'offer-006',
    name: '15% VIP Discount',
    type: 'Price',
    description: 'VIP exclusive 15% off for high-value customers',
    icon: Percent,
    iconColor: 'medium',
    discount: 15,
    usageCount: 1923,
    conversionRate: 62,
    avgRiskReduction: 55,
    status: 'active',
    targeting: 'High LTV only',
    lastUsed: '2026-04-07T08:22:00Z',
    avgAOV: 186
  },
  {
    id: 'offer-007',
    name: 'Free Shipping + Returns',
    type: 'Service',
    description: 'Free shipping and returns on next order',
    icon: Target,
    iconColor: 'teal',
    discount: 0,
    usageCount: 1547,
    conversionRate: 58,
    avgRiskReduction: 48,
    status: 'active',
    targeting: 'First-time buyer',
    lastUsed: '2026-04-07T07:15:00Z',
    avgAOV: 112
  },
  {
    id: 'offer-008',
    name: '20% Flash Sale',
    type: 'Price',
    description: 'Time-limited 20% discount (24h)',
    icon: Percent,
    iconColor: 'critical',
    discount: 20,
    usageCount: 892,
    conversionRate: 76,
    avgRiskReduction: 61,
    status: 'paused',
    targeting: 'Discount dependent',
    lastUsed: '2026-04-05T14:00:00Z',
    avgAOV: 89
  },
  {
    id: 'offer-009',
    name: 'Early Access Sale',
    type: 'Engagement',
    description: '24h early access to new collection',
    icon: Star,
    iconColor: 'ai-purple',
    discount: 0,
    usageCount: 0,
    conversionRate: 0,
    avgRiskReduction: 0,
    status: 'draft',
    targeting: 'High engagement',
    lastUsed: null,
    avgAOV: 0
  },
];

const getIconColor = (color: string) => {
  const colorMap: Record<string, string> = {
    'teal': 'text-teal bg-teal-light',
    'ai-purple': 'text-ai-purple bg-ai-purple-light',
    'low': 'text-low bg-low-light',
    'high': 'text-high bg-high-light',
    'medium': 'text-medium bg-medium-light',
    'critical': 'text-critical bg-critical-light'
  };
  return colorMap[color] || 'text-gray-3 bg-gray-1';
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'text-low bg-low-light';
    case 'paused': return 'text-medium bg-medium-light';
    case 'draft': return 'text-gray-3 bg-gray-1';
    default: return 'text-gray-3 bg-gray-1';
  }
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

export function OfferLibrary() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-navy mb-1">Offer Library</h1>
          <p className="text-gray-3" style={{ fontSize: '14px' }}>
            Manage retention offer templates and track performance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2 bg-teal text-white rounded-lg hover:bg-teal-mid transition-colors flex items-center gap-2" style={{ fontSize: '14px', fontWeight: '500' }}>
            <Plus className="w-4 h-4" />
            Create Offer
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <p className="text-gray-3 mb-1" style={{ fontSize: '13px', fontWeight: '500' }}>Total Offers</p>
          <p className="text-navy mb-1" style={{ fontSize: '28px', fontWeight: '600' }}>9</p>
          <p className="text-gray-3" style={{ fontSize: '13px' }}>7 active, 1 paused, 1 draft</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <p className="text-gray-3 mb-1" style={{ fontSize: '13px', fontWeight: '500' }}>Total Usage (30d)</p>
          <p className="text-navy mb-1" style={{ fontSize: '28px', fontWeight: '600' }}>27,893</p>
          <p className="text-low" style={{ fontSize: '13px' }}>+14% vs last month</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <p className="text-gray-3 mb-1" style={{ fontSize: '13px', fontWeight: '500' }}>Avg Conversion</p>
          <p className="text-navy mb-1" style={{ fontSize: '28px', fontWeight: '600' }}>64.1%</p>
          <p className="text-low" style={{ fontSize: '13px' }}>Top performer: 91%</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <p className="text-gray-3 mb-1" style={{ fontSize: '13px', fontWeight: '500' }}>Avg Risk Reduction</p>
          <p className="text-navy mb-1" style={{ fontSize: '28px', fontWeight: '600' }}>57 pts</p>
          <p className="text-low" style={{ fontSize: '13px' }}>Best: 72 pts</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-3" />
            <input
              type="text"
              placeholder="Search offers..."
              className="w-full pl-10 pr-4 py-2 border border-gray-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
              style={{ fontSize: '14px' }}
            />
          </div>
          <select className="px-4 py-2 bg-white border border-gray-2 rounded-lg text-black" style={{ fontSize: '14px' }}>
            <option>All Types</option>
            <option>Engagement</option>
            <option>Loyalty</option>
            <option>Service</option>
            <option>Price</option>
          </select>
          <select className="px-4 py-2 bg-white border border-gray-2 rounded-lg text-black" style={{ fontSize: '14px' }}>
            <option>All Status</option>
            <option>Active</option>
            <option>Paused</option>
            <option>Draft</option>
          </select>
          <select className="px-4 py-2 bg-white border border-gray-2 rounded-lg text-black" style={{ fontSize: '14px' }}>
            <option>Sort by Performance</option>
            <option>Sort by Usage</option>
            <option>Sort by Name</option>
            <option>Sort by Created Date</option>
          </select>
          <button className="px-4 py-2 bg-white border border-gray-2 text-navy rounded-lg hover:bg-gray-1 transition-colors flex items-center gap-2" style={{ fontSize: '14px', fontWeight: '500' }}>
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-3 gap-4">
        {offers.map((offer) => {
          const Icon = offer.icon;
          return (
            <div key={offer.id} className="bg-white rounded-xl border border-gray-2 p-5 hover:shadow-md transition-shadow" style={{ boxShadow: 'var(--shadow-l1)' }}>
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getIconColor(offer.iconColor)}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-center ${getStatusColor(offer.status)}`} style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {offer.status}
                  </span>
                  <button className="p-1.5 hover:bg-gray-1 rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4 text-gray-3" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-navy">{offer.name}</h3>
                  {offer.discount > 0 && (
                    <span className="px-2 py-0.5 bg-high-light text-high rounded" style={{ fontSize: '12px', fontWeight: '600' }}>
                      -{offer.discount}%
                    </span>
                  )}
                </div>
                <p className="text-gray-3 mb-3" style={{ fontSize: '13px' }}>
                  {offer.description}
                </p>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-gray-1 text-gray-3 rounded" style={{ fontSize: '12px', fontWeight: '500' }}>
                    {offer.type}
                  </span>
                  <span className="text-gray-3" style={{ fontSize: '12px' }}>
                    {offer.targeting}
                  </span>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-4 pt-4 border-t border-gray-2">
                <div>
                  <p className="text-gray-3 mb-1" style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Usage</p>
                  <p className="text-navy font-mono" style={{ fontSize: '16px', fontWeight: '600' }}>
                    {offer.usageCount > 0 ? offer.usageCount.toLocaleString() : '—'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-3 mb-1" style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Conv. Rate</p>
                  <div className="flex items-center gap-1">
                    <p className={`font-mono ${offer.conversionRate >= 70 ? 'text-low' : offer.conversionRate >= 50 ? 'text-navy' : 'text-gray-3'}`} style={{ fontSize: '16px', fontWeight: '600' }}>
                      {offer.conversionRate > 0 ? `${offer.conversionRate}%` : '—'}
                    </p>
                    {offer.conversionRate >= 70 && <TrendingUp className="w-4 h-4 text-low" />}
                    {offer.conversionRate > 0 && offer.conversionRate < 50 && <TrendingDown className="w-4 h-4 text-high" />}
                  </div>
                </div>
                <div>
                  <p className="text-gray-3 mb-1" style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Risk Reduction</p>
                  <p className="text-navy font-mono" style={{ fontSize: '16px', fontWeight: '600' }}>
                    {offer.avgRiskReduction > 0 ? `${offer.avgRiskReduction} pts` : '—'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-3 mb-1" style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Avg AOV</p>
                  <p className="text-navy font-mono" style={{ fontSize: '16px', fontWeight: '600' }}>
                    {offer.avgAOV > 0 ? `$${offer.avgAOV}` : '—'}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-2">
                <span className="text-gray-3" style={{ fontSize: '12px' }}>
                  Last used {formatTimeAgo(offer.lastUsed)}
                </span>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-1 rounded-lg transition-colors" title="Edit">
                    <Edit2 className="w-4 h-4 text-gray-3" />
                  </button>
                  <button className="p-2 hover:bg-gray-1 rounded-lg transition-colors" title="Duplicate">
                    <Copy className="w-4 h-4 text-gray-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
