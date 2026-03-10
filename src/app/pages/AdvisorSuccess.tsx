import { useNavigate } from 'react-router';
import { CheckCircle2, ArrowRight, Shield } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

export function AdvisorSuccess() {
  const navigate = useNavigate();

  const handleViewDashboard = () => {
    navigate('/advisor/dashboard');
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-green-500/10 rounded-2xl mb-4 animate-pulse">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Access Granted</h1>
          <p className="text-zinc-400">
            You've been successfully authorized to view client dashboards
          </p>
        </div>

        {/* Success Details */}
        <Card className="p-8 bg-zinc-900 border-zinc-800 mb-6">
          <div className="space-y-6">
            {/* Session Info */}
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-1">Authentication Successful</h4>
                  <p className="text-sm text-zinc-300">
                    All security checks passed. You can now access your assigned client portfolios.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Security Notice */}
        <div className="mb-6 p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg mt-0.5">
              <Shield className="w-4 h-4 text-blue-500" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-white mb-1">Security & Compliance</h4>
              <ul className="text-xs text-zinc-400 space-y-1">
                <li>• All viewing activity is logged and monitored</li>
                <li>• Session is encrypted with TLS 1.3</li>
                <li>• Clients receive notification of access</li>
                <li>• Compliant with SEC Rule 17a-4 and FINRA regulations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={handleViewDashboard}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6"
        >
          <span className="flex items-center justify-center gap-2">
            View Client Dashboard
            <ArrowRight className="w-5 h-5" />
          </span>
        </Button>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-zinc-500">
            Session started: {new Date().toLocaleString()} • Advisor ID: ADV-2024-1523
          </p>
        </div>
      </div>
    </div>
  );
}