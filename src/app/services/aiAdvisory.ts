import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
  dangerouslyAllowBrowser: true,
});

interface ContextData {
  totalWealth: number;
  selectedCategories: Array<{
    name: string;
    value: number;
    description: string;
  }>;
  analytics: {
    monthlyChange: number;
    monthlyChangePercent: number;
    yearlyReturn: number;
    diversificationScore: number;
    riskLevel: string;
  };
  health?: {
    healthScore: number;
    emergencyFund: { current: number; target: number; months: number };
    debtToIncome: number;
    savingsRate: number;
    netWorthGrowth: number;
  };
  goals?: Array<{
    goalName: string;
    targetAmount: number;
    currentSavings: number;
  }>;
}

export async function getAIAdvisoryResponse(
  userMessage: string,
  contextData: ContextData
): Promise<string> {
  try {
    // Build context string from selected data
    const contextParts: string[] = [];

    contextParts.push(`Total Portfolio Value: $${contextData.totalWealth.toLocaleString()}`);
    
    if (contextData.selectedCategories.length > 0) {
      contextParts.push('\nAsset Allocation:');
      contextData.selectedCategories.forEach((cat) => {
        const percentage = ((cat.value / contextData.totalWealth) * 100).toFixed(1);
        contextParts.push(`- ${cat.name}: $${cat.value.toLocaleString()} (${percentage}%)`);
      });
    }

    contextParts.push(`\nPerformance Metrics:`);
    contextParts.push(`- Monthly Change: ${contextData.analytics.monthlyChangePercent}%`);
    contextParts.push(`- Yearly Return: ${contextData.analytics.yearlyReturn}%`);
    contextParts.push(`- Diversification Score: ${contextData.analytics.diversificationScore}/100`);
    contextParts.push(`- Risk Level: ${contextData.analytics.riskLevel}`);

    if (contextData.health) {
      contextParts.push(`\nFinancial Health:`);
      contextParts.push(`- Health Score: ${contextData.health.healthScore}/100`);
      contextParts.push(`- Emergency Fund: ${contextData.health.emergencyFund.months} months coverage`);
      contextParts.push(`- Debt-to-Income Ratio: ${contextData.health.debtToIncome}%`);
      contextParts.push(`- Savings Rate: ${contextData.health.savingsRate}%`);
      contextParts.push(`- Net Worth Growth: ${contextData.health.netWorthGrowth}% annually`);
    }

    if (contextData.goals && contextData.goals.length > 0) {
      contextParts.push(`\nFinancial Goals:`);
      contextData.goals.forEach((goal) => {
        const progress = ((goal.currentSavings / goal.targetAmount) * 100).toFixed(1);
        contextParts.push(
          `- ${goal.goalName}: $${goal.currentSavings.toLocaleString()} / $${goal.targetAmount.toLocaleString()} (${progress}%)`
        );
      });
    }

    const contextString = contextParts.join('\n');

    const systemPrompt = `You are a professional financial advisor AI with expertise in portfolio management, risk assessment, and wealth optimization. You provide personalized, actionable advice based on the client's financial data.

Guidelines:
- Be professional, clear, and concise
- Provide specific, actionable recommendations
- Consider risk tolerance and diversification
- Explain financial concepts in accessible terms
- Reference specific numbers from the portfolio when relevant
- If asked about data not shared, politely mention it's not in the current context
- Keep responses focused and under 250 words unless detailed analysis is requested
- Use a conversational but professional tone

You are analyzing ONLY the financial data the client has chosen to share with you.`;

    const userPrompt = `Based on my current portfolio data:

${contextString}

Question: ${userMessage}

Please provide specific advice based on the data I've shared.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || 'I apologize, but I was unable to generate a response. Please try again.';
  } catch (error: any) {
    console.error('Error getting AI advisory response:', error);
    
    if (error.message?.includes('API key')) {
      throw new Error('OpenAI API key not configured. Please add VITE_OPENAI_API_KEY to your .env file.');
    }
    
    throw new Error(error.message || 'Failed to get AI response. Please try again.');
  }
}
