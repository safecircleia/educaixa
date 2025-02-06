'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Shield, ChevronDown, ExternalLink, GitHub, Book, Users, Coins, Code, Menu, X, LogOut, LayoutDashboard, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import  CountUp  from '../client/CountUp';
import { useCounter } from '../../context/CounterContext';
import Image from 'next/image';
import Link from 'next/link';
import { navItems } from './links'; // added import for navbar links
import { AuthModal } from '../client/AuthModal'; // new import for auth popouts
import { supabase } from '../../lib/supabase'; // new import for auth

// Optionally, map navItems icons to actual components if you prefer:
const mappedNavItems = navItems.map(item => ({
  ...item,
  icon: item.icon === 'Shield' ? Shield 
        : item.icon === 'Code' ? Code 
        : item.icon === 'Users' ? Users 
        : item.icon === 'Coins' ? Coins 
        : null
}));

// Stubbed supabase auth handler (replace with your Supabase auth integration)
const handleAuth = () => {
  // ...code to trigger Supabase login/signup...
  console.log("Auth triggered");
};

// Define navbar variants for blur fade animation
const navVariants = {
  notScrolled: { backdropFilter: "blur(0px)", transition: { duration: 0.5 } },
  scrolled: { backdropFilter: "blur(5px)", transition: { duration: 0.5 } },
};

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const router = useRouter();
  const counterRef = useRef(null);
  const isCounterVisible = useInView(counterRef, { margin: "-100px 0px" });
  const { count, total, percentage } = useCounter();
  const [isWalletMenuOpen, setIsWalletMenuOpen] = useState(false);
  const walletMenuRef = useRef<HTMLDivElement>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'signup'>('login');
  // New user state
  const [user, setUser] = useState<any>(null);

  const openAuthModal = (type: 'login' | 'signup') => {
    setAuthType(type);
    setAuthModalOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (walletMenuRef.current && !walletMenuRef.current.contains(event.target as Node)) {
        setIsWalletMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Subscribe to auth state changes
  useEffect(() => {
    // Get initial user
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleSectionClick = (href: string) => {
    setActiveDropdown(null);
    if (!href.startsWith('http') && !href.startsWith('/')) {
      const element = document.getElementById(href);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      window.open(href, '_blank');
    }
  };

  const navigateToDashboard = () => {
    router.push('/dashboard');
    setIsWalletMenuOpen(false);
  };

  const handleWalletMenuClick = () => {
    setIsWalletMenuOpen(!isWalletMenuOpen);
  };

  return (
    <>
      <motion.nav
        variants={navVariants}
        animate={isScrolled ? "scrolled" : "notScrolled"}
        className={`fixed top-0 w-full z-50 transition-shadow duration-300 py-4 
          ${isScrolled ? 'bg-black/30 shadow-md' : 'bg-transparent'}`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Left section */}
          <div className="w-1/4 flex items-center">
            <Link href="/">
              <motion.div className="flex items-center space-x-3 group" whileHover={{ scale: 1.02 }}>
                <div className="relative w-8 h-8">
                  <Image
                    src="/logo-nbg.png"
                    alt="SafeCircle Logo"
                    width={32}
                    height={32}
                    className="relative z-10"
                  />
                </div>
                <motion.span className="text-2xl font-nothing text-white/90 tracking-wider group-hover:opacity-80 transition-opacity">
                  SafeCircle
                </motion.span>
              </motion.div>
            </Link>
            {/* Removed counter for minimalist design */}
          </div>

          {/* Center section - Desktop Navigation */}
          <div className="hidden md:flex w-1/2 justify-center items-center">
            <div className="flex items-center justify-center space-x-6 text-center">  {/* updated classes for centering */}
              {mappedNavItems.map((item) => (
                <div 
                  key={item.title} 
                  className="relative group" 
                  onMouseEnter={() => setActiveDropdown(item.title)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <motion.button
                    // Removed onClick as hover now triggers dropdown
                    className="p-2 flex items-center gap-1 text-sm text-gray-300 hover:text-white"
                  >
                    <item.icon className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span className="font-medium">{item.title}</span>
                    <motion.div animate={{ rotate: activeDropdown === item.title ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="w-4 h-4 opacity-60 group-hover:opacity-100" />
                    </motion.div>
                  </motion.button>
                  <AnimatePresence>
                    {activeDropdown === item.title && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        // Updated dropdown background with blur
                        className="absolute top-full left-0 mt-2 w-56 rounded-md bg-black/50 shadow-md backdrop-blur-md"
                      >
                        <div className="p-2">
                          {item.items.map((subItem) => (
                            <motion.button
                              key={subItem.label}
                              onClick={() => handleSectionClick(subItem.href)}
                              className="w-full text-left px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors rounded"
                            >
                              {subItem.label}
                              {subItem.external && <ExternalLink className="w-3 h-3 inline opacity-50 ml-1" />}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Right section */}
          <div className="hidden md:flex w-1/4 justify-end items-center space-x-4">
            { user ? (
              <div className="relative" ref={walletMenuRef}>
                <img 
                  src={user?.user_metadata?.avatar_url || '/default-avatar.png'} 
                  alt="Avatar"
                  className="w-8 h-8 rounded-full cursor-pointer"
                  onClick={() => setIsWalletMenuOpen(!isWalletMenuOpen)}
                />
                <AnimatePresence>
                  {isWalletMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 5 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-40 bg-black/70 backdrop-blur-lg rounded-md shadow-lg py-1 z-50"  // updated styling
                    >
                      <button 
                        className="w-full px-4 py-2 flex items-center gap-2 text-gray-100 hover:bg-gray-700"
                        onClick={() => {
                          // Navigate to Settings (implementation as needed)
                          setIsWalletMenuOpen(false);
                        }}
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                      <button 
                        onClick={async () => {
                          await supabase.auth.signOut();
                          setUser(null);
                          setIsWalletMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 flex items-center gap-2 text-red-500 hover:bg-red-800 hover:text-white"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <motion.button
                  onClick={() => openAuthModal('login')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md text-gray-800 text-sm font-semibold shadow-sm transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Login
                </motion.button>
                {/* Removed the Signup button */}
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
              {isMobileMenuOpen ? <X className="w-6 h-6 text-white"/> : <Menu className="w-6 h-6 text-white"/>}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-gray-900 z-50 overflow-y-auto shadow-md"
            >
              <div className="p-6 space-y-6 text-center">
                {navItems.map((item) => (
                  <div key={item.title} className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-sm font-medium text-gray-400">
                      <item.icon className="w-4 h-4" />
                      {item.title}
                    </div>
                    <div className="space-y-1">
                      {item.items.map((subItem) => (
                        <motion.button
                          key={subItem.label}
                          onClick={() => {
                            handleSectionClick(subItem.href);
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full text-left py-2 text-sm text-gray-400 hover:text-white transition-colors"
                          whileHover={{ x: 4 }}
                        >
                          {subItem.label}
                          {subItem.external && <ExternalLink className="w-3 h-3 inline opacity-50 ml-1" />}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Mobile Buttons: centered */}
                <div className="pt-4 border-t border-gray-700 flex flex-col items-center space-y-4">
                  <motion.button
                    onClick={openAuthModal.bind(null, 'login')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full max-w-xs flex items-center justify-center px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md text-gray-700 text-sm font-semibold shadow-sm transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Login
                  </motion.button>
                  {/* Removed Signup button */}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Render AuthModal */}
      <AuthModal 
        show={authModalOpen} 
        type={authType} 
        onClose={() => setAuthModalOpen(false)} 
      />
    </>
  );
};
