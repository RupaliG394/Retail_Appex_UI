import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { GlobalDashboard } from "./components/GlobalDashboard";
import { ApprovalQueue } from "./components/ApprovalQueue";
import { CustomerList } from "./components/CustomerList";
import { CustomerDetail } from "./components/CustomerDetail";
import { AgentActivity } from "./components/AgentActivity";
import { CampaignManager } from "./components/CampaignManager";
import { OfferLibrary } from "./components/OfferLibrary";
import { ABTestResults } from "./components/ABTestResults";
import { AutomationGuardrails } from "./components/AutomationGuardrails";
import { RulesEngine } from "./components/RulesEngine";
import { PerformanceReport } from "./components/PerformanceReport";
import { SegmentDashboard } from "./components/SegmentDashboard";
import { WeeklyReview } from "./components/WeeklyReview";
import { PlaceholderPage } from "./components/PlaceholderPage";
import { BriefDetail } from "./components/BriefDetail";
import { SignalDetail } from "./components/SignalDetail";
import { GuardrailSettings } from "./components/GuardrailSettings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { 
        index: true, 
        Component: GlobalDashboard 
      },
      { 
        path: "approval-queue", 
        Component: ApprovalQueue 
      },
      { 
        path: "approval-queue/:id", 
        Component: BriefDetail 
      },
      { 
        path: "approval-queue/:id/signal/:system", 
        Component: SignalDetail 
      },
      { 
        path: "customers", 
        Component: CustomerList 
      },
      { 
        path: "customers/:id", 
        Component: CustomerDetail 
      },
      { 
        path: "performance", 
        Component: PerformanceReport
      },
      { 
        path: "timeline", 
        Component: () => <PlaceholderPage title="Customer Timeline" description="Track customer journey and interactions" /> 
      },
      { 
        path: "agent-activity", 
        Component: AgentActivity
      },
      { 
        path: "campaigns", 
        Component: CampaignManager
      },
      { 
        path: "offers", 
        Component: OfferLibrary
      },
      { 
        path: "ab-tests", 
        Component: ABTestResults
      },
      { 
        path: "automation", 
        Component: AutomationGuardrails
      },
      { 
        path: "rules", 
        Component: RulesEngine
      },
      { 
        path: "guardrails", 
        Component: GuardrailSettings
      },
      { 
        path: "segments", 
        Component: SegmentDashboard
      },
      { 
        path: "review", 
        Component: WeeklyReview
      },
      { 
        path: "export", 
        Component: () => <PlaceholderPage title="Export & Reports" description="Download data and generate reports" /> 
      },
      { 
        path: "help", 
        Component: () => <PlaceholderPage title="Help" description="Documentation and support resources" /> 
      },
      { 
        path: "settings", 
        Component: () => <PlaceholderPage title="Settings" description="Application and user preferences" /> 
      },
    ],
  },
]);