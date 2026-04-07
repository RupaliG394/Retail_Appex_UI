import { useEffect, useState } from "react";
import {
  X,
  Brain,
  Zap,
  Gift,
  Send,
  UserCheck,
  Shield,
} from "lucide-react";

interface AgentDef {
  id: string;
  name: string;
  role: string;
  icon: React.ElementType;
  color: string;           // tailwind text + bg token pair
  tasks: string[];         // cycles through these
  processing: string[];    // what data/entity it's working on
}

const AGENTS: AgentDef[] = [
  {
    id: "orchestrator",
    name: "Retention Orchestrator",
    role: "Workflow coordination",
    icon: Brain,
    color: "text-ai-purple bg-ai-purple-light",
    tasks: [
      "Routing session-collapse event",
      "Dispatching to Signal Intelligence",
      "Evaluating risk threshold",
      "Coordinating offer selection",
      "Finalising workflow state",
    ],
    processing: ["David Chen · CUST_004", "Sarah Mitchell · CUST_001", "James Thornton · CUST_002"],
  },
  {
    id: "signal",
    name: "Signal Intelligence Agent",
    role: "Churn signal analysis",
    icon: Zap,
    color: "text-high bg-high-light",
    tasks: [
      "Analysing session-collapse pattern",
      "Computing composite churn score",
      "Resolving signal conflicts",
      "Scoring AOV decline signal",
      "Flagging discount-dependency pattern",
    ],
    processing: ["3 new HIGH-risk triggers", "Session data · last 30 days", "Purchase history · 12 months"],
  },
  {
    id: "offer",
    name: "Offer Personalisation Agent",
    role: "Retention offer selection",
    icon: Gift,
    color: "text-teal bg-teal-light",
    tasks: [
      "Reviewing loyalty tier",
      "Checking margin constraints",
      "Ranking offer candidates",
      "Selecting optimal offer",
      "Verifying offer eligibility",
    ],
    processing: ["Sarah Mitchell · CUST_001", "Offer catalogue · 14 active offers", "Margin rules · v2.4"],
  },
  {
    id: "outreach",
    name: "Outreach Execution Agent",
    role: "Campaign content generation",
    icon: Send,
    color: "text-teal bg-teal-light",
    tasks: [
      "Generating personalised email",
      "Drafting SMS message",
      "Applying personalisation tokens",
      "Selecting send timing",
      "Preparing push notification",
    ],
    processing: ["James Thornton · CUST_002", "Email template · v3.1", "Customer tone profile"],
  },
  {
    id: "approval",
    name: "Approval Gateway",
    role: "Human-in-the-loop control",
    icon: UserCheck,
    color: "text-medium bg-medium-light",
    tasks: [
      "Monitoring approval queue",
      "Checking SLA timers",
      "Escalating overdue brief",
      "Awaiting manager decision",
      "Logging approval outcome",
    ],
    processing: ["2 briefs pending review", "SLA: 4h remaining", "Jordan — Retention Ops Lead"],
  },
  {
    id: "guardrail",
    name: "Guardrail Enforcer",
    role: "Policy & rule validation",
    icon: Shield,
    color: "text-gray-3 bg-gray--1",
    tasks: [
      "Validating discount threshold",
      "Checking contact frequency cap",
      "Verifying margin protection rule",
      "Scanning for duplicate briefs",
      "Enforcing suppression list",
    ],
    processing: ["4 active offers under review", "Margin cap: 20%", "Suppression list · 312 customers"],
  },
];

const TICK_MS = 2800;

function useCycling(items: string[], tickMs: number, offset = 0) {
  const [idx, setIdx] = useState(offset % items.length);
  useEffect(() => {
    const t = setTimeout(() => {
      const interval = setInterval(() => setIdx(i => (i + 1) % items.length), tickMs);
      return () => clearInterval(interval);
    }, offset * 400);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return items[idx];
}

function AgentRow({ agent, index }: { agent: AgentDef; index: number }) {
  const Icon = agent.icon;
  const currentTask = useCycling(agent.tasks, TICK_MS, index);
  const currentData = useCycling(agent.processing, TICK_MS + 700, index + 2);

  return (
    <div className="p-4 border-b border-gray-2 last:border-b-0">
      <div className="flex items-start gap-3">
        {/* Icon + pulse */}
        <div className="relative flex-shrink-0">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${agent.color}`}>
            <Icon size={16} />
          </div>
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-low border-2 border-white">
            <span className="absolute inset-0 rounded-full bg-low animate-ping opacity-75" />
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1 mb-0.5">
            <span className="text-navy font-semibold truncate" style={{ fontSize: '13px' }}>
              {agent.name}
            </span>
            <span className="text-low flex-shrink-0" style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.4px' }}>
              ACTIVE
            </span>
          </div>
          <p className="text-gray-3 mb-2" style={{ fontSize: '11px' }}>{agent.role}</p>

          {/* Current task — animated ticker */}
          <div className="bg-gray-1 rounded-lg px-3 py-2 mb-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse flex-shrink-0" />
              <span className="text-gray-3 uppercase tracking-wider" style={{ fontSize: '10px', fontWeight: '600' }}>
                Current task
              </span>
            </div>
            <p className="text-navy" style={{ fontSize: '12px', fontWeight: '500' }}>
              {currentTask}
            </p>
          </div>

          {/* Data being processed */}
          <div className="flex items-center gap-1.5">
            <span className="text-gray-3" style={{ fontSize: '11px' }}>Processing:</span>
            <span className="text-navy truncate" style={{ fontSize: '11px', fontWeight: '500' }}>
              {currentData}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface Props {
  onClose: () => void;
}

export function AgentLivePanel({ onClose }: Props) {
  const [tick, setTick] = useState(0);

  // Increment tick every second for the "last updated" timer
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const secondsAgo = tick < 60 ? `${tick}s ago` : `${Math.floor(tick / 60)}m ago`;

  return (
    <div
      className="h-full w-[360px] flex-shrink-0 flex flex-col bg-white border-l border-gray-2 shadow-xl overflow-hidden"
      style={{ animation: 'slideInRight 0.25s ease-out' }}
    >
      {/* Header */}
      <div className="bg-white border-b border-gray-2 px-5 py-4 flex items-center justify-between flex-shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-low opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-low" />
            </span>
            <h2 className="text-navy font-semibold" style={{ fontSize: '15px' }}>Agent Live</h2>
            <span className="px-2 py-0.5 rounded-full bg-low-light text-low font-mono" style={{ fontSize: '11px', fontWeight: '700' }}>
              6 active
            </span>
          </div>
          <p className="text-gray-3" style={{ fontSize: '11px' }}>
            Real-time view · updated {secondsAgo}
          </p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-1 rounded-lg transition-colors">
          <X size={18} />
        </button>
      </div>

      {/* Agent list */}
      <div className="flex-1 overflow-y-auto">
        {AGENTS.map((agent, i) => (
          <AgentRow key={agent.id} agent={agent} index={i} />
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-2 px-5 py-3 bg-gray-1 flex-shrink-0">
        <p className="text-gray-3 text-center" style={{ fontSize: '11px' }}>
          All 6 agents running · 0 errors · 0 guardrail violations
        </p>
      </div>
    </div>
  );
}
