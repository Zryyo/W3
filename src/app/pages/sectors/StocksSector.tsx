import { Link } from 'react-router';
import {
  ArrowLeft,
  TrendingUp,
  DollarSign,
  PieChart as PieIcon,
  Globe,
  Target,
  Activity,
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export function StocksSector() {
  const totalStocks = 225000;
  const totalWealth = 805000;
  const percentOfWealth = ((totalStocks / totalWealth) * 100).toFixed(1);
  const costBasis = 185000;
  const unrealizedGain = totalStocks - costBasis;
  const returnPercent = ((unrealizedGain / costBasis) * 100).toFixed(1);

  // Sector allocation
  const sectorData = [
    { name: 'Technology', value: 70000, percentage: 31.1, color: '#3b82f6' },
    { name: 'Healthcare', value: 45000, percentage: 20.0, color: '#10b981' },
    { name: 'Financial', value: 38000, percentage: 16.9, color: '#8b5cf6' },
    { name: 'Consumer', value: 35000, percentage: 15.6, color: '#f59e0b' },
    { name: 'Industrial', value: 22000, percentage: 9.8, color: '#06b6d4' },
    { name: 'Energy', value: 15000, percentage: 6.7, color: '#ef4444' },
  ];

  // Geographic allocation
  const geoData = [
    { name: 'US', value: 146250, percentage: 65, color: '#3b82f6' },
    { name: 'Europe', value: 45000, percentage: 20, color: '#8b5cf6' },
    { name: 'Asia', value: 22500, percentage: 10, color: '#10b981' },
    { name: 'Emerging Markets', value: 11250, percentage: 5, color: '#f59e0b' },
  ];

  const renderCustomLabel = (entry: any) => {
    return `${entry.percentage}%`;
  };

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
              <div className="p-2 bg-green-500/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Stocks</h1>
                <p className="text-sm text-zinc-400">Equity investments</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
              <span className="text-sm text-green-400">{percentOfWealth}% of Total Wealth</span>
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
              <div className="p-2 bg-green-500/10 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-sm text-zinc-400">Total Value</p>
            </div>
            <p className="text-3xl font-bold text-white">${totalStocks.toLocaleString()}</p>
            <p className="text-xs text-green-400 mt-1">{percentOfWealth}% of total portfolio</p>
            <p className="text-xs text-zinc-500 mt-1">Current market value</p>
          </Card>

          <Card className="p-6 bg-zinc-900 border-zinc-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-sm text-zinc-400">Total Return</p>
            </div>
            <p className="text-3xl font-bold text-green-500">+{returnPercent}%</p>
            <p className="text-xs text-zinc-500 mt-2">Since inception</p>
          </Card>

          <Card className="p-6 bg-zinc-900 border-zinc-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-sm text-zinc-400">Unrealized Gain</p>
            </div>
            <p className="text-3xl font-bold text-white">+${unrealizedGain.toLocaleString()}</p>
            <p className="text-xs text-green-500 mt-2">Not yet taxed</p>
          </Card>

          <Card className="p-6 bg-zinc-900 border-zinc-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <DollarSign className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-sm text-zinc-400">Dividend Income</p>
            </div>
            <p className="text-3xl font-bold text-white">$4,050</p>
            <p className="text-xs text-zinc-500 mt-2">$338/month avg.</p>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sector Allocation Pie Chart */}
          <Card className="p-6 bg-zinc-900 border-zinc-800">
            <h3 className="text-lg font-semibold text-white mb-6">Sector Allocation</h3>
            <div className="h-[280px] mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomLabel}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {sectorData.map((entry, index) => (
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
              {sectorData.map((sector) => (
                <div
                  key={sector.name}
                  className="flex items-center justify-between p-2 bg-zinc-800/50 rounded"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: sector.color }}
                    />
                    <span className="text-sm text-zinc-300">{sector.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-white">
                      ${sector.value.toLocaleString()}
                    </span>
                    <span className="text-xs text-zinc-500 ml-2">{sector.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Geographic Allocation Pie Chart */}
          <Card className="p-6 bg-zinc-900 border-zinc-800">
            <h3 className="text-lg font-semibold text-white mb-6">Geographic Allocation</h3>
            <div className="h-[280px] mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={geoData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomLabel}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {geoData.map((entry, index) => (
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
              {geoData.map((region) => (
                <div
                  key={region.name}
                  className="flex items-center justify-between p-2 bg-zinc-800/50 rounded"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: region.color }}
                    />
                    <span className="text-sm text-zinc-300">{region.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-white">
                      ${region.value.toLocaleString()}
                    </span>
                    <span className="text-xs text-zinc-500 ml-2">{region.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Performance Metrics - Full width */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-zinc-900 border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-6">Performance Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-sm text-zinc-400 mb-2">vs S&P 500</p>
                  <p className="text-3xl font-bold text-green-500">+2.3%</p>
                  <p className="text-xs text-zinc-500 mt-2">Outperforming benchmark</p>
                </div>
                <div className="p-4 bg-zinc-800/50 rounded-lg">
                  <p className="text-sm text-zinc-400 mb-2">1 Year Return</p>
                  <p className="text-3xl font-bold text-green-500">+18.2%</p>
                  <p className="text-xs text-zinc-500 mt-2">Strong performance</p>
                </div>
                <div className="p-4 bg-zinc-800/50 rounded-lg">
                  <p className="text-sm text-zinc-400 mb-2">YTD Return</p>
                  <p className="text-3xl font-bold text-green-500">+6.8%</p>
                  <p className="text-xs text-zinc-500 mt-2">Year to date</p>
                </div>
                <div className="p-4 bg-zinc-800/50 rounded-lg">
                  <p className="text-sm text-zinc-400 mb-2">Risk Score</p>
                  <p className="text-3xl font-bold text-yellow-500">6.2/10</p>
                  <p className="text-xs text-zinc-500 mt-2">Medium volatility</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Dividend Analysis - Full width */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-zinc-900 border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-6">Dividend Income Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <p className="text-sm text-zinc-400 mb-2">Annual Dividends</p>
                  <p className="text-3xl font-bold text-white">$4,050</p>
                  <p className="text-xs text-zinc-500 mt-2">$338/month average</p>
                </div>
                <div className="p-4 bg-zinc-800/50 rounded-lg">
                  <p className="text-sm text-zinc-400 mb-2">Dividend Yield</p>
                  <p className="text-3xl font-bold text-white">1.80%</p>
                  <p className="text-xs text-zinc-500 mt-2">On current value</p>
                </div>
                <div className="p-4 bg-zinc-800/50 rounded-lg">
                  <p className="text-sm text-zinc-400 mb-2">Dividend Growth</p>
                  <p className="text-3xl font-bold text-green-500">+8.5%</p>
                  <p className="text-xs text-zinc-500 mt-2">YoY increase</p>
                </div>
                <div className="p-4 bg-zinc-800/50 rounded-lg">
                  <p className="text-sm text-zinc-400 mb-2">Payout Ratio</p>
                  <p className="text-3xl font-bold text-white">42%</p>
                  <p className="text-xs text-green-500 mt-2">Sustainable</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Top Holdings - Full width */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-zinc-900 border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-6">Top Holdings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
                  <div>
                    <p className="font-semibold text-white">Apple Inc (AAPL)</p>
                    <p className="text-xs text-zinc-500">Technology</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">$18,000</p>
                    <p className="text-xs text-green-500">8.0% of portfolio</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
                  <div>
                    <p className="font-semibold text-white">Microsoft Corp (MSFT)</p>
                    <p className="text-xs text-zinc-500">Technology</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">$15,500</p>
                    <p className="text-xs text-green-500">6.9% of portfolio</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
                  <div>
                    <p className="font-semibold text-white">NVIDIA Corp (NVDA)</p>
                    <p className="text-xs text-zinc-500">Technology</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">$14,000</p>
                    <p className="text-xs text-green-500">6.2% of portfolio</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
                  <div>
                    <p className="font-semibold text-white">Alphabet Inc (GOOGL)</p>
                    <p className="text-xs text-zinc-500">Technology</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">$13,000</p>
                    <p className="text-xs text-green-500">5.8% of portfolio</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
                  <div>
                    <p className="font-semibold text-white">Amazon.com Inc (AMZN)</p>
                    <p className="text-xs text-zinc-500">Consumer</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">$11,500</p>
                    <p className="text-xs text-green-500">5.1% of portfolio</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Insights */}
        <div className="mt-8 p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Financial Health Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-400 mb-2">✓ Strong Performance</h4>
              <p className="text-sm text-zinc-300">
                Your stock portfolio has delivered a +21.6% total return, outperforming the S&P 500
                by 2.3%. With a diversification score of 82/100 across 6 sectors and 4 geographic
                regions, you have excellent risk-adjusted returns.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-green-400 mb-2">✓ Tax-Efficient Growth</h4>
              <p className="text-sm text-zinc-300">
                Your unrealized gains of $40,000 remain untaxed. With 68.8% qualifying for
                long-term capital gains treatment, you've optimized for tax efficiency. Your
                dividend yield of 1.80% provides steady passive income.
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