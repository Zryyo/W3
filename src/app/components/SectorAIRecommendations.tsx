import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Sparkles, RefreshCw, Loader2, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { RecommendationCard } from './RecommendationCard';
import { getSectorRecommendations, type RecommendationResponse } from '../services/aiRecommendations';
import { formatDistanceToNow } from 'date-fns';

interface SectorAIRecommendationsProps {
  sectorName: string;
  sectorValue: number;
  totalWealth: number;
  sectorDetails?: any;
}

export function SectorAIRecommendations({
  sectorName,
  sectorValue,
  totalWealth,
  sectorDetails,
}: SectorAIRecommendationsProps) {
  const [state, setState] = useState<'idle' | 'loading' | 'loaded' | 'error'>('idle');
  const [recommendations, setRecommendations] = useState<RecommendationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadRecommendations = async () => {
    setState('loading');
    setError(null);
    try {
      const data = await getSectorRecommendations(
        {
          name: sectorName,
          value: sectorValue,
          percentOfTotal: (sectorValue / totalWealth) * 100,
          details: sectorDetails,
        },
        { totalWealth }
      );
      setRecommendations(data);
      setState('loaded');
    } catch (err: any) {
      setError(err.message || 'Failed to load recommendations');
      setState('error');
    }
  };

  useEffect(() => {
    loadRecommendations();
  }, [sectorName, sectorValue]);

  const handleRefresh = () => {
    loadRecommendations();
  };

  return (
    <Card className="p-6 bg-zinc-900 border-zinc-800">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <Sparkles className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">AI Recommendations</h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              {state === 'loaded' && recommendations
                ? `Updated ${formatDistanceToNow(recommendations.lastUpdated, { addSuffix: true })}`
                : `Personalized insights for ${sectorName}`}
            </p>
          </div>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={state === 'loading'}
          variant="ghost"
          size="sm"
          className="text-zinc-400 hover:text-white"
        >
          {state === 'loading' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Trust Cue Badge */}
      <div className="mb-5 inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full">
        <Sparkles className="w-3.5 h-3.5 text-purple-400" />
        <span className="text-xs text-purple-300">
          AI-generated from your {sectorName.toLowerCase()} allocation
        </span>
      </div>

      {/* Loading State */}
      {state === 'loading' && (
        <div className="py-12 text-center">
          <Loader2 className="w-8 h-8 text-purple-500 animate-spin mx-auto mb-3" />
          <p className="text-sm text-zinc-400">Analyzing your {sectorName.toLowerCase()}...</p>
        </div>
      )}

      {/* Error State */}
      {state === 'error' && (
        <div className="py-8 text-center">
          <div className="inline-flex p-3 bg-red-500/10 rounded-full mb-3">
            <AlertTriangle className="w-6 h-6 text-red-500" />
          </div>
          <h4 className="text-sm font-semibold text-white mb-2">Unable to Load Recommendations</h4>
          <p className="text-xs text-zinc-400 mb-4 max-w-md mx-auto">{error}</p>
          <Button onClick={handleRefresh} size="sm" variant="outline">
            Try Again
          </Button>
        </div>
      )}

      {/* Loaded State */}
      {state === 'loaded' && recommendations && recommendations.recommendations.length > 0 && (
        <div className="space-y-4">
          {/* Summary */}
          {recommendations.summary && (
            <p className="text-sm text-zinc-300 pb-3 border-b border-zinc-800">
              {recommendations.summary}
            </p>
          )}

          {/* Recommendations */}
          <div className="space-y-3">
            {recommendations.recommendations.map((rec) => (
              <RecommendationCard key={rec.id} recommendation={rec} compact />
            ))}
          </div>

          {/* View All Hub Link */}
          <Link
            to="/recommendations"
            className="flex items-center justify-center gap-2 py-3 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors border-t border-zinc-800 mt-4 pt-4"
          >
            View all portfolio recommendations
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Empty State */}
      {state === 'loaded' && recommendations && recommendations.recommendations.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-sm text-zinc-400">No recommendations available at this time.</p>
        </div>
      )}
    </Card>
  );
}
