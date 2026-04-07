import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Search, ChevronDown, X, Zap } from "lucide-react";
import { toast } from "sonner";
import { api, MockCustomer } from "../services/api";

function mapCustomer(c: MockCustomer) {
  const isHighRisk = c.session_collapse_detected;
  const score = c.conversion_probability != null
    ? Math.round((1 - c.conversion_probability) * 100)
    : null;
  const tier = c.profile.includes('high_value') ? 'Gold'
    : c.profile.includes('loyal') ? 'Platinum'
    : 'Silver';
  const scoreType = score != null && score >= 85 ? 'CRITICAL'
    : isHighRisk ? 'HIGH'
    : score != null && score >= 50 ? 'MEDIUM'
    : 'LOW';
  return {
    id: c.customer_id,
    name: c.name,
    email: c.email,
    tier,
    score: score ?? '—',
    scoreType,
    lastPurchase: '—',
    points: '—',
    redeemed: '—',
    support: 0,
    lastOffer: 'None',
    indicator: isHighRisk ? 'red' : 'amber',
  };
}

export function CustomerList() {
  const navigate = useNavigate();
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>(['CRITICAL']);
  const [apiCustomers, setApiCustomers] = useState<MockCustomer[]>([]);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(true);
  // per-customer triggering state: Set of customer_ids currently calling /api/trigger
  const [triggeringIds, setTriggeringIds] = useState<Set<string>>(new Set());
  // per-customer run tracking: customer_id → run_id (brief already triggered)
  const [triggeredMap, setTriggeredMap] = useState<Map<string, string>>(new Map());
  const [isAutoTriggering, setIsAutoTriggering] = useState(false);

  useEffect(() => {
    api.listCustomers()
      .then((r) => { setApiCustomers(r.customers); setIsLoadingCustomers(false); })
      .catch((e) => { console.error('Failed to load customers', e); setIsLoadingCustomers(false); });
  }, []);

  const customers = apiCustomers.map(mapCustomer);

  const toggleCustomer = (id: string) => {
    setSelectedCustomers(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleAllCustomers = () => {
    if (selectedCustomers.length === customers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(customers.map(c => c.id));
    }
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(prev => prev.filter(f => f !== filter));
  };

  const handleTriggerBrief = async (customerId: string, customerName: string) => {
    if (triggeringIds.has(customerId)) return;

    setTriggeringIds(prev => new Set(prev).add(customerId));
    const toastId = toast.loading(`Starting retention workflow for ${customerName}…`);

    try {
      const res = await api.trigger({
        customer_id: customerId,
        event_type: 'session_collapse',
        source: 'ui_manual_trigger',
      });
      setTriggeredMap(prev => new Map(prev).set(customerId, res.run_id));
      toast.success(`Workflow started for ${customerName}`, {
        id: toastId,
        description: `Run ID: ${res.run_id.slice(0, 8)}…`,
      });
      navigate(`/customers/${customerId}?tab=actions&run=${res.run_id}`);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Failed to trigger workflow';
      toast.error(`Failed to start workflow for ${customerName}`, {
        id: toastId,
        description: msg,
      });
    } finally {
      setTriggeringIds(prev => {
        const next = new Set(prev);
        next.delete(customerId);
        return next;
      });
    }
  };

  const handleAutoTriggerLow = async () => {
    const lowCustomers = customers.filter(
      c => c.scoreType === 'LOW' && !triggeredMap.has(c.id) && !triggeringIds.has(c.id)
    );
    if (!lowCustomers.length) {
      toast.info('All LOW risk customers already have active briefs.');
      return;
    }
    setIsAutoTriggering(true);
    const toastId = toast.loading(`Auto-briefing ${lowCustomers.length} LOW risk customer${lowCustomers.length > 1 ? 's' : ''}…`);
    // Add all to triggering set
    setTriggeringIds(prev => {
      const next = new Set(prev);
      lowCustomers.forEach(c => next.add(c.id));
      return next;
    });
    let successCount = 0;
    await Promise.all(
      lowCustomers.map(async (customer) => {
        try {
          const res = await api.trigger({
            customer_id: customer.id,
            event_type: 'session_collapse',
            source: 'ui_auto_trigger_low',
          });
          setTriggeredMap(prev => new Map(prev).set(customer.id, res.run_id));
          successCount++;
        } catch {
          // individual failures are silent; count will reflect
        } finally {
          setTriggeringIds(prev => { const next = new Set(prev); next.delete(customer.id); return next; });
        }
      })
    );
    toast.success(`Auto-brief complete: ${successCount}/${lowCustomers.length} LOW risk customers briefed`, { id: toastId });
    setIsAutoTriggering(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-navy mb-1">Customer List</h1>
          <p className="text-gray-3" style={{ fontSize: '14px' }}>
            2,147,000 registered — 680K active in last 90 days
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-2 text-navy rounded-lg hover:bg-gray-1 transition-colors" style={{ fontSize: '14px', fontWeight: '500' }}>
            Export CSV
          </button>
          <button
            onClick={handleAutoTriggerLow}
            disabled={isAutoTriggering}
            className="px-4 py-2 bg-low text-white rounded-lg hover:bg-low/80 transition-colors flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ fontSize: '14px', fontWeight: '500' }}
          >
            {isAutoTriggering ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
            ) : (
              <Zap size={16} />
            )}
            {isAutoTriggering ? 'Auto-Briefing…' : 'Auto-Brief ALL LOW'}
          </button>
          <button className="px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal-mid transition-colors" style={{ fontSize: '14px', fontWeight: '500' }}>
            + Add Filter
          </button>
        </div>
      </div>

      {/* Search + Filter Bar */}
      <div className="bg-white border border-gray-2 rounded-xl p-4 space-y-4">
        {/* Search Row */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-3" size={18} />
            <input
              type="text"
              placeholder="Search by name, email, customer ID, phone number..."
              className="w-full h-11 pl-10 pr-4 bg-white border border-gray-2 rounded-lg focus:border-teal focus:outline-none"
              style={{ fontSize: '14px' }}
            />
          </div>
          <button className="px-5 py-2 bg-teal text-white rounded-lg hover:bg-teal-mid transition-colors" style={{ fontSize: '14px', fontWeight: '500' }}>
            Search
          </button>
        </div>

        {/* Quick Filters */}
        <div className="flex gap-2 flex-wrap items-center">
          <FilterDropdown label="Churn Risk" />
          <FilterDropdown label="Tier" />
          <FilterDropdown label="Last Purchase" />
          <FilterDropdown label="Points Status" />
          <FilterDropdown label="Redemption" />
          <FilterDropdown label="Support Status" />
          <FilterDropdown label="Segment" />
          <FilterDropdown label="Signal Type" />
          <FilterDropdown label="More" />
          <div className="flex-1" />
          <button className="text-gray-3 hover:text-black transition-colors" style={{ fontSize: '13px' }}>
            Clear All
          </button>
          <button className="px-3 py-1.5 bg-white border border-gray-2 text-navy rounded-lg hover:bg-gray-1 transition-colors" style={{ fontSize: '13px', fontWeight: '500' }}>
            Save Filter
          </button>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex gap-2 flex-wrap items-center pt-2 border-t border-gray-2">
            {activeFilters.map(filter => (
              <div
                key={filter}
                className="inline-flex items-center gap-2 px-3 py-1 bg-critical-light text-critical rounded-full"
              >
                <span style={{ fontSize: '12px', fontWeight: '500' }}>🔴 {filter}</span>
                <button
                  onClick={() => removeFilter(filter)}
                  className="hover:bg-critical/20 rounded-full p-0.5"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            <button
              onClick={() => setActiveFilters([])}
              className="text-gray-3 hover:text-black transition-colors"
              style={{ fontSize: '12px' }}
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Results Bar */}
      <div className="flex items-center justify-between">
        <div style={{ fontSize: '14px' }}>
          {isLoadingCustomers
            ? 'Loading customers…'
            : <>Showing <span className="font-mono font-bold">{customers.length}</span> customers</>}
        </div>
        <div className="flex gap-3">
          <select className="px-3 py-1.5 bg-white border border-gray-2 rounded-lg" style={{ fontSize: '13px' }}>
            <option>Sort: Churn Score ↓</option>
            <option>Sort: Name A-Z</option>
            <option>Sort: Last Purchase</option>
            <option>Sort: Points Balance</option>
          </select>
          <button className="px-3 py-1.5 bg-white border border-gray-2 rounded-lg hover:bg-gray-1 transition-colors flex items-center gap-2" style={{ fontSize: '13px', fontWeight: '500' }}>
            Columns
            <ChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedCustomers.length > 0 && (
        <div className="bg-teal-light border border-teal rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-medium" style={{ fontSize: '14px' }}>
                {selectedCustomers.length} selected
              </span>
              <button className="px-4 py-1.5 bg-teal text-white rounded-lg hover:bg-teal-mid transition-colors" style={{ fontSize: '13px', fontWeight: '500' }}>
                Generate Briefs
              </button>
              <button className="px-4 py-1.5 bg-white border border-gray-2 text-navy rounded-lg hover:bg-gray-1 transition-colors" style={{ fontSize: '13px', fontWeight: '500' }}>
                Add to Campaign
              </button>
              <button className="px-4 py-1.5 bg-white border border-gray-2 text-navy rounded-lg hover:bg-gray-1 transition-colors" style={{ fontSize: '13px', fontWeight: '500' }}>
                Export Selected
              </button>
              <button className="px-4 py-1.5 bg-white border border-gray-2 text-navy rounded-lg hover:bg-gray-1 transition-colors" style={{ fontSize: '13px', fontWeight: '500' }}>
                Flag for Review
              </button>
            </div>
            <button
              onClick={() => setSelectedCustomers([])}
              className="text-gray-3 hover:text-black transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Customer Table */}
      <div className="bg-white border border-gray-2 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-navy text-white sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left" style={{ width: '40px' }}>
                <input
                  type="checkbox"
                  checked={selectedCustomers.length === customers.length}
                  onChange={toggleAllCustomers}
                  className="w-4 h-4"
                />
              </th>
              <th className="px-4 py-3 text-left" style={{ fontSize: '13px', fontWeight: '500' }}>Customer</th>
              <th className="px-4 py-3 text-left" style={{ fontSize: '13px', fontWeight: '500' }}>Tier</th>
              <th className="px-4 py-3 text-left" style={{ fontSize: '13px', fontWeight: '500' }}>Score</th>
              <th className="px-4 py-3 text-left" style={{ fontSize: '13px', fontWeight: '500' }}>Last Purchase</th>
              <th className="px-4 py-3 text-left" style={{ fontSize: '13px', fontWeight: '500' }}>Points</th>
              <th className="px-4 py-3 text-left" style={{ fontSize: '13px', fontWeight: '500' }}>Redeemed</th>
              <th className="px-4 py-3 text-left" style={{ fontSize: '13px', fontWeight: '500' }}>Support</th>
              <th className="px-4 py-3 text-left" style={{ fontSize: '13px', fontWeight: '500' }}>Last Offer</th>
              <th className="px-4 py-3 text-left" style={{ fontSize: '13px', fontWeight: '500' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoadingCustomers && customers.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-4 py-12 text-center text-gray-3" style={{ fontSize: '14px' }}>
                  <span className="inline-block w-5 h-5 border-2 border-teal border-t-transparent rounded-full animate-spin mr-3 align-middle" />
                  Loading customers…
                </td>
              </tr>
            ) : (
              customers.map((customer, idx) => (
                <CustomerRow
                  key={customer.id}
                  customer={customer}
                  isSelected={selectedCustomers.includes(customer.id)}
                  onToggle={() => toggleCustomer(customer.id)}
                  isEven={idx % 2 === 1}
                  onTrigger={handleTriggerBrief}
                  isTriggering={triggeringIds.has(customer.id)}
                  hasActiveBrief={triggeredMap.has(customer.id)}
                  onViewBrief={() => {
                    const runId = triggeredMap.get(customer.id);
                    if (runId) navigate(`/customers/${customer.id}?tab=actions&run=${runId}`);
                  }}
                  isLow={customer.scoreType === 'LOW'}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 bg-white border border-gray-2 rounded-lg hover:bg-gray-1 transition-colors" style={{ fontSize: '13px' }}>
            ← Prev
          </button>
          <button className="px-3 py-1.5 bg-teal text-white rounded-lg" style={{ fontSize: '13px' }}>1</button>
          <button className="px-3 py-1.5 bg-white border border-gray-2 rounded-lg hover:bg-gray-1 transition-colors" style={{ fontSize: '13px' }}>2</button>
          <button className="px-3 py-1.5 bg-white border border-gray-2 rounded-lg hover:bg-gray-1 transition-colors" style={{ fontSize: '13px' }}>3</button>
          <span className="px-2 text-gray-3">...</span>
          <button className="px-3 py-1.5 bg-white border border-gray-2 rounded-lg hover:bg-gray-1 transition-colors" style={{ fontSize: '13px' }}>57</button>
          <button className="px-3 py-1.5 bg-white border border-gray-2 rounded-lg hover:bg-gray-1 transition-colors" style={{ fontSize: '13px' }}>
            Next →
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-3" style={{ fontSize: '13px' }}>Rows per page:</span>
          <select className="px-2 py-1 bg-white border border-gray-2 rounded" style={{ fontSize: '13px' }}>
            <option>15</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
          <span className="text-gray-3" style={{ fontSize: '13px' }}>Showing 1–15 of 847</span>
        </div>
      </div>

    </div>
  );
}

function FilterDropdown({ label }: { label: string }) {
  return (
    <button className="px-3 py-1.5 bg-white border border-gray-2 rounded-lg hover:bg-gray-1 transition-colors flex items-center gap-2" style={{ fontSize: '13px', fontWeight: '500' }}>
      {label}
      <ChevronDown size={14} />
    </button>
  );
}

function CustomerRow({ customer, isSelected, onToggle, isEven, onTrigger, isTriggering, hasActiveBrief, onViewBrief, isLow }: {
  customer: any;
  isSelected: boolean;
  onToggle: () => void;
  isEven: boolean;
  onTrigger?: (id: string, name: string) => void;
  isTriggering?: boolean;
  hasActiveBrief?: boolean;
  onViewBrief?: () => void;
  isLow?: boolean;
}) {
  const scoreColor = customer.scoreType === 'CRITICAL'
    ? 'bg-critical-light text-critical border-critical'
    : customer.scoreType === 'HIGH'
    ? 'bg-high-light text-high border-high'
    : customer.scoreType === 'MEDIUM'
    ? 'bg-medium-light text-medium border-medium'
    : 'bg-low-light text-low border-low';

  const borderColor = customer.scoreType === 'CRITICAL' ? 'border-l-critical'
    : customer.scoreType === 'HIGH' ? 'border-l-high'
    : customer.scoreType === 'MEDIUM' ? 'border-l-medium'
    : 'border-l-low';

  return (
    <tr
      className={`border-l-2 ${borderColor} ${isEven ? 'bg-gray-1' : 'bg-white'} hover:bg-teal-light cursor-pointer transition-colors`}
    >
      <td className="px-4 py-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggle}
          className="w-4 h-4"
          onClick={(e) => e.stopPropagation()}
        />
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${customer.indicator === 'red' ? 'bg-critical' : 'bg-high'}`} />
          <div>
            <div className="font-medium" style={{ fontSize: '13px' }}>{customer.name}</div>
            <div className="text-gray-3" style={{ fontSize: '11px' }}>{customer.id}</div>
            <div className="text-gray-3" style={{ fontSize: '11px' }}>{customer.email}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <span className="inline-block px-2 py-0.5 bg-gray-1 rounded" style={{ fontSize: '11px' }}>
          {customer.tier === 'Gold' ? '🥇' : customer.tier === 'Platinum' ? '💎' : '🥈'} {customer.tier}
        </span>
      </td>
      <td className="px-4 py-3">
        <span className={`inline-block px-2 py-0.5 rounded border-l-4 font-mono ${scoreColor}`} style={{ fontSize: '11px', fontWeight: '700' }}>
          {customer.scoreType} {customer.score}
        </span>
      </td>
      <td className="px-4 py-3" style={{ fontSize: '13px' }}>{customer.lastPurchase}</td>
      <td className="px-4 py-3 font-mono" style={{ fontSize: '13px' }}>{customer.points}pts</td>
      <td className="px-4 py-3 font-mono" style={{ fontSize: '13px' }}>{customer.redeemed}</td>
      <td className="px-4 py-3" style={{ fontSize: '13px' }}>
        {customer.support > 0 ? `${customer.support} open` : '0 open'}
      </td>
      <td className="px-4 py-3" style={{ fontSize: '13px' }}>{customer.lastOffer}</td>
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <Link
            to={`/customers/${customer.id}`}
            className="px-3 py-1 bg-white border border-gray-2 text-navy rounded hover:bg-gray-1 transition-colors"
            style={{ fontSize: '12px', fontWeight: '500' }}
          >
            View
          </Link>
          {hasActiveBrief || isLow ? (
            <button
              onClick={onViewBrief}
              disabled={!hasActiveBrief}
              className="px-3 py-1 bg-low text-white rounded hover:bg-low/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              style={{ fontSize: '12px', fontWeight: '500' }}
            >
              {isTriggering && (
                <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
              )}
              View Activity
            </button>
          ) : (
            <button
              onClick={() => onTrigger?.(customer.id, customer.name)}
              disabled={isTriggering}
              className="px-3 py-1 bg-teal text-white rounded hover:bg-teal-mid transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-1"
              style={{ fontSize: '12px', fontWeight: '500' }}
            >
              {isTriggering && (
                <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
              )}
              {isTriggering ? 'Processing…' : 'Take Action'}
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
