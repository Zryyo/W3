import {
  Heart,
  AlertTriangle,
  CheckCircle,
  Activity,
  Shield,
  TrendingUp,
} from 'lucide-react';
import { Card } from './ui/card';

interface FinancialHealthIndicatorProps {
  healthScore: number;
  emergencyFund: {
    current: number;
    target: number;
    months: number;
  };
  debtToIncome: number;
  savingsRate: number;
  netWorthGrowth: number;
}

export function FinancialHealthIndicator({
  healthScore,
  emergencyFund,
  debtToIncome,
  savingsRate,
  netWorthGrowth,
}: FinancialHealthIndicatorProps) {
  const getHealthStatus = (score: number) => {
    if (score >= 80) return { status: 'Excellent', color: 'text-green-500', bgColor: 'bg-green-500' };
    if (score >= 60) return { status: 'Good', color: 'text-blue-500', bgColor: 'bg-blue-500' };
    if (score >= 40) return { status: 'Fair', color: 'text-yellow-500', bgColor: 'bg-yellow-500' };
    return { status: 'Needs Attention', color: 'text-red-500', bgColor: 'bg-red-500' };
  };

  const getIndicatorStatus = (value: number, thresholds: { good: number; fair: number }) => {
    if (value >= thresholds.good) return 'good';
    if (value >= thresholds.fair) return 'fair';
    return 'poor';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'fair':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'poor':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const health = getHealthStatus(healthScore);
  const emergencyFundProgress = (emergencyFund.current / emergencyFund.target) * 100;
  const emergencyFundStatus = getIndicatorStatus(emergencyFundProgress, { good: 100, fair: 50 });
  const debtToIncomeStatus = getIndicatorStatus(100 - debtToIncome, { good: 65, fair: 50 });
  const savingsRateStatus = getIndicatorStatus(savingsRate, { good: 20, fair: 10 });
  const netWorthGrowthStatus = getIndicatorStatus(netWorthGrowth, { good: 5, fair: 2 });

  return (
    <Card className="p-6 bg-zinc-900 border-zinc-800">
      <h2 className="text-xl font-semibold text-white mb-6">Financial Health</h2>

      {/* Overall Health Score */}
      <div className="mb-8 p-6 bg-zinc-800/50 rounded-lg text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Heart className={`w-8 h-8 ${health.color}`} />
          <div>
            <p className="text-sm text-zinc-400">Overall Health Score</p>
            <p className={`text-3xl font-bold ${health.color}`}>{healthScore}</p>
          </div>
        </div>
        <p className={`text-lg font-semibold ${health.color}`}>{health.status}</p>
        <div className="mt-4 w-full bg-zinc-700 rounded-full h-3">
          <div
            className={`${health.bgColor} h-3 rounded-full transition-all duration-500`}
            style={{ width: `${healthScore}%` }}
          />
        </div>
      </div>

      {/* Health Indicators */}
      <div className="space-y-4">
        {/* Emergency Fund */}
        <div className="p-4 bg-zinc-800/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan-500" />
              <span className="text-sm text-zinc-300">Emergency Fund</span>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(emergencyFundStatus)}
              <span className="text-sm font-semibold text-white">
                {emergencyFund.months} months
              </span>
            </div>
          </div>
          <div className="flex justify-between text-xs text-zinc-500 mb-1">
            <span>${emergencyFund.current.toLocaleString()}</span>
            <span>${emergencyFund.target.toLocaleString()}</span>
          </div>
          <div className="w-full bg-zinc-700 rounded-full h-2">
            <div
              className="bg-cyan-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(emergencyFundProgress, 100)}%` }}
            />
          </div>
        </div>

        {/* Debt to Income Ratio */}
        <div className="p-4 bg-zinc-800/50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-500" />
              <span className="text-sm text-zinc-300">Debt-to-Income Ratio</span>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(debtToIncomeStatus)}
              <span className="text-sm font-semibold text-white">{debtToIncome}%</span>
            </div>
          </div>
        </div>

        {/* Savings Rate */}
        <div className="p-4 bg-zinc-800/50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-sm text-zinc-300">Savings Rate</span>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(savingsRateStatus)}
              <span className="text-sm font-semibold text-white">{savingsRate}%</span>
            </div>
          </div>
        </div>

        {/* Net Worth Growth */}
        <div className="p-4 bg-zinc-800/50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-zinc-300">Net Worth Growth (YoY)</span>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(netWorthGrowthStatus)}
              <span className="text-sm font-semibold text-white">+{netWorthGrowth}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <p className="text-sm font-semibold text-blue-400 mb-2">💡 Recommendations</p>
        <ul className="text-xs text-zinc-300 space-y-1">
          {emergencyFundProgress < 100 && (
            <li>• Build your emergency fund to cover {6 - emergencyFund.months} more months</li>
          )}
          {debtToIncome > 35 && <li>• Consider reducing debt to improve financial flexibility</li>}
          {savingsRate < 20 && <li>• Aim to increase savings rate to 20% for optimal growth</li>}
          {emergencyFundProgress >= 100 && debtToIncome <= 35 && savingsRate >= 20 && (
            <li>• Your financial health is excellent! Keep up the great work.</li>
          )}
        </ul>
      </div>
    </Card>
  );
}
