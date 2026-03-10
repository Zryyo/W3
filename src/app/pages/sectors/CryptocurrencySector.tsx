import { Link } from 'react-router';
import {
  ArrowLeft,
  Bitcoin,
  DollarSign,
  TrendingUp,
  Activity,
  Shield,
  Wallet,
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export function CryptocurrencySector() {
  const totalCrypto = 60000;
  const totalWealth = 805000;
  const percentOfWealth = ((totalCrypto / totalWealth) * 100).toFixed(1);
  const costBasis = 48000;
  const unrealizedGain = totalCrypto - costBasis;
  const returnPercent = ((unrealizedGain / costBasis) * 100).toFixed(1);

  // Coin distribution
  const coinData = [
    { name: 'Bitcoin', value: 26000, percentage: 43.3, color: '#f7931a' },
    { name: 'Ethereum', value: 20000, percentage: 33.3, color: '#627eea' },
    { name: 'Solana', value: 8000, percentage: 13.3, color: '#14f195' },
    { name: 'Cardano', value: 4000, percentage: 6.7, color: '#0033ad' },
    { name: 'Polygon', value: 2000, percentage: 3.3, color: '#8247e5' },
  ];

  const renderCustomLabel = (entry: any) => {
    return `${entry.percentage}%`;
  };

  // Market cap mix
  const marketCapData = [
    { category: 'Large Cap', percentage: 77, amount: 50000 },
    { category: 'Mid Cap', percentage: 18, amount: 12000 },
    { category: 'Small Cap', percentage: 5, amount: 3000 },
  ];

  // Wallet distribution
  const walletData = [
    { platform: 'Coinbase', amount: 35000, percentage: 53.8 },
    { platform: 'Hardware Wallet', amount: 22000, percentage: 33.8 },
    { platform: 'Kraken', amount: 8000, percentage: 12.3 },
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
              <div className="p-2 bg-cyan-500/10 rounded-lg">
                <Bitcoin className="w-6 h-6 text-cyan-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Cryptocurrency</h1>
                <p className="text-sm text-zinc-400">Digital asset portfolio</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
              <span className="text-sm text-cyan-400">{percentOfWealth}% of Total Wealth</span>
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
              <div className="p-2 bg-cyan-500/10 rounded-lg">
                <DollarSign className="w-5 h-5 text-cyan-500" />
              </div>
              <p className="text-sm text-zinc-400">Total Value</p>
            </div>
            <p className="text-3xl font-bold text-white">${totalCrypto.toLocaleString()}</p>
            <p className="text-xs text-cyan-400 mt-1">{percentOfWealth}% of total portfolio</p>
            <p className="text-xs text-zinc-500 mt-1">Current market value</p>
          </Card>

          <Card className="p-6 bg-zinc-900 border-zinc-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-sm text-zinc-400">24h Change</p>
            </div>
            <p className="text-3xl font-bold text-green-500">+3.2%</p>
            <p className="text-xs text-green-500 mt-2">+$2,080</p>
          </Card>

          <Card className="p-6 bg-zinc-900 border-zinc-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-sm text-zinc-400">Unrealized Gain</p>
            </div>
            <p className="text-3xl font-bold text-white">+${unrealizedGain.toLocaleString()}</p>
            <p className="text-xs text-green-500 mt-2">+{returnPercent}%</p>
          </Card>

          <Card className="p-6 bg-zinc-900 border-zinc-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Activity className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-sm text-zinc-400">Volatility</p>
            </div>
            <p className="text-3xl font-bold text-yellow-500">High</p>
            <p className="text-xs text-zinc-500 mt-2">Risk score: 8.5/10</p>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Price Performance - 2 columns */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-zinc-900 border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-6">Recent Performance</h3>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-sm text-zinc-400 mb-2">24 Hour</p>
                  <p className="text-3xl font-bold text-green-500">+3.2%</p>
                  <p className="text-xs text-zinc-300 mt-2">+$2,080</p>
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-sm text-zinc-400 mb-2">7 Days</p>
                  <p className="text-3xl font-bold text-green-500">+8.7%</p>
                  <p className="text-xs text-zinc-300 mt-2">+$5,655</p>
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-sm text-zinc-400 mb-2">30 Days</p>
                  <p className="text-3xl font-bold text-green-500">+14.2%</p>
                  <p className="text-xs text-zinc-300 mt-2">+$9,230</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-zinc-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-white">Bitcoin (BTC)</span>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-white">$28,000</p>
                      <p className="text-xs text-green-500">+4.1% (24h)</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>0.4523 BTC @ $61,890</span>
                    <span className="text-green-400">+$7,200 gain</span>
                  </div>
                </div>

                <div className="p-4 bg-zinc-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-white">Ethereum (ETH)</span>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-white">$22,000</p>
                      <p className="text-xs text-green-500">+2.8% (24h)</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>6.875 ETH @ $3,200</span>
                    <span className="text-green-400">+$5,500 gain</span>
                  </div>
                </div>

                <div className="p-4 bg-zinc-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-white">Solana (SOL)</span>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-white">$8,000</p>
                      <p className="text-xs text-green-500">+5.2% (24h)</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>68.97 SOL @ $116</span>
                    <span className="text-green-400">+$2,800 gain</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Coin Distribution - 1 column */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-zinc-900 border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-6">Portfolio Distribution</h3>
              <div className="h-[200px] mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={coinData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomLabel}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {coinData.map((entry, index) => (
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
                {coinData.map((coin) => (
                  <div
                    key={coin.name}
                    className="flex items-center justify-between p-2 bg-zinc-800/50 rounded"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: coin.color }}
                      />
                      <span className="text-sm text-zinc-300">{coin.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-white">
                        ${coin.value.toLocaleString()}
                      </span>
                      <span className="text-xs text-zinc-500 ml-2">{coin.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Market Cap Mix - Full width */}
          <div className="lg:col-span-3">
            <Card className="p-6 bg-zinc-900 border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-6">Market Cap Allocation</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {marketCapData.map((cap) => (
                  <div key={cap.category} className="p-4 bg-zinc-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-white">{cap.category}</span>
                      <span className="text-2xl font-bold text-cyan-400">{cap.percentage}%</span>
                    </div>
                    <p className="text-sm text-zinc-400 mb-3">${cap.amount.toLocaleString()}</p>
                    <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                        style={{ width: `${cap.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-xs text-blue-400 font-semibold mb-1">Risk Profile</p>
                <p className="text-xs text-zinc-300">
                  Your crypto portfolio is weighted 77% toward large-cap coins like Bitcoin and
                  Ethereum, providing relative stability while maintaining growth exposure through
                  mid and small-cap positions.
                </p>
              </div>
            </Card>
          </div>

          {/* Staking & Passive Income - 2 columns */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-zinc-900 border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-6">Staking & Passive Income</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <p className="text-sm text-zinc-400 mb-2">Annual Staking Yield</p>
                  <p className="text-3xl font-bold text-white">4.5%</p>
                  <p className="text-xs text-zinc-500 mt-2">On staked assets</p>
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-sm text-zinc-400 mb-2">Monthly Income</p>
                  <p className="text-3xl font-bold text-green-500">$152</p>
                  <p className="text-xs text-zinc-500 mt-2">$1,824 annually</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                  <div>
                    <p className="text-sm font-semibold text-white">Ethereum 2.0 Staking</p>
                    <p className="text-xs text-zinc-500">4.2 ETH staked</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">$13,440</p>
                    <p className="text-xs text-purple-400">4.8% APY</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                  <div>
                    <p className="text-sm font-semibold text-white">Solana Staking</p>
                    <p className="text-xs text-zinc-500">55 SOL staked</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">$6,380</p>
                    <p className="text-xs text-purple-400">6.2% APY</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                  <div>
                    <p className="text-sm font-semibold text-white">Cardano Staking</p>
                    <p className="text-xs text-zinc-500">All ADA staked</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">$4,000</p>
                    <p className="text-xs text-purple-400">3.5% APY</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Liquidity & Security - 1 column */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-zinc-900 border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-6">Security Status</h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-semibold text-green-400">Secured</span>
                  </div>
                  <p className="text-xs text-zinc-300">
                    34% in cold storage, 2FA enabled on all exchanges
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-zinc-400 mb-3">WALLET DISTRIBUTION</p>
                  {walletData.map((wallet) => (
                    <div
                      key={wallet.platform}
                      className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg mb-2"
                    >
                      <div className="flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-zinc-300">{wallet.platform}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-white">
                          ${wallet.amount.toLocaleString()}
                        </p>
                        <p className="text-xs text-zinc-500">{wallet.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                  <p className="text-xs text-cyan-400 font-semibold mb-1">High Liquidity</p>
                  <p className="text-xs text-zinc-300">
                    All positions can be liquidated within 24 hours
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Cost Basis Analysis - Full width */}
          <div className="lg:col-span-3">
            <Card className="p-6 bg-zinc-900 border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-6">Cost Basis vs Current Value</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-sm text-zinc-400 mb-2">Original Investment</p>
                  <p className="text-3xl font-bold text-white">${costBasis.toLocaleString()}</p>
                  <p className="text-xs text-zinc-500 mt-2">Total cost basis</p>
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-sm text-zinc-400 mb-2">Current Value</p>
                  <p className="text-3xl font-bold text-white">${totalCrypto.toLocaleString()}</p>
                  <p className="text-xs text-green-500 mt-2">+{returnPercent}%</p>
                </div>
                <div className="p-4 bg-zinc-800/50 rounded-lg">
                  <p className="text-sm text-zinc-400 mb-2">Unrealized Gain</p>
                  <p className="text-3xl font-bold text-green-500">
                    +${unrealizedGain.toLocaleString()}
                  </p>
                  <p className="text-xs text-zinc-500 mt-2">Not yet realized</p>
                </div>
                <div className="p-4 bg-zinc-800/50 rounded-lg">
                  <p className="text-sm text-zinc-400 mb-2">Avg. Buy Price</p>
                  <p className="text-3xl font-bold text-white">
                    ${(costBasis / totalCrypto * 1000).toFixed(0)}
                  </p>
                  <p className="text-xs text-zinc-500 mt-2">Per $1K current</p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Insights */}
        <div className="mt-8 p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Financial Health Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-cyan-400 mb-2">✓ Strong Gains with Smart Allocation</h4>
              <p className="text-sm text-zinc-300">
                Your crypto portfolio has returned +35.4% with 77% allocated to large-cap coins for
                stability. Recent 30-day gains of +14.2% demonstrate the growth potential while
                maintaining manageable risk through diversification.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-cyan-400 mb-2">✓ Generating Passive Income</h4>
              <p className="text-sm text-zinc-300">
                You're earning $152/month through staking (4.5% APY) while maintaining high
                liquidity. With 34% in cold storage and 2FA enabled, your security posture is
                excellent for this asset class.
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