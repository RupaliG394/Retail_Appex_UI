import { useState } from "react";
import { Outlet } from "react-router";
import { TopNav } from "./TopNav";
import { Sidebar } from "./Sidebar";
import { WorkflowStatusPanel } from "./WorkflowStatusModal";
import { AgentLivePanel } from "./AgentLivePanel";

export interface DrawerContext {
  openDrawer: (runId: string, customerName: string) => void;
  closeDrawer: () => void;
}

export function Layout() {
  const [activeRunId, setActiveRunId] = useState<string | null>(null);
  const [activeCustomerName, setActiveCustomerName] = useState('');
  const [agentPanelOpen, setAgentPanelOpen] = useState(false);

  const openDrawer = (runId: string, customerName: string) => {
    setActiveRunId(runId);
    setActiveCustomerName(customerName);
  };

  const closeDrawer = () => setActiveRunId(null);

  return (
    <div className="min-h-screen bg-off-white">
      <TopNav
        onAgentLiveClick={() => setAgentPanelOpen(o => !o)}
        agentPanelOpen={agentPanelOpen}
      />
      <div className="flex" style={{ height: 'calc(100vh - 64px)' }}>
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8 min-w-0">
          <Outlet context={{ openDrawer, closeDrawer } satisfies DrawerContext} />
        </main>
        {activeRunId && (
          <WorkflowStatusPanel
            runId={activeRunId}
            customerName={activeCustomerName}
            onClose={closeDrawer}
          />
        )}
        {agentPanelOpen && (
          <AgentLivePanel onClose={() => setAgentPanelOpen(false)} />
        )}
      </div>
    </div>
  );
}
