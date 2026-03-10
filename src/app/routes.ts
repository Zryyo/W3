import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { IndividualDashboard } from "./pages/IndividualDashboard";
import { AdvisorLogin } from "./pages/AdvisorLogin";
import { AdvisorVerification } from "./pages/AdvisorVerification";
import { AdvisorAuthorization } from "./pages/AdvisorAuthorization";
import { AdvisorSuccess } from "./pages/AdvisorSuccess";
import { AdvisorDenied } from "./pages/AdvisorDenied";
import { AdvisorDashboard } from "./pages/AdvisorDashboard";
import { ClientDashboard } from "./pages/ClientDashboard";
import { SavingsSector } from "./pages/sectors/SavingsSector";
import { BondsSector } from "./pages/sectors/BondsSector";
import { StocksSector } from "./pages/sectors/StocksSector";
import { CryptocurrencySector } from "./pages/sectors/CryptocurrencySector";
import { InvestmentPropertySector } from "./pages/sectors/InvestmentPropertySector";
import { JointAssetsSector } from "./pages/sectors/JointAssetsSector";
import { FamilyMemberDashboard } from "./pages/sectors/FamilyMemberDashboard";
import { RecommendationHub } from "./pages/RecommendationHub";
import { AIWorkspace } from "./pages/AIWorkspace";
import { UserLogin } from "./pages/UserLogin";
import { MainLogin } from "./pages/MainLogin";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLogin,
  },
  {
    path: "/login",
    Component: UserLogin,
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      { index: true, Component: IndividualDashboard },
      { path: "recommendations", Component: RecommendationHub },
      { path: "ai-advisor", Component: AIWorkspace },
    ],
  },
  {
    path: "/sector",
    children: [
      { path: "savings", Component: SavingsSector },
      { path: "bonds", Component: BondsSector },
      { path: "stocks", Component: StocksSector },
      { path: "cryptocurrency", Component: CryptocurrencySector },
      { path: "investment-property", Component: InvestmentPropertySector },
      { path: "joint-assets", Component: JointAssetsSector },
      { path: "joint-assets/member/:memberId", Component: FamilyMemberDashboard },
    ],
  },
  {
    path: "/advisor",
    children: [
      { index: true, Component: AdvisorLogin },
      { path: "verify", Component: AdvisorVerification },
      { path: "authorize", Component: AdvisorAuthorization },
      { path: "success", Component: AdvisorSuccess },
      { path: "denied", Component: AdvisorDenied },
      { path: "dashboard", Component: AdvisorDashboard },
      { path: "client/:clientId", Component: ClientDashboard },
    ],
  },
]);