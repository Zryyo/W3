import { useNavigate, Link } from 'react-router';
import { Users, Search, ArrowLeft, TrendingUp, TrendingDown, Eye, Lock } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import { ProfileDropdown } from '../components/ProfileDropdown';

export type PermissionLevel = 'full' | 'view-only' | 'limited';

interface ClientData {
  id: string;
  name: string;
  accountId: string;
  totalWealth: number;
  monthlyChange: number;
  monthlyChangePercent: number;
  wealthData: Array<{ name: string; value: number; color: string }>;
  permissions: PermissionLevel;
  allowedSectors?: string[];
}

export function AdvisorDashboard() {
  const navigate = useNavigate();

  // Mock client data
  const clients: ClientData[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      accountId: 'ACC-2024-8851',
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
      permissions: 'full',
    },
    {
      id: '2',
      name: 'Michael Chen',
      accountId: 'ACC-2024-7732',
      totalWealth: 1240000,
      monthlyChange: 18200,
      monthlyChangePercent: 1.47,
      wealthData: [
        { name: 'Savings', value: 155000, color: '#3b82f6' },
        { name: 'Bonds', value: 180000, color: '#8b5cf6' },
        { name: 'Stocks', value: 470000, color: '#10b981' },
        { name: 'Cryptocurrency', value: 110000, color: '#06b6d4' },
        { name: 'Investment Property', value: 250000, color: '#f59e0b' },
        { name: 'Joint Assets', value: 75000, color: '#ec4899' },
      ],
      permissions: 'view-only',
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      accountId: 'ACC-2024-6543',
      totalWealth: 625000,
      monthlyChange: -4500,
      monthlyChangePercent: -0.72,
      wealthData: [
        { name: 'Savings', value: 85000, color: '#3b82f6' },
        { name: 'Bonds', value: 152000, color: '#8b5cf6' },
        { name: 'Stocks', value: 170000, color: '#10b981' },
        { name: 'Cryptocurrency', value: 40000, color: '#06b6d4' },
        { name: 'Investment Property', value: 130000, color: '#f59e0b' },
        { name: 'Joint Assets', value: 48000, color: '#ec4899' },
      ],
      permissions: 'limited',
      allowedSectors: ['Savings', 'Bonds'],
    },
    {
      id: '4',
      name: 'David Martinez',
      accountId: 'ACC-2024-5421',
      totalWealth: 2100000,
      monthlyChange: 35000,
      monthlyChangePercent: 1.67,
      wealthData: [
        { name: 'Savings', value: 220000, color: '#3b82f6' },
        { name: 'Bonds', value: 350000, color: '#8b5cf6' },
        { name: 'Stocks', value: 830000, color: '#10b981' },
        { name: 'Cryptocurrency', value: 165000, color: '#06b6d4' },
        { name: 'Investment Property', value: 425000, color: '#f59e0b' },
        { name: 'Joint Assets', value: 110000, color: '#ec4899' },
      ],
      permissions: 'full',
    },
    {
      id: '5',
      name: 'Jennifer Thompson',
      accountId: 'ACC-2024-4312',
      totalWealth: 485000,
      monthlyChange: 8750,
      monthlyChangePercent: 1.80,
      wealthData: [
        { name: 'Savings', value: 65000, color: '#3b82f6' },
        { name: 'Bonds', value: 100000, color: '#8b5cf6' },
        { name: 'Stocks', value: 162000, color: '#10b981' },
        { name: 'Cryptocurrency', value: 38000, color: '#06b6d4' },
        { name: 'Investment Property', value: 85000, color: '#f59e0b' },
        { name: 'Joint Assets', value: 35000, color: '#ec4899' },
      ],
      permissions: 'full',
    },
    {
      id: '6',
      name: 'Robert Kim',
      accountId: 'ACC-2024-3201',
      totalWealth: 1580000,
      monthlyChange: 22100,
      monthlyChangePercent: 1.40,
      wealthData: [
        { name: 'Savings', value: 175000, color: '#3b82f6' },
        { name: 'Bonds', value: 330000, color: '#8b5cf6' },
        { name: 'Stocks', value: 565000, color: '#10b981' },
        { name: 'Cryptocurrency', value: 125000, color: '#06b6d4' },
        { name: 'Investment Property', value: 295000, color: '#f59e0b' },
        { name: 'Joint Assets', value: 90000, color: '#ec4899' },
      ],
      permissions: 'full',
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

  const handleClientClick = (clientId: string) => {
    navigate(`/advisor/client/${clientId}`);
  };

  const totalAUM = clients.reduce((sum, client) => sum + client.totalWealth, 0);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.accountId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPermissionLabel = (permission: PermissionLevel): { text: string; color: string; icon: any } => {
    switch (permission) {
      case 'full':
        return { text: 'Full Access', color: 'text-green-500', icon: Eye };
      case 'view-only':
        return { text: 'View Only - No Sector Drilldown', color: 'text-blue-500', icon: Eye };
      case 'limited':
        return { text: 'Limited Access', color: 'text-yellow-500', icon: Lock };
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Users className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Advisor Dashboard</h1>
                <p className="text-sm text-zinc-400">Manage your client portfolios</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Exit Advisor Mode</span>
              </Link>
              <ProfileDropdown userType="advisor" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-zinc-900 border-zinc-800">
            <p className="text-sm text-zinc-400 mb-1">Total Assets Under Management</p>
            <p className="text-3xl font-bold text-white">{formatCurrency(totalAUM)}</p>
            <p className="text-sm text-green-500 mt-2">+{formatCurrency(clients.reduce((sum, c) => sum + c.monthlyChange, 0))} this month</p>
          </Card>
          <Card className="p-6 bg-zinc-900 border-zinc-800">
            <p className="text-sm text-zinc-400 mb-1">Active Clients</p>
            <p className="text-3xl font-bold text-white">{clients.length}</p>
            <p className="text-sm text-zinc-400 mt-2">All accounts in good standing</p>
          </Card>
          <Card className="p-6 bg-zinc-900 border-zinc-800">
            <p className="text-sm text-zinc-400 mb-1">Average Portfolio Growth</p>
            <p className="text-3xl font-bold text-green-500">
              {(clients.reduce((sum, c) => sum + c.monthlyChangePercent, 0) / clients.length).toFixed(2)}%
            </p>
            <p className="text-sm text-zinc-400 mt-2">Monthly average</p>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <Input
              type="search"
              placeholder="Search clients by name or account ID..."
              className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Clients Grid */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Client Portfolios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client) => {
              const permissionInfo = getPermissionLabel(client.permissions);
              const PermissionIcon = permissionInfo.icon;
              
              return (
              <Card
                key={client.id}
                className="p-6 bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer group"
                onClick={() => handleClientClick(client.id)}
              >
                {/* Client Name */}
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {client.name}
                  </h3>
                  <p className="text-xs text-zinc-500 mb-2">{client.accountId}</p>
                  {/* Permission Badge */}
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-800/50 rounded-full ${permissionInfo.color}`}>
                    <PermissionIcon className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">{permissionInfo.text}</span>
                  </div>
                  {client.permissions === 'limited' && client.allowedSectors && (
                    <p className="text-xs text-zinc-500 mt-1">
                      Only: {client.allowedSectors.join(', ')}
                    </p>
                  )}
                </div>

                {/* Mini Pie Chart */}
                <div className="h-[180px] mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={client.wealthData}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {client.wealthData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Client Stats */}
                <div className="space-y-3 border-t border-zinc-800 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-400">Total Wealth</span>
                    <span className="font-semibold text-white">
                      {formatCurrency(client.totalWealth)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-400">Monthly Change</span>
                    <span
                      className={`flex items-center gap-1 font-semibold ${
                        client.monthlyChange >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {client.monthlyChange >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {Math.abs(client.monthlyChangePercent).toFixed(2)}%
                    </span>
                  </div>
                </div>

                {/* Click Indicator */}
                <div className="mt-4 text-center">
                  <span className="text-xs text-zinc-500 group-hover:text-blue-400 transition-colors">
                    Click to view full dashboard →
                  </span>
                </div>
              </Card>
            );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-12 py-6">
        <div className="container mx-auto px-6 text-center text-sm text-zinc-500">
          <p>Advisor ID: ADV-2024-1523 • Session expires in 58 minutes</p>
        </div>
      </footer>
    </div>
  );
}