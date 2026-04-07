import { 
  TrendingUp, 
  TrendingDown,
  Target,
  Users,
  Mail,
  CheckCircle2,
  XCircle,
  AlertCircle,
  BarChart3
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from "recharts";

const abTests = [
  {
    id: 'test-001',
    name: 'Personal Outreach vs. 10% Discount',
    status: 'completed',
    startDate: '2026-03-01',
    endDate: '2026-03-31',
    audience: 2847,
    variantA: {
      name: 'Personal Outreach',
      size: 1423,
      sent: 1423,
      opened: 1267,
      clicked: 1142,
      redeemed: 1089,
      conversionRate: 76.5,
      avgRiskReduction: 68,
      avgAOV: 142
    },
    variantB: {
      name: '10% Discount',
      size: 1424,
      sent: 1424,
      opened: 1198,
      clicked: 987,
      redeemed: 627,
      conversionRate: 44.0,
      avgRiskReduction: 41,
      avgAOV: 98
    },
    winner: 'A',
    confidence: 99.8,
    riskLevel: 'CRITICAL'
  },
  {
    id: 'test-002',
    name: 'Double Points vs. Free Returns',
    status: 'completed',
    startDate: '2026-02-15',
    endDate: '2026-03-15',
    audience: 1842,
    variantA: {
      name: 'Double Points',
      size: 921,
      sent: 921,
      opened: 784,
      clicked: 692,
      redeemed: 654,
      conversionRate: 71.0,
      avgRiskReduction: 58,
      avgAOV: 134
    },
    variantB: {
      name: 'Free Returns',
      size: 921,
      sent: 921,
      opened: 741,
      clicked: 654,
      redeemed: 626,
      conversionRate: 68.0,
      avgRiskReduction: 52,
      avgAOV: 128
    },
    winner: 'A',
    confidence: 87.3,
    riskLevel: 'HIGH'
  },
  {
    id: 'test-003',
    name: 'Subject Line: Urgency vs. Value',
    status: 'running',
    startDate: '2026-04-01',
    endDate: '2026-04-15',
    audience: 1247,
    variantA: {
      name: 'We miss you (urgency)',
      size: 623,
      sent: 623,
      opened: 412,
      clicked: 289,
      redeemed: 187,
      conversionRate: 30.0,
      avgRiskReduction: 0,
      avgAOV: 0
    },
    variantB: {
      name: 'Special offer inside',
      size: 624,
      sent: 624,
      opened: 456,
      clicked: 342,
      redeemed: 234,
      conversionRate: 37.5,
      avgRiskReduction: 0,
      avgAOV: 0
    },
    winner: null,
    confidence: 72.4,
    riskLevel: 'MEDIUM'
  },
  {
    id: 'test-004',
    name: 'Send Time: Morning vs. Evening',
    status: 'running',
    startDate: '2026-03-25',
    endDate: '2026-04-10',
    audience: 892,
    variantA: {
      name: '9 AM Send',
      size: 446,
      sent: 446,
      opened: 298,
      clicked: 187,
      redeemed: 142,
      conversionRate: 31.8,
      avgRiskReduction: 0,
      avgAOV: 0
    },
    variantB: {
      name: '7 PM Send',
      size: 446,
      sent: 446,
      opened: 312,
      clicked: 201,
      redeemed: 156,
      conversionRate: 35.0,
      avgRiskReduction: 0,
      avgAOV: 0
    },
    winner: null,
    confidence: 64.2,
    riskLevel: 'MEDIUM'
  }
];

const performanceData = [
  { day: 'Day 1', variantA: 12, variantB: 8 },
  { day: 'Day 3', variantA: 28, variantB: 18 },
  { day: 'Day 5', variantA: 42, variantB: 26 },
  { day: 'Day 7', variantA: 58, variantB: 34 },
  { day: 'Day 10', variantA: 68, variantB: 39 },
  { day: 'Day 14', variantA: 73, variantB: 42 },
  { day: 'Day 21', variantA: 76, variantB: 44 },
  { day: 'Day 30', variantA: 76.5, variantB: 44 },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'text-low bg-low-light';
    case 'running': return 'text-teal bg-teal-light';
    case 'draft': return 'text-gray-3 bg-gray-1';
    default: return 'text-gray-3 bg-gray-1';
  }
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

export function ABTestResults() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-navy mb-1">A/B Test Results</h1>
          <p className="text-gray-3" style={{ fontSize: '14px' }}>
            Compare campaign variants and optimize retention strategies
          </p>
        </div>
        <button className="px-5 py-2 bg-teal text-white rounded-lg hover:bg-teal-mid transition-colors flex items-center gap-2" style={{ fontSize: '14px', fontWeight: '500' }}>
          <Target className="w-4 h-4" />
          New A/B Test
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <p className="text-gray-3 mb-1" style={{ fontSize: '13px', fontWeight: '500' }}>Total Tests</p>
          <p className="text-navy mb-1" style={{ fontSize: '28px', fontWeight: '600' }}>4</p>
          <p className="text-gray-3" style={{ fontSize: '13px' }}>2 completed, 2 running</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <p className="text-gray-3 mb-1" style={{ fontSize: '13px', fontWeight: '500' }}>Total Audience</p>
          <p className="text-navy mb-1" style={{ fontSize: '28px', fontWeight: '600' }}>6,828</p>
          <p className="text-gray-3" style={{ fontSize: '13px' }}>Split across variants</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <p className="text-gray-3 mb-1" style={{ fontSize: '13px', fontWeight: '500' }}>Avg Lift</p>
          <p className="text-navy mb-1" style={{ fontSize: '28px', fontWeight: '600' }}>+32.5%</p>
          <p className="text-low" style={{ fontSize: '13px' }}>From winning variants</p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
          <p className="text-gray-3 mb-1" style={{ fontSize: '13px', fontWeight: '500' }}>Confidence</p>
          <p className="text-navy mb-1" style={{ fontSize: '28px', fontWeight: '600' }}>93.6%</p>
          <p className="text-low" style={{ fontSize: '13px' }}>Statistical significance</p>
        </div>
      </div>

      {/* Featured Test Detail */}
      <div className="bg-white rounded-xl border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
        <div className="p-5 border-b border-gray-2">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-navy mb-2">{abTests[0].name}</h3>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded-full ${getStatusColor(abTests[0].status)}`} style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {abTests[0].status}
                </span>
                <span className={`px-2 py-1 rounded ${getRiskColor(abTests[0].riskLevel)}`} style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.5px' }}>
                  {abTests[0].riskLevel}
                </span>
                <span className="text-gray-3" style={{ fontSize: '13px' }}>
                  {abTests[0].startDate} → {abTests[0].endDate}
                </span>
                <span className="text-gray-3" style={{ fontSize: '13px' }}>
                  {abTests[0].audience.toLocaleString()} customers
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-3 mb-1" style={{ fontSize: '12px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Winner
              </p>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-low" />
                <span className="text-navy" style={{ fontSize: '16px', fontWeight: '600' }}>
                  Variant A
                </span>
              </div>
              <p className="text-gray-3 mt-1" style={{ fontSize: '13px' }}>
                {abTests[0].confidence}% confidence
              </p>
            </div>
          </div>
        </div>

        <div className="p-5">
          {/* Comparison Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Variant A */}
            <div className="border-2 border-low rounded-xl p-4 bg-low-light bg-opacity-20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-3 mb-1" style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Variant A
                  </p>
                  <p className="text-navy" style={{ fontSize: '18px', fontWeight: '600' }}>
                    {abTests[0].variantA.name}
                  </p>
                </div>
                <CheckCircle2 className="w-6 h-6 text-low" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-gray-3 mb-1" style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sample Size</p>
                  <p className="text-navy font-mono" style={{ fontSize: '15px', fontWeight: '600' }}>{abTests[0].variantA.size.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-3 mb-1" style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Conv. Rate</p>
                  <p className="text-low font-mono" style={{ fontSize: '15px', fontWeight: '600' }}>{abTests[0].variantA.conversionRate}%</p>
                </div>
                <div>
                  <p className="text-gray-3 mb-1" style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Opened</p>
                  <p className="text-navy font-mono" style={{ fontSize: '15px', fontWeight: '600' }}>{abTests[0].variantA.opened.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-3 mb-1" style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Clicked</p>
                  <p className="text-navy font-mono" style={{ fontSize: '15px', fontWeight: '600' }}>{abTests[0].variantA.clicked.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-3 mb-1" style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Redeemed</p>
                  <p className="text-navy font-mono" style={{ fontSize: '15px', fontWeight: '600' }}>{abTests[0].variantA.redeemed.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-3 mb-1" style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Avg AOV</p>
                  <p className="text-navy font-mono" style={{ fontSize: '15px', fontWeight: '600' }}>${abTests[0].variantA.avgAOV}</p>
                </div>
              </div>
            </div>

            {/* Variant B */}
            <div className="border border-gray-2 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-3 mb-1" style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Variant B
                  </p>
                  <p className="text-navy" style={{ fontSize: '18px', fontWeight: '600' }}>
                    {abTests[0].variantB.name}
                  </p>
                </div>
                <XCircle className="w-6 h-6 text-gray-3" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-gray-3 mb-1" style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sample Size</p>
                  <p className="text-navy font-mono" style={{ fontSize: '15px', fontWeight: '600' }}>{abTests[0].variantB.size.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-3 mb-1" style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Conv. Rate</p>
                  <p className="text-gray-3 font-mono" style={{ fontSize: '15px', fontWeight: '600' }}>{abTests[0].variantB.conversionRate}%</p>
                </div>
                <div>
                  <p className="text-gray-3 mb-1" style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Opened</p>
                  <p className="text-navy font-mono" style={{ fontSize: '15px', fontWeight: '600' }}>{abTests[0].variantB.opened.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-3 mb-1" style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Clicked</p>
                  <p className="text-navy font-mono" style={{ fontSize: '15px', fontWeight: '600' }}>{abTests[0].variantB.clicked.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-3 mb-1" style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Redeemed</p>
                  <p className="text-navy font-mono" style={{ fontSize: '15px', fontWeight: '600' }}>{abTests[0].variantB.redeemed.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-3 mb-1" style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Avg AOV</p>
                  <p className="text-navy font-mono" style={{ fontSize: '15px', fontWeight: '600' }}>${abTests[0].variantB.avgAOV}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="mb-4">
            <h3 className="text-navy mb-4">Conversion Rate Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D0D5DD" />
                <XAxis 
                  dataKey="day" 
                  tick={{ fill: '#8896A7', fontSize: 12 }}
                  stroke="#D0D5DD"
                />
                <YAxis 
                  tick={{ fill: '#8896A7', fontSize: 12 }}
                  stroke="#D0D5DD"
                  label={{ value: 'Conversion Rate (%)', angle: -90, position: 'insideLeft', style: { fill: '#8896A7', fontSize: 12 } }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #D0D5DD',
                    borderRadius: '8px',
                    fontSize: '13px'
                  }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '13px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="variantA" 
                  stroke="#1A6B3C" 
                  strokeWidth={3}
                  name="Variant A (Winner)"
                  dot={{ fill: '#1A6B3C', r: 4 }}
                  key="abtest-line-variantA"
                />
                <Line 
                  type="monotone" 
                  dataKey="variantB" 
                  stroke="#8896A7" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Variant B"
                  dot={{ fill: '#8896A7', r: 3 }}
                  key="abtest-line-variantB"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Key Insights */}
          <div className="bg-teal-light rounded-lg p-4">
            <div className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-navy mb-2" style={{ fontSize: '14px', fontWeight: '600' }}>Key Insights</p>
                <ul className="space-y-1.5 text-navy" style={{ fontSize: '13px' }}>
                  <li className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-low flex-shrink-0 mt-0.5" />
                    <span>Variant A achieved <strong>73.9% higher conversion</strong> than Variant B (+32.5 percentage points)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Target className="w-4 h-4 text-teal flex-shrink-0 mt-0.5" />
                    <span>Personal outreach <strong>significantly outperformed discounting</strong> for CRITICAL risk customers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-ai-purple flex-shrink-0 mt-0.5" />
                    <span>Variant A also showed <strong>65% better risk reduction</strong> (68 pts vs 41 pts) and <strong>45% higher AOV</strong> ($142 vs $98)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Tests List */}
      <div className="bg-white rounded-xl border border-gray-2" style={{ boxShadow: 'var(--shadow-l1)' }}>
        <div className="p-5 border-b border-gray-2">
          <h3 className="text-navy">All A/B Tests</h3>
        </div>
        <div className="divide-y divide-gray-2">
          {abTests.slice(1).map((test) => (
            <div key={test.id} className="p-5 hover:bg-gray-1 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-navy mb-2">{test.name}</h3>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-full ${getStatusColor(test.status)}`} style={{ fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {test.status}
                    </span>
                    <span className={`px-2 py-1 rounded ${getRiskColor(test.riskLevel)}`} style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.5px' }}>
                      {test.riskLevel}
                    </span>
                    <span className="text-gray-3" style={{ fontSize: '13px' }}>
                      {test.startDate} → {test.endDate}
                    </span>
                  </div>
                </div>
                {test.winner ? (
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle2 className="w-4 h-4 text-low" />
                      <span className="text-navy" style={{ fontSize: '14px', fontWeight: '600' }}>
                        Variant {test.winner}
                      </span>
                    </div>
                    <p className="text-gray-3" style={{ fontSize: '12px' }}>
                      {test.confidence}% confidence
                    </p>
                  </div>
                ) : (
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertCircle className="w-4 h-4 text-medium" />
                      <span className="text-medium" style={{ fontSize: '14px', fontWeight: '600' }}>
                        Insufficient data
                      </span>
                    </div>
                    <p className="text-gray-3" style={{ fontSize: '12px' }}>
                      {test.confidence}% confidence
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 bg-gray-1 rounded-lg">
                  <div>
                    <p className="text-gray-3 mb-1" style={{ fontSize: '12px', fontWeight: '500' }}>
                      {test.variantA.name}
                    </p>
                    <p className="text-navy font-mono" style={{ fontSize: '16px', fontWeight: '600' }}>
                      {test.variantA.conversionRate}%
                    </p>
                  </div>
                  <div className="text-right text-gray-3" style={{ fontSize: '12px' }}>
                    <p>{test.variantA.redeemed.toLocaleString()} redeemed</p>
                    <p>{test.variantA.size.toLocaleString()} sample</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-1 rounded-lg">
                  <div>
                    <p className="text-gray-3 mb-1" style={{ fontSize: '12px', fontWeight: '500' }}>
                      {test.variantB.name}
                    </p>
                    <p className="text-navy font-mono" style={{ fontSize: '16px', fontWeight: '600' }}>
                      {test.variantB.conversionRate}%
                    </p>
                  </div>
                  <div className="text-right text-gray-3" style={{ fontSize: '12px' }}>
                    <p>{test.variantB.redeemed.toLocaleString()} redeemed</p>
                    <p>{test.variantB.size.toLocaleString()} sample</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}