import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Briefcase } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

const ForgotPasswordForm: React.FC = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  const validateEmail = (email: string) => {
    if (!email) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      setTouched(true);
      return;
    }

    setIsSubmitting(true);
    setError('');
    
    try {
      const { error } = await resetPassword(email);
      
      if (error) {
        if (error.message.includes('User not found')) {
          setError('No account found with this email address.');
        } else {
          setError('An error occurred. Please try again.');
        }
      } else {
        setEmailSent(true);
        toast.success('Password reset email sent! Check your inbox.');
      }
    } catch (error) {
      console.error('Password reset error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    if (touched) {
      setError(validateEmail(value));
    }
  };

  const handleBlur = () => {
    setTouched(true);
    setError(validateEmail(email));
  };

  const getFieldStatus = () => {
    if (!touched) return 'default';
    if (error) return 'error';
    if (email) return 'success';
    return 'default';
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          {/* Success State */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="px-8 py-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Check your email</h1>
              <p className="text-gray-600 mb-2">
                We've sent a password reset link to
              </p>
              <p className="text-blue-600 font-semibold mb-6">{email}</p>
              
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Didn't receive the email?</strong>
                  <br />
                  Check your spam folder or wait a few minutes for the email to arrive.
                </p>
              </div>
              
              <button
                onClick={() => setEmailSent(false)}
                className="w-full mb-4 py-3 px-4 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors font-medium"
              >
                Try different email
              </button>
              
              <Link
                to="/login"
                className="inline-flex items-center text-blue-600 hover:text-blue-500 font-medium transition-colors focus:outline-none focus:underline"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg">
              <Briefcase className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset your password</h1>
          <p className="text-gray-600">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className={`h-5 w-5 transition-colors ${
                      getFieldStatus() === 'error' ? 'text-red-400' :
                      getFieldStatus() === 'success' ? 'text-green-400' : 'text-gray-400'
                    }`} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={`block w-full pl-12 pr-12 py-4 text-gray-900 placeholder-gray-500 border rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${
                      getFieldStatus() === 'error' 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50' 
                        : getFieldStatus() === 'success'
                        ? 'border-green-300 focus:border-green-500 focus:ring-green-500 bg-green-50'
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white hover:border-gray-400'
                    }`}
                    placeholder="Enter your email address"
                    value={email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-describedby={error ? 'email-error' : undefined}
                    aria-invalid={!!error}
                  />
                  {getFieldStatus() === 'success' && (
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                  {getFieldStatus() === 'error' && (
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                  )}
                </div>
                {error && touched && (
                  <p id="email-error" className="text-sm text-red-600 flex items-center mt-1" role="alert">
                    <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
                    {error}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex justify-center items-center py-4 px-4 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Sending reset link...
                  </>
                ) : (
                  'Send reset link'
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
            <div className="text-center">
              <Link
                to="/login"
                className="inline-flex items-center text-blue-600 hover:text-blue-500 font-medium transition-colors focus:outline-none focus:underline"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to sign in
              </Link>
            </div>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Having trouble? Contact our{' '}
            <a href="#" className="text-blue-600 hover:text-blue-500 underline">
              support team
            </a>{' '}
            for assistance
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;