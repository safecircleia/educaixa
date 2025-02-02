'use client';

import { motion } from 'framer-motion';
import { Eye, EyeOff, ExternalLink, Check, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { RiDiscordFill, RiTelegramLine } from 'react-icons/ri';
import { usePhantom } from '@/hooks/usePhantom';
import type { WaitlistEntry } from '@/types/database';
import { tiers } from '@/lib/constants'; // Import tiers from constants

interface DashboardProps {
  entry: WaitlistEntry;
}

export const Dashboard = ({ entry }: DashboardProps) => {
  const [showOrderNumber, setShowOrderNumber] = useState(false);
  const { address } = usePhantom();

  const connections = [
    { name: 'Discord', icon: RiDiscordFill, href: '/api/connect/discord' },
    { name: 'Telegram', icon: RiTelegramLine, href: '/api/connect/telegram' }
  ];

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Status Card */}
        <div className="bg-black/40 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-4">Waitlist Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white/60">Position</span>
              <span className="font-mono text-lg">#1,234</span>
            </div>
            
            <div className="flex items-center justify-between group cursor-pointer"
              onMouseEnter={() => setShowOrderNumber(true)}
              onMouseLeave={() => setShowOrderNumber(false)}
            >
              <span className="text-white/60">Order Number</span>
              <div className="flex items-center gap-2">
                {showOrderNumber ? (
                  <>
                    <span className="font-mono">{entry.order_number}</span>
                    <EyeOff className="w-4 h-4 opacity-60" />
                  </>
                ) : (
                  <>
                    <span className="font-mono">••••••••••</span>
                    <Eye className="w-4 h-4 opacity-60" />
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-white/60">Payment Status</span>
              <div className="flex items-center gap-2">
                {entry.status === 'completed' ? (
                  <span className="text-green-400 flex items-center gap-1">
                    <Check className="w-4 h-4" /> Confirmed
                  </span>
                ) : (
                  <span className="text-yellow-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> Pending
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-white/60">Joined Date</span>
              <span className="font-mono">{formatDate(entry.created_at)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/60">Selected Tier</span>
              <span className="font-mono text-[#4dc8ff]">
                {entry.tier !== null ? tiers[entry.tier].name : 'Unknown'}
              </span>
            </div>
          </div>
        </div>

        {/* Connections Card */}
        <div className="bg-black/40 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-4">Account Connections</h2>
          <div className="space-y-4">
            {connections.map((connection) => (
              <motion.a
                key={connection.name}
                href={connection.href}
                className="flex items-center justify-between p-4 rounded-lg
                  border border-white/10 hover:border-white/20 group"
                whileHover={{ x: 4 }}
              >
                <div className="flex items-center gap-3">
                  <connection.icon className="w-5 h-5" />
                  <span>{connection.name}</span>
                </div>
                <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Transaction Details */}
        <div className="bg-black/40 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-4">Transaction Details</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white/60">Transaction Hash</span>
              <a 
                href={`https://solscan.io/tx/${entry.tx_hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[#4dc8ff] hover:underline flex items-center gap-2"
              >
                {entry.tx_hash.slice(0, 8)}...{entry.tx_hash.slice(-8)}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/60">Amount Paid</span>
              <span className="font-mono">{entry.amount_paid} $SC</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
