import { 
  TrendingUp, 
  TrendingDown,
  Download,
  Calendar,
  Target,
  Users,
  Mail,
  DollarSign
} from "lucide-react";
import { 
  LineChart, 
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from "recharts";

const churnTrendData = [
  { month: 'Oct 25', before: 28.0, after: 28.0 },
  { month: 'Nov', before: 28.0, after: 26.8 },
  { month: 'Dec', before: 28.0, after: 25.2 },
  { month: 'Jan 26', before: 28.0, after: 23.9 },
  { month: 'Feb', before: 28.0, after: 22.7 },
  { month: 'Mar', before: 28.0, after: 21.4 },
];

const revenueImpactData = [
  { month: 'Oct', saved: 124000, prevented: 89000 },
  { month: 'Nov', saved: 142000, prevented: 98000 },
  { month: 'Dec', saved: 168000, prevented: 112000 },
  { month: 'Jan', saved: 189000, prevented: 127000 },
  { month: 'Feb', saved: 205000, prevented: 138000 },
  { month: 'Mar', saved: 228000, prevented: 156000 },
];

const campaignPerformanceData = [
  { week: 'W1', sent: 1247, engaged: 892, redeemed: 634 },
  { week: 'W2', sent: 1389, engaged: 1012, redeemed: 723 },
  { week: 'W3', sent: 1456, engaged: 1098, redeemed: 812 },
  { week: 'W4', sent: 1523, engaged: 1156, redeemed: 891 },
];

const riskReductionData = [
  { segment: 'CRITICAL', before: 91, after: 23, improvement: 68 },
  { segment: 'HIGH', before: 82, after: 29, improvement: 53 },
  { segment: 'MEDIUM', before: 67, after: 28, improvement: 39 },
  { segment: 'LOW', before: 42, after: 18, improvement: 24 },
];

export function PerformanceReport() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-navy mb-1">Performance Report</h1>
          <p className="text-gray-3" style={{ fontSize: '14px' }}>
            Comprehensive analysis of retention program effectiveness
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 bg-white border border-gray-2 rounded-lg text-black" style={{ fontSize: '14px' }}>
            <option>Last 6 months</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Last 12 months</option>
            <option>Custom range</option>
          </select>
          <button className="px-5 py-2 bg-teal text-white rounded-lg hover:bg-teal-mid transition-colors flex items-center gap-2" style={{ fontSize: '14px', fontWeight: '500' }}>
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="bg-white rounded-xl border border-gray-2 p-6" style={{ boxShadow: 'var(--shadow-l1)' }}>
        <h3 className="text-navy mb-4">Executive Summary</h3>
        <div className="grid grid-cols-4 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-5 h-5 text-low" />
              <p className="text-gray-3" style={{ fontSize: '13px', fontWeight: '500' }}>Churn Rate Reduction</p>
            </div>
            <p className="text-navy mb-1" style={{ fontSize: '32px', fontWeight: '600' }}>-23.6%</p>
            <p className="text-low" style={{ fontSize: '14px', fontWeight: '500' }}>
              From 28.0% → 21.4%
            </p>
            <p className="text-gray-3 mt-2" style={{ fontSize: '13px' }}>
              6.6 percentage point improvement since program launch
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-low" />
              <p className="text-gray-3" style={{ fontSize: '13px', fontWeight: '500' }}>Revenue Protected</p>
            </div>
            <p className="text-navy mb-1" style={{ fontSize: '32px', fontWeight: '600' }}>$1.25M</p>
            <p className="text-low" style={{ fontSize: '14px', fontWeight: '500' }}>
              +84% vs baseline
            </p>
            <p className="text-gray-3 mt-2" style={{ fontSize: '13px' }}>
              Total lifetime value retained through interventions
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-low" />
              <p className="text-gray-3" style={{ fontSize: '13px', fontWeight: '500' }}>Customers Saved</p>
            </div>
            <p className="text-navy mb-1" style={{ fontSize: '32px', fontWeight: '600' }}>4,847</p>
            <p className="text-low" style={{ fontSize: '14px', fontWeight: '500' }}>
              73% success rate
            </p>
            <p className="text-gray-3 mt-2" style={{ fontSize: '13px' }}>
              High-risk customers converted to active status
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-low" />
              <p className="text-gray-3" style={{ fontSize: '13px', fontWeight: '500' }}>ROI</p>
            </div>
            <p className="text-navy mb-1" style={{ fontSize: '32px', fontWeight: '600' }}>8.4x</p>
            <p className="text-low" style={{ fontSize: '14px', fontWeight: '500' }}>
              Program efficiency
            </p>
            <p className="text-gray-3 mt-2" style={{ fontSize: '13px' }}>
              Return per dollar invested in retention
            </p>
          </div>
        </div>
      </div>

      {/* Churn Rate Trend */}
      <div className="bg-white rounded-xl border border-gray-2 p-6" style={{ boxShadow: 'var(--shadow-l1)' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-navy">Churn Rate: Before vs After</h3>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-3 rounded-full"></div>
              <span className="text-gray-3">Before (Baseline)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-low rounded-full"></div>
              <span className="text-gray-3">After (With Agent)</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
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
              domain={[0, 30]}
              label={{ value: 'Churn Rate (%)', angle: -90, position: 'insideLeft', style: { fill: '#8896A7', fontSize: 12 } }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #D0D5DD',
                borderRadius: '8px',
                fontSize: '13px'
              }}
              formatter={(value: number) => `${value.toFixed(1)}%`}
            />
            <Legend wrapperStyle={{ fontSize: '13px' }} />
            <Line 
              type="monotone" 
              dataKey="before" 
              stroke="#8896A7" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Before"
              dot={{ fill: '#8896A7', r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="after" 
              stroke="#1A6B3C" 
              strokeWidth={3}
              name="After"
              dot={{ fill: '#1A6B3C', r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue Impact */}
      <div className="bg-white rounded-xl border border-gray-2 p-6" style={{ boxShadow: 'var(--shadow-l1)' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-navy">Revenue Impact Over Time</h3>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-teal rounded-full"></div>
              <span className="text-gray-3">Revenue Saved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-ai-purple rounded-full"></div>
              <span className="text-gray-3">Churn Prevented</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={revenueImpactData}>
            <defs>
              <linearGradient id="colorSaved" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#006D77" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#006D77" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPrevented" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#D0D5DD" />
            <XAxis 
              dataKey="month" 
              tick={{ fill: '#8896A7', fontSize: 12 }}
              stroke="#D0D5DD"
            />
            <YAxis 
              tick={{ fill: '#8896A7', fontSize: 12 }}
              stroke="#D0D5DD"
              tickFormatter={(value) => `$${(value / 1000)}K`}
              label={{ value: 'Revenue ($)', angle: -90, position: 'insideLeft', style: { fill: '#8896A7', fontSize: 12 } }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #D0D5DD',
                borderRadius: '8px',
                fontSize: '13px'
              }}
              formatter={(value: number) => `$${value.toLocaleString()}`}
            />
            <Legend wrapperStyle={{ fontSize: '13px' }} />
            <Area 
              type="monotone" 
              dataKey="saved" 
              stroke="#006D77" 
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorSaved)"
              name="Revenue Saved"
            />
            <Area 
              type="monotone" 
              dataKey="prevented" 
              stroke="#7C3AED" 
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPrevented)"
              name="Churn Prevented"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Campaign Performance */}
      <div className="bg-white rounded-xl border border-gray-2 p-6" style={{ boxShadow: 'var(--shadow-l1)' }}>
        <h3 className="text-navy mb-4">Campaign Funnel Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={campaignPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#D0D5DD" />
            <XAxis 
              dataKey="week" 
              tick={{ fill: '#8896A7', fontSize: 12 }}
              stroke="#D0D5DD"
            />
            <YAxis 
              tick={{ fill: '#8896A7', fontSize: 12 }}
              stroke="#D0D5DD"
              label={{ value: 'Customers', angle: -90, position: 'insideLeft', style: { fill: '#8896A7', fontSize: 12 } }}
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
            <Bar dataKey="sent" fill="#8896A7" name="Sent" radius={[4, 4, 0, 0]} />
            <Bar dataKey="engaged" fill="#006D77" name="Engaged" radius={[4, 4, 0, 0]} />
            <Bar dataKey="redeemed" fill="#1A6B3C" name="Redeemed" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Risk Reduction by Segment */}
      <div className="bg-white rounded-xl border border-gray-2 p-6" style={{ boxShadow: 'var(--shadow-l1)' }}>
        <h3 className="text-navy mb-4">Risk Score Reduction by Segment</h3>
        <div className="space-y-4">
          {riskReductionData.map((segment) => (
            <div key={segment.segment} className="border border-gray-2 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded ${
                    segment.segment === 'CRITICAL' ? 'bg-critical-light text-critical' :
                    segment.segment === 'HIGH' ? 'bg-high-light text-high' :
                    segment.segment === 'MEDIUM' ? 'bg-medium-light text-medium' :
                    'bg-low-light text-low'
                  }`} style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '0.5px' }}>
                    {segment.segment}
                  </span>
                  <span className="text-navy font-mono" style={{ fontSize: '15px', fontWeight: '600' }}>
                    {segment.before} → {segment.after}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-low" />
                  <span className="text-low font-mono" style={{ fontSize: '18px', fontWeight: '600' }}>
                    -{segment.improvement} pts
                  </span>
                </div>
              </div>
              <div className="relative h-2 bg-gray-1 rounded-full overflow-hidden">
                <div 
                  className="absolute h-full bg-low rounded-full transition-all"
                  style={{ width: `${(segment.improvement / segment.before) * 100}%` }}
                />
              </div>
              <p className="text-gray-3 mt-2" style={{ fontSize: '12px' }}>
                {((segment.improvement / segment.before) * 100).toFixed(1)}% average improvement
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-teal-light border border-teal rounded-xl p-5">
        <div className="flex items-start gap-3">
          <Target className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-navy mb-3" style={{ fontSize: '15px', fontWeight: '600' }}>
              Key Performance Insights
            </p>
            <ul className="space-y-2 text-navy" style={{ fontSize: '14px' }}>
              <li className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-low flex-shrink-0 mt-1" />
                <span><strong>Churn rate decreased 23.6%</strong> (28.0% → 21.4%) over 6 months, protecting $1.25M in revenue</span>
              </li>
              <li className="flex items-start gap-2">
                <Users className="w-4 h-4 text-teal flex-shrink-0 mt-1" />
                <span><strong>4,847 at-risk customers saved</strong> with 73% success rate, well above 65% target</span>
              </li>
              <li className="flex items-start gap-2">
                <DollarSign className="w-4 h-4 text-low flex-shrink-0 mt-1" />
                <span><strong>8.4x ROI achieved</strong> through efficient targeting and high-conversion offers like Personal Outreach (91%)</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-ai-purple flex-shrink-0 mt-1" />
                <span><strong>CRITICAL risk segment shows best results</strong> with average 68-point risk reduction, validating high-touch approach</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
