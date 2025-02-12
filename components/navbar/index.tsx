'use client';

import * as React from "react";
import { useState, useEffect } from 'react';
import { LogOut, Menu, X, Shield, Code, Users, Coins, User, Settings, BookOpen, Terminal, Github, MessageCircle, FileText, Newspaper, Coins as TokenIcon, Flag, Lock, Sparkles, Layout, Heart, LucideIcon, LineChart, CircleDollarSign, Bot, ShieldCheck, KeyRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { AuthModal } from '../client/AuthModal';
import { supabase, DEFAULT_AVATAR_URL } from '../../lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { navItems } from './links';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const icons = {
  Shield,
  Code,
  Users,
  Coins,
  BookOpen,
  Terminal,
  Github,
  MessageCircle,
  FileText,
  Newspaper,
  TokenIcon,
  Flag,
  Lock,
  Sparkles,
  Layout,
  Heart,
  LineChart,
  CircleDollarSign,
  Bot,
  ShieldCheck,
  KeyRound,
};

const getMenuItemIcon = (label: string): LucideIcon => {
  if (label.includes('How it Works')) return Layout;
  if (label.includes('AI Technology')) return Bot;
  if (label.includes('Privacy')) return KeyRound;
  if (label.includes('Protection')) return ShieldCheck;
  if (label.includes('Features')) return Sparkles;
  if (label.includes('Security')) return Lock;
  if (label.includes('Documentation')) return BookOpen;
  if (label.includes('API')) return Terminal;
  if (label.includes('GitHub')) return Github;
  if (label.includes('Discord')) return MessageCircle;
  if (label.includes('Forum')) return Heart;
  if (label.includes('Blog')) return Newspaper;
  if (label.includes('Tokenomics')) return LineChart;
  if (label.includes('Governance')) return Flag;
  if (label.includes('Staking')) return CircleDollarSign;
  return Shield;
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          href={href}
          className={cn(
            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium no-underline outline-none transition-colors hover:bg-white/5 group",
            className
          )}
          {...props}
        >
          {children}
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

const Navbar = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Get initial user
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    // Subscribe to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="relative">
        {/* Glassmorphism effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/60 backdrop-blur-xl" />
        
        <div className="container mx-auto px-4 relative">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 shrink-0">
              <Image src="/logo-nbg.png" alt="Logo" width={32} height={32} className="h-8 w-auto" />
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                SafeCircle
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex flex-1 justify-center">
              <NavigationMenu>
                <NavigationMenuList className="gap-2">
                  {navItems.map((item) => {
                    const Icon = icons[item.icon as keyof typeof icons];
                    return (
                      <NavigationMenuItem key={item.title} className="relative flex items-center">
                        <NavigationMenuTrigger 
                          className="bg-transparent data-[state=open]:bg-white/5 hover:bg-white/5 h-10 text-white/80 hover:text-white focus:bg-white/5 transition-all duration-200"
                        >
                          <Icon className="w-4 h-4 mr-2 opacity-70 group-hover:opacity-100" />
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <motion.div 
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ 
                              duration: 0.15,
                              ease: [0.4, 0, 0.2, 1]
                            }}
                            className="absolute left-0 pt-4"
                          >
                            <div className="relative min-w-[220px] p-1 bg-black/95 backdrop-blur-2xl rounded-xl border border-white/5 shadow-xl shadow-black/20">
                              {item.items.map((subItem) => {
                                const SubIcon = getMenuItemIcon(subItem.label);
                                return (
                                  <ListItem
                                    key={subItem.label}
                                    href={subItem.external ? subItem.href : `/#${subItem.href}`}
                                  >
                                    <SubIcon className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                                    <span className="flex-1 text-white/80 group-hover:text-white transition-colors">{subItem.label}</span>
                                    {subItem.external && (
                                      <svg 
                                        className="w-3 h-3 opacity-50 group-hover:opacity-70 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          fill="currentColor"
                                          d="M14 5c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h3v-2H6V6h6v2h2V5zm-1 4-3.5 3.5L8 11v3h3l-1.5-1.5L13 9z"
                                        />
                                      </svg>
                                    )}
                                  </ListItem>
                                );
                              })}
                            </div>
                          </motion.div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    );
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-4">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2 outline-none group">
                    <Avatar className="h-8 w-8 ring-2 ring-white/5 group-hover:ring-white/10 transition-all">
                      <AvatarImage src={user.user_metadata?.avatar_url || DEFAULT_AVATAR_URL} />
                      <AvatarFallback className="bg-white/5">
                        {user.email?.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:flex flex-col items-start">
                      <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                        {user.user_metadata?.full_name || 'User'}
                      </span>
                      <span className="text-xs text-white/50 group-hover:text-white/70 transition-colors">
                        {user.email}
                      </span>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end" 
                    className="w-56 p-2 mt-2 bg-black/95 backdrop-blur-2xl border border-white/5 rounded-xl"
                  >
                    <Link href="/dashboard">
                      <DropdownMenuItem className="flex items-center gap-2 rounded-lg cursor-pointer text-white/80 hover:text-white focus:text-white hover:bg-white/5 transition-colors">
                        <User className="w-4 h-4 opacity-70" />
                        Dashboard
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/dashboard/settings">
                      <DropdownMenuItem className="flex items-center gap-2 rounded-lg cursor-pointer text-white/80 hover:text-white focus:text-white hover:bg-white/5 transition-colors">
                        <Settings className="w-4 h-4 opacity-70" />
                        Settings
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator className="my-1 bg-white/5" />
                    <DropdownMenuItem 
                      onClick={handleSignOut}
                      className="flex items-center gap-2 rounded-lg cursor-pointer text-red-400/80 hover:text-red-400 focus:text-red-400 hover:bg-red-500/5 transition-colors"
                    >
                      <LogOut className="w-4 h-4 opacity-70" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 transition-all duration-300 font-medium hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg hover:shadow-indigo-500/20"
                >
                  Get Started
                </button>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/5 transition-colors"
              >
                <AnimatePresence initial={false} mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ type: "spring", duration: 0.3 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      transition={{ type: "spring", duration: 0.3 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: "spring", duration: 0.3 }}
                className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-black/95 backdrop-blur-2xl"
              >
                <div className="container mx-auto px-4 py-6 overflow-y-auto h-full">
                  <div className="grid gap-6">
                    {navItems.map((section) => (
                      <div key={section.title} className="space-y-3">
                        <div className="flex items-center gap-2 text-sm font-medium text-white/90">
                          {section.icon && icons[section.icon as keyof typeof icons] && (
                            <span>{icons[section.icon as keyof typeof icons]({ size: 18 })}</span>
                          )}
                          {section.title}
                        </div>
                        <div className="grid gap-1 pl-6">
                          {section.items.map((item) => (
                            <Link
                              key={item.label}
                              href={item.external ? item.href : `/#${item.href}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="group flex items-center gap-2 py-2 text-sm text-white/70 hover:text-white transition-colors"
                            >
                              <span>{item.label}</span>
                              {item.external && (
                                <svg 
                                  className="w-3 h-3 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M14 5c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h3v-2H6V6h6v2h2V5zm-1 4-3.5 3.5L8 11v3h3l-1.5-1.5L13 9z"
                                  />
                                </svg>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AuthModal
        show={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </nav>
  );
}

export default Navbar;
