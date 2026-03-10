import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
  dangerouslyAllowBrowser: true, // Only for demo purposes
});

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  category: 'high-priority' | 'medium-priority' | 'low-priority' | 'info';
  actionable: boolean;
  relatedSector?: string;
  impact?: 'high' | 'medium' | 'low';
}

export interface RecommendationResponse {
  recommendations: Recommendation[];
  summary: string;
  lastUpdated: Date;
}

interface PortfolioData {
  totalWealth: number;
  wealthData: Array<{ name: string; value: number }>;
  analytics?: {
    monthlyChange: number;
    monthlyChangePercent: number;
    yearlyReturn?: number;
    diversificationScore?: number;
    riskLevel?: string;
  };
  health?: {
    healthScore: number;
    emergencyFund?: { current: number; target: number; months: number };
    debtToIncome?: number;
    savingsRate?: number;
    netWorthGrowth?: number;
  };
}

interface SectorData {
  name: string;
  value: number;
  percentOfTotal: number;
  details?: any;
}

// Cache to store recommendations temporarily
const recommendationCache = new Map<string, { data: RecommendationResponse; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function getCacheKey(type: string, data: any): string {
  return `${type}-${JSON.stringify(data).substring(0, 100)}`;
}

function getFromCache(key: string): RecommendationResponse | null {
  const cached = recommendationCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return { ...cached.data, lastUpdated: new Date(cached.timestamp) };
  }
  return null;
}

function setCache(key: string, data: RecommendationResponse): void {
  recommendationCache.set(key, { data, timestamp: Date.now() });
}

function parseRecommendationsFromText(text: string): Recommendation[] {
  const recommendations: Recommendation[] = [];
  
  // Split by numbered items or bullet points
  const items = text.split(/\n(?=\d+\.|\*|-)/);
  
  items.forEach((item, index) => {
    const lines = item.trim().split('\n').filter(l => l.trim());
    if (lines.length === 0) return;
    
    // First line is usually the title
    const titleLine = lines[0].replace(/^\d+\.\s*|\*\s*|-\s*|\*\*/g, '').trim();
    const title = titleLine.substring(0, 100);
    
    // Rest is description
    const description = lines.slice(1).join(' ').replace(/\*\*/g, '').trim() || title;
    
    // Determine category based on keywords
    const lowerText = (title + ' ' + description).toLowerCase();
    let category: Recommendation['category'] = 'info';
    let impact: Recommendation['impact'] = 'medium';
    
    if (lowerText.includes('urgent') || lowerText.includes('critical') || lowerText.includes('immediate')) {
      category = 'high-priority';
      impact = 'high';
    } else if (lowerText.includes('important') || lowerText.includes('consider') || lowerText.includes('should')) {
      category = 'medium-priority';
    } else if (lowerText.includes('optional') || lowerText.includes('might') || lowerText.includes('could')) {
      category = 'low-priority';
      impact = 'low';
    }
    
    // Detect related sector
    let relatedSector: string | undefined;
    if (lowerText.includes('stock') || lowerText.includes('equity') || lowerText.includes('equities')) {
      relatedSector = 'stocks';
    } else if (lowerText.includes('bond') || lowerText.includes('fixed income')) {
      relatedSector = 'bonds';
    } else if (lowerText.includes('crypto') || lowerText.includes('bitcoin') || lowerText.includes('ethereum')) {
      relatedSector = 'cryptocurrency';
    } else if (lowerText.includes('property') || lowerText.includes('real estate')) {
      relatedSector = 'investment-property';
    } else if (lowerText.includes('saving') || lowerText.includes('cash') || lowerText.includes('emergency')) {
      relatedSector = 'savings';
    } else if (lowerText.includes('joint') || lowerText.includes('family')) {
      relatedSector = 'joint-assets';
    }
    
    recommendations.push({
      id: `rec-${Date.now()}-${index}`,
      title,
      description: description.substring(0, 300),
      category,
      actionable: true,
      relatedSector,
      impact,
    });
  });
  
  return recommendations.filter(r => r.title.length > 5);
}

