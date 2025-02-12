'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { RiDashboardLine, RiSettings4Line, RiLogoutBoxLine } from 'react-icons/ri';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/');
      }
      setLoading(false);
    };
    checkSession();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: RiDashboardLine },
    { href: '/dashboard/settings', label: 'Settings', icon: RiSettings4Line },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed left-0 top-0 h-full w-64 bg-card border-r border-white/10">
        <div className="p-6">
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/logo-nbg.png" 
              alt="Logo" 
              width={32} 
              height={32} 
              className="h-8 w-auto"
            />
            <span className="font-bold text-xl">SafeCircle</span>
          </Link>
        </div>

        <nav className="mt-6 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors relative ${
                  isActive
                    ? 'text-white bg-indigo-600/20 border border-indigo-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-lg bg-indigo-600/20 border border-indigo-500/30"
                  />
                )}
                <Icon className="w-5 h-5" />
                <span className="relative">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-3 w-full px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <RiLogoutBoxLine className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="pl-64">
        {children}
      </main>
    </div>
  );
}
