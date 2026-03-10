import { useNavigate } from 'react-router';
import { XCircle, AlertTriangle, Shield, Mail, ArrowLeft } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

export function AdvisorDenied() {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate('/advisor');
  };

  const handleSupport = () => {
    // Open support contact
    window.location.href = 'mailto:compliance@financialservices.com';
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Denied Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-red-500/10 rounded-2xl mb-4">
            <XCircle className="w-16 h-16 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-zinc-400">
            Unable to authorize client dashboard access at this time
          </p>
        </div>

        {/* Denial Details */}
        <Card className="p-8 bg-zinc-900 border-zinc-800 mb-6">
          <div className="space-y-6">
            {/* Error Message */}
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-1">Authorization Failed</h4>
                  <p className="text-sm text-zinc-300">
                    Your request to access this client's dashboard could not be completed due to
                    one or more authorization requirements not being met.
                  </p>
                </div>
              </div>
            </div>

            {/* Possible Reasons */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Possible Reasons</h3>
              <div className="space-y-3">
                <div className="p-3 bg-zinc-800/30 rounded-lg">
                  <h4 className="font-medium text-white mb-1">Insufficient Permissions</h4>
                  <p className="text-sm text-zinc-400">
                    Your advisor account may not have the required permissions to access this
                    client's information.
                  </p>
                </div>
                <div className="p-3 bg-zinc-800/30 rounded-lg">
                  <h4 className="font-medium text-white mb-1">Client Authorization Expired</h4>
                  <p className="text-sm text-zinc-400">
                    The client's authorization for advisor access may have expired or been revoked.
                  </p>
                </div>
                <div className="p-3 bg-zinc-800/30 rounded-lg">
                  <h4 className="font-medium text-white mb-1">Compliance Review Required</h4>
                  <p className="text-sm text-zinc-400">
                    This account may be flagged for compliance review, requiring additional
                    verification steps.
                  </p>
                </div>
                <div className="p-3 bg-zinc-800/30 rounded-lg">
                  <h4 className="font-medium text-white mb-1">Session Security Issue</h4>
                  <p className="text-sm text-zinc-400">
                    Your session may have security anomalies that prevented authorization.
                  </p>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Next Steps</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm text-zinc-300">
                  <span className="text-blue-400 font-semibold mt-0.5">1.</span>
                  <span>Verify that you have active authorization from the client</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-zinc-300">
                  <span className="text-blue-400 font-semibold mt-0.5">2.</span>
                  <span>Check that your advisor credentials are up to date</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-zinc-300">
                  <span className="text-blue-400 font-semibold mt-0.5">3.</span>
                  <span>Contact compliance if you believe this is an error</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-zinc-300">
                  <span className="text-blue-400 font-semibold mt-0.5">4.</span>
                  <span>Request the client to re-authorize advisor access</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Compliance Notice */}
        <div className="mb-6 p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-yellow-500/10 rounded-lg mt-0.5">
              <Shield className="w-4 h-4 text-yellow-500" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-white mb-1">Security & Privacy</h4>
              <p className="text-xs text-zinc-400">
                This denial has been logged for security purposes. Repeated failed authorization
                attempts may trigger a compliance review. All access attempts are monitored in
                accordance with SEC and FINRA regulations.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              onClick={handleRetry}
              variant="outline"
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button
              onClick={handleSupport}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Compliance
            </Button>
          </div>

          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            className="w-full text-zinc-400 hover:text-white"
          >
            Return to Main Dashboard
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-zinc-500">
            Incident ID: INC-{Math.random().toString(36).substring(2, 9).toUpperCase()} •{' '}
            {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
