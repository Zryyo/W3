import { useNavigate, useParams, Link } from 'react-router';
import { ArrowLeft, User, Shield, Lock, Eye, AlertTriangle } from 'lucide-react';
import { WealthPieChart } from '../components/WealthPieChart';
import { PortfolioAnalytics } from '../components/PortfolioAnalytics';
import { FinancialHealthIndicator } from '../components/FinancialHealthIndicator';
import { FinancialGoalsWidget } from '../components/FinancialGoalsWidget';
import type { PermissionLevel } from './AdvisorDashboard';

// Client data mapping
const clientsData: Record<string, any> = {
  '1': {
    name: 'Sarah Johnson',
    accountId: 'ACC-2024-8851',
    permissions: 'full' as PermissionLevel,
    wealthData: [
      { name: 'Savings', value: 105000, color: '#3b82f6' },
      { name: 'Bonds', value: 68000, color: '#8b5cf6' },
      { name: 'Stocks', value: 205000, color: '#10b981' },
      { name: 'Cryptocurrency', value: 60000, color: '#06b6d4' },
      { name: 'Investment Property', value: 295000, color: '#f59e0b' },
      { name: 'Joint Assets', value: 72000, color: '#ec4899' },
    ],
    analytics: {
      monthlyChange: 12450,
      monthlyChangePercent: 1.54,
      yearlyReturn: 8.7,
      diversificationScore: 78,
      riskLevel: 'Medium' as const,
    },
    health: {
      healthScore: 82,
      emergencyFund: { current: 45000, target: 50000, months: 5.4 },
      debtToIncome: 28,
      savingsRate: 22,
      netWorthGrowth: 9.2,
    },
    goals: [
      {
        id: '1',
        goalName: 'Emergency Fund',
        targetAmount: 50000,
        currentSavings: 45000,
        dueDate: '2026-06-30',
        category: 'emergency' as const,
      },
      {
        id: '2',
        goalName: 'New Home Down Payment',
        targetAmount: 100000,
        currentSavings: 62000,
        dueDate: '2027-12-31',
        category: 'purchase' as const,
      },
    ],
  },
  '2': {
    name: 'Michael Chen',
    accountId: 'ACC-2024-7732',
    permissions: 'view-only' as PermissionLevel,
    wealthData: [
      { name: 'Savings', value: 155000, color: '#3b82f6' },
      { name: 'Bonds', value: 180000, color: '#8b5cf6' },
      { name: 'Stocks', value: 470000, color: '#10b981' },
      { name: 'Cryptocurrency', value: 110000, color: '#06b6d4' },
      { name: 'Investment Property', value: 250000, color: '#f59e0b' },
      { name: 'Joint Assets', value: 75000, color: '#ec4899' },
    ],
    analytics: {
      monthlyChange: 18200,
      monthlyChangePercent: 1.47,
      yearlyReturn: 10.2,
      diversificationScore: 82,
      riskLevel: 'Medium-High' as const,
    },
    health: {
      healthScore: 88,
      emergencyFund: { current: 72000, target: 60000, months: 8.2 },
      debtToIncome: 22,
      savingsRate: 28,
      netWorthGrowth: 11.5,
    },
    goals: [
      {
        id: '1',
        goalName: 'Retirement Fund',
        targetAmount: 2000000,
        currentSavings: 840000,
        dueDate: '2045-12-31',
        category: 'retirement' as const,
      },
    ],
  },
  '3': {
    name: 'Emily Rodriguez',
    accountId: 'ACC-2024-6543',
    permissions: 'limited' as PermissionLevel,
    allowedSectors: ['Savings', 'Bonds'],
    wealthData: [
      { name: 'Savings', value: 85000, color: '#3b82f6' },
      { name: 'Bonds', value: 152000, color: '#8b5cf6' },
      { name: 'Stocks', value: 170000, color: '#10b981' },
      { name: 'Cryptocurrency', value: 40000, color: '#06b6d4' },
      { name: 'Investment Property', value: 130000, color: '#f59e0b' },
      { name: 'Joint Assets', value: 48000, color: '#ec4899' },
    ],
    analytics: {
      monthlyChange: -4500,
      monthlyChangePercent: -0.72,
      yearlyReturn: 6.8,
      diversificationScore: 75,
      riskLevel: 'Low-Medium' as const,
    },
    health: {
      healthScore: 76,
      emergencyFund: { current: 38000, target: 45000, months: 4.8 },
      debtToIncome: 32,
      savingsRate: 18,
      netWorthGrowth: 7.3,
    },
    goals: [
      {
        id: '1',
        goalName: 'College Fund for Kids',
        targetAmount: 150000,
        currentSavings: 78000,
        dueDate: '2030-08-31',
        category: 'other' as const,
      },
    ],
  },
  '4': {
    name: 'David Martinez',
    accountId: 'ACC-2024-5421',
    permissions: 'full' as PermissionLevel,
    wealthData: [
      { name: 'Savings', value: 220000, color: '#3b82f6' },
      { name: 'Bonds', value: 350000, color: '#8b5cf6' },
      { name: 'Stocks', value: 830000, color: '#10b981' },
      { name: 'Cryptocurrency', value: 165000, color: '#06b6d4' },
      { name: 'Investment Property', value: 425000, color: '#f59e0b' },
      { name: 'Joint Assets', value: 110000, color: '#ec4899' },
    ],
    analytics: {
      monthlyChange: 35000,
      monthlyChangePercent: 1.67,
      yearlyReturn: 12.4,
      diversificationScore: 85,
      riskLevel: 'High' as const,
    },
    health: {
      healthScore: 92,
      emergencyFund: { current: 100000, target: 80000, months: 10.0 },
      debtToIncome: 18,
      savingsRate: 32,
      netWorthGrowth: 14.2,
    },
    goals: [
      {
        id: '1',
        goalName: 'Second Investment Property',
        targetAmount: 500000,
        currentSavings: 425000,
        dueDate: '2027-06-30',
        category: 'investment' as const,
      },
    ],
  },
  '5': {
    name: 'Jennifer Thompson',
    accountId: 'ACC-2024-4312',
    permissions: 'full' as PermissionLevel,
    wealthData: [
      { name: 'Savings', value: 65000, color: '#3b82f6' },
      { name: 'Bonds', value: 100000, color: '#8b5cf6' },
      { name: 'Stocks', value: 162000, color: '#10b981' },
      { name: 'Cryptocurrency', value: 38000, color: '#06b6d4' },
      { name: 'Investment Property', value: 85000, color: '#f59e0b' },
      { name: 'Joint Assets', value: 35000, color: '#ec4899' },
    ],
    analytics: {
      monthlyChange: 8750,
      monthlyChangePercent: 1.80,
      yearlyReturn: 9.5,
      diversificationScore: 72,
      riskLevel: 'Medium' as const,
    },
    health: {
      healthScore: 79,
      emergencyFund: { current: 32000, target: 40000, months: 4.2 },
      debtToIncome: 30,
      savingsRate: 20,
      netWorthGrowth: 8.8,
    },
    goals: [
      {
        id: '1',
        goalName: 'Early Retirement',
        targetAmount: 1500000,
        currentSavings: 485000,
        dueDate: '2041-12-31',
        category: 'retirement' as const,
      },
    ],
  },
  '6': {
    name: 'Robert Kim',
    accountId: 'ACC-2024-3201',
    permissions: 'full' as PermissionLevel,
    wealthData: [
      { name: 'Savings', value: 175000, color: '#3b82f6' },
      { name: 'Bonds', value: 330000, color: '#8b5cf6' },
      { name: 'Stocks', value: 565000, color: '#10b981' },
      { name: 'Cryptocurrency', value: 125000, color: '#06b6d4' },
      { name: 'Investment Property', value: 295000, color: '#f59e0b' },
      { name: 'Joint Assets', value: 90000, color: '#ec4899' },
    ],
    analytics: {
      monthlyChange: 22100,
      monthlyChangePercent: 1.40,
      yearlyReturn: 11.8,
      diversificationScore: 84,
      riskLevel: 'Medium-High' as const,
    },
    health: {
      healthScore: 86,
      emergencyFund: { current: 65000, target: 60000, months: 7.5 },
      debtToIncome: 24,
      savingsRate: 26,
      netWorthGrowth: 12.1,
    },
    goals: [
      {
        id: '1',
        goalName: 'Vacation Home',
        targetAmount: 400000,
        currentSavings: 280000,
        dueDate: '2028-12-31',
        category: 'purchase' as const,
      },
    ],
  },
};

