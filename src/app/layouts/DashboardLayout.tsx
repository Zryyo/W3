import { Outlet, Link } from 'react-router';
import { Wallet, Brain } from 'lucide-react';
import { ProfileDropdown } from '../components/ProfileDropdown';

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Wallet className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Financial Dashboard</h1>
                <p className="text-sm text-zinc-400">Track and manage your wealth portfolio</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard/ai-advisor"
                className="flex items-center gap-2 px-4 py-2 bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/20 rounded-lg text-purple-400 hover:text-purple-300 transition-colors text-sm"
              >
                <Brain className="w-4 h-4" />
                <span className="hidden sm:inline">AI Advisor</span>
              </Link>
              <ProfileDropdown userType="individual" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <Outlet />

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-12 py-6">
        <div className="container mx-auto px-6 text-center text-sm text-zinc-500">
          <p>Last updated: March 7, 2026 • Data is for demonstration purposes only</p>
        </div>
      </footer>
    </div>
  );
}