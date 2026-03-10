import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Shield, User, Calendar, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

export function AdvisorAuthorization() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAuthorize = async () => {
    setIsProcessing(true);
    // Simulate authorization check
    setTimeout(() => {
      // Randomly approve or deny for demo (80% approval rate)
      const isApproved = Math.random() > 0.2;
      navigate(isApproved ? '/advisor/success' : '/advisor/denied');
    }, 2000);
  };

  const handleCancel = () => {
    navigate('/advisor');
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-yellow-500/10 rounded-2xl mb-4">
            <Shield className="w-12 h-12 text-yellow-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Authorization Required</h1>
          <p className="text-zinc-400">
            Please review and confirm client access permissions
          </p>
        </div>

        {/* Authorization Details */}
        <Card className="p-8 bg-zinc-900 border-zinc-800 mb-6">
          <div className="space-y-6">
            {/* Client Information */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Client Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-zinc-800/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-blue-400" />
                    <span className="text-xs text-zinc-400">Client Name</span>
                  </div>
                  <p className="font-semibold text-white">Sarah Johnson</p>
                </div>
                <div className="p-4 bg-zinc-800/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span className="text-xs text-zinc-400">Account ID</span>
                  </div>
                  <p className="font-semibold text-white">ACC-2024-8851</p>
                </div>
              </div>
            </div>

            {/* Access Details */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Access Details</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-lg">
                  <span className="text-zinc-300">View Financial Dashboard</span>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-lg">
                  <span className="text-zinc-300">View Transaction History</span>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-lg">
                  <span className="text-zinc-300">View Investment Portfolio</span>
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <div className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-lg">
                  <span className="text-zinc-300">Make Trades or Transfers</span>
                  <XCircle className="w-5 h-5 text-red-500" />
                </div>
                <div className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-lg">
                  <span className="text-zinc-300">Modify Account Settings</span>
                  <XCircle className="w-5 h-5 text-red-500" />
                </div>
              </div>
            </div>

            {/* Session Info */}
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-400 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-1">Session Duration</h4>
                  <p className="text-sm text-zinc-300">
                    This read-only access will expire in 60 minutes. All activities are logged and
                    monitored for security compliance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Privacy Notice */}
        <div className="mb-6 p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg mt-0.5">
              <Shield className="w-4 h-4 text-purple-500" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-white mb-1">Privacy Protected</h4>
              <p className="text-xs text-zinc-400">
                Client data is encrypted end-to-end. This session is FINRA compliant and all access
                is recorded for audit purposes. The client has granted temporary viewing permissions.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleCancel}
            variant="outline"
            className="flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            disabled={isProcessing}
          >
            Cancel Access
          </Button>
          <Button
            onClick={handleAuthorize}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Authorizing...
              </span>
            ) : (
              'Confirm & Access Dashboard'
            )}
          </Button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-zinc-500 mt-6">
          By confirming, you acknowledge compliance with SEC and FINRA regulations
        </p>
      </div>
    </div>
  );
}

function RefreshCw({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 2v6h-6" />
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M3 22v-6h6" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    </svg>
  );
}
