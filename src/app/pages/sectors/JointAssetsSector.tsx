import { Link, useNavigate } from 'react-router';
import { ArrowLeft, Users, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface FamilyMemberData {
  id: string;
  name: string;
  relationship: string;
  totalWealth: number;
  monthlyChange: number;
  monthlyChangePercent: number;
  wealthData: Array<{ name: string; value: number; color: string }>;
}

export function JointAssetsSector() {
  const navigate = useNavigate();

  // Mock family member data
  const familyMembers: FamilyMemberData[] = [
    {
      id: 'sarah',
      name: 'Sarah Johnson',
      relationship: 'Primary Account Holder',
      totalWealth: 805000,
      monthlyChange: 12450,
      monthlyChangePercent: 1.54,
      wealthData: [
        { name: 'Savings', value: 105000, color: '#3b82f6' },
        { name: 'Bonds', value: 68000, color: '#8b5cf6' },
        { name: 'Stocks', value: 205000, color: '#10b981' },
        { name: 'Cryptocurrency', value: 60000, color: '#06b6d4' },
        { name: 'Investment Property', value: 295000, color: '#f59e0b' },
        { name: 'Joint Assets', value: 72000, color: '#ec4899' },
      ],
    },
    {
      id: 'michael',
      name: 'Michael Johnson',
      relationship: 'Spouse',
      totalWealth: 685000,
      monthlyChange: 9850,
      monthlyChangePercent: 1.44,
      wealthData: [
        { name: 'Savings', value: 92000, color: '#3b82f6' },
        { name: 'Bonds', value: 115000, color: '#8b5cf6' },
        { name: 'Stocks', value: 245000, color: '#10b981' },
        { name: 'Cryptocurrency', value: 52000, color: '#06b6d4' },
        { name: 'Investment Property', value: 109000, color: '#f59e0b' },
        { name: 'Joint Assets', value: 72000, color: '#ec4899' },
      ],
    },
    {
      id: 'emma',
      name: 'Emma Johnson',
      relationship: 'Dependent (College Fund)',
      totalWealth: 125000,
      monthlyChange: 1200,
      monthlyChangePercent: 0.96,
      wealthData: [
        { name: 'Savings', value: 15000, color: '#3b82f6' },
        { name: 'Bonds', value: 35000, color: '#8b5cf6' },
        { name: 'Stocks', value: 58000, color: '#10b981' },
        { name: 'Cryptocurrency', value: 0, color: '#06b6d4' },
        { name: 'Investment Property', value: 0, color: '#f59e0b' },
        { name: 'Joint Assets', value: 17000, color: '#ec4899' },
      ],
    },
    {
      id: 'lucas',
      name: 'Lucas Johnson',
      relationship: 'Dependent (Education Savings)',
      totalWealth: 85000,
      monthlyChange: 850,
      monthlyChangePercent: 1.00,
      wealthData: [
        { name: 'Savings', value: 12000, color: '#3b82f6' },
        { name: 'Bonds', value: 28000, color: '#8b5cf6' },
        { name: 'Stocks', value: 35000, color: '#10b981' },
        { name: 'Cryptocurrency', value: 0, color: '#06b6d4' },
        { name: 'Investment Property', value: 0, color: '#f59e0b' },
        { name: 'Joint Assets', value: 10000, color: '#ec4899' },
      ],
    },
  ];

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleMemberClick = (memberId: string) => {
    navigate(`/sector/joint-assets/member/${memberId}`);
  };

  const totalFamilyWealth = familyMembers.reduce((sum, member) => sum + member.totalWealth, 0);
  const totalJointAssets = familyMembers.reduce((sum, member) => {
    const jointAsset = member.wealthData.find((item) => item.name === 'Joint Assets');
    return sum + (jointAsset?.value || 0);
  }, 0);

  const percentOfWealth = ((totalJointAssets / totalFamilyWealth) * 100).toFixed(1);

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
              <div className="p-2 bg-pink-500/10 rounded-lg">
                <Users className="w-6 h-6 text-pink-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Joint Assets</h1>
                <p className="text-sm text-zinc-400">Family member portfolios and shared assets</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-pink-500/10 border border-pink-500/20 rounded-lg">
              <span className="text-sm text-pink-400">{formatCurrency(totalJointAssets)} in Joint Assets</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-zinc-900 border-zinc-800">
            <p className="text-sm text-zinc-400 mb-1">Total Family Wealth</p>
            <p className="text-3xl font-bold text-white">{formatCurrency(totalFamilyWealth)}</p>
            <p className="text-sm text-green-500 mt-2">
              +{formatCurrency(familyMembers.reduce((sum, m) => sum + m.monthlyChange, 0))} this
              month
            </p>
          </Card>
          <Card className="p-6 bg-zinc-900 border-zinc-800">
            <p className="text-sm text-zinc-400 mb-1">Joint Assets Total</p>
            <p className="text-3xl font-bold text-pink-500">{formatCurrency(totalJointAssets)}</p>
            <p className="text-sm text-zinc-400 mt-2">
              {percentOfWealth}% of family wealth
            </p>
          </Card>
          <Card className="p-6 bg-zinc-900 border-zinc-800">
            <p className="text-sm text-zinc-400 mb-1">Family Members</p>
            <p className="text-3xl font-bold text-white">{familyMembers.length}</p>
            <p className="text-sm text-zinc-400 mt-2">2 adults, 2 dependents</p>
          </Card>
          <Card className="p-6 bg-zinc-900 border-zinc-800">
            <p className="text-sm text-zinc-400 mb-1">Avg. Monthly Growth</p>
            <p className="text-3xl font-bold text-green-500">
              {(familyMembers.reduce((sum, m) => sum + m.monthlyChangePercent, 0) / familyMembers.length).toFixed(2)}%
            </p>
            <p className="text-sm text-zinc-400 mt-2">Family average</p>
          </Card>
        </div>

        {/* Family Members Grid */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Family Member Portfolios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {familyMembers.map((member) => (
              <Card
                key={member.id}
                className="p-6 bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer group"
                onClick={() => handleMemberClick(member.id)}
              >
                {/* Member Name */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white group-hover:text-pink-400 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs text-zinc-500">{member.relationship}</p>
                </div>

                {/* Mini Pie Chart */}
                <div className="h-[180px] mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={member.wealthData.filter((item) => item.value > 0)}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {member.wealthData
                          .filter((item) => item.value > 0)
                          .map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Member Stats */}
                <div className="space-y-3 border-t border-zinc-800 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-400">Total Wealth</span>
                    <span className="font-semibold text-white">
                      {formatCurrency(member.totalWealth)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-400">Monthly Change</span>
                    <span
                      className={`flex items-center gap-1 font-semibold ${
                        member.monthlyChange >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {member.monthlyChange >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {Math.abs(member.monthlyChangePercent).toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-400">Joint Assets</span>
                    <span className="font-semibold text-pink-400">
                      {formatCurrency(
                        member.wealthData.find((item) => item.name === 'Joint Assets')?.value || 0
                      )}
                    </span>
                  </div>
                </div>

                {/* Click Indicator */}
                <div className="mt-4 text-center">
                  <span className="text-xs text-zinc-500 group-hover:text-pink-400 transition-colors">
                    Click to view full dashboard →
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Joint Assets Breakdown */}
        <div className="mt-8">
          <Card className="p-6 bg-zinc-900 border-zinc-800">
            <h3 className="text-lg font-semibold text-white mb-6">Joint Assets Breakdown</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
                <div>
                  <p className="font-semibold text-white">Joint Investment Account</p>
                  <p className="text-xs text-zinc-500">Fidelity Joint Brokerage • Account ****5521</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">$85,000</p>
                  <p className="text-xs text-green-500">+$1,200 this month</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
                <div>
                  <p className="font-semibold text-white">Joint Savings Account</p>
                  <p className="text-xs text-zinc-500">Chase Joint Savings • Account ****8342</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">$45,000</p>
                  <p className="text-xs text-green-500">+$850 this month</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
                <div>
                  <p className="font-semibold text-white">Family Emergency Fund</p>
                  <p className="text-xs text-zinc-500">High-Yield Savings • Account ****2193</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">$35,000</p>
                  <p className="text-xs text-zinc-500">Target: $50,000</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
                <div>
                  <p className="font-semibold text-white">529 College Savings Plans</p>
                  <p className="text-xs text-zinc-500">Education savings for Emma & Lucas</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">$6,000</p>
                  <p className="text-xs text-zinc-400">Shared contributions</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Family Insights */}
        <div className="mt-8 p-6 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Family Financial Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-pink-400 mb-2">✓ Strong Combined Wealth</h4>
              <p className="text-sm text-zinc-300">
                The Johnson family has built a combined net worth of {formatCurrency(totalFamilyWealth)} with{' '}
                {formatCurrency(totalJointAssets)} in shared joint assets. Both adults maintain individual
                portfolios while contributing to family savings goals.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-pink-400 mb-2">✓ Future-Focused Planning</h4>
              <p className="text-sm text-zinc-300">
                Education funds for Emma and Lucas are growing steadily with dedicated 529 plans. The
                family emergency fund is 70% funded and on track to reach its $50,000 target within
                6 months.
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