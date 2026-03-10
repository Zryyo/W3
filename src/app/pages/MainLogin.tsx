import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Wallet, Eye, EyeOff, Loader2, CheckCircle2, AlertCircle, Lock, Mail, User, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';

type LoginType = 'individual' | 'advisor';
type LoginState = 'default' | 'filled' | 'invalid' | 'loading' | 'success';

export function MainLogin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<LoginType>('individual');

  // Individual login state
  const [individualEmail, setIndividualEmail] = useState('');
  const [individualPassword, setIndividualPassword] = useState('');
  const [showIndividualPassword, setShowIndividualPassword] = useState(false);
  const [individualState, setIndividualState] = useState<LoginState>('default');
  const [individualError, setIndividualError] = useState('');

  // Advisor login state
  const [advisorEmail, setAdvisorEmail] = useState('');
  const [advisorPassword, setAdvisorPassword] = useState('');
  const [showAdvisorPassword, setShowAdvisorPassword] = useState(false);
  const [advisorState, setAdvisorState] = useState<LoginState>('default');
  const [advisorError, setAdvisorError] = useState('');
  const [show2FA, setShow2FA] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');

  // Individual login validation
  const isIndividualEmailValid = individualEmail.length > 0 && individualEmail.includes('@');
  const isIndividualPasswordValid = individualPassword.length >= 6;
  const isIndividualFormValid = isIndividualEmailValid && isIndividualPasswordValid;

  // Advisor login validation
  const isAdvisorEmailValid = advisorEmail.length > 0 && advisorEmail.includes('@');
  const isAdvisorPasswordValid = advisorPassword.length >= 6;
  const isAdvisorFormValid = isAdvisorEmailValid && isAdvisorPasswordValid;

  const handleIndividualLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isIndividualFormValid) {
      setIndividualState('invalid');
      setIndividualError('Please enter a valid email and password (min 6 characters)');
      return;
    }

    setIndividualState('loading');
    setIndividualError('');

    // Simulate API call
    setTimeout(() => {
      // Mock validation - check for demo credentials
      if (individualEmail === 'user@financialwallet.com' && individualPassword === 'user123') {
        setIndividualState('success');
        // Navigate to individual dashboard after success animation
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setIndividualState('invalid');
        setIndividualError('Invalid email or password. Please try again.');
      }
    }, 1500);
  };

  const handleAdvisorLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAdvisorFormValid) {
      setAdvisorState('invalid');
      setAdvisorError('Please enter a valid email and password (min 6 characters)');
      return;
    }

    setAdvisorState('loading');
    setAdvisorError('');

    // Simulate API call
    setTimeout(() => {
      // Mock validation - check for demo credentials
      if (advisorEmail === 'advisor@financialwallet.com' && advisorPassword === 'advisor123') {
        // Credentials valid, proceed to 2FA
        setAdvisorState('default');
        setShow2FA(true);
      } else {
        setAdvisorState('invalid');
        setAdvisorError('Invalid advisor credentials. Please try again.');
      }
    }, 1500);
  };

  const handleAdvisorVerify2FA = async (e: React.FormEvent) => {
    e.preventDefault();

    if (twoFactorCode.length !== 6) {
      setAdvisorState('invalid');
      setAdvisorError('Please enter a valid 6-digit code');
      return;
    }

    setAdvisorState('loading');
    setAdvisorError('');

    // Simulate 2FA verification
    setTimeout(() => {
      // Mock 2FA code validation (demo code: 123456)
      if (twoFactorCode === '123456') {
        setAdvisorState('success');
        // Navigate to advisor dashboard after success animation
        setTimeout(() => {
          navigate('/advisor/dashboard');
        }, 1500);
      } else {
        setAdvisorState('invalid');
        setAdvisorError('Invalid verification code. Please try again.');
      }
    }, 1500);
  };

  const handleBack2FA = () => {
    setShow2FA(false);
    setTwoFactorCode('');
    setAdvisorState('default');
    setAdvisorError('');
  };

  const handleIndividualEmailChange = (value: string) => {
    setIndividualEmail(value);
    if (individualState === 'invalid') {
      setIndividualState(value && individualPassword ? 'filled' : 'default');
      setIndividualError('');
    } else {
      setIndividualState(value && individualPassword ? 'filled' : 'default');
    }
  };

  const handleIndividualPasswordChange = (value: string) => {
    setIndividualPassword(value);
    if (individualState === 'invalid') {
      setIndividualState(individualEmail && value ? 'filled' : 'default');
      setIndividualError('');
    } else {
      setIndividualState(individualEmail && value ? 'filled' : 'default');
    }
  };

  const handleAdvisorEmailChange = (value: string) => {
    setAdvisorEmail(value);
    if (advisorState === 'invalid') {
      setAdvisorState(value && advisorPassword ? 'filled' : 'default');
      setAdvisorError('');
    } else {
      setAdvisorState(value && advisorPassword ? 'filled' : 'default');
    }
  };

  const handleAdvisorPasswordChange = (value: string) => {
    setAdvisorPassword(value);
    if (advisorState === 'invalid') {
      setAdvisorState(advisorEmail && value ? 'filled' : 'default');
      setAdvisorError('');
    } else {
      setAdvisorState(advisorEmail && value ? 'filled' : 'default');
    }
  };

  const getInputBorderClass = (state: LoginState, hasValue: boolean) => {
    if (state === 'invalid') {
      return 'border-red-500 focus:ring-red-500';
    }
    if (state === 'success') {
      return 'border-green-500 focus:ring-green-500';
    }
    if (hasValue) {
      return 'border-blue-500/50 focus:ring-blue-500';
    }
    return 'border-zinc-700 focus:ring-purple-500';
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-blue-500/10 rounded-2xl mb-4">
            <Wallet className="w-12 h-12 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Financial Wallet</h1>
          <p className="text-zinc-400">Sign in to access your account</p>
        </div>

        {/* Login Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-zinc-800">
            <button
              onClick={() => setActiveTab('individual')}
              className={`flex-1 px-6 py-4 text-sm font-semibold transition-all relative ${
                activeTab === 'individual'
                  ? 'text-blue-400 bg-zinc-800/50'
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/30'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <User className="w-4 h-4" />
                <span>Individual Login</span>
              </div>
              {activeTab === 'individual' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('advisor')}
              className={`flex-1 px-6 py-4 text-sm font-semibold transition-all relative ${
                activeTab === 'advisor'
                  ? 'text-purple-400 bg-zinc-800/50'
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/30'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Advisor Login</span>
              </div>
              {activeTab === 'advisor' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500" />
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* Individual Login Form */}
            {activeTab === 'individual' && (
              <form onSubmit={handleIndividualLogin} className="space-y-6">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-white mb-1">Welcome Back</h2>
                  <p className="text-sm text-zinc-400">
                    Sign in to view and manage your portfolio
                  </p>
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="individual-email" className="block text-sm font-medium text-zinc-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="w-5 h-5 text-zinc-500" />
                    </div>
                    <input
                      type="email"
                      id="individual-email"
                      value={individualEmail}
                      onChange={(e) => handleIndividualEmailChange(e.target.value)}
                      disabled={individualState === 'loading' || individualState === 'success'}
                      placeholder="Enter your email"
                      className={`w-full pl-12 pr-4 py-3 bg-zinc-800 border ${getInputBorderClass(
                        individualState,
                        !!individualEmail
                      )} rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                      autoComplete="email"
                    />
                    {individualState === 'success' && individualEmail && (
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      </div>
                    )}
                    {individualState === 'invalid' && individualEmail && (
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="individual-password" className="block text-sm font-medium text-zinc-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-zinc-500" />
                    </div>
                    <input
                      type={showIndividualPassword ? 'text' : 'password'}
                      id="individual-password"
                      value={individualPassword}
                      onChange={(e) => handleIndividualPasswordChange(e.target.value)}
                      disabled={individualState === 'loading' || individualState === 'success'}
                      placeholder="Enter your password"
                      className={`w-full pl-12 pr-12 py-3 bg-zinc-800 border ${getInputBorderClass(
                        individualState,
                        !!individualPassword
                      )} rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowIndividualPassword(!showIndividualPassword)}
                      disabled={individualState === 'loading' || individualState === 'success'}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors disabled:opacity-50"
                    >
                      {showIndividualPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {individualState === 'invalid' && individualError && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-red-300 mb-1">Authentication Failed</h4>
                        <p className="text-sm text-red-400">{individualError}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Success Message */}
                {individualState === 'success' && (
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-green-300 mb-1">Login Successful</h4>
                        <p className="text-sm text-green-400">Redirecting to your dashboard...</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Forgot Password Link */}
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => console.log('Forgot password clicked')}
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  disabled={individualState === 'loading' || individualState === 'success'}
                  className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {individualState === 'loading' && (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  )}
                  {individualState === 'success' && (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Success!</span>
                    </>
                  )}
                  {individualState !== 'loading' && individualState !== 'success' && <span>Log In</span>}
                </Button>

                {/* Demo Credentials */}
                <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-xs text-blue-300 text-center">
                    <strong>Demo:</strong> user@financialwallet.com | user123
                  </p>
                </div>
              </form>
            )}

            {/* Advisor Login Form */}
            {activeTab === 'advisor' && !show2FA && (
              <form onSubmit={handleAdvisorLogin} className="space-y-6">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-white mb-1">Advisor Access</h2>
                  <p className="text-sm text-zinc-400">
                    Sign in to access client portfolios
                  </p>
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="advisor-email" className="block text-sm font-medium text-zinc-300 mb-2">
                    Advisor Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="w-5 h-5 text-zinc-500" />
                    </div>
                    <input
                      type="email"
                      id="advisor-email"
                      value={advisorEmail}
                      onChange={(e) => handleAdvisorEmailChange(e.target.value)}
                      disabled={advisorState === 'loading' || advisorState === 'success'}
                      placeholder="Enter your advisor email"
                      className={`w-full pl-12 pr-4 py-3 bg-zinc-800 border ${getInputBorderClass(
                        advisorState,
                        !!advisorEmail
                      )} rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                      autoComplete="email"
                    />
                    {advisorState === 'success' && advisorEmail && (
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      </div>
                    )}
                    {advisorState === 'invalid' && advisorEmail && (
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="advisor-password" className="block text-sm font-medium text-zinc-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-zinc-500" />
                    </div>
                    <input
                      type={showAdvisorPassword ? 'text' : 'password'}
                      id="advisor-password"
                      value={advisorPassword}
                      onChange={(e) => handleAdvisorPasswordChange(e.target.value)}
                      disabled={advisorState === 'loading' || advisorState === 'success'}
                      placeholder="Enter your password"
                      className={`w-full pl-12 pr-12 py-3 bg-zinc-800 border ${getInputBorderClass(
                        advisorState,
                        !!advisorPassword
                      )} rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowAdvisorPassword(!showAdvisorPassword)}
                      disabled={advisorState === 'loading' || advisorState === 'success'}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors disabled:opacity-50"
                    >
                      {showAdvisorPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {advisorState === 'invalid' && advisorError && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-red-300 mb-1">Authentication Failed</h4>
                        <p className="text-sm text-red-400">{advisorError}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Success Message */}
                {advisorState === 'success' && (
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-green-300 mb-1">Login Successful</h4>
                        <p className="text-sm text-green-400">Redirecting to advisor dashboard...</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Advisor Info */}
                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-purple-400 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-purple-300 mb-1">Secure Advisor Portal</h4>
                      <p className="text-xs text-purple-400">
                        Two-factor authentication required for client access
                      </p>
                    </div>
                  </div>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  disabled={advisorState === 'loading' || advisorState === 'success'}
                  className="w-full py-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {advisorState === 'loading' && (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Authenticating...</span>
                    </>
                  )}
                  {advisorState === 'success' && (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Success!</span>
                    </>
                  )}
                  {advisorState !== 'loading' && advisorState !== 'success' && <span>Log In as Advisor</span>}
                </Button>

                {/* Demo Credentials */}
                <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <p className="text-xs text-purple-300 text-center">
                    <strong>Demo:</strong> advisor@financialwallet.com | advisor123
                  </p>
                </div>
              </form>
            )}

            {/* 2FA Verification Form */}
            {show2FA && (
              <form onSubmit={handleAdvisorVerify2FA} className="space-y-6">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-white mb-1">Two-Factor Authentication</h2>
                  <p className="text-sm text-zinc-400">
                    Enter the 6-digit code sent to your email
                  </p>
                </div>

                {/* 2FA Code Field */}
                <div>
                  <label htmlFor="two-factor-code" className="block text-sm font-medium text-zinc-300 mb-2">
                    Verification Code
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-zinc-500" />
                    </div>
                    <input
                      type="text"
                      id="two-factor-code"
                      value={twoFactorCode}
                      onChange={(e) => setTwoFactorCode(e.target.value)}
                      disabled={advisorState === 'loading' || advisorState === 'success'}
                      placeholder="Enter 6-digit code"
                      className={`w-full pl-12 pr-4 py-3 bg-zinc-800 border ${getInputBorderClass(
                        advisorState,
                        !!twoFactorCode
                      )} rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                      autoComplete="off"
                    />
                    {advisorState === 'success' && twoFactorCode && (
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      </div>
                    )}
                    {advisorState === 'invalid' && twoFactorCode && (
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Error Message */}
                {advisorState === 'invalid' && advisorError && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-red-300 mb-1">Authentication Failed</h4>
                        <p className="text-sm text-red-400">{advisorError}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Success Message */}
                {advisorState === 'success' && (
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-green-300 mb-1">Login Successful</h4>
                        <p className="text-sm text-green-400">Redirecting to advisor dashboard...</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Back Button */}
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    onClick={handleBack2FA}
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Back to Login
                  </button>
                </div>

                {/* Verify Button */}
                <Button
                  type="submit"
                  disabled={advisorState === 'loading' || advisorState === 'success'}
                  className="w-full py-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {advisorState === 'loading' && (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  )}
                  {advisorState === 'success' && (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Success!</span>
                    </>
                  )}
                  {advisorState !== 'loading' && advisorState !== 'success' && <span>Verify</span>}
                </Button>

                {/* Demo 2FA Code */}
                <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <p className="text-xs text-purple-300 text-center">
                    <strong>Demo Code:</strong> 123456
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-zinc-500 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-zinc-300 mb-1">Secure Connection</h4>
              <p className="text-xs text-zinc-500">
                Your connection is encrypted and your data is protected with industry-standard security measures.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}