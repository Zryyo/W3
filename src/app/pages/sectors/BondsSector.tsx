import { Link } from 'react-router';
import { ArrowLeft, Shield, TrendingUp, Calendar, DollarSign, PieChart as PieIcon } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function BondsSector() {
  const totalBonds = 75000;
  const totalWealth = 805000;
  const percentOfWealth = ((totalBonds / totalWealth) * 100).toFixed(1);

  // Mock credit quality mix data
  const creditQualityData = [
    { name: 'AAA', value: 35000, percentage: 46.7, color: '#10b981' },
    { name: 'AA', value: 25000, percentage: 33.3, color: '#3b82f6' },
    { name: 'A', value: 12000, percentage: 16.0, color: '#8b5cf6' },
    { name: 'BBB', value: 3000, percentage: 4.0, color: '#f59e0b' },
  ];

  const renderCustomLabel = (entry: any) => {
    return `${entry.percentage}%`;
  };

  // Mock maturity distribution
  const maturityData = [
    { range: '0-1y', amount: 8000 },
    { range: '1-3y', amount: 18000 },
    { range: '3-5y', amount: 25000 },
    { range: '5-10y', amount: 18000 },
    { range: '10y+', amount: 6000 },
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
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Shield className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Bonds</h1>
                <p className="text-sm text-zinc-400">Fixed income securities</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <span className="text-sm text-purple-400">{percentOfWealth}% of Total Wealth</span>
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
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <DollarSign className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-sm text-zinc-400">Total Value</p>
            </div>
            <p className="text-3xl font-bold text-white">${totalBonds.toLocaleString()}</p>
            <p className="text-xs text-purple-400 mt-1">{percentOfWealth}% of total portfolio</p>
            <p className="text-xs text-zinc-500 mt-1">Current market value</p>
          </Card>

          <Card className="p-6 bg-zinc-900 border-zinc-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-sm text-zinc-400">Current Yield</p>
            </div>
            <p className="text-3xl font-bold text-green-500">4.85%</p>
            <p className="text-xs text-zinc-500 mt-2">Weighted average</p>
          </Card>

          <Card className="p-6 bg-zinc-900 border-zinc-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-sm text-zinc-400">Avg. Maturity</p>
            </div>
            <p className="text-3xl font-bold text-white">4.2 yrs</p>
            <p className="text-xs text-zinc-500 mt-2">Duration: 3.8 years</p>
          </Card>

          <Card className="p-6 bg-zinc-900 border-zinc-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <DollarSign className="w-5 h-5 text-yellow-500" />
              </div>
              <p className="text-sm text-zinc-400">Annual Income</p>
            </div>
            <p className="text-3xl font-bold text-white">$3,638</p>
            <p className="text-xs text-green-500 mt-2">$303/month</p>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Maturity Distribution - 2 columns */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-zinc-900 border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-6">Maturity Distribution</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={maturityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                    <XAxis dataKey="range" stroke="#a1a1aa" />
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
                    <Bar dataKey="amount" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="p-3 bg-zinc-800/50 rounded-lg">
                  <p className="text-xs text-zinc-400">Near Term (0-3y)</p>
                  <p className="text-lg font-semibold text-white">$26,000</p>
                  <p className="text-xs text-zinc-500">34.7%</p>
                </div>
                <div className="p-3 bg-zinc-800/50 rounded-lg">
                  <p className="text-xs text-zinc-400">Mid Term (3-5y)</p>
                  <p className="text-lg font-semibold text-white">$25,000</p>
                  <p className="text-xs text-zinc-500">33.3%</p>
                </div>
                <div className="p-3 bg-zinc-800/50 rounded-lg">
                  <p className="text-xs text-zinc-400">Long Term (5y+)</p>
                  <p className="text-lg font-semibold text-white">$24,000</p>
                  <p className="text-xs text-zinc-500">32.0%</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Credit Quality Mix - 1 column */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-zinc-900 border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-6">Credit Quality Mix</h3>
              <div className="h-[200px] mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={creditQualityData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomLabel}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {creditQualityData.map((entry, index) => (
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
                {creditQualityData.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between p-2 bg-zinc-800/50 rounded"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-zinc-300">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-white">
                        ${item.value.toLocaleString()}
                      </span>
                      <span className="text-xs text-zinc-500 ml-2">{item.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-xs text-green-400 font-semibold mb-1">Investment Grade</p>
                <p className="text-xs text-zinc-300">100% of holdings are rated BBB or higher</p>
              </div>
            </Card>
          </div>

          {/* Performance & Income - Full width */}
          <div className="lg:col-span-3">
            <Card className="p-6 bg-zinc-900 border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-6">Income & Sensitivity</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <DollarSign className="w-5 h-5 text-purple-400" />
                    </div>
                    <p className="text-sm text-zinc-400">Annual Income</p>
                  </div>
                  <p className="text-3xl font-bold text-white mb-2">$3,638</p>
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400">Coupon payments</span>
                      <span className="text-zinc-300">$3,300</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400">Accrued interest</span>
                      <span className="text-zinc-300">$338</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-400" />
                    </div>
                    <p className="text-sm text-zinc-400">Duration Risk</p>
                  </div>
                  <p className="text-3xl font-bold text-white mb-2">3.8 yrs</p>
                  <p className="text-xs text-zinc-300 mt-4">
                    <span className="text-blue-400">Moderate sensitivity:</span> A 1% rate increase
                    would reduce portfolio value by approximately $2,850 (3.8%).
                  </p>
                </div>

                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                    <p className="text-sm text-zinc-400">Yield vs Treasury</p>
                  </div>
                  <p className="text-3xl font-bold text-green-500 mb-2">+1.25%</p>
                  <p className="text-xs text-zinc-300 mt-4">
                    Your portfolio yields 4.85% vs. the 10-year Treasury at 3.60%, providing a
                    healthy risk premium.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Holdings Detail - Full width */}
          <div className="lg:col-span-3">
            <Card className="p-6 bg-zinc-900 border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-6">Top Holdings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors">
                  <div>
                    <p className="font-semibold text-white">US Treasury Bond</p>
                    <p className="text-xs text-zinc-500">Maturity: Dec 2028 • Rating: AAA</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">$20,000</p>
                    <p className="text-xs text-green-500">3.75% Yield</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors">
                  <div>
                    <p className="font-semibold text-white">Singapore Government Bond (SGS)</p>
                    <p className="text-xs text-zinc-500">Maturity: May 2029 • Rating: AAA</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">$18,000</p>
                    <p className="text-xs text-green-500">3.85% Yield</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors">
                  <div>
                    <p className="font-semibold text-white">DBS Bank 3.5% Corporate Bond</p>
                    <p className="text-xs text-zinc-500">Maturity: Nov 2028 • Rating: AA-</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">$15,000</p>
                    <p className="text-xs text-green-500">5.20% Yield</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors">
                  <div>
                    <p className="font-semibold text-white">UOB 4.2% Perpetual Bond</p>
                    <p className="text-xs text-zinc-500">Callable 2029 • Rating: A+</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">$12,000</p>
                    <p className="text-xs text-green-500">5.85% Yield</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 transition-colors">
                  <div>
                    <p className="font-semibold text-white">CapitaLand Integrated Commercial Trust (CICT)</p>
                    <p className="text-xs text-zinc-500">Maturity: Jan 2030 • Rating: A-</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">$10,000</p>
                    <p className="text-xs text-green-500">4.95% Yield</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Insights */}
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Financial Health Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-purple-400 mb-2">✓ High Credit Quality</h4>
              <p className="text-sm text-zinc-300">
                Your bond portfolio is 100% investment-grade, with 80% rated AA or higher. This
                provides excellent safety and predictable income with minimal default risk.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-purple-400 mb-2">✓ Balanced Maturity Ladder</h4>
              <p className="text-sm text-zinc-300">
                With a 4.2-year average maturity and well-distributed maturities, you have excellent
                liquidity flexibility while earning a competitive 4.85% yield on stable income.
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