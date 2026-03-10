import { Target, Calendar, TrendingUp, Plus } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface FinancialGoal {
  id: string;
  goalName: string;
  targetAmount: number;
  currentSavings: number;
  dueDate: string;
  category: 'retirement' | 'emergency' | 'purchase' | 'investment' | 'other';
}

interface FinancialGoalsWidgetProps {
  goals: FinancialGoal[];
  onAddGoal?: () => void;
}

export function FinancialGoalsWidget({ goals, onAddGoal }: FinancialGoalsWidgetProps) {
  const calculateProgress = (current: number, target: number): number => {
    if (target === 0) return 0;
    return Math.min((current / target) * 100, 100);
  };

  const calculateDaysRemaining = (dueDate: string): number => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      retirement: 'bg-purple-500',
      emergency: 'bg-red-500',
      purchase: 'bg-blue-500',
      investment: 'bg-green-500',
      other: 'bg-zinc-500',
    };
    return colors[category] || colors.other;
  };

  const getCategoryLabel = (category: string): string => {
    const labels: Record<string, string> = {
      retirement: 'Retirement',
      emergency: 'Emergency Fund',
      purchase: 'Major Purchase',
      investment: 'Investment',
      other: 'Other',
    };
    return labels[category] || 'Other';
  };

  return (
    <Card className="p-6 bg-zinc-900 border-zinc-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Target className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Financial Goals</h2>
            <p className="text-sm text-zinc-400">Track your savings progress</p>
          </div>
        </div>
        {onAddGoal && (
          <Button
            onClick={onAddGoal}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            aria-label="Add new financial goal"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Goal
          </Button>
        )}
      </div>

      {/* Goals List */}
      {goals.length === 0 ? (
        <div className="text-center py-12">
          <Target className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
          <p className="text-zinc-400 mb-4">No financial goals yet</p>
          {onAddGoal && (
            <Button
              onClick={onAddGoal}
              variant="outline"
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              Create Your First Goal
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {goals.map((goal) => {
            const progress = calculateProgress(goal.currentSavings, goal.targetAmount);
            const daysRemaining = calculateDaysRemaining(goal.dueDate);
            const isOverdue = daysRemaining < 0;
            const isUrgent = daysRemaining >= 0 && daysRemaining <= 30;

            return (
              <div
                key={goal.id}
                className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700/50 hover:border-zinc-600/50 transition-colors"
              >
                {/* Goal Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white">{goal.goalName}</h3>
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${getCategoryColor(goal.category)}/20 text-${getCategoryColor(goal.category).replace('bg-', '')}`}
                      >
                        {getCategoryLabel(goal.category)}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-zinc-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {isOverdue ? (
                            <span className="text-red-400 font-medium">
                              {Math.abs(daysRemaining)} days overdue
                            </span>
                          ) : (
                            <span className={isUrgent ? 'text-yellow-400 font-medium' : ''}>
                              {daysRemaining} days left
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>{progress.toFixed(1)}% complete</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <Progress 
                    value={progress} 
                    className="h-2 bg-zinc-700"
                    aria-label={`Progress for ${goal.goalName}: ${progress.toFixed(1)}%`}
                  />
                </div>

                {/* Amount Details */}
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-zinc-400">Current: </span>
                    <span className="text-white font-semibold">
                      {formatCurrency(goal.currentSavings)}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-400">Target: </span>
                    <span className="text-white font-semibold">
                      {formatCurrency(goal.targetAmount)}
                    </span>
                  </div>
                </div>

                {/* Remaining Amount */}
                <div className="mt-2 text-xs text-zinc-500">
                  {goal.currentSavings < goal.targetAmount ? (
                    <>
                      <span className="text-blue-400 font-medium">
                        {formatCurrency(goal.targetAmount - goal.currentSavings)}
                      </span>{' '}
                      remaining to reach your goal
                    </>
                  ) : (
                    <span className="text-green-400 font-medium">🎉 Goal achieved!</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Summary Stats */}
      {goals.length > 0 && (
        <div className="mt-6 pt-6 border-t border-zinc-800">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-zinc-800/30 rounded-lg">
              <p className="text-xs text-zinc-400 mb-1">Total Goals</p>
              <p className="text-xl font-bold text-white">{goals.length}</p>
            </div>
            <div className="text-center p-3 bg-zinc-800/30 rounded-lg">
              <p className="text-xs text-zinc-400 mb-1">Total Target</p>
              <p className="text-xl font-bold text-white">
                {formatCurrency(goals.reduce((sum, g) => sum + g.targetAmount, 0))}
              </p>
            </div>
            <div className="text-center p-3 bg-zinc-800/30 rounded-lg">
              <p className="text-xs text-zinc-400 mb-1">Total Saved</p>
              <p className="text-xl font-bold text-green-400">
                {formatCurrency(goals.reduce((sum, g) => sum + g.currentSavings, 0))}
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
