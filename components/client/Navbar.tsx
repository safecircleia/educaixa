'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Shield, ChevronDown, ExternalLink, GitHub, Book, Users, Coins, Code, Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { useRouter } from 'next/navigation';
import  CountUp  from './CountUp';
import { useCounter } from '../../context/CounterContext';
import Image from 'next/image';
import Link from 'next/link';

// Stubbed supabase auth handler (replace with your Supabase auth integration)
const handleAuth = () => {
  // ...code to trigger Supabase login/signup...
  console.log("Auth triggered");
};

const navItems = [
  {
    title: 'Platform',
    icon: Shield,
    items: [
      { label: 'How it Works', href: 'section-how-it-works' },
      { label: 'Key Features', href: 'section-features' },
      { label: 'Security', href: 'section-security' },
      { label: 'AI Technology', href: 'section-ai' },
      { label: 'Privacy', href: 'section-privacy' },
      { label: 'Protection', href: 'section-protection' },
    ]
  },
  {
    title: 'Developers',
    icon: Code,
    items: [
      { label: 'Documentation', href: '/docs', external: true },
      { label: 'API Reference', href: '/api', external: true },
      { label: 'GitHub', href: 'https://github.com/safecircleia', external: true },
    ]
  },
  {
    title: 'Community',
    icon: Users,
    items: [
      { label: 'Discord', href: '/discord', external: true },
      { label: 'Forum', href: '/forum' },
      { label: 'Blog', href: '/blog' },
    ]
  },
  {
    title: 'Token',
    icon: Coins,
    items: [
      { label: 'Tokenomics', href: '#token' },
      { label: 'Governance', href: '/governance' },
      { label: 'Staking', href: '/staking' },
    ]
  }
];

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
        className={`fixed w-full z-50 transition-all duration-500 
          ${isScrolled ? 'bg-black/40 backdrop-blur-lg border-b border-white/5' : 'bg-transparent'}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center h-20">
            {/* Left section - Fixed width */}
            <div className="w-[240px] flex items-center">
              <Link href="/">
                <motion.div 
                  className="flex items-center space-x-3 group"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative w-8 h-8">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#4dc8ff]/20 to-[#2dd4bf]/20 blur-xl rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <Image
                      src="/logo-nbg.png"
                      alt="SafeCircle Logo"
                      width={32}
                      height={32}
                      className="relative z-10"
                    />
                  </div>
                  
                  <motion.span 
                    className="text-2xl font-nothing text-white/90 tracking-wider
                      group-hover:opacity-80 transition-opacity"
                  >
                    SafeCircle
                  </motion.span>
                </motion.div>
              </Link>

              {/* Counter - Only visible when scrolled */}
              <AnimatePresence>
                {isScrolled && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center space-x-2 pl-4 border-l border-white/10"
                  >
                    <div className="flex items-baseline gap-2">
                      <CountUp
                        to={count}
                        className="font-mono text-sm font-medium text-white/90"
                      />
                      <span className="text-white/50 text-sm">/</span>
                      <span className="font-mono text-sm text-white/50">{total.toLocaleString()}</span>
                    </div>
                    <motion.div 
                      className="h-1 w-16 bg-black/20 rounded-full overflow-hidden"
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#4dc8ff] to-[#2dd4bf]"
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Center section - Desktop Navigation */}
            <div className="flex-1 hidden md:flex justify-center">
              <div className="flex items-center space-x-1">
                {navItems.map((item) => (
                  <div key={item.title} className="relative group">
                    <motion.button
                      onClick={() => setActiveDropdown(
                        activeDropdown === item.title ? null : item.title
                      )}
                      className="px-4 py-2 rounded-lg flex items-center gap-2 group"
                    >
                      <item.icon className="w-4 h-4 opacity-60 group-hover:opacity-100 
                        transition-opacity duration-200" 
                      />
                      <span className="text-sm font-medium group-hover:text-white transition-colors duration-200">{item.title}</span>
                      <motion.div
                        animate={{ rotate: activeDropdown === item.title ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
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
                          className="absolute top-full left-0 mt-2 w-56 rounded-xl
                            border border-white/10 bg-black/90 backdrop-blur-xl
                            shadow-xl shadow-black/20"
                        >
                          <div className="p-2">
                            {item.items.map((subItem) => (
                              <motion.button
                                key={subItem.label}
                                onClick={() => handleSectionClick(subItem.href)}
                                className="w-full flex items-center justify-between px-4 py-2
                                  rounded-lg text-sm text-white/70 hover:text-white
                                  hover:bg-white/5 transition-colors"
                              >
                                {subItem.label}
                                {subItem.external && (
                                  <ExternalLink className="w-3 h-3 opacity-50" />
                                )}
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

            {/* Right section - Replace wallet with Login/Signup */}
            <div className="hidden md:flex justify-end">
              <button
                onClick={handleAuth}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
              >
                Login / Signup
              </button>
            </div>

            <div className="md:hidden flex items-center ml-auto">
              <button
                onClick={handleAuth}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
              >
                Login / Signup
              </button>
            </div>
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
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-black/90 backdrop-blur-xl
                border-l border-white/10 z-50 overflow-y-auto"
            >
              <div className="p-6 space-y-6">
                {/* Mobile Navigation */}
                {navItems.map((item) => (
                  <div key={item.title} className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-white/60">
                      <item.icon className="w-4 h-4" />
                      {item.title}
                    </div>
                    <div className="space-y-1 pl-6">
                      {item.items.map((subItem) => (
                        <motion.button
                          key={subItem.label}
                          onClick={() => {
                            handleSectionClick(subItem.href);
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full flex items-center justify-between py-2
                            text-sm text-white/80 hover:text-white"
                          whileHover={{ x: 4 }}
                        >
                          {subItem.label}
                          {subItem.external && (
                            <ExternalLink className="w-3 h-3 opacity-50" />
                          )} 
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Mobile Login / Signup */}
                <div className="pt-4 border-t border-white/10">
                  <button
                    onClick={handleAuth}
                    className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
                  >
                    Login / Signup
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