export async function getPortfolioRecommendations(
  portfolioData: PortfolioData
): Promise<RecommendationResponse> {
  const cacheKey = getCacheKey('portfolio', portfolioData);
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  try {
    const prompt = `You are a professional financial advisor AI. Analyze this portfolio and provide 5-6 specific, actionable recommendations to improve financial health and optimize asset allocation.

Portfolio Summary:
- Total Wealth: $${portfolioData.totalWealth.toLocaleString()}
- Asset Allocation: ${portfolioData.wealthData.map(d => `${d.name}: $${d.value.toLocaleString()} (${((d.value / portfolioData.totalWealth) * 100).toFixed(1)}%)`).join(', ')}
${portfolioData.analytics ? `- Monthly Change: ${portfolioData.analytics.monthlyChangePercent}%
- Yearly Return: ${portfolioData.analytics.yearlyReturn}%
- Diversification Score: ${portfolioData.analytics.diversificationScore}/100
- Risk Level: ${portfolioData.analytics.riskLevel}` : ''}
${portfolioData.health ? `- Financial Health Score: ${portfolioData.health.healthScore}/100
- Emergency Fund: ${portfolioData.health.emergencyFund?.months} months
- Debt-to-Income: ${portfolioData.health.debtToIncome}%
- Savings Rate: ${portfolioData.health.savingsRate}%` : ''}

Provide recommendations in this format:
1. **[Title]**: [Brief actionable description]
2. **[Title]**: [Brief actionable description]
...

Focus on diversification, risk management, emergency funds, and growth opportunities. Be specific and concise.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 800,
      temperature: 0.7,
    });

    const responseText = completion.choices[0]?.message?.content || '';
    const recommendations = parseRecommendationsFromText(responseText);

    const result: RecommendationResponse = {
      recommendations: recommendations.slice(0, 6),
      summary: `Based on analysis of your $${(portfolioData.totalWealth / 1000).toFixed(0)}K portfolio`,
      lastUpdated: new Date(),
    };

    setCache(cacheKey, result);
    return result;
  } catch (error: any) {
    console.error('Error fetching portfolio recommendations:', error);
    throw new Error(error.message || 'Failed to generate recommendations. Please check your API key configuration.');
  }
}

export async function getSectorRecommendations(
  sectorData: SectorData,
  portfolioContext: { totalWealth: number }
): Promise<RecommendationResponse> {
  const cacheKey = getCacheKey('sector', sectorData);
  const cached = getFromCache(cacheKey);
  if (cached) return cached;

  try {
    const prompt = `You are a professional financial advisor AI. Analyze this ${sectorData.name} allocation and provide 4-5 specific recommendations for optimization and improvement.

${sectorData.name} Details:
- Current Value: $${sectorData.value.toLocaleString()}
- Percentage of Total Portfolio: ${sectorData.percentOfTotal.toFixed(1)}%
- Total Portfolio Value: $${portfolioContext.totalWealth.toLocaleString()}

Provide specific, actionable recommendations for this asset class. Format as:
1. **[Title]**: [Brief actionable description]
2. **[Title]**: [Brief actionable description]
...

Focus on diversification within this sector, risk optimization, and growth strategies. Be concise.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 600,
      temperature: 0.7,
    });

    const responseText = completion.choices[0]?.message?.content || '';
    const recommendations = parseRecommendationsFromText(responseText);

    const result: RecommendationResponse = {
      recommendations: recommendations.slice(0, 5),
      summary: `AI-generated insights for your ${sectorData.name} allocation`,
      lastUpdated: new Date(),
    };

    setCache(cacheKey, result);
    return result;
  } catch (error: any) {
    console.error('Error fetching sector recommendations:', error);
    throw new Error(error.message || 'Failed to generate recommendations. Please check your API key configuration.');
  }
}

export function clearRecommendationCache(): void {
  recommendationCache.clear();
}
