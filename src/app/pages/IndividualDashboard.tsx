import { WealthPieChart } from '../components/WealthPieChart';
import { PortfolioAnalytics } from '../components/PortfolioAnalytics';
import { FinancialHealthIndicator } from '../components/FinancialHealthIndicator';
import { FinancialGoalsWidget } from '../components/FinancialGoalsWidget';

export function IndividualDashboard() {
  // Mock data for wealth composition
  const wealthData = [
    { name: 'Savings', value: 105000, color: '#3b82f6' },
    { name: 'Bonds', value: 68000, color: '#8b5cf6' },
    { name: 'Stocks', value: 205000, color: '#10b981' },
    { name: 'Cryptocurrency', value: 60000, color: '#06b6d4' },
    { name: 'Investment Property', value: 295000, color: '#f59e0b' },
    { name: 'Joint Assets', value: 72000, color: '#ec4899' },
  ];

  const totalWealth = wealthData.reduce((sum, item) => sum + item.value, 0);

  // Mock analytics data
  const analyticsData = {
    totalWealth,
    monthlyChange: 12450,
    monthlyChangePercent: 1.54,
    yearlyReturn: 8.7,
    diversificationScore: 78,
    riskLevel: 'Medium' as const,
  };

  // Mock financial health data
  const healthData = {
    healthScore: 82,
    emergencyFund: {
      current: 45000,
      target: 50000,
      months: 5.4,
    },
    debtToIncome: 28,
    savingsRate: 22,
    netWorthGrowth: 9.2,
  };

  // Mock financial goals data
  const goalsData = [
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
    {
      id: '3',
      goalName: 'Retirement Savings',
      targetAmount: 1000000,
      currentSavings: 380000,
      dueDate: '2046-12-31',
      category: 'retirement' as const,
    },
  ];

  const handleAddGoal = () => {
    console.log('Add new goal clicked');
  };

  return (
    <main className="container mx-auto px-6 py-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
          <p className="text-sm text-zinc-400 mb-1">Total Net Worth</p>
          <p className="text-3xl font-bold text-white">${totalWealth.toLocaleString()}</p>
          <p className="text-sm text-green-500 mt-2">+$12,450 this month</p>
        </div>
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
          <p className="text-sm text-zinc-400 mb-1">Largest Asset</p>
          <p className="text-3xl font-bold text-white">Property</p>
          <p className="text-sm text-zinc-400 mt-2">$295,000 (36.6%)</p>
        </div>
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
          <p className="text-sm text-zinc-400 mb-1">Financial Health</p>
          <p className="text-3xl font-bold text-green-500">Excellent</p>
          <p className="text-sm text-zinc-400 mt-2">Score: 82/100</p>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Wealth Pie Chart - Takes 2 columns */}
        <div className="lg:col-span-2">
          <WealthPieChart data={wealthData} />
        </div>

        {/* Portfolio Analytics */}
        <div className="lg:col-span-1">
          <PortfolioAnalytics {...analyticsData} />
        </div>

        {/* Financial Health Indicator - Full width */}
        <div className="lg:col-span-3">
          <FinancialHealthIndicator {...healthData} />
        </div>

        {/* Financial Goals Widget - Full width */}
        <div className="lg:col-span-3">
          <FinancialGoalsWidget goals={goalsData} onAddGoal={handleAddGoal} />
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-8 p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-4">About Your Portfolio</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-zinc-300">
          <div>
            <h4 className="font-semibold text-white mb-2">Asset Allocation Strategy</h4>
            <p className="text-zinc-400">
              Your portfolio demonstrates a balanced approach with significant real estate holdings (36.6%),
              strong equity exposure (25.4%), and diversified income investments. Joint assets (8.9%)
              provide family financial security and shared growth opportunities.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Risk Profile</h4>
            <p className="text-zinc-400">
              Your current risk level is classified as <span className="text-yellow-500 font-semibold">Medium</span>,
              which aligns well with a balanced growth strategy. The diversification score of 78/100 indicates
              good risk management across different asset classes.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}