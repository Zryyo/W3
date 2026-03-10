import { Link } from 'react-router';
import { ArrowLeft, Home, DollarSign, TrendingUp, Calendar, Percent, MapPin } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function InvestmentPropertySector() {
  const totalPropertyValue = 295000;
  const totalWealth = 805000;
  const percentOfWealth = ((totalPropertyValue / totalWealth) * 100).toFixed(1);

  // Property type allocation
  const propertyTypeData = [
    { name: 'Residential Rental', value: 175000, percentage: 59.3, color: '#3b82f6' },
    { name: 'Commercial Office', value: 80000, percentage: 27.1, color: '#10b981' },
    { name: 'Retail Space', value: 40000, percentage: 13.6, color: '#f59e0b' },
  ];

  const renderCustomLabel = (entry: any) => {
    return `${entry.percentage}%`;
  };

  // Property appreciation over time
  const appreciationData = [
    { year: '2021', value: 254000 },
    { year: '2022', value: 265000 },
    { year: '2023', value: 275000 },
    { year: '2024', value: 284000 },
    { year: '2025', value: 290000 },
    { year: '2026', value: 295000 },
  ];

  const mortgageOutstanding = 168000;
  const equityValue = totalPropertyValue - mortgageOutstanding;
  const loanToValue = ((mortgageOutstanding / totalPropertyValue) * 100).toFixed(1);

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
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Home className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Investment Property</h1>
                <p className="text-sm text-zinc-400">Real estate holdings</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <span className="text-sm text-amber-400">{percentOfWealth}% of Total Wealth</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-zinc-900 border-zinc-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Home className="w-5 h-5 text-amber-500" />
              </div>
              <p className="text-sm text-zinc-400">Property Value</p>
            </div>
            <p className="text-3xl font-bold text-white">${totalPropertyValue.toLocaleString()}</p>
            <p className="text-xs text-amber-400 mt-1">{percentOfWealth}% of total portfolio</p>
            <p className="text-xs text-zinc-500 mt-1">Estimated market value</p>
          </Card>

          <Card className="p-6 bg-zinc-900 border-zinc-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-sm text-zinc-400">Net Rental Income</p>
            </div>
            <p className="text-3xl font-bold text-green-500">$1,450</p>
            <p className="text-xs text-zinc-500 mt-2">Per month</p>
          </Card>

          <Card className="p-6 bg-zinc-900 border-zinc-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Percent className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-sm text-zinc-400">Gross Yield</p>
            </div>
            <p className="text-3xl font-bold text-white">7.2%</p>
            <p className="text-xs text-zinc-500 mt-2">Annual return</p>
          </Card>

          <Card className="p-6 bg-zinc-900 border-zinc-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-sm text-zinc-400">Appreciation</p>
            </div>
            <p className="text-3xl font-bold text-white">+16.1%</p>
            <p className="text-xs text-green-500 mt-2">Since purchase</p>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Property Type Allocation - 2 columns */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-zinc-900 border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-6">Property Type Allocation</h3>
              <div className="h-[280px] mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={propertyTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomLabel}
                      outerRadius={100}
                      dataKey="value"
                    >
                      {propertyTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#18181b',
                        border: '1px solid #3f3f46',
                        borderRadius: '8px',
                        color: '#fff',
                      }}
                      formatter={(value: number) => `$${value.toLocaleString()}`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {propertyTypeData.map((type) => (
                  <div
                    key={type.name}
                    className="flex items-center justify-between p-3 bg-zinc-800/50 rounded"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: type.color }}
                      />
                      <span className="text-sm text-zinc-300">{type.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-white">
                        ${type.value.toLocaleString()}
                      </span>
                      <span className="text-xs text-zinc-500 ml-2">{type.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Property Appreciation - 2 columns */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-zinc-900 border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-6">Capital Appreciation</h3>
              <div className="h-[280px] mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={appreciationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                    <XAxis dataKey="year" stroke="#a1a1aa" />
                    <YAxis stroke="#a1a1aa" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#18181b',
                        border: '1px solid #3f3f46',
                        borderRadius: '8px',
                      }}
                      formatter={(value: number) => `$${value.toLocaleString()}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#f59e0b"
                      strokeWidth={3}
                      dot={{ fill: '#f59e0b', r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-zinc-800/50 rounded-lg">
                  <p className="text-xs text-zinc-400">Purchase Price</p>
                  <p className="text-lg font-semibold text-white">$280,000</p>
                  <p className="text-xs text-zinc-500">March 2021</p>
                </div>
                <div className="p-3 bg-zinc-800/50 rounded-lg">
                  <p className="text-xs text-zinc-400">Value Gain</p>
                  <p className="text-lg font-semibold text-green-500">+$45,000</p>
                  <p className="text-xs text-zinc-500">+16.1%</p>
                </div>
                <div className="p-3 bg-zinc-800/50 rounded-lg">
                  <p className="text-xs text-zinc-400">Annual Growth</p>
                  <p className="text-lg font-semibold text-white">3.2%</p>
                  <p className="text-xs text-zinc-500">Average</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Mortgage Details - 1 column */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-zinc-900 border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-6">Mortgage Overview</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-zinc-400">Loan-to-Value Ratio</span>
                    <span className="text-lg font-semibold text-white">{loanToValue}%</span>
                  </div>
                  <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                      style={{ width: `${loanToValue}%` }}
                    />
                  </div>
                  <p className="text-xs text-zinc-500 mt-2">Healthy LTV ratio</p>
                </div>

                <div className="space-y-2 mt-6">
                  <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                    <span className="text-xs text-zinc-400">Outstanding Balance</span>
                    <span className="text-sm font-semibold text-white">
                      ${mortgageOutstanding.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                    <span className="text-xs text-zinc-400">Monthly Payment</span>
                    <span className="text-sm font-semibold text-white">$1,285</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                    <span className="text-xs text-zinc-400">Interest Rate</span>
                    <span className="text-sm font-semibold text-white">3.75%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                    <span className="text-xs text-zinc-400">Remaining Term</span>
                    <span className="text-sm font-semibold text-white">23 years</span>
                  </div>
                </div>

                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg mt-4">
                  <p className="text-xs text-green-400 font-semibold mb-1">Strong Equity Position</p>
                  <p className="text-xs text-zinc-300">
                    ${equityValue.toLocaleString()} equity ({((equityValue / totalPropertyValue) * 100).toFixed(1)}%)
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Rental Income Breakdown - Full width */}
          <div className="lg:col-span-3">
            <Card className="p-6 bg-zinc-900 border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-6">Rental Income Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <DollarSign className="w-5 h-5 text-green-400" />
                    </div>
                    <p className="text-sm text-zinc-400">Gross Monthly Rent</p>
                  </div>
                  <p className="text-3xl font-bold text-white mb-2">$2,850</p>
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400">Base rent</span>
                      <span className="text-zinc-300">$2,750</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400">Parking/storage</span>
                      <span className="text-zinc-300">$100</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-red-500/20 rounded-lg">
                      <DollarSign className="w-5 h-5 text-red-400" />
                    </div>
                    <p className="text-sm text-zinc-400">Monthly Expenses</p>
                  </div>
                  <p className="text-3xl font-bold text-white mb-2">$1,400</p>
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400">Mortgage payment</span>
                      <span className="text-zinc-300">$1,285</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400">Property tax (monthly)</span>
                      <span className="text-zinc-300">$85</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400">Insurance</span>
                      <span className="text-zinc-300">$30</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <DollarSign className="w-5 h-5 text-blue-400" />
                    </div>
                    <p className="text-sm text-zinc-400">Net Cash Flow</p>
                  </div>
                  <p className="text-3xl font-bold text-green-500 mb-2">+$1,450</p>
                  <div className="mt-4">
                    <p className="text-xs text-zinc-400 mb-2">Annual Net Income</p>
                    <p className="text-lg font-semibold text-white">$17,400</p>
                    <p className="text-xs text-green-500">Positive cash flow</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Property Details - 2 columns */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-zinc-900 border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-6">Property Details</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-zinc-800/50 rounded-lg">
                  <div className="p-3 bg-amber-500/10 rounded-lg">
                    <MapPin className="w-6 h-6 text-amber-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white mb-1">2-Bedroom Condo</p>
                    <p className="text-sm text-zinc-400 mb-3">
                      456 Market Street, Unit 3B, San Francisco, CA 94103
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div>
                        <p className="text-xs text-zinc-500">Bedrooms</p>
                        <p className="text-sm font-semibold text-white">2</p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500">Bathrooms</p>
                        <p className="text-sm font-semibold text-white">2</p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500">Sq Ft</p>
                        <p className="text-sm font-semibold text-white">1,250</p>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500">Year Built</p>
                        <p className="text-sm font-semibold text-white">2018</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-zinc-800/50 rounded-lg">
                    <p className="text-xs text-zinc-400">Purchase Date</p>
                    <p className="text-sm font-semibold text-white">Mar 2021</p>
                  </div>
                  <div className="p-3 bg-zinc-800/50 rounded-lg">
                    <p className="text-xs text-zinc-400">Occupancy</p>
                    <p className="text-sm font-semibold text-green-500">Occupied</p>
                  </div>
                  <div className="p-3 bg-zinc-800/50 rounded-lg">
                    <p className="text-xs text-zinc-400">Lease Term</p>
                    <p className="text-sm font-semibold text-white">12 months</p>
                  </div>
                  <div className="p-3 bg-zinc-800/50 rounded-lg">
                    <p className="text-xs text-zinc-400">Lease Expires</p>
                    <p className="text-sm font-semibold text-white">Sep 2026</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Return Metrics - 1 column */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-zinc-900 border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-6">Return Metrics</h3>
              <div className="space-y-4">
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <p className="text-sm text-zinc-400 mb-2">Gross Rental Yield</p>
                  <p className="text-3xl font-bold text-white">7.2%</p>
                  <p className="text-xs text-zinc-500 mt-2">
                    ${(2850 * 12).toLocaleString()}/yr rental income
                  </p>
                </div>

                <div className="p-4 bg-zinc-800/50 rounded-lg">
                  <p className="text-sm text-zinc-400 mb-2">Net Rental Yield</p>
                  <p className="text-3xl font-bold text-white">5.4%</p>
                  <p className="text-xs text-zinc-500 mt-2">After expenses</p>
                </div>

                <div className="p-4 bg-zinc-800/50 rounded-lg">
                  <p className="text-sm text-zinc-400 mb-2">Total Return</p>
                  <p className="text-3xl font-bold text-green-500">+19.3%</p>
                  <p className="text-xs text-zinc-500 mt-2">Appreciation + income</p>
                </div>

                <div className="p-4 bg-zinc-800/50 rounded-lg">
                  <p className="text-sm text-zinc-400 mb-2">Cash-on-Cash</p>
                  <p className="text-3xl font-bold text-white">24.6%</p>
                  <p className="text-xs text-zinc-500 mt-2">Return on down payment</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Maintenance & Tax - Full width */}
          <div className="lg:col-span-3">
            <Card className="p-6 bg-zinc-900 border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-6">Annual Operating Costs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-zinc-400 mb-4">Regular Expenses</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                      <span className="text-sm text-zinc-300">Property Tax</span>
                      <span className="text-sm font-semibold text-white">$1,020</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                      <span className="text-sm text-zinc-300">Insurance</span>
                      <span className="text-sm font-semibold text-white">$360</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                      <span className="text-sm text-zinc-300">HOA Fees</span>
                      <span className="text-sm font-semibold text-white">$0</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg">
                      <span className="text-sm text-zinc-300">Maintenance Reserve</span>
                      <span className="text-sm font-semibold text-white">$1,500</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-zinc-400 mb-4">Tax Benefits</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="text-sm text-green-400 font-semibold mb-2">
                        Annual Tax Deductions
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-300">Mortgage interest</span>
                          <span className="text-zinc-300">$6,800</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-300">Property tax</span>
                          <span className="text-zinc-300">$1,020</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-300">Depreciation</span>
                          <span className="text-zinc-300">$8,900</span>
                        </div>
                        <div className="border-t border-zinc-700 pt-2 flex items-center justify-between">
                          <span className="text-sm font-semibold text-white">Total Deductions</span>
                          <span className="text-sm font-semibold text-green-400">$16,720</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-400">
                      Estimated tax savings: ~$4,180/year (25% bracket)
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Insights */}
        <div className="mt-8 p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Financial Health Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-amber-400 mb-2">
                ✓ Strong Cash Flow & Appreciation
              </h4>
              <p className="text-sm text-zinc-300">
                Your investment property generates $1,450/month in positive cash flow with a healthy
                7.2% gross yield. Combined with 16.1% appreciation since purchase, your total return
                is 19.3% – excellent for real estate.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-amber-400 mb-2">✓ Solid Equity Position</h4>
              <p className="text-sm text-zinc-300">
                With a 56.9% LTV ratio and $140,000 in equity, you have strong financial flexibility.
                Tax deductions of $16,720/year save ~$4,180 annually, improving your net returns
                significantly.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-12 py-6">
        <div className="container mx-auto px-6 text-center text-sm text-zinc-500">
          <p>Last updated: March 7, 2026 • Data is for demonstration purposes only</p>
        </div>
      </footer>
    </div>
  );
}