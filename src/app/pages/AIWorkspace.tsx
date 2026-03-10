import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Brain, CheckCircle2, Circle, Sparkles, Send, Loader2, AlertTriangle, Shield, TrendingUp, DollarSign } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import { PortfolioAnalytics } from '../components/PortfolioAnalytics';
import { getAIAdvisoryResponse } from '../services/aiAdvisory';

interface DataCategory {
  id: string;
  name: string;
  description: string;
  value: number;
  icon: any;
  color: string;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  selectedCategories?: string[];
}

export function AIWorkspace() {
  // Portfolio data
  const totalWealth = 805000;
  const analyticsData = {
    totalWealth,
    monthlyChange: 12450,
    monthlyChangePercent: 1.54,
    yearlyReturn: 8.7,
    diversificationScore: 78,
    riskLevel: 'Medium' as const,
  };

  const dataCategories: DataCategory[] = [
    {
      id: 'savings',
      name: 'Savings & Cash',
      description: 'Liquid savings and checking accounts',
      value: 105000,
      icon: DollarSign,
      color: '#3b82f6',
    },
    {
      id: 'bonds',
      name: 'Fixed Income (Bonds)',
      description: 'Treasury and corporate bonds',
      value: 68000,
      icon: Shield,
      color: '#8b5cf6',
    },
    {
      id: 'stocks',
      name: 'Equities (Stocks)',
      description: 'Stock portfolio and index funds',
      value: 205000,
      icon: TrendingUp,
      color: '#10b981',
    },
    {
      id: 'cryptocurrency',
      name: 'Cryptocurrency',
      description: 'Digital assets and crypto holdings',
      value: 60000,
      icon: Sparkles,
      color: '#06b6d4',
    },
    {
      id: 'property',
      name: 'Investment Property',
      description: 'Real estate investments',
      value: 295000,
      icon: Shield,
      color: '#f59e0b',
    },
    {
      id: 'joint',
      name: 'Joint Assets',
      description: 'Shared family assets',
      value: 72000,
      icon: Shield,
      color: '#ec4899',
    },
    {
      id: 'health',
      name: 'Financial Health Metrics',
      description: 'Health score, emergency fund, debt ratios',
      value: 0,
      icon: Shield,
      color: '#22c55e',
    },
    {
      id: 'goals',
      name: 'Financial Goals',
      description: 'Savings goals and targets',
      value: 0,
      icon: Shield,
      color: '#a855f7',
    },
  ];

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      type: 'system',
      content: 'Welcome to your AI Financial Advisor. Select the financial data categories you\'d like me to review, then ask me anything about your portfolio.',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const getContextData = () => {
    const selectedData = dataCategories.filter((cat) =>
      selectedCategories.includes(cat.id)
    );

    return {
      totalWealth,
      selectedCategories: selectedData.map((cat) => ({
        name: cat.name,
        value: cat.value,
        description: cat.description,
      })),
      analytics: analyticsData,
      // Include health and goals if selected
      health:
        selectedCategories.includes('health')
          ? {
              healthScore: 82,
              emergencyFund: { current: 45000, target: 50000, months: 5.4 },
              debtToIncome: 28,
              savingsRate: 22,
              netWorthGrowth: 9.2,
            }
          : undefined,
      goals:
        selectedCategories.includes('goals')
          ? [
              {
                goalName: 'Emergency Fund',
                targetAmount: 50000,
                currentSavings: 45000,
              },
              {
                goalName: 'New Home Down Payment',
                targetAmount: 100000,
                currentSavings: 62000,
              },
            ]
          : undefined,
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    if (selectedCategories.length === 0) {
      setError('Please select at least one data category to share with the AI.');
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
      selectedCategories: [...selectedCategories],
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsGenerating(true);
    setError(null);

    try {
      const contextData = getContextData();
      const response = await getAIAdvisoryResponse(inputValue, contextData);

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        type: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      setError(err.message || 'Failed to get AI response');
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        type: 'system',
        content: `Error: ${err.message || 'Failed to get response. Please try again.'}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getSelectedDataSummary = () => {
    if (selectedCategories.length === 0) {
      return 'No data selected';
    }
    const selectedNames = dataCategories
      .filter((cat) => selectedCategories.includes(cat.id))
      .map((cat) => cat.name);
    return selectedNames.join(', ');
  };

  const getTotalSelectedValue = () => {
    return dataCategories
      .filter((cat) => selectedCategories.includes(cat.id) && cat.value > 0)
      .reduce((sum, cat) => sum + cat.value, 0);
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
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Brain className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">AI Financial Advisor</h1>
                <p className="text-sm text-zinc-400">Review and optimize your portfolio with AI assistance</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">AI-Powered Advisory</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel - Data Selection */}
          <div className="lg:col-span-4">
            <Card className="p-6 bg-zinc-900 border-zinc-800 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-semibold text-white">Data Access Control</h2>
              </div>
              <p className="text-sm text-zinc-400 mb-6">
                Select which financial data you'd like to share with the AI advisor. Only checked items will be analyzed.
              </p>

              {/* Selection Summary */}
              <div className="mb-6 p-4 bg-zinc-800/50 border border-zinc-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-zinc-300">Currently Shared</span>
                  <span className="text-xs text-purple-400">
                    {selectedCategories.length} of {dataCategories.length}
                  </span>
                </div>
                {selectedCategories.length > 0 ? (
                  <>
                    <p className="text-sm text-white font-medium mb-2">
                      ${getTotalSelectedValue().toLocaleString()}
                    </p>
                    <p className="text-xs text-zinc-400 line-clamp-2">
                      {getSelectedDataSummary()}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-zinc-500">No data selected yet</p>
                )}
              </div>

              {/* Quick Actions */}
              <div className="mb-4 flex gap-2">
                <button
                  onClick={() => setSelectedCategories(dataCategories.map((cat) => cat.id))}
                  className="flex-1 px-3 py-1.5 text-xs bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/20 text-purple-400 rounded-lg transition-colors"
                >
                  Select All
                </button>
                <button
                  onClick={() => setSelectedCategories([])}
                  className="flex-1 px-3 py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-400 rounded-lg transition-colors"
                >
                  Clear All
                </button>
              </div>

              {/* Data Categories Checklist */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-zinc-300 mb-3">Available Data Categories</h3>
                {dataCategories.map((category) => {
                  const Icon = category.icon;
                  const isSelected = selectedCategories.includes(category.id);

                  return (
                    <div
                      key={category.id}
                      onClick={() => handleCategoryToggle(category.id)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/15'
                          : 'bg-zinc-800/30 border-zinc-700 hover:bg-zinc-800/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {isSelected ? (
                            <CheckCircle2 className="w-5 h-5 text-purple-400" />
                          ) : (
                            <Circle className="w-5 h-5 text-zinc-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Icon className="w-4 h-4" style={{ color: category.color }} />
                            <h4 className="text-sm font-semibold text-white">{category.name}</h4>
                          </div>
                          <p className="text-xs text-zinc-400 mb-2">{category.description}</p>
                          {category.value > 0 && (
                            <p className="text-xs font-medium text-zinc-300">
                              ${category.value.toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Privacy Notice */}
              <div className="mt-6 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-blue-300 mb-1">Privacy Protected</p>
                    <p className="text-xs text-zinc-400">
                      Your data is processed securely and not stored. Only selected categories are shared with the AI.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Panel - Portfolio Analytics + Chat */}
          <div className="lg:col-span-8 space-y-6">
            {/* Portfolio Analytics */}
            <PortfolioAnalytics {...analyticsData} />

            {/* Chat Interface */}
            <Card className="p-6 bg-zinc-900 border-zinc-800">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-semibold text-white">AI Advisory Chat</h2>
              </div>

              {/* Context Indicator */}
              <div className="mb-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-purple-300 mb-1">
                      AI Context: {selectedCategories.length > 0 ? 'Active' : 'No Data Selected'}
                    </p>
                    <p className="text-xs text-zinc-400">
                      {selectedCategories.length > 0
                        ? `Analyzing: ${getSelectedDataSummary()}`
                        : 'Select data categories on the left to enable AI analysis'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="mb-4 h-[400px] overflow-y-auto space-y-4 p-4 bg-zinc-950 rounded-lg border border-zinc-800">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.type === 'user'
                          ? 'bg-purple-600 text-white'
                          : message.type === 'system'
                          ? 'bg-zinc-800 border border-zinc-700 text-zinc-300'
                          : 'bg-zinc-800 text-white'
                      }`}
                    >
                      {message.type === 'assistant' && (
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className="w-4 h-4 text-purple-400" />
                          <span className="text-xs font-semibold text-purple-400">AI Advisor</span>
                        </div>
                      )}
                      {message.type === 'user' && message.selectedCategories && (
                        <div className="mb-2 pb-2 border-b border-purple-500/30">
                          <p className="text-xs text-purple-200">
                            Shared: {message.selectedCategories.length} categories
                          </p>
                        </div>
                      )}
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs opacity-60 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Generating Indicator */}
                {isGenerating && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg p-4 bg-zinc-800 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="w-4 h-4 text-purple-400" />
                        <span className="text-xs font-semibold text-purple-400">AI Advisor</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                        <p className="text-sm text-zinc-300">Analyzing your portfolio...</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Error Display */}
              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5" />
                    <p className="text-sm text-red-300">{error}</p>
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="space-y-3">
                {/* No Data Warning */}
                {selectedCategories.length === 0 && (
                  <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5" />
                      <p className="text-xs text-yellow-300">
                        Select at least one data category on the left to start chatting with your AI advisor.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder={
                      selectedCategories.length > 0
                        ? 'Ask me about your portfolio, risk management, optimization strategies...'
                        : 'Select data categories first...'
                    }
                    disabled={isGenerating || selectedCategories.length === 0}
                    className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                    rows={3}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isGenerating || !inputValue.trim() || selectedCategories.length === 0}
                    className="px-6 bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed self-end"
                  >
                    {isGenerating ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </Button>
                </div>

                {/* Suggested Questions */}
                {messages.length <= 1 && selectedCategories.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs text-zinc-500">Suggested questions:</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'How can I optimize my portfolio?',
                        'What are my biggest risks?',
                        'Should I rebalance my assets?',
                        'How diversified is my portfolio?',
                      ].map((question) => (
                        <button
                          key={question}
                          onClick={() => setInputValue(question)}
                          className="px-3 py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full transition-colors"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}