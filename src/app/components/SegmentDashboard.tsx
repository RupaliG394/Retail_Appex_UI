import { 
  Users, 
  TrendingUp,
  TrendingDown,
  Target,
  DollarSign,
  ShoppingCart,
  Calendar,
  Filter,
  Download
} from "lucide-react";
import { 
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

const segments = [
  {
    id: 'seg-001',
    name: 'CRITICAL Risk',
    size: 847,
    trend: -12.3,
    avgRiskScore: 91,
    avgLTV: 2847,
    churnRate: 68.2,
    interventionRate: 94,
    successRate: 76.5,
    characteristics: ['High LTV', 'Session collapse', 'Multiple red flags'],
    color: '#C0392B'
  },
  {
    id: 'seg-002',
    name: 'HIGH Risk',
    size: 1203,
    trend: -8.7,
    avgRiskScore: 82,
    avgLTV: 1642,
    churnRate: 52.4,
    interventionRate: 87,
    successRate: 71.2,
    characteristics: ['AOV decline', 'Reduced engagement', 'Support tickets'],
    color: '#D35400'
  },
  {
    id: 'seg-003',
    name: 'MEDIUM Risk',
    size: 2841,
    trend: 3.2,
    avgRiskScore: 67,
    avgLTV: 892,
    churnRate: 32.1,
    interventionRate: 64,
    successRate: 68.9,
    characteristics: ['Zero redemption', 'Discount dependent', 'New members'],
    color: '#D4AC0D'
  },
  {
    id: 'seg-004',
    name: 'LOW Risk',
    size: 1940,
    trend: 7.8,
    avgRiskScore: 42,
    avgLTV: 524,
    churnRate: 18.3,
    interventionRate: 28,
    successRate: 62.4,
    characteristics: ['Stable engagement', 'Consistent purchase', 'Low signals'],
    color: '#1A6B3C'
  },
  {
    id: 'seg-005',
    name: 'VIP High Value',
    size: 412,
    trend: 4.1,
    avgRiskScore: 38,
    avgLTV: 8247,
    churnRate: 12.8,
    interventionRate: 98,
    successRate: 94.2,
    characteristics: ['Top 5% LTV', 'Personalized service', 'White glove'],
    color: '#7C3AED'
  },
  {
    id: 'seg-006',
    name: 'New Customers (< 90d)',
    size: 1547,
    trend: 12.4,
    avgRiskScore: 54,
    avgLTV: 284,
    churnRate: 38.7,
    interventionRate: 72,
    successRate: 58.3,
    characteristics: ['First 90 days', 'Onboarding phase', 'Building habits'],
    color: '#006D77'
  }
];

const segmentSizeData = segments.map(s => ({
  name: s.name,
  value: s.size,
  color: s.color
}));

const riskDistributionData = [
  { month: 'Oct', critical: 982, high: 1456, medium: 2641, low: 1734 },
  { month: 'Nov', critical: 924, high: 1389, medium: 2723, low: 1812 },
  { month: 'Dec', critical: 891, high: 1298, medium: 2784, low: 1889 },
  { month: 'Jan', critical: 863, high: 1247, medium: 2812, low: 1923 },
  { month: 'Feb', critical: 847, high: 1203, medium: 2841, low: 1940 },
];

export function SegmentDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-navy mb-1">Segment Dashboard</h1>
          <p className="text-gray-3" style={{ fontSize: '14px' }}>
            Analyze customer segments, trends, and intervention effectiveness
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 bg-white border border-gray-2 rounded-lg text-black" style={{ fontSize: '14px' }}>
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
            <option>Last 6 months</option>
          </select>
          <button className="px-5 py-2 bg-teal text-white rounded-lg hover:bg-teal-mid transition-colors flex items-center gap-2" style={{ fontSize: '14px', fontWeight: '500' }}>
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-3" style={{ fontSize: '13px', fontWeight: '500' }}>Total Customers</p>
            <Users className="w-5 h-5 text-teal" />
          </div>
          <p className="text-navy mb-1" style={{ fontSize: '28px', fontWeight: '600' }}>
            {segments.reduce((sum, s) => sum + s.size, 0).toLocaleString()}
          </p>
          <p className="text-low" style={{ fontSize: '13px' }}>Across 6 segments</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-3" style={{ fontSize: '13px', fontWeight: '500' }}>At-Risk Customers</p>
            <Target className="w-5 h-5 text-critical" />
          </div>
          <p className="text-navy mb-1" style={{ fontSize: '28px', fontWeight: '600' }}>
            {(segments[0].size + segments[1].size).toLocaleString()}
          </p>
          <p className="text-low" style={{ fontSize: '13px' }}>-10.2% this month</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-3" style={{ fontSize: '13px', fontWeight: '500' }}>Avg Intervention Rate</p>
            <ShoppingCart className="w-5 h-5 text-teal" />
          </div>
          <p className="text-navy mb-1" style={{ fontSize: '28px', fontWeight: '600' }}>72.4%</p>
          <p className="text-gray-3" style={{ fontSize: '13px' }}>Of at-risk customers</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-3" style={{ fontSize: '13px', fontWeight: '500' }}>Avg Success Rate</p>
            <TrendingUp className="w-5 h-5 text-low" />
          </div>
          <p className="text-navy mb-1" style={{ fontSize: '28px', fontWeight: '600' }}>71.9%</p>
          <p className="text-low" style={{ fontSize: '13px' }}>Above target</p>
        </div>
      </div>

      {/* Segment Size Distribution */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-2 p-6" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <h3 className="text-navy mb-4">Segment Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={segmentSizeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {segmentSizeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #D0D5DD',
                  borderRadius: '8px',
                  fontSize: '13px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Distribution Trend */}
        <div className="bg-white rounded-xl border border-gray-2 p-6" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <h3 className="text-navy mb-4">Risk Distribution Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={riskDistributionData}>
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
              <Bar dataKey="critical" stackId="a" fill="#C0392B" name="CRITICAL" radius={[0, 0, 0, 0]} />
              <Bar dataKey="high" stackId="a" fill="#D35400" name="HIGH" radius={[0, 0, 0, 0]} />
              <Bar dataKey="medium" stackId="a" fill="#D4AC0D" name="MEDIUM" radius={[0, 0, 0, 0]} />
              <Bar dataKey="low" stackId="a" fill="#1A6B3C" name="LOW" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Segment Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-navy">Segment Details</h3>
          <button className="px-4 py-2 bg-white border border-gray-2 text-navy rounded-lg hover:bg-gray-1 transition-colors flex items-center gap-2" style={{ fontSize: '14px', fontWeight: '500' }}>
            <Filter className="w-4 h-4" />
            Filter Segments
          </button>
        </div>

        {segments.map((segment) => (
          <div key={segment.id} className="bg-white rounded-xl border border-gray-2 overflow-hidden" style={{ boxShadow: 'var(--shadow-l1)' }}>
            <div className="p-5 border-b border-gray-2 bg-gray-1 bg-opacity-30">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${segment.color}20`, color: segment.color }}
                  >
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-navy">{segment.name}</h3>
                      <div className="flex items-center gap-1">
                        {segment.trend > 0 ? (
                          <>
                            <TrendingUp className="w-4 h-4 text-high" />
                            <span className="text-high" style={{ fontSize: '13px', fontWeight: '600' }}>
                              +{segment.trend}%
                            </span>
                          </>
                        ) : (
                          <>
                            <TrendingDown className="w-4 h-4 text-low" />
                            <span className="text-low" style={{ fontSize: '13px', fontWeight: '600' }}>
                              {segment.trend}%
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-gray-3" style={{ fontSize: '13px' }}>
                      {segment.characteristics.map((char, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-1 rounded" style={{ fontSize: '12px' }}>
                          {char}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="flex items-center gap-4 ml-6">
                  <div className="text-center px-4 py-2 bg-white rounded-lg border border-gray-2">
                    <p className="text-gray-3 mb-1" style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Size
                    </p>
                    <p className="text-navy font-mono" style={{ fontSize: '18px', fontWeight: '600' }}>
                      {segment.size.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center px-4 py-2 bg-white rounded-lg border border-gray-2">
                    <p className="text-gray-3 mb-1" style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Risk Score
                    </p>
                    <p className="text-navy font-mono" style={{ fontSize: '18px', fontWeight: '600' }}>
                      {segment.avgRiskScore}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Metrics */}
            <div className="p-5">
              <div className="grid grid-cols-5 gap-4">
                <div>
                  <p className="text-gray-3 mb-1" style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Avg LTV
                  </p>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-3" />
                    <p className="text-navy font-mono" style={{ fontSize: '16px', fontWeight: '600' }}>
                      ${segment.avgLTV.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-3 mb-1" style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Churn Rate
                  </p>
                  <p className={`font-mono ${segment.churnRate > 50 ? 'text-critical' : segment.churnRate > 30 ? 'text-high' : 'text-navy'}`} style={{ fontSize: '16px', fontWeight: '600' }}>
                    {segment.churnRate}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-3 mb-1" style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Intervention Rate
                  </p>
                  <p className="text-navy font-mono" style={{ fontSize: '16px', fontWeight: '600' }}>
                    {segment.interventionRate}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-3 mb-1" style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Success Rate
                  </p>
                  <p className={`font-mono ${segment.successRate >= 70 ? 'text-low' : 'text-navy'}`} style={{ fontSize: '16px', fontWeight: '600' }}>
                    {segment.successRate}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-3 mb-1" style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Total Value
                  </p>
                  <p className="text-navy font-mono" style={{ fontSize: '16px', fontWeight: '600' }}>
                    ${((segment.size * segment.avgLTV) / 1000).toFixed(0)}K
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
