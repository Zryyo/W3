# AI Financial Advisor Workspace - User Guide

## Overview

The AI Financial Advisor Workspace is an embedded advisory tool that allows you to have interactive conversations with an AI financial advisor while maintaining complete control over what data you share.

## Access

Navigate to the AI Advisor workspace via:
- Header navigation: Click **"AI Advisor"** button in the top-right
- Direct URL: `/ai-advisor`

## Features

### Left Panel: Data Access Control

**Privacy-First Design**: You control exactly what financial information the AI can analyze.

#### Available Data Categories:

1. **Savings & Cash** - Liquid savings and checking accounts
2. **Fixed Income (Bonds)** - Treasury and corporate bonds
3. **Equities (Stocks)** - Stock portfolio and index funds
4. **Cryptocurrency** - Digital assets and crypto holdings
5. **Investment Property** - Real estate investments
6. **Joint Assets** - Shared family assets
7. **Financial Health Metrics** - Health score, emergency fund, debt ratios
8. **Financial Goals** - Savings goals and targets

#### How to Select Data:

- Click any category card to toggle selection
- Selected categories show with a purple highlight and checkmark
- Unselected categories remain grayed out
- The summary at the top shows:
  - Number of categories selected
  - Total value of selected assets
  - List of selected categories

### Right Panel: AI Advisory Chat

#### Portfolio Analytics
Always visible at the top showing your key portfolio metrics:
- Total wealth
- Monthly change
- Yearly return
- Diversification score
- Risk level

#### Chat Interface

**Context Indicator**: Shows what data the AI currently has access to
- Purple badge indicates active context
- Lists all selected categories
- Updates in real-time as you change selections

**Chat Features**:
- **Interactive Conversation**: Ask questions in natural language
- **Contextual Responses**: AI responds based only on selected data
- **Message History**: Full conversation preserved during session
- **Timestamps**: Each message shows when it was sent

#### Suggested Questions

When you first select data, the AI suggests relevant questions:
- "How can I optimize my portfolio?"
- "What are my biggest risks?"
- "Should I rebalance my assets?"
- "How diversified is my portfolio?"

Click any suggestion to instantly ask that question.

## UI States

### 1. No Data Selected
- Warning banner appears
- Input field is disabled
- Message: "Select at least one data category on the left to start chatting"

### 2. Data Selected - Ready
- Context badge shows "Active"
- Input field enabled
- Suggested questions appear
- Ready to chat

### 3. Generating Response
- Loading spinner appears in chat
- "AI Advisor" badge with "Analyzing your portfolio..." message
- Input temporarily disabled

### 4. Loaded Response
- AI message appears in chat
- Includes "AI Advisor" badge
- Timestamp shown
- Input re-enabled for follow-up questions

### 5. Error State
- Red error banner appears below chat
- Clear error message
- Option to try again
- Common errors:
  - No data selected
  - API key not configured
  - Network issues

## How to Use

### Basic Workflow:

1. **Select Your Data**
   - Choose which categories to share (left panel)
   - Watch the summary update with your selections

2. **Review Portfolio Analytics**
   - Check your current portfolio metrics (top of right panel)

3. **Ask Questions**
   - Type your question in the text box
   - Press Enter or click Send button
   - Wait for AI response

4. **Refine Context**
   - Add/remove data categories as needed
   - AI adapts to new context automatically

5. **Continue Conversation**
   - Ask follow-up questions
   - Request clarification
   - Explore different scenarios

### Best Practices:

✅ **Start Broad**: Select all relevant categories for comprehensive advice  
✅ **Ask Specific Questions**: "Should I increase my bond allocation?" vs "Help me"  
✅ **Reference Numbers**: AI will use your actual portfolio values in responses  
✅ **Iterate**: Refine questions based on responses  
✅ **Experiment**: Try different data combinations to see varied perspectives  

❌ **Don't**: Ask about data you haven't shared (AI will mention it's not available)  
❌ **Don't**: Expect financial projections as absolute predictions  
❌ **Don't**: Share sensitive personal information beyond portfolio data  

## Privacy & Security

### What the AI Can See:
- ✅ Only selected financial categories
- ✅ Portfolio performance metrics
- ✅ Your questions and conversation history

### What the AI Cannot See:
- ❌ Unselected data categories
- ❌ Personal identifying information
- ❌ Account numbers or passwords
- ❌ Conversations from other sessions

### Privacy Features:
- **Session-Based**: Conversations don't persist after you leave
- **Selective Sharing**: Granular control over data access
- **Visual Indicators**: Always see what's shared via context badge
- **No Storage**: Messages not saved to database

## Example Conversations

### Portfolio Optimization

**You**: "How can I optimize my portfolio?"  
**AI**: "Based on your $805K portfolio, I notice you have 36.6% in investment property, which is quite concentrated. Consider rebalancing to reduce single-asset risk. Your diversification score of 78/100 is good but could improve by..."

### Risk Assessment

**You**: "What are my biggest risks?"  
**AI**: "Looking at your current allocation with $295K in real estate (36.6%), your main risks are: 1) Real estate market volatility, 2) Liquidity concerns - property is hard to sell quickly, 3) Geographic concentration if properties are in one area..."

### Specific Sector Advice

**Selected**: Only Savings & Bonds  
**You**: "Should I move money from savings to bonds?"  
**AI**: "With your current $105K in savings earning 4.25% APY and $68K in bonds, the decision depends on your liquidity needs. Note: I don't have visibility into your other assets, but based on the savings and bonds data..."

## Technical Details

### Requirements:
- OpenAI API key configured in `.env`
- Modern web browser with JavaScript enabled
- Active internet connection

### API Usage:
- Uses GPT-3.5-turbo model
- Each message costs ~$0.001-$0.002
- Context limited to 500 tokens per response
- No conversation history stored server-side

## Troubleshooting

### "Select at least one data category" Error
**Problem**: Trying to send message without selecting data  
**Solution**: Click at least one category card on the left panel

### "OpenAI API key not configured" Error
**Problem**: Missing or invalid API key  
**Solution**: Add `VITE_OPENAI_API_KEY=sk-...` to your `.env` file

### Slow Responses
**Problem**: AI takes time to generate response  
**Solution**: This is normal - LLM processing takes 3-10 seconds

### Generic Responses
**Problem**: AI giving generic advice  
**Solution**: Select more specific data categories and ask detailed questions

### AI Mentions Unavailable Data
**Problem**: AI says it doesn't have access to certain information  
**Solution**: This is correct - the AI only sees selected categories. Select the category you want to discuss.

## Design Philosophy

This is designed as an **embedded advisory tool**, not a generic chatbot:

- **Financial Focus**: Specialized prompts for portfolio advice
- **Context-Aware**: AI knows it's a financial advisor
- **Professional Tone**: Business-appropriate language
- **Data-Driven**: References specific portfolio numbers
- **Privacy-First**: Explicit data selection required
- **Actionable**: Provides specific recommendations, not just information

## Coming Soon

Future enhancements may include:
- Export conversation to PDF
- Save favorite responses
- Multi-session history
- Comparison scenarios ("What if I...")
- Integration with live market data
- Scheduled check-ins

## Support

For issues:
1. Check this guide
2. Verify data categories are selected
3. Check browser console for errors
4. Ensure API key is configured
5. Try refreshing the page
