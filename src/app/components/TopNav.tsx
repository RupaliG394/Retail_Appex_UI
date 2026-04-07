import { Bell, Search, ChevronDown } from "lucide-react";

export function TopNav() {
  return (
    <nav 
      className="sticky top-0 z-50 flex items-center justify-between px-6 bg-navy"
      style={{ height: '64px' }}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <div className="text-white font-semibold" style={{ fontSize: '18px' }}>
          Apex Retail
        </div>
        <div className="h-6 w-px bg-gray-2/30" />
        <div className="text-teal" style={{ fontSize: '13px' }}>
          Retention Ops
        </div>
      </div>

      {/* Center - Global Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-3" size={18} />
          <input
            type="text"
            placeholder="Search customers, briefs, campaigns..."
            className="w-full h-10 pl-10 pr-4 bg-navy-deep text-white placeholder:text-gray-3 rounded-lg border border-gray-2/20 focus:border-teal focus:outline-none"
            style={{ fontSize: '14px' }}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-3 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-critical rounded-full" />
        </button>

        {/* Agent Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-navy-deep rounded-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-low opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-low" />
          </span>
          <span className="text-white" style={{ fontSize: '13px' }}>Live</span>
        </div>

        {/* User Menu */}
        <button className="flex items-center gap-3 px-3 py-1.5 hover:bg-navy-deep rounded-lg transition-colors">
          <div className="w-8 h-8 rounded-full bg-teal flex items-center justify-center text-white" style={{ fontSize: '13px', fontWeight: '600' }}>
            JO
          </div>
          <div className="text-left">
            <div className="text-white" style={{ fontSize: '13px', fontWeight: '500' }}>Jordan</div>
            <div className="text-gray-3" style={{ fontSize: '11px' }}>Retention Ops Lead</div>
          </div>
          <ChevronDown size={16} className="text-gray-3" />
        </button>
      </div>
    </nav>
  );
}
