import { Link, useLocation } from "react-router";
import { 
  Home, 
  TrendingUp, 
  CheckSquare, 
  Users, 
  Clock, 
  Bot, 
  Calendar,
  Gift,
  FlaskConical,
  Settings,
  Ruler,
  Shield,
  BarChart3,
  FileText,
  Upload,
  HelpCircle
} from "lucide-react";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navigation: NavSection[] = [
  {
    title: "OVERVIEW",
    items: [
      { icon: Home, label: "Global Dashboard", href: "/" },
      { icon: TrendingUp, label: "Performance", href: "/performance" },
    ],
  },
  {
    title: "OPERATIONS",
    items: [
      { icon: CheckSquare, label: "Approval Queue", href: "/approval-queue" },
      { icon: Users, label: "Customer List", href: "/customers" },
      { icon: Clock, label: "Customer Timeline", href: "/timeline" },
      { icon: Bot, label: "Agent Activity Log", href: "/agent-activity" },
    ],
  },
  {
    title: "CAMPAIGNS",
    items: [
      { icon: Calendar, label: "Campaign Manager", href: "/campaigns" },
      { icon: Gift, label: "Offer Library", href: "/offers" },
      { icon: FlaskConical, label: "A/B Test Results", href: "/ab-tests" },
    ],
  },
  {
    title: "CONFIGURATION",
    items: [
      { icon: Settings, label: "Automation & Guardrails", href: "/automation" },
      { icon: Ruler, label: "Rules Engine", href: "/rules" },
      { icon: Shield, label: "Guardrail Settings", href: "/guardrails" },
    ],
  },
  {
    title: "REPORTING",
    items: [
      { icon: BarChart3, label: "Segment Dashboard", href: "/segments" },
      { icon: FileText, label: "Weekly Review", href: "/review" },
      { icon: Upload, label: "Export & Reports", href: "/export" },
    ],
  },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside 
      className="bg-navy-deep overflow-y-auto"
      style={{ width: '240px', height: 'calc(100vh - 64px)' }}
    >
      <div className="p-4 flex flex-col h-full">
        {/* Top Section - Role */}
        <div className="mb-6">
          <div className="inline-block px-3 py-1 bg-teal/20 text-teal rounded-full" style={{ fontSize: '11px', fontWeight: '500' }}>
            Retention Ops Lead
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 space-y-6">
          {navigation.map((section) => (
            <div key={section.title}>
              <div 
                className="text-gray-3 mb-2 px-3"
                style={{ fontSize: '10px', fontWeight: '500', letterSpacing: '1px' }}
              >
                {section.title}
              </div>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = location.pathname === item.href;
                  const Icon = item.icon;
                  
                  return (
                    <li key={item.href}>
                      <Link
                        to={item.href}
                        className={`
                          flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
                          ${isActive 
                            ? 'bg-teal/15 text-white border-l-3 border-teal' 
                            : 'text-gray-3 hover:text-white hover:bg-navy/50'
                          }
                        `}
                      >
                        <Icon size={18} />
                        <span className="flex-1" style={{ fontSize: '14px' }}>
                          {item.label}
                        </span>
                        {item.badge && (
                          <span 
                            className="px-2 py-0.5 bg-critical text-white rounded-full"
                            style={{ fontSize: '11px', fontWeight: '600' }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto space-y-1 pt-4 border-t border-gray-2/20">
          <Link
            to="/help"
            className="flex items-center gap-3 px-3 py-2 text-gray-3 hover:text-white transition-colors"
          >
            <HelpCircle size={18} />
            <span style={{ fontSize: '14px' }}>Help</span>
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-3 px-3 py-2 text-gray-3 hover:text-white transition-colors"
          >
            <Settings size={18} />
            <span style={{ fontSize: '14px' }}>Settings</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
