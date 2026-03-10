import { Card } from './ui/card';
import { AlertCircle, CheckCircle2, Info, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import type { Recommendation } from '../services/aiRecommendations';

interface RecommendationCardProps {
  recommendation: Recommendation;
  compact?: boolean;
}

export function RecommendationCard({ recommendation, compact = false }: RecommendationCardProps) {
  const getCategoryIcon = () => {
    switch (recommendation.category) {
      case 'high-priority':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'medium-priority':
        return <TrendingUp className="w-4 h-4 text-yellow-500" />;
      case 'low-priority':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      default:
        return <Info className="w-4 h-4 text-blue-500" />;
    }
  };

  const getCategoryColor = () => {
    switch (recommendation.category) {
      case 'high-priority':
        return 'border-red-500/20 bg-red-500/5';
      case 'medium-priority':
        return 'border-yellow-500/20 bg-yellow-500/5';
      case 'low-priority':
        return 'border-green-500/20 bg-green-500/5';
      default:
        return 'border-blue-500/20 bg-blue-500/5';
    }
  };

  const getCategoryLabel = () => {
    switch (recommendation.category) {
      case 'high-priority':
        return 'High Priority';
      case 'medium-priority':
        return 'Consider';
      case 'low-priority':
        return 'Optimize';
      default:
        return 'Info';
    }
  };

  const getSectorPath = (sector: string) => {
    return `/sector/${sector}`;
  };

  if (compact) {
    return (
      <div className={`p-4 rounded-lg border ${getCategoryColor()}`}>
        <div className="flex items-start gap-3">
          {getCategoryIcon()}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-white mb-1">{recommendation.title}</h4>
            <p className="text-xs text-zinc-400 line-clamp-2">{recommendation.description}</p>
            {recommendation.relatedSector && (
              <Link
                to={getSectorPath(recommendation.relatedSector)}
                className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 mt-2"
              >
                View {recommendation.relatedSector.replace('-', ' ')}
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className={`p-5 bg-zinc-900 border ${getCategoryColor()}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {getCategoryIcon()}
          <span className="text-xs font-medium text-zinc-400">{getCategoryLabel()}</span>
        </div>
        {recommendation.impact && (
          <span className="text-xs px-2 py-1 rounded-full bg-zinc-800 text-zinc-400">
            {recommendation.impact} impact
          </span>
        )}
      </div>

      <h3 className="text-base font-semibold text-white mb-2">{recommendation.title}</h3>
      <p className="text-sm text-zinc-300 mb-4">{recommendation.description}</p>

      {recommendation.relatedSector && (
        <Link
          to={getSectorPath(recommendation.relatedSector)}
          className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          Explore {recommendation.relatedSector.replace('-', ' ')}
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </Card>
  );
}
