import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Shield, Smartphone, ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../components/ui/input-otp';

export function AdvisorVerification() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleVerify = async () => {
    if (code.length === 6) {
      setIsLoading(true);
      // Simulate verification with specific codes
      setTimeout(() => {
        if (code === '123456') {
          // Access Granted
          navigate('/advisor/success');
        } else if (code === '000000') {
          // Access Denied
          navigate('/advisor/denied');
        } else {
          // Invalid code - stay on page
          setIsLoading(false);
          setCode('');
        }
      }, 1500);
    }
  };

  const handleResend = () => {
    setTimeLeft(60);
    setCanResend(false);
    setCode('');
    // Simulate resending code
  };

  useEffect(() => {
    if (code.length === 6) {
      handleVerify();
    }
  }, [code]);

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={() => navigate('/advisor')}
          className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to login</span>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-green-500/10 rounded-2xl mb-4">
            <Smartphone className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Two-Factor Authentication</h1>
          <p className="text-zinc-400">
            Enter the 6-digit code sent to your authenticator app
          </p>
        </div>

        {/* Verification Card */}
        <Card className="p-8 bg-zinc-900 border-zinc-800">
          <div className="space-y-6">
            {/* Code Input */}
            <div className="space-y-4">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={code}
                  onChange={setCode}
                  disabled={isLoading}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="bg-zinc-800 border-zinc-700 text-white" />
                    <InputOTPSlot index={1} className="bg-zinc-800 border-zinc-700 text-white" />
                    <InputOTPSlot index={2} className="bg-zinc-800 border-zinc-700 text-white" />
                    <InputOTPSlot index={3} className="bg-zinc-800 border-zinc-700 text-white" />
                    <InputOTPSlot index={4} className="bg-zinc-800 border-zinc-700 text-white" />
                    <InputOTPSlot index={5} className="bg-zinc-800 border-zinc-700 text-white" />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {isLoading && (
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 text-sm text-blue-400">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Verifying code...
                  </div>
                </div>
              )}
            </div>

            {/* Info Message */}
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-white mb-2">Verification Required</h4>
                  <p className="text-xs text-zinc-300">
                    Enter the 6-digit code sent to your registered email or mobile device to access client dashboard.
                  </p>
                </div>
              </div>
            </div>

            {/* Resend Code */}
            <div className="text-center">
              {canResend ? (
                <button
                  onClick={handleResend}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  Resend code
                </button>
              ) : (
                <p className="text-sm text-zinc-500">
                  Resend code in {timeLeft}s
                </p>
              )}
            </div>

            {/* Manual Verify Button (fallback) */}
            <Button
              onClick={handleVerify}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={code.length !== 6 || isLoading}
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </Button>
          </div>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg mt-0.5">
              <Shield className="w-4 h-4 text-blue-500" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-white mb-1">Why 2FA?</h4>
              <p className="text-xs text-zinc-400">
                Two-factor authentication adds an extra layer of security to protect sensitive
                client financial data. This ensures only authorized advisors can access accounts.
              </p>
            </div>
          </div>
        </div>

        {/* Alternative Methods */}
        <div className="mt-4 text-center">
          <button className="text-xs text-zinc-500 hover:text-zinc-400">
            Use SMS code instead
          </button>
        </div>
      </div>
    </div>
  );
}