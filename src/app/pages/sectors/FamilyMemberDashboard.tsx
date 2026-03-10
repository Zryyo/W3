import { useNavigate, useParams, Link } from 'react-router';
import { ArrowLeft, User } from 'lucide-react';
import { WealthPieChart } from '../../components/WealthPieChart';
import { PortfolioAnalytics } from '../../components/PortfolioAnalytics';
import { FinancialHealthIndicator } from '../../components/FinancialHealthIndicator';
import { FinancialGoalsWidget } from '../../components/FinancialGoalsWidget';

// Family member data mapping
const familyMembersData: Record<string, any> = {
  sarah: {
    name: 'Sarah Johnson',
    relationship: 'Primary Account Holder',
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
  michael: {
    name: 'Michael Johnson',
    relationship: 'Spouse',
    wealthData: [
      { name: 'Savings', value: 92000, color: '#3b82f6' },
      { name: 'Bonds', value: 115000, color: '#8b5cf6' },
      { name: 'Stocks', value: 245000, color: '#10b981' },
      { name: 'Cryptocurrency', value: 52000, color: '#06b6d4' },
      { name: 'Investment Property', value: 109000, color: '#f59e0b' },
      { name: 'Joint Assets', value: 72000, color: '#ec4899' },
    ],
    analytics: {
      monthlyChange: 9850,
      monthlyChangePercent: 1.44,
      yearlyReturn: 9.3,
      diversificationScore: 75,
      riskLevel: 'Medium' as const,
    },
    health: {
      healthScore: 85,
      emergencyFund: { current: 38000, target: 40000, months: 4.8 },
      debtToIncome: 25,
      savingsRate: 24,
      netWorthGrowth: 8.8,
    },
    goals: [
      {
        id: '1',
        goalName: 'Business Investment Fund',
        targetAmount: 150000,
        currentSavings: 95000,
        dueDate: '2028-06-30',
        category: 'investment' as const,
      },
      {
        id: '2',
        goalName: 'Vacation Property',
        targetAmount: 200000,
        currentSavings: 72000,
        dueDate: '2030-12-31',
        category: 'purchase' as const,
      },
    ],
  },
  emma: {
    name: 'Emma Johnson',
    relationship: 'Dependent (College Fund)',
    wealthData: [
      { name: 'Savings', value: 15000, color: '#3b82f6' },
      { name: 'Bonds', value: 35000, color: '#8b5cf6' },
      { name: 'Stocks', value: 58000, color: '#10b981' },
      { name: 'Cryptocurrency', value: 0, color: '#06b6d4' },
      { name: 'Investment Property', value: 0, color: '#f59e0b' },
      { name: 'Joint Assets', value: 17000, color: '#ec4899' },
    ],
    analytics: {
      monthlyChange: 1200,
      monthlyChangePercent: 0.96,
      yearlyReturn: 7.2,
      diversificationScore: 65,
      riskLevel: 'Low' as const,
    },
    health: {
      healthScore: 90,
      emergencyFund: { current: 0, target: 0, months: 0 },
      debtToIncome: 0,
      savingsRate: 100,
      netWorthGrowth: 12.5,
    },
    goals: [
      {
        id: '1',
        goalName: 'College Tuition Fund',
        targetAmount: 200000,
        currentSavings: 125000,
        dueDate: '2030-08-31',
        category: 'other' as const,
      },
    ],
  },
  lucas: {
    name: 'Lucas Johnson',
    relationship: 'Dependent (Education Savings)',
    wealthData: [
      { name: 'Savings', value: 12000, color: '#3b82f6' },
      { name: 'Bonds', value: 28000, color: '#8b5cf6' },
      { name: 'Stocks', value: 35000, color: '#10b981' },
      { name: 'Cryptocurrency', value: 0, color: '#06b6d4' },
      { name: 'Investment Property', value: 0, color: '#f59e0b' },
      { name: 'Joint Assets', value: 10000, color: '#ec4899' },
    ],
    analytics: {
      monthlyChange: 850,
      monthlyChangePercent: 1.00,
      yearlyReturn: 6.8,
      diversificationScore: 68,
      riskLevel: 'Low' as const,
    },
    health: {
      healthScore: 92,
      emergencyFund: { current: 0, target: 0, months: 0 },
      debtToIncome: 0,
      savingsRate: 100,
      netWorthGrowth: 11.2,
    },
    goals: [
      {
        id: '1',
        goalName: 'Education Fund',
        targetAmount: 180000,
        currentSavings: 85000,
        dueDate: '2033-08-31',
        category: 'other' as const,
      },
    ],
  },
};

export function FamilyMemberDashboard() {
  const navigate = useNavigate();
  const { memberId } = useParams<{ memberId: string }>();

  const member = memberId ? familyMembersData[memberId] : null;

  if (!member) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Family Member Not Found</h1>
          <Link to="/sector/joint-assets" className="text-blue-400 hover:text-blue-300">
            Return to Joint Assets
          </Link>
        </div>
      </div>
    );
  }

  const totalWealth = member.wealthData.reduce((sum: number, item: any) => sum + item.value, 0);
  const analyticsData = {
    totalWealth,
    ...member.analytics,
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/sector/joint-assets')}
                className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                aria-label="Back to joint assets"
              >
                <ArrowLeft className="w-5 h-5 text-zinc-400" />
              </button>
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <User className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{member.name}</h1>
                <p className="text-sm text-zinc-400">{member.relationship}</p>
              </div>
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
                member.analytics.monthlyChange >= 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {member.analytics.monthlyChange >= 0 ? '+' : ''}$
              {Math.abs(member.analytics.monthlyChange).toLocaleString()} this month
            </p>
          </div>
          <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
            <p className="text-sm text-zinc-400 mb-1">Largest Asset</p>
            <p className="text-3xl font-bold text-white">
              {member.wealthData
                .filter((item: any) => item.value > 0)
                .reduce((max: any, item: any) => (item.value > max.value ? item : max)).name}
            </p>
            <p className="text-sm text-zinc-400 mt-2">
              $
              {member.wealthData
                .filter((item: any) => item.value > 0)
                .reduce((max: any, item: any) => (item.value > max.value ? item : max))
                .value.toLocaleString()}{' '}
              (
              {(
                (member.wealthData
                  .filter((item: any) => item.value > 0)
                  .reduce((max: any, item: any) => (item.value > max.value ? item : max)).value /
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
                member.health.healthScore >= 80
                  ? 'text-green-500'
                  : member.health.healthScore >= 60
                  ? 'text-yellow-500'
                  : 'text-red-500'
              }`}
            >
              {member.health.healthScore >= 80
                ? 'Excellent'
                : member.health.healthScore >= 60
                ? 'Good'
                : 'Fair'}
            </p>
            <p className="text-sm text-zinc-400 mt-2">Score: {member.health.healthScore}/100</p>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Wealth Pie Chart - Takes 2 columns */}
          <div className="lg:col-span-2">
            <WealthPieChart data={member.wealthData} enableNavigation={false} />
          </div>

          {/* Portfolio Analytics */}
          <div className="lg:col-span-1">
            <PortfolioAnalytics {...analyticsData} />
          </div>

          {/* Financial Health Indicator - Full width */}
          <div className="lg:col-span-3">
            <FinancialHealthIndicator {...member.health} />
          </div>

          {/* Financial Goals Widget - Full width */}
          <div className="lg:col-span-3">
            <FinancialGoalsWidget goals={member.goals} />
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">About {member.name.split(' ')[0]}'s Portfolio</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-zinc-300">
            <div>
              <h4 className="font-semibold text-white mb-2">Asset Allocation Strategy</h4>
              <p className="text-zinc-400">
                {member.name.split(' ')[0]}'s portfolio demonstrates a{' '}
                {member.analytics.riskLevel.toLowerCase()} risk approach with{' '}
                {member.analytics.diversificationScore}/100 diversification. The portfolio has
                generated a {member.analytics.yearlyReturn}% return over the past year.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Financial Profile</h4>
              <p className="text-zinc-400">
                With a health score of {member.health.healthScore}/100, {member.name.split(' ')[0]}{' '}
                maintains a {member.health.savingsRate}% savings rate. Net worth is growing at{' '}
                {member.health.netWorthGrowth}% annually, reflecting strong financial discipline.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-12 py-6">
        <div className="container mx-auto px-6 text-center text-sm text-zinc-500">
          <p>Last updated: March 7, 2026 • Data is for demonstration purposes only</p>
        </div>
      </footer>
    </div>
  );
}