export function ClientDashboard() {
  const navigate = useNavigate();
  const { clientId } = useParams<{ clientId: string }>();

  const client = clientId ? clientsData[clientId] : null;

  if (!client) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Client Not Found</h1>
          <Link to="/advisor/dashboard" className="text-blue-400 hover:text-blue-300">
            Return to Advisor Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const permissions: PermissionLevel = client.permissions || 'view-only';
  const allowedSectors: string[] = client.allowedSectors || [];

  const totalWealth = client.wealthData.reduce((sum: number, item: any) => sum + item.value, 0);
  const analyticsData = {
    totalWealth,
    ...client.analytics,
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/advisor/dashboard')}
                className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                aria-label="Back to advisor dashboard"
              >
                <ArrowLeft className="w-5 h-5 text-zinc-400" />
              </button>
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <User className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{client.name}</h1>
                <p className="text-sm text-zinc-400">{client.accountId} • Read-Only View</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <Shield className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-400">Advisor Mode</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
            <p className="text-sm text-zinc-400 mb-1">Total Net Worth</p>
            <p className="text-3xl font-bold text-white">${totalWealth.toLocaleString()}</p>
            <p
              className={`text-sm mt-2 ${
                client.analytics.monthlyChange >= 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {client.analytics.monthlyChange >= 0 ? '+' : ''}$
              {Math.abs(client.analytics.monthlyChange).toLocaleString()} this month
            </p>
          </div>
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
            <p className="text-sm text-zinc-400 mb-1">Largest Asset</p>
            <p className="text-3xl font-bold text-white">
              {client.wealthData.reduce((max: any, item: any) =>
                item.value > max.value ? item : max
              ).name}
            </p>
            <p className="text-sm text-zinc-400 mt-2">
              ${client.wealthData.reduce((max: any, item: any) =>
                item.value > max.value ? item : max
              ).value.toLocaleString()}{' '}
              (
              {(
                (client.wealthData.reduce((max: any, item: any) =>
                  item.value > max.value ? item : max
                ).value /
                  totalWealth) *
                100
              ).toFixed(1)}
              %)
            </p>
          </div>
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
            <p className="text-sm text-zinc-400 mb-1">Financial Health</p>
            <p
              className={`text-3xl font-bold ${
                client.health.healthScore >= 80
                  ? 'text-green-500'
                  : client.health.healthScore >= 60
                  ? 'text-yellow-500'
                  : 'text-red-500'
              }`}
            >
              {client.health.healthScore >= 80
                ? 'Excellent'
                : client.health.healthScore >= 60
                ? 'Good'
                : 'Fair'}
            </p>
            <p className="text-sm text-zinc-400 mt-2">Score: {client.health.healthScore}/100</p>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Wealth Pie Chart - Takes 2 columns */}
          <div className="lg:col-span-2">
            <WealthPieChart data={client.wealthData} enableNavigation={false} />
          </div>

          {/* Portfolio Analytics */}
          <div className="lg:col-span-1">
            <PortfolioAnalytics {...analyticsData} />
          </div>

          {/* Financial Health Indicator - Full width */}
          <div className="lg:col-span-3">
            <FinancialHealthIndicator {...client.health} />
          </div>

          {/* Financial Goals Widget - Full width */}
          <div className="lg:col-span-3">
            <FinancialGoalsWidget goals={client.goals} />
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Portfolio Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-zinc-300">
            <div>
              <h4 className="font-semibold text-white mb-2">Asset Allocation Strategy</h4>
              <p className="text-zinc-400">
                {client.name}'s portfolio demonstrates a {client.analytics.riskLevel.toLowerCase()}{' '}
                risk strategy with a diversification score of {client.analytics.diversificationScore}
                /100. The portfolio has generated a {client.analytics.yearlyReturn}% return over the
                past year.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Financial Health Overview</h4>
              <p className="text-zinc-400">
                With a health score of {client.health.healthScore}/100, the client maintains a{' '}
                {client.health.debtToIncome}% debt-to-income ratio and saves{' '}
                {client.health.savingsRate}% of their income monthly. Net worth is growing at{' '}
                {client.health.netWorthGrowth}% annually.
              </p>
            </div>
          </div>
        </div>

        {/* Advisor Notice */}
        <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-purple-400 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-white mb-1">Advisor Access Notice</h4>
              <p className="text-xs text-zinc-400">
                You are viewing this dashboard in read-only mode. All access is logged and monitored
                for compliance. This session will expire in 45 minutes. The client has been notified
                of your access.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-12 py-6">
        <div className="container mx-auto px-6 text-center text-sm text-zinc-500">
          <p>
            Viewing as Advisor (ADV-2024-1523) • Last updated: March 7, 2026 • Data is for
            demonstration purposes only
          </p>
        </div>
      </footer>
    </div>
  );
}