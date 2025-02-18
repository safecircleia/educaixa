"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Menu as MenuIcon, X, LogOut, LayoutDashboard, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { navItems } from './links';
import { AuthModal } from '../client/AuthModal';
import { supabase } from '../../lib/supabase';
import { cn } from '@/lib/utils';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Define navbar variants for blur fade animation
const navVariants: Variants = {
  notScrolled: { backdropFilter: "blur(0px)", transition: { duration: 0.5 } },
  scrolled: { backdropFilter: "blur(5px)", transition: { duration: 0.5 } },
};

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const router = useRouter();
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Subscribe to auth state changes
  useEffect(() => {
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

  const handleSectionClick = (href: string) => {
    if (!href.startsWith('http') && !href.startsWith('/')) {
      const element = document.getElementById(href);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      if (href.startsWith('http')) {
        window.open(href, '_blank');
      } else {
        router.push(href);
      }
    }
  };

  return (
    <>
      <motion.nav
        variants={navVariants}
        animate={isScrolled ? "scrolled" : "notScrolled"}
        className={`fixed top-0 w-full z-50 transition-shadow duration-300 py-2 md:py-4 
          ${isScrolled ? 'bg-black/30 shadow-md' : 'bg-transparent'}`}
      >
        <div className="container mx-auto px-3 md:px-4 flex items-center">
          {/* Left section - Logo */}
          <div className="flex items-center w-[180px]">
            <Link href="/">
              <motion.div className="flex items-center space-x-2 md:space-x-3 group" whileHover={{ scale: 1.02 }}>
                <div className="relative w-6 h-6 md:w-8 md:h-8">
                  <Image
                    src="/logo-nbg.png"
                    alt="SafeCircle Logo"
                    width={32}
                    height={32}
                    className="relative z-10 w-full h-full"
                  />
                </div>
                <motion.span className="text-xl md:text-2xl font-nothing text-white/90 tracking-wider group-hover:opacity-80 transition-opacity">
                  SafeCircle
                </motion.span>
              </motion.div>
            </Link>
          </div>

          {/* Center section - Navigation Links */}
          <div className="hidden md:flex items-center justify-center flex-1 space-x-6">
            {navItems.map((item) => (
              <div 
                key={item.title}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.title)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <button
                  className="flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  <item.IconComponent className="w-4 h-4 mr-2 opacity-60 group-hover:opacity-100 transition-opacity" />
                  {item.title}
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 
                    ${hoveredItem === item.title ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {hoveredItem === item.title && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-1 min-w-[220px] py-2 px-1 rounded-xl border border-white/5 bg-black/95 backdrop-blur-xl shadow-xl"
                    >
                      <div className="text-center font-medium text-white/80 pb-1 mb-1 border-b border-white/5">
                        {item.title}
                      </div>
                      {item.items.map((subItem) => (
                        <button
                          key={subItem.label}
                          onClick={() => { if (!subItem.comingSoon) handleSectionClick(subItem.href); }}
                          disabled={!!subItem.comingSoon}
                          className={`w-full text-left px-4 py-2 text-sm rounded-lg flex items-center transition-colors ${subItem.comingSoon ? 'text-gray-400 cursor-not-allowed' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                          {subItem.label}
                          {subItem.comingSoon && (
                            <span className="ml-2 text-xs italic opacity-70">Coming Soon</span>
                          )}
                          {!subItem.comingSoon && subItem.external && (
                            <ExternalLink className="w-3 h-3 inline opacity-50 ml-1" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right section - User Menu */}
          <div className="hidden md:flex items-center w-[180px] justify-end">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-white/20">
                    <Image
                      src="/default-avatar.svg"
                      alt="User avatar"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className={cn("w-40 bg-black/95 backdrop-blur-xl border border-white/5 shadow-xl rounded-xl py-2", isScrolled ? "bg-black/80" : "bg-black/95")}>
                  <DropdownMenuItem onClick={() => router.push('/dashboard')} className="px-4 py-2 text-sm text-white hover:bg-white/10 flex items-center">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/dashboard/settings')} className="px-4 py-2 text-sm text-white hover:bg-white/10 flex items-center">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={async () => {
                      await supabase.auth.signOut();
                      setUser(null);
                    }}
                    className="px-4 py-2 text-sm text-red-500 hover:bg-white/10 flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <motion.button
                onClick={() => setAuthModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md text-gray-800 text-sm font-semibold shadow-sm transition-colors"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Login
              </motion.button>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center gap-4 ml-auto">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-white/20">
                    <Image
                      src="/default-avatar.svg"
                      alt="User avatar"
                      width={28}
                      height={28}
                      className="rounded-full"
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={8} className={cn("w-40 bg-black/95 backdrop-blur-xl border border-white/5 shadow-xl rounded-xl py-2", isScrolled ? "bg-black/80" : "bg-black/95")}>
                  <DropdownMenuItem onClick={() => router.push('/dashboard')} className="px-4 py-2 text-sm text-white hover:bg-white/10 flex items-center">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/dashboard/settings')} className="px-4 py-2 text-sm text-white hover:bg-white/10 flex items-center">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={async () => {
                      await supabase.auth.signOut();
                      setUser(null);
                    }}
                    className="px-4 py-2 text-sm text-red-500 hover:bg-white/10 flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <motion.button
                onClick={() => setAuthModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-3 py-1.5 bg-gray-300 hover:bg-gray-400 rounded-md text-gray-800 text-sm font-semibold shadow-sm transition-colors"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Login
              </motion.button>
            )}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="p-1.5 hover:bg-white/5 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-white"/> : <Menu className="w-5 h-5 text-white"/>}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
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
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-black/95 backdrop-blur-xl z-50 overflow-y-auto shadow-xl border-l border-white/5"
            >
              <div className="p-6 space-y-6">
                {navItems.map((item) => (
                  <div key={item.title} className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-white/90 pb-2 border-b border-white/10">
                      <item.IconComponent className="w-4 h-4" />
                      {item.title}
                    </div>
                    <div className="space-y-2 pl-2">
                      {item.items.map((subItem) => (
                        <motion.button
                          key={subItem.label}
                          onClick={() => {
                            if (!subItem.comingSoon) {
                              handleSectionClick(subItem.href);
                              setIsMobileMenuOpen(false);
                            }
                          }}
                          className={`w-full text-left py-1.5 text-sm flex items-center transition-colors ${subItem.comingSoon ? 'text-gray-400 cursor-not-allowed' : 'text-gray-400 hover:text-white'}`}
                          whileHover={!subItem.comingSoon ? { x: 4 } : {}}
                        >
                          {subItem.label}
                          {subItem.comingSoon && (
                            <span className="ml-2 text-xs italic opacity-70">Coming Soon</span>
                          )}
                          {!subItem.comingSoon && subItem.external && <ExternalLink className="w-3 h-3 inline opacity-50 ml-1" />}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Auth Modal */}
      <AuthModal 
        show={authModalOpen}
        onClose={() => setAuthModalOpen(false)} 
      />
    </>
  );
};