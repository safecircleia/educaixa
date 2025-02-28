import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Settings,
  User,
  Shield,
  FileText,
  LogOut
} from 'lucide-react';
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: User, label: 'Profile', href: '/dashboard/settings' },
  { icon: Shield, label: 'Security', href: '/dashboard/security' },
  { icon: FileText, label: 'Documents', href: '/dashboard/documents' },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  const handleSignOut = async () => {
    // Add sign out logic here
  };

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="h-screen w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 p-4 fixed left-0 top-0"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 px-2 mb-8">
          <img src="/logo-nbg.png" alt="Logo" className="h-8 w-8" />
          <span className="font-bold text-xl">SafeCircle</span>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                  "hover:bg-white/10",
                  isActive ? "bg-white/10 text-indigo-400" : "text-gray-400"
                )}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={20} />
                </motion.div>
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full"
                    layoutId="activeIndicator"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
        >
          <LogOut size={20} />
          <span>Sign out</span>
        </button>
      </div>
    </motion.div>
  );
}