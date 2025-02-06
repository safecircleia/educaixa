'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { Mail, Key } from 'lucide-react';
import { FaGoogle, FaGithub } from "react-icons/fa";

// Remove prop "type" as we handle both flows in one modal
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

  const handleEmailAuth = async () => {
    setErrorMsg('');
    let res;
    if (mode === 'login') {
      res = await supabase.auth.signInWithPassword({ email, password });
    } else {
      res = await supabase.auth.signUp({ email, password });
    }
    if (res.error) {
      setErrorMsg(res.error.message);
    } else {
      onClose(); // success
    }
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    setErrorMsg('');
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) setErrorMsg(error.message);
    else onClose();
  };

  const handlePasskeys = async () => {
    // TODO: replace with actual Passkeys integration
    alert('Passkeys login not implemented');
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
        className="bg-black/80 backdrop-blur-lg rounded-lg shadow-2xl p-6 w-full max-w-md text-center" // updated container
      >
        {/* Toggle Header */}
        <div className="flex justify-center mb-4">
          <button 
            onClick={() => setMode('login')}
            className={`px-4 py-2 ${mode === 'login' ? 'border-b-2 border-blue-500 text-white' : 'text-gray-400'}`}
          >
            Login
          </button>
          <button 
            onClick={() => setMode('signup')}
            className={`px-4 py-2 ${mode === 'signup' ? 'border-b-2 border-blue-500 text-white' : 'text-gray-400'}`}
          >
            Sign Up
          </button>
        </div>
        {errorMsg && <p className="mb-4 text-sm text-red-500">{errorMsg}</p>}
        <hr className="mb-4 border-gray-700" />
        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e=> setEmail(e.target.value)}
          className="w-full p-3 mb-3 rounded bg-gray-800 text-white placeholder-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e=> setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-gray-800 text-white placeholder-gray-500"
        />
        <button 
          onClick={handleEmailAuth}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded mb-4 flex items-center justify-center"
        >
          <motion.span whileHover={{ rotate: 10 }} className="mr-2">
            <Mail className="w-5 h-5" />
          </motion.span>
          {mode === 'login' ? 'Login with Email' : 'Sign Up with Email'}
        </button>
        {/* OAuth Buttons with icons only */}
        <div className="flex justify-center space-x-4 mb-4">
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 5 }}
            onClick={() => handleOAuth('google')}
            className="bg-red-600 hover:bg-red-700 p-3 rounded-full"
          >
            <FaGoogle className="w-6 h-6 text-white" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 5 }}
            onClick={() => handleOAuth('github')}
            className="bg-gray-700 hover:bg-gray-800 p-3 rounded-full"
          >
            <FaGithub className="w-6 h-6 text-white" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 5 }}
            onClick={handlePasskeys}
            className="bg-purple-600 hover:bg-purple-700 p-3 rounded-full"
          >
            <Key className="w-6 h-6 text-white" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
