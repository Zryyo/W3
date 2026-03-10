import { Link } from 'react-router';
import { ArrowLeft, Wallet, TrendingUp, Calendar, DollarSign, Activity } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { SectorAIRecommendations } from '../../components/SectorAIRecommendations';

export function SavingsSector() {
  const totalSavings = 105000;
  const totalWealth = 805000;
  const percentOfWealth = ((totalSavings / totalWealth) * 100).toFixed(1);

  // Account type allocation
  const accountTypeData = [
    { name: 'High-Yield Savings', value: 52500, percentage: 50.0, color: '#3b82f6' },
    { name: 'Checking Account', value: 31500, percentage: 30.0, color: '#10b981' },
    { name: 'Emergency Fund', value: 15750, percentage: 15.0, color: '#f59e0b' },
    { name: 'Money Market', value: 5250, percentage: 5.0, color: '#8b5cf6' },
  ];

  const renderCustomLabel = (entry: any) => {
    return `${entry.percentage}%`;
  };

  // Mock savings growth data
  const growthData = [
    { month: 'Sep', balance: 102000 },
    { month: 'Oct', balance: 105500 },
    { month: 'Nov', balance: 108200 },
    { month: 'Dec', balance: 110800 },
    { month: 'Jan', balance: 113200 },
    { month: 'Feb', balance: 115000 },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                aria-label="Back to dashboard"
              >
                <ArrowLeft className="w-5 h-5 text-zinc-400" />
              </Link>
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Wallet className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Savings</h1>
                <p className="text-sm text-zinc-400">Liquid cash and savings accounts</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <span className="text-sm text-blue-400">{percentOfWealth}% of Total Wealth</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-zinc-900 border-zinc-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-sm text-zinc-400">Total Balance</p>
            </div>
            <p className="text-3xl font-bold text-white">${totalSavings.toLocaleString()}</p>
            <p className="text-xs text-blue-400 mt-1">{percentOfWealth}% of total portfolio</p>
            <p className="text-xs text-zinc-500 mt-1">Across all accounts</p>
          </Card>

          <Card className="p-6 bg-zinc-900 border-zinc-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-sm text-zinc-400">Monthly Growth</p>
            </div>
            <p className="text-3xl font-bold text-green-500">+$1,800</p>
            <p className="text-xs text-zinc-500 mt-2">+1.59% this month</p>
          </Card>

          <Card className="p-6 bg-zinc-900 border-zinc-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Activity className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-sm text-zinc-400">Average Yield</p>
            </div>
            <p className="text-3xl font-bold text-white">4.25%</p>
            <p className="text-xs text-zinc-500 mt-2">Weighted average APY</p>
          </Card>

          <Card className="p-6 bg-zinc-900 border-zinc-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <Calendar className="w-5 h-5 text-yellow-500" />
              </div>
              <p className="text-sm text-zinc-400">Interest Earned</p>
            </div>
            <p className="text-3xl font-bold text-white">$407</p>
            <p className="text-xs text-zinc-500 mt-2">This month</p>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Savings Growth Chart - 2 columns */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-zinc-900 border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-6">Savings Growth Over Time</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                    <XAxis dataKey="month" stroke="#a1a1aa" />
                    <YAxis stroke="#a1a1aa" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#18181b',
                        border: '1px solid #3f3f46',
                        borderRadius: '8px',
                        color: '#fff',
                      }}
                      formatter={(value: number) => `$${value.toLocaleString()}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="balance"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="p-3 bg-zinc-800/50 rounded-lg">
                  <p className="text-xs text-zinc-400">6-Month Growth</p>
                  <p className="text-lg font-semibold text-green-500">+$13,000</p>
                  <p className="text-xs text-zinc-500">+12.7%</p>
                </div>
                <div className="p-3 bg-zinc-800/50 rounded-lg">
                  <p className="text-xs text-zinc-400">Average Monthly Increase</p>
                  <p className="text-lg font-semibold text-white">+$2,167</p>
                  <p className="text-xs text-zinc-500">Consistent growth</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Emergency Fund Coverage - 1 column */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-zinc-900 border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-6">Emergency Fund Coverage</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-zinc-400">Current Coverage</span>
                    <span className="text-sm font-semibold text-white">5.4 months</span>
                  </div>
                  <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                      style={{ width: '90%' }}
                    />
                  </div>
                  <p className="text-xs text-zinc-500 mt-2">Target: 6 months</p>
                </div>

                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm font-semibold text-green-400">Nearly There</span>
                  </div>
                  <p className="text-xs text-zinc-300">
                    You're $5,000 away from your 6-month emergency fund goal.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                    <span className="text-xs text-zinc-400">Emergency Fund</span>
                    <span className="text-sm font-semibold text-white">$45,000</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                    <span className="text-xs text-zinc-400">Monthly Expenses</span>
                    <span className="text-sm font-semibold text-white">$8,333</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                    <span className="text-xs text-zinc-400">Target Fund</span>
                    <span className="text-sm font-semibold text-white">$50,000</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Cash Flow - Full width */}
          <div className="lg:col-span-3">
            <Card className="p-6 bg-zinc-900 border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-6">Monthly Cash Flow</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p className="text-sm text-zinc-400 mb-2">Monthly Inflow</p>
                    <p className="text-3xl font-bold text-green-500">+$8,200</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-400">Salary deposits</span>
                        <span className="text-zinc-300">$7,500</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-400">Interest earned</span>
                        <span className="text-zinc-300">$407</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-400">Other income</span>
                        <span className="text-zinc-300">$293</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-sm text-zinc-400 mb-2">Monthly Outflow</p>
                    <p className="text-3xl font-bold text-red-500">-$6,400</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-400">Bills & expenses</span>
                        <span className="text-zinc-300">$4,200</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-400">Investments</span>
                        <span className="text-zinc-300">$1,800</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-400">Other transfers</span>
                        <span className="text-zinc-300">$400</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <p className="text-sm text-zinc-400 mb-2">Net Flow</p>
                    <p className="text-3xl font-bold text-blue-500">+$1,800</p>
                    <div className="mt-4">
                      <p className="text-xs text-zinc-400 mb-3">Savings Rate</p>
                      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                          style={{ width: '22%' }}
                        />
                      </div>
                      <p className="text-xs text-zinc-500 mt-2">22% of income saved</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Account Breakdown - Full width */}
          <div className="lg:col-span-3">
            <Card className="p-6 bg-zinc-900 border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-6">Account Breakdown</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                      <Wallet className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">High-Yield Savings Account</p>
                      <p className="text-xs text-zinc-500">Chase Bank • Account ****4521</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">$72,000</p>
                    <p className="text-xs text-green-500">4.50% APY</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-500/10 rounded-lg">
                      <Wallet className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Money Market Account</p>
                      <p className="text-xs text-zinc-500">Fidelity • Account ****8832</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">$35,000</p>
                    <p className="text-xs text-green-500">4.25% APY</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-cyan-500/10 rounded-lg">
                      <Wallet className="w-5 h-5 text-cyan-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Checking Account</p>
                      <p className="text-xs text-zinc-500">Bank of America • Account ****2341</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">$8,000</p>
                    <p className="text-xs text-zinc-500">0.01% APY</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Account Type Allocation - 2 columns */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-zinc-900 border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-6">Account Type Allocation</h3>
              <div className="h-[280px] mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={accountTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomLabel}
                      outerRadius={100}
                      dataKey="value"
                    >
                      {accountTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#18181b',
                        border: '1px solid #3f3f46',
                        borderRadius: '8px',
                        color: '#fff',
                      }}
                      formatter={(value: number) => `$${value.toLocaleString()}`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {accountTypeData.map((type) => (
                  <div
                    key={type.name}
                    className="flex items-center justify-between p-3 bg-zinc-800/50 rounded"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: type.color }}
                      />
                      <span className="text-sm text-zinc-300">{type.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-white">
                        ${type.value.toLocaleString()}
                      </span>
                      <span className="text-xs text-zinc-500 ml-2">{type.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Interest & Yield - 1 column */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-zinc-900 border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-6">Interest & Yield</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-sm text-zinc-400 mb-2">Weighted Avg APY</p>
                  <p className="text-3xl font-bold text-white">4.25%</p>
                  <p className="text-xs text-zinc-500 mt-2">Across all accounts</p>
                </div>

                <div className="p-4 bg-zinc-800/50 rounded-lg">
                  <p className="text-sm text-zinc-400 mb-2">Monthly Interest</p>
                  <p className="text-3xl font-bold text-green-500">$407</p>
                  <p className="text-xs text-zinc-500 mt-2">Passive income</p>
                </div>

                <div className="p-4 bg-zinc-800/50 rounded-lg">
                  <p className="text-sm text-zinc-400 mb-2">Annual Interest</p>
                  <p className="text-3xl font-bold text-white">~$4,884</p>
                  <p className="text-xs text-zinc-500 mt-2">Projected earnings</p>
                </div>

                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-xs text-green-400 font-semibold mb-1">Competitive Rates</p>
                  <p className="text-xs text-zinc-300">
                    Your APY is above the national average of 0.45%
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Insights */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Financial Health Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-400 mb-2">✓ Strong Emergency Cushion</h4>
              <p className="text-sm text-zinc-300">
                Your emergency fund covers 5.4 months of expenses, providing excellent protection
                against unexpected financial challenges. You're just $5,000 away from the
                recommended 6-month target.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-400 mb-2">✓ Excellent Interest Rates</h4>
              <p className="text-sm text-zinc-300">
                With a weighted average yield of 4.25% APY, your savings are earning competitive
                returns. Your high-yield accounts are generating $407 per month in passive income.
              </p>
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="mt-8">
          <SectorAIRecommendations
            sectorName="Savings"
            sectorValue={totalSavings}
            totalWealth={totalWealth}
          />
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