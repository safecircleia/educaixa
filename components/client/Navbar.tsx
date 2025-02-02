'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { usePhantom } from '../../hooks/usePhantom';
import { useState, useEffect, useRef } from 'react';
import { PhantomIcon } from '../PhantomIcon';
import { Shield, ChevronDown, ExternalLink, GitHub, Book, Users, Coins, Code, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import  CountUp  from './CountUp';
import { useCounter } from '../../context/CounterContext';
import Image from 'next/image';

const navItems = [
  {
    title: 'Platform',
    icon: Shield,
    items: [
      { label: 'How it Works', href: '#how-it-works' },
      { label: 'Features', href: '#features' },
      { label: 'Security', href: '#security' },
      { label: 'AI Technology', href: '#technology' },
    ]
  },
  {
    title: 'Developers',
    icon: Code,
    items: [
      { label: 'Documentation', href: '/docs', external: true },
      { label: 'API Reference', href: '/api', external: true },
      { label: 'GitHub', href: 'https://github.com/safecircle', external: true },
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
  const { connect, connected, address, balance } = usePhantom();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const counterRef = useRef(null);
  const isCounterVisible = useInView(counterRef, { margin: "-100px 0px" });
  const { count, total, percentage } = useCounter();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    if (href.startsWith('#')) {
      const element = document.getElementById(href.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.open(href, '_blank');
    }
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
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative w-8 h-8">
                  <motion.div
                    className="absolute inset-0 bg-[#4dc8ff]/20 blur-xl rounded-full"
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
                  className="text-xl font-black tracking-tighter"
                  animate={{ 
                    background: ['linear-gradient(to right, #fff, #4dc8ff)', 'linear-gradient(to right, #4dc8ff, #fff)'],
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent'
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                >
                  SAFECIRCLE
                </motion.span>
              </motion.div>

              {/* Counter - Always visible next to title */}
              <div className="flex items-center space-x-2 pl-4 border-l border-white/10">
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#4dc8ff] to-[#2dd4bf]"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </motion.div>
              </div>
            </div>

            {/* Center section - Desktop Navigation */}
            <div className="flex-1 hidden md:flex justify-center">
              <div className="flex items-center space-x-1">
                {navItems.map((item) => (
                  <div key={item.title} className="relative">
                    <motion.button
                      onClick={() => setActiveDropdown(
                        activeDropdown === item.title ? null : item.title
                      )}
                      className="px-4 py-2 rounded-lg flex items-center gap-2 group"
                      whileHover={{ y: -1, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                    >
                      <item.icon className="w-4 h-4 opacity-60 group-hover:opacity-100 
                        transition-opacity duration-200" 
                      />
                      <span className="text-sm font-medium">{item.title}</span>
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
                                whileHover={{ x: 4 }}
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

            {/* Right section - Desktop */}
            <div className="hidden md:flex w-[240px] justify-end">
              <motion.button
                onClick={connect}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg 
                  bg-gradient-to-r from-[#4dc8ff]/10 to-[#2dd4bf]/10
                  hover:from-[#4dc8ff]/20 hover:to-[#2dd4bf]/20
                  border border-white/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PhantomIcon className="w-5 h-5" />
                {connected ? (
                  <div className="flex items-center space-x-2">
                    <span>{`${address?.slice(0, 4)}...${address?.slice(-4)}`}</span>
                    {balance && (
                      <span className="text-[#4dc8ff]">{`${balance} $SC`}</span>
                    )}
                  </div>
                ) : (
                  <span>Connect Wallet</span>
                )}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center ml-auto">
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
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

                {/* Mobile Wallet Connection */}
                <div className="pt-4 border-t border-white/10">
                  <motion.button
                    onClick={() => {
                      connect();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg
                      bg-gradient-to-r from-[#4dc8ff]/10 to-[#2dd4bf]/10
                      hover:from-[#4dc8ff]/20 hover:to-[#2dd4bf]/20
                      border border-white/10"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <PhantomIcon className="w-5 h-5" />
                    <span>Connect Wallet</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
