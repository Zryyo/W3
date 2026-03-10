import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Sparkles, RefreshCw, Loader2, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { RecommendationCard } from '../components/RecommendationCard';
import { getPortfolioRecommendations, getSectorRecommendations, type RecommendationResponse, clearRecommendationCache } from '../services/aiRecommendations';
import { formatDistanceToNow } from 'date-fns';

// Import wealth data (in real app this would come from context/store)
const MOCK_PORTFOLIO_DATA = {
  totalWealth: 805000,
  wealthData: [
    { name: 'Savings', value: 105000, color: '#3b82f6' },
    { name: 'Bonds', value: 68000, color: '#8b5cf6' },
    { name: 'Stocks', value: 205000, color: '#10b981' },
    { name: 'Cryptocurrency', value: 60000, color: '#06b6d4' },
    { name: 'Investment Property', value: 295000, color: '#f59e0b' },
    { name: 'Joint Assets', value: 72000, color: '#ec4899' },
  ],
  analytics: {
    monthlyChange: 12450,
    monthlyChangePercent: 1.54,
    yearlyReturn: 8.7,
    diversificationScore: 78,
    riskLevel: 'Medium',
  },
  health: {
    healthScore: 82,
    emergencyFund: { current: 45000, target: 50000, months: 5.4 },
    debtToIncome: 28,
    savingsRate: 22,
    netWorthGrowth: 9.2,
  },
};

export function RecommendationHub() {
  const [state, setState] = useState<'idle' | 'loading' | 'loaded' | 'error'>('idle');
  const [portfolioRecs, setPortfolioRecs] = useState<RecommendationResponse | null>(null);
  const [sectorRecs, setSectorRecs] = useState<Record<string, RecommendationResponse>>({});
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | string>('all');

  const loadAllRecommendations = async () => {
    setState('loading');
    setError(null);
    try {
      // Load portfolio-level recommendations
      const portfolioData = await getPortfolioRecommendations(MOCK_PORTFOLIO_DATA);
      setPortfolioRecs(portfolioData);

      // Load sector-specific recommendations
      const sectorPromises = MOCK_PORTFOLIO_DATA.wealthData.map(async (sector) => {
        const sectorData = await getSectorRecommendations(
          {
            name: sector.name,
            value: sector.value,
            percentOfTotal: (sector.value / MOCK_PORTFOLIO_DATA.totalWealth) * 100,
          },
          { totalWealth: MOCK_PORTFOLIO_DATA.totalWealth }
        );
        return { sector: sector.name, data: sectorData };
      });

      const sectorResults = await Promise.all(sectorPromises);
      const sectorMap: Record<string, RecommendationResponse> = {};
      sectorResults.forEach(({ sector, data }) => {
        sectorMap[sector] = data;
      });
      setSectorRecs(sectorMap);

      setState('loaded');
    } catch (err: any) {
      setError(err.message || 'Failed to load recommendations');
      setState('error');
    }
  };

  useEffect(() => {
    loadAllRecommendations();
  }, []);

  const handleRefresh = () => {
    clearRecommendationCache();
    loadAllRecommendations();
  };

  const getAllRecommendations = () => {
    const all = [...(portfolioRecs?.recommendations || [])];
    Object.values(sectorRecs).forEach((sec) => {
      all.push(...sec.recommendations);
    });
    return all;
  };

  const getFilteredRecommendations = () => {
    if (activeTab === 'all') {
      return getAllRecommendations();
    } else if (activeTab === 'portfolio') {
      return portfolioRecs?.recommendations || [];
    } else {
      return sectorRecs[activeTab]?.recommendations || [];
    }
  };

  const tabs = [
    { id: 'all', label: 'All Recommendations' },
    { id: 'portfolio', label: 'Overall Portfolio' },
    ...MOCK_PORTFOLIO_DATA.wealthData.map((s) => ({ id: s.name, label: s.name })),
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
                <Sparkles className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">AI Recommendation Hub</h1>
                <p className="text-sm text-zinc-400">Portfolio optimization insights powered by AI</p>
              </div>
            </div>
            <Button
              onClick={handleRefresh}
              disabled={state === 'loading'}
              variant="outline"
              className="gap-2"
            >
              {state === 'loading' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              Refresh Insights
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Trust Cue and Stats */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">
                AI-assisted • Generated from current portfolio data
                {state === 'loaded' && portfolioRecs && (
                  <> • Updated {formatDistanceToNow(portfolioRecs.lastUpdated, { addSuffix: true })}</>
                )}
              </span>
            </div>
            {state === 'loaded' && (
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <TrendingUp className="w-4 h-4 text-green-500" />
                {getAllRecommendations().length} insights generated
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {state === 'loading' && (
          <div className="py-24 text-center">
            <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Analyzing Your Portfolio</h3>
            <p className="text-sm text-zinc-400">Our AI is generating personalized recommendations...</p>
          </div>
        )}

        {/* Error State */}
        {state === 'error' && (
          <div className="py-16 text-center">
            <div className="inline-flex p-4 bg-red-500/10 rounded-full mb-4">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Unable to Load Recommendations</h3>
            <p className="text-sm text-zinc-400 mb-6 max-w-md mx-auto">{error}</p>
            <div className="space-y-3 max-w-md mx-auto text-left text-xs text-zinc-500">
              <p>💡 <strong>Tip:</strong> Make sure you have set your OpenAI API key in the environment variable <code className="px-1.5 py-0.5 bg-zinc-800 rounded">VITE_OPENAI_API_KEY</code></p>
              <p>You can get an API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">OpenAI Platform</a></p>
            </div>
            <Button onClick={handleRefresh} className="mt-6">
              Try Again
            </Button>
          </div>
        )}

        {/* Loaded State */}
        {state === 'loaded' && (
          <>
            {/* Category Tabs */}
            <div className="mb-6 overflow-x-auto">
              <div className="flex gap-2 pb-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : 'bg-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-800'
                    }`}
                  >
                    {tab.label}
                    {tab.id === 'all' && (
                      <span className="ml-2 px-2 py-0.5 bg-purple-500/30 rounded-full text-xs">
                        {getAllRecommendations().length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Recommendations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredRecommendations().map((rec) => (
                <RecommendationCard key={rec.id} recommendation={rec} />
              ))}
            </div>

            {/* Empty State */}
            {getFilteredRecommendations().length === 0 && (
              <div className="py-16 text-center">
                <p className="text-zinc-400">No recommendations available for this category.</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}