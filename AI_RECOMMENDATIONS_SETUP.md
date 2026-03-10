# AI Recommendations Feature - Setup Guide

This application includes a live AI-powered recommendation system that uses OpenAI's API to generate personalized financial insights based on your portfolio data.

## Features

- **Portfolio-level recommendations**: AI analyzes your entire wealth composition
- **Sector-specific recommendations**: Tailored insights for each asset category
- **Full Recommendation Hub**: Dedicated page with all recommendations organized by category
- **Live LLM integration**: Real API calls to OpenAI GPT-3.5-turbo (not static data)
- **Smart caching**: 5-minute cache to minimize API costs
- **UI States**: Loading, error, success, and empty states
- **Trust Cues**: AI-assisted badges, timestamps, and data sources

## Setup Instructions

### 1. Get an OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Navigate to API Keys section
4. Click "Create new secret key"
5. Copy the key (starts with `sk-...`)

### 2. Configure the API Key

Create a `.env` file in the root directory:

```bash
VITE_OPENAI_API_KEY=sk-your-api-key-here
```

**Important**: Never commit your `.env` file to version control. It's already included in `.gitignore`.

### 3. Alternative: Use Google Gemini (Optional)

If you prefer to use Google Gemini instead of OpenAI:

1. Get an API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Install the Gemini SDK:
   ```bash
   npm install @google/generative-ai
   ```
3. Update `/src/app/services/aiRecommendations.ts` to use Gemini instead of OpenAI

## Usage

### Main Dashboard
The AI Recommendation Summary widget appears on the main individual dashboard, showing top 3 recommendations with a link to view all.

### Recommendation Hub
Visit `/recommendations` to see all AI-generated insights organized by:
- Overall Portfolio Health
- Savings
- Bonds
- Stocks
- Cryptocurrency
- Investment Property
- Joint Assets

### Sector Pages
Each sector page (e.g., `/sector/savings`) includes a dedicated AI Recommendations section with insights specific to that asset category.

## Features

### Recommendation Components

1. **RecommendationSummary** - Widget for main dashboard
   - Shows top 3 recommendations
   - Auto-refreshes data
   - Links to Recommendation Hub

2. **RecommendationHub** - Full-page view
   - Tabbed interface for all categories
   - Batch loading for all sectors
   - Filter by category

3. **SectorAIRecommendations** - Sector-specific widget
   - Contextual recommendations for each asset type
   - Links back to hub

4. **RecommendationCard** - Individual recommendation display
   - Priority badges (high/medium/low)
   - Impact indicators
   - Links to related sectors

### AI Service Features

- **Smart Caching**: Recommendations cached for 5 minutes to reduce API costs
- **Error Handling**: Graceful fallback with clear error messages
- **Prompt Engineering**: Optimized prompts for financial context
- **Response Parsing**: Intelligent extraction of structured recommendations from LLM text

## Cost Management

### API Costs
- GPT-3.5-turbo pricing: ~$0.002 per recommendation batch
- Average portfolio analysis: ~$0.003 per refresh
- With 5-minute caching: Very low daily costs even with active usage

### Tips to Minimize Costs
1. Caching is enabled by default (5 minutes)
2. Use the refresh button sparingly
3. For development, consider using lower `max_tokens` in the API calls
4. Monitor usage on [OpenAI Platform](https://platform.openai.com/usage)

## Troubleshooting

### "Failed to generate recommendations" Error

**Problem**: API key not configured  
**Solution**: Make sure `VITE_OPENAI_API_KEY` is set in your `.env` file

**Problem**: Invalid API key  
**Solution**: Verify your key is correct and active on OpenAI Platform

**Problem**: Rate limiting  
**Solution**: You've exceeded OpenAI's rate limits. Wait a few minutes or upgrade your plan.

### Empty Recommendations

**Problem**: No recommendations showing  
**Solution**: Check browser console for errors. The LLM might be returning unexpected format.

### Slow Loading

**Problem**: Takes too long to load  
**Solution**: This is normal for the first load. Subsequent loads use the cache and are instant.

## Technical Architecture

```
User Interface Layer:
├── RecommendationSummary (Dashboard widget)
├── RecommendationHub (Full page)
├── SectorAIRecommendations (Sector widget)
└── RecommendationCard (Individual cards)

Service Layer:
├── aiRecommendations.ts
│   ├── getPortfolioRecommendations()
│   ├── getSectorRecommendations()
│   ├── parseRecommendationsFromText()
│   └── Cache Management (5-min TTL)

LLM Integration:
└── OpenAI GPT-3.5-turbo
    ├── Prompt Engineering
    ├── Response Parsing
    └── Error Handling
```

## Security Notes

- API key is stored in environment variables (not in code)
- `dangerouslyAllowBrowser: true` is used for demo purposes
- In production, use a backend proxy to hide the API key
- Never expose API keys in client-side code for production apps

## Production Recommendations

For a production deployment:

1. **Use a Backend Proxy**: Create an API route that calls OpenAI from your server
2. **Add Rate Limiting**: Implement user-level rate limiting
3. **Extend Caching**: Consider using Redis or database for longer cache duration
4. **Add User Authentication**: Associate recommendations with specific users
5. **Monitor Costs**: Set up billing alerts on OpenAI Platform
6. **Error Tracking**: Integrate with Sentry or similar for error monitoring

## API Reference

### `getPortfolioRecommendations(portfolioData)`
Generates comprehensive portfolio-level recommendations.

**Parameters:**
- `portfolioData`: Object containing wealth data, analytics, and health metrics

**Returns:**
- `RecommendationResponse` with recommendations array and metadata

### `getSectorRecommendations(sectorData, portfolioContext)`
Generates sector-specific optimization recommendations.

**Parameters:**
- `sectorData`: Sector name, value, and percentage of portfolio
- `portfolioContext`: Total wealth for context

**Returns:**
- `RecommendationResponse` with sector-specific recommendations

### `clearRecommendationCache()`
Manually clears all cached recommendations.

## Support

For issues or questions:
1. Check this documentation
2. Review browser console for error messages
3. Verify API key configuration
4. Check OpenAI Platform status page
