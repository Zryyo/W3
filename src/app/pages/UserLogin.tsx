import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Wallet, Eye, EyeOff, Loader2, CheckCircle2, AlertCircle, Lock, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';

type LoginState = 'default' | 'filled' | 'invalid' | 'loading' | 'success';

export function UserLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginState, setLoginState] = useState<LoginState>('default');
  const [errorMessage, setErrorMessage] = useState('');

  // Form validation
  const isEmailValid = email.length > 0 && email.includes('@');
  const isPasswordValid = password.length >= 6;
  const isFormValid = isEmailValid && isPasswordValid;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      setLoginState('invalid');
      setErrorMessage('Please enter a valid email and password (min 6 characters)');
      return;
    }

    setLoginState('loading');
    setErrorMessage('');

    // Simulate API call
    setTimeout(() => {
      // Mock validation - check for demo credentials
      if (email === 'demo@financialwallet.com' && password === 'demo123') {
        setLoginState('success');
        // Navigate to dashboard after success animation
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setLoginState('invalid');
        setErrorMessage('Invalid email or password. Please try again.');
      }
    }, 1500);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (loginState === 'invalid') {
      setLoginState(value && password ? 'filled' : 'default');
      setErrorMessage('');
    } else {
      setLoginState(value && password ? 'filled' : 'default');
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (loginState === 'invalid') {
      setLoginState(email && value ? 'filled' : 'default');
      setErrorMessage('');
    } else {
      setLoginState(email && value ? 'filled' : 'default');
    }
  };

  const getInputBorderClass = (field: 'email' | 'password') => {
    if (loginState === 'invalid') {
      return 'border-red-500 focus:ring-red-500';
    }
    if (loginState === 'success') {
      return 'border-green-500 focus:ring-green-500';
    }
    if (field === 'email' && email) {
      return 'border-blue-500/50 focus:ring-blue-500';
    }
    if (field === 'password' && password) {
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

      <div className="relative w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-blue-500/10 rounded-2xl mb-4">
            <Wallet className="w-12 h-12 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Financial Wallet</h1>
          <p className="text-zinc-400">Sign in to manage your portfolio</p>
        </div>

        {/* Login Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-zinc-500" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  disabled={loginState === 'loading' || loginState === 'success'}
                  placeholder="Enter your email"
                  className={`w-full pl-12 pr-4 py-3 bg-zinc-800 border ${getInputBorderClass(
                    'email'
                  )} rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                  autoComplete="email"
                />
                {loginState === 'success' && email && (
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                )}
                {loginState === 'invalid' && email && (
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  </div>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-zinc-500" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  disabled={loginState === 'loading' || loginState === 'success'}
                  placeholder="Enter your password"
                  className={`w-full pl-12 pr-12 py-3 bg-zinc-800 border ${getInputBorderClass(
                    'password'
                  )} rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loginState === 'loading' || loginState === 'success'}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors disabled:opacity-50"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {loginState === 'invalid' && errorMessage && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-red-300 mb-1">Authentication Failed</h4>
                    <p className="text-sm text-red-400">{errorMessage}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Success Message */}
            {loginState === 'success' && (
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
              disabled={loginState === 'loading' || loginState === 'success'}
              className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loginState === 'loading' && (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Authenticating...</span>
                </>
              )}
              {loginState === 'success' && (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Success!</span>
                </>
              )}
              {loginState !== 'loading' && loginState !== 'success' && <span>Log In</span>}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-zinc-900 text-zinc-500">or</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-zinc-400">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => console.log('Sign up clicked')}
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-zinc-500 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-zinc-300 mb-1">Secure Login</h4>
              <p className="text-xs text-zinc-500">
                Your connection is encrypted and your data is protected. We use industry-standard security measures to keep your financial information safe.
              </p>
            </div>
          </div>
        </div>

        {/* Demo Credentials Helper */}
        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-xs text-blue-300 text-center">
            <strong>Demo:</strong> email: demo@financialwallet.com | password: demo123
          </p>
        </div>
      </div>
    </div>
  );
}
