import { TrendingUp, TrendingDown, DollarSign, Target, Activity } from 'lucide-react';
import { Card } from './ui/card';

interface PortfolioAnalyticsProps {
  totalWealth: number;
  monthlyChange: number;
  monthlyChangePercent: number;
  yearlyReturn: number;
  diversificationScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export function PortfolioAnalytics({
  totalWealth,
  monthlyChange,
  monthlyChangePercent,
  yearlyReturn,
  diversificationScore,
  riskLevel,
}: PortfolioAnalyticsProps) {
  const isPositiveChange = monthlyChange >= 0;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'text-green-500';
      case 'Medium':
        return 'text-yellow-500';
      case 'High':
        return 'text-red-500';
      default:
        return 'text-zinc-500';
    }
  };

  return (
    <Card className="p-6 bg-zinc-900 border-zinc-800">
      <h2 className="text-xl font-semibold text-white mb-6">Portfolio Analytics</h2>
      
      <div className="space-y-4">
        {/* Total Wealth */}
        <div className="p-4 bg-zinc-800/50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-zinc-400">Total Wealth</p>
                <p className="text-2xl font-bold text-white">
                  ${totalWealth.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Change */}
        <div className="p-4 bg-zinc-800/50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 ${isPositiveChange ? 'bg-green-500/10' : 'bg-red-500/10'} rounded-lg`}>
                {isPositiveChange ? (
                  <TrendingUp className="w-5 h-5 text-green-500" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-500" />
                )}
              </div>
              <div>
                <p className="text-sm text-zinc-400">Monthly Change</p>
                <p className={`text-xl font-bold ${isPositiveChange ? 'text-green-500' : 'text-red-500'}`}>
                  {isPositiveChange ? '+' : ''}${monthlyChange.toLocaleString()} ({isPositiveChange ? '+' : ''}{monthlyChangePercent.toFixed(2)}%)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Yearly Return */}
        <div className="p-4 bg-zinc-800/50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Target className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-zinc-400">Yearly Return</p>
                <p className="text-xl font-bold text-white">
                  {yearlyReturn >= 0 ? '+' : ''}{yearlyReturn.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Diversification Score */}
        <div className="p-4 bg-zinc-800/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/10 rounded-lg">
                <Activity className="w-5 h-5 text-cyan-500" />
              </div>
              <div>
                <p className="text-sm text-zinc-400">Diversification Score</p>
                <p className="text-xl font-bold text-white">{diversificationScore}/100</p>
              </div>
            </div>
          </div>
          <div className="w-full bg-zinc-700 rounded-full h-2">
            <div
              className="bg-cyan-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${diversificationScore}%` }}
            />
          </div>
        </div>

        {/* Risk Level */}
        <div className="p-4 bg-zinc-800/50 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-400">Portfolio Risk Level</p>
            <p className={`text-lg font-bold ${getRiskColor(riskLevel)}`}>
              {riskLevel}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
