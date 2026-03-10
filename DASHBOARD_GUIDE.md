# Financial Dashboard System - Navigation Guide

## Overview
This financial dashboard system includes two main features:
1. **Individual & Family/Group Dashboards** - Switch between personal and household financial views
2. **Financial Advisor Access Flow** - Secure 2FA authentication for advisor client access

## Dashboard Routes

### Main Dashboards
- **`/`** - Individual Dashboard
  - Personal wealth composition
  - Portfolio analytics
  - Financial health indicators
  - Personal financial goals
  
- **`/group`** - Family/Group Dashboard
  - Combined household assets
  - Household net worth calculation
  - Asset allocation across family
  - Liabilities overview
  - Cash flow tracking
  - Member contribution breakdown

### Switching Views
Use the toggle switcher in the header to seamlessly switch between Individual and Family views.

## Advisor Access Flow

### Authentication Routes
- **`/advisor`** - Login Page
  - Email and password authentication
  - Secure login with show/hide password
  - **Back button** to return to Individual Dashboard
  
- **`/advisor/verify`** - 2FA Verification
  - 6-digit code input
  - Auto-verify on completion
  - Resend code option (60s cooldown)
  - **Demo Test Codes:**
    - `123456` - Access Granted (leads to success)
    - `000000` - Access Denied (leads to denied)
  
- **`/advisor/success`** - Access Granted
  - Confirmation of successful authentication
  - Access summary and permissions
  - Security and compliance details
  - Button to view Advisor Dashboard
  
- **`/advisor/denied`** - Access Denied
  - Detailed denial reasons
  - Next steps guidance
  - Support contact options
  - Incident logging details

### Advisor Workspace
- **`/advisor/dashboard`** - Advisor Dashboard
  - Catalogue-style client portfolio view
  - Total Assets Under Management (AUM)
  - Client search functionality
  - Grid of client cards with:
    - Client name and account ID
    - Minimized pie chart visualization
    - Total wealth and monthly change stats
    - Clickable to view full client dashboard
  
- **`/advisor/client/:clientId`** - Client Dashboard
  - Full individual dashboard for specific client
  - Uses same design as Individual Dashboard
  - Read-only advisor mode indicator
  - Client-specific dummy data
  - Advisor access notice
  - Back button to return to Advisor Dashboard

## Complete Advisor Flow
1. Start at Individual Dashboard (`/`)
2. Click "Advisor Access" button in header
3. Login with credentials (`/advisor`)
4. Click "Back to Dashboard" to return, or proceed
5. Enter 2FA code (`/advisor/verify`)
   - `123456` for success flow
   - `000000` for denial flow
6. View success or denied state
7. If successful, view Advisor Dashboard with all clients
8. Click any client's pie chart to view their full dashboard
9. Review client's complete financial information
10. Return to Advisor Dashboard or exit advisor mode

## Features

### Individual Dashboard
- Total net worth tracking
- Asset allocation pie chart
- Monthly performance metrics
- Financial health score
- Emergency fund status
- Personal financial goals with progress tracking

### Family Dashboard
- Household net worth (assets - liabilities)
- Combined asset allocation
- Monthly cash flow analysis (income vs expenses)
- Individual member contributions
- Debt tracking with payoff progress
- Family financial strength metrics

### Advisor Dashboard
- Catalogue-style client grid layout
- Mini pie chart for each client
- Total AUM calculations
- Average portfolio growth metrics
- Active client count
- Search functionality
- Click-through to individual client dashboards

### Client Dashboard (Advisor View)
- Complete financial overview for specific client
- Same layout as Individual Dashboard
- Unique dummy data per client (6 clients available)
- Read-only access indicator
- Advisor mode badge
- Session expiration notice
- Compliance and security notices

### Advisor Access
- Multi-factor authentication (Email + Password + 2FA)
- Demo codes for testing both outcomes
- Read-only access permissions
- 60-minute session duration
- Full audit logging
- FINRA and SEC compliance
- Client notification system
- Encrypted end-to-end communication

## Available Clients

When logged in as advisor, you can view dashboards for:
1. Sarah Johnson (ACC-2024-8851) - $805K
2. Michael Chen (ACC-2024-7732) - $1.24M
3. Emily Rodriguez (ACC-2024-6543) - $625K
4. David Martinez (ACC-2024-5421) - $2.1M
5. Jennifer Thompson (ACC-2024-4312) - $485K
6. Robert Kim (ACC-2024-3201) - $1.58M

Each client has unique:
- Asset allocation
- Portfolio performance
- Financial health metrics
- Goals and objectives

## Security Features
- TLS 1.3 encryption
- Session monitoring
- Activity logging
- Compliance with financial regulations
- Privacy-protected data access
- Mandatory 2FA before client view
- Read-only access enforcement
- Back navigation to Individual Dashboard from login
