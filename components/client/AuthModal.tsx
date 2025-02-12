'use client';
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { Mail } from 'lucide-react';
import { FaGoogle, FaGithub } from "react-icons/fa";
import { SpotlightCard } from '../ui/SpotlightCard';
import { AuthError } from '@supabase/supabase-js';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';

interface AuthModalProps {
  show: boolean;
  initialMode?: 'login' | 'signup';
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ show, initialMode = 'login', onClose }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [captchaToken, setCaptchaToken] = useState<string>('');
  const turnstileRef = useRef<TurnstileInstance | undefined>(undefined);

  const formatErrorMessage = (error: AuthError | Error) => {
    // Common Supabase auth error messages
    const errorMap: Record<string, string> = {
      'Failed captcha': 'CAPTCHA verification failed. Please try again.',
      'Invalid captcha': 'CAPTCHA verification failed. Please refresh the page and try again.',
      'Rate limiter': 'Too many attempts. Please wait a moment before trying again.',
      'Invalid login credentials': 'Invalid email or password.',
      'User already registered': 'An account with this email already exists.',
    };

    const message = error?.message || 'An unexpected error occurred';
    return errorMap[message] || message;
  };

  const resetCaptcha = () => {
    turnstileRef.current?.reset();
    setCaptchaToken('');
  };

  const handleEmailAuth = async () => {
    try {
      setErrorMsg('');
      
      if (!email || !password) {
        setErrorMsg('Please fill in all fields');
        return;
      }

      if (!captchaToken) {
        setErrorMsg('Please complete the CAPTCHA verification');
        return;
      }

      let res;
      const authOptions = {
        email,
        password,
        options: {
          captchaToken
        }
      };

      if (mode === 'login') {
        res = await supabase.auth.signInWithPassword(authOptions);
      } else {
        res = await supabase.auth.signUp(authOptions);
      }

      if (res.error) {
        // Reset CAPTCHA if there's an invalid token error
        if (res.error.message.toLowerCase().includes('captcha') || 
            res.error.message.includes('request disallowed')) {
          resetCaptcha();
        }
        setErrorMsg(formatErrorMessage(res.error));
      } else {
        // For sign up, check if confirmation is required
        if (mode === 'signup' && res.data?.user?.identities?.length === 0) {
          setErrorMsg('Please check your email for the confirmation link.');
        } else {
          onClose(); // success
        }
      }
    } catch (error) {
      resetCaptcha();
      setErrorMsg(formatErrorMessage(error instanceof Error ? error : new Error('An unexpected error occurred')));
    }
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    try {
      setErrorMsg('');
      
      if (!captchaToken) {
        setErrorMsg('Please complete the CAPTCHA verification');
        return;
      }

      const { error } = await supabase.auth.signInWithOAuth({ 
        provider,
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            captchaToken // Pass the token as a query parameter
          }
        }
      });
      
      if (error) {
        // Reset CAPTCHA if there's an invalid token error
        if (error.message.toLowerCase().includes('captcha') || 
            error.message.includes('request disallowed')) {
          resetCaptcha();
        }
        setErrorMsg(formatErrorMessage(error));
      }
    } catch (error) {
      resetCaptcha();
      setErrorMsg(formatErrorMessage(error instanceof Error ? error : new Error('An unexpected error occurred')));
    }
  };

  if (!show) return null;
  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
    >
      <motion.div 
        onClick={e => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-md"
      >
        <SpotlightCard spotlightColor="rgba(99, 102, 241, 0.2)" className="p-8">
          {/* Toggle Header */}
          <div className="flex justify-center mb-6">
            <button 
              onClick={() => setMode('login')}
              className={`px-6 py-2 rounded-l-full ${mode === 'login' 
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' 
                : 'text-gray-400 hover:text-gray-300'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setMode('signup')}
              className={`px-6 py-2 rounded-r-full ${mode === 'signup' 
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' 
                : 'text-gray-400 hover:text-gray-300'}`}
            >
              Sign Up
            </button>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {errorMsg}
            </div>
          )}

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
            />

            <div className="flex justify-center my-4">
              <Turnstile
                ref={turnstileRef}
                siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY || ''}
                onSuccess={(token) => {
                  setCaptchaToken(token);
                  setErrorMsg(''); // Clear any CAPTCHA-related errors
                }}
                onError={() => {
                  setCaptchaToken('');
                  setErrorMsg('CAPTCHA verification failed. Please try again.');
                }}
                onExpire={() => {
                  setCaptchaToken('');
                  setErrorMsg('CAPTCHA expired. Please verify again.');
                }}
                options={{
                  theme: 'dark',
                  retry: 'never', // Don't auto-retry on failures
                  refreshExpired: 'manual' // Don't auto-refresh on expiry
                }}
                className="scale-90 origin-center"
              />
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleEmailAuth}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>{mode === 'login' ? 'Login with Email' : 'Sign Up with Email'}</span>
            </motion.button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOAuth('google')}
                className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <FaGoogle className="w-5 h-5 text-red-500" />
                <span className="text-white">Google</span>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOAuth('github')}
                className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <FaGithub className="w-5 h-5 text-white" />
                <span className="text-white">GitHub</span>
              </motion.button>
            </div>
          </div>
        </SpotlightCard>
      </motion.div>
    </div>
  );
};
