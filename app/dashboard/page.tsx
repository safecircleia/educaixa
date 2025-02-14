'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase, DEFAULT_AVATAR_URL } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Gem, Clock, Shield, Upload } from 'lucide-react';

interface UserStats {
  total_files?: number;
  storage_used?: number;
  last_activity?: string;
  created_at?: string;
  whitelist_position?: number;
  whitelist_status?: 'pending' | 'approved' | 'rejected';
  activity_data?: Array<{ date: string; files: number }>;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<UserStats>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndStats = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);

        if (user) {
          // Get user's files count and basic stats
          const { count: filesCount } = await supabase
            .from('files')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id);

          // Get storage usage
          const { data: storageData } = await supabase
            .from('files')
            .select('size')
            .eq('user_id', user.id);

          const totalStorage = storageData?.reduce((acc, file) => acc + (file.size || 0), 0) || 0;

          // Get whitelist status
          const { data: whitelistData } = await supabase
            .from('whitelist')
            .select('position, status')
            .eq('user_id', user.id)
            .single();

          // Get last activity and created date
          const { data: lastActivity } = await supabase
            .from('user_activity')
            .select('created_at')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

          // Generate mock activity data for the chart
          const activityData = generateActivityData();

          setStats({
            total_files: filesCount || 0,
            storage_used: totalStorage,
            last_activity: lastActivity?.created_at,
            created_at: user.created_at,
            whitelist_position: whitelistData?.position || 0,
            whitelist_status: whitelistData?.status || 'pending',
            activity_data: activityData,
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndStats();
  }, []);

  const generateActivityData = () => {
    // Generate last 7 days of activity data
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        files: Math.floor(Math.random() * 10)
      });
    }
    return data;
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'No activity';
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getWhitelistStatusColor = (status?: string) => {
    switch (status) {
      case 'approved': return 'text-green-400';
      case 'rejected': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <motion.div 
        className="grid gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SpotlightCard spotlightColor="rgba(99, 102, 241, 0.15)" className="p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <Avatar className="h-20 w-20 border-2 border-indigo-500/30">
                  <AvatarImage src={user?.user_metadata?.avatar_url || DEFAULT_AVATAR_URL} />
                  <AvatarFallback>
                    {user.email?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold">{user.user_metadata?.full_name || 'Welcome'}</h1>
                <p className="text-gray-400">{user.email}</p>
                <p className="text-sm text-gray-500 mt-1">Member since {formatDate(stats.created_at)}</p>
              </div>
            </div>
            <Link href="/dashboard/settings">
              <Button variant="outline">Edit Profile</Button>
            </Link>
          </div>
        </SpotlightCard>

        <div className="grid md:grid-cols-4 gap-6">
          <SpotlightCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-500/10 rounded-lg">
                <Upload className="h-6 w-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400">Storage Usage</h3>
                <p className="text-2xl font-bold text-indigo-400">
                  {formatBytes(stats.storage_used || 0)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {stats.total_files} files stored
                </p>
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-500/10 rounded-lg">
                <Clock className="h-6 w-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400">Last Activity</h3>
                <p className="text-lg text-indigo-400">
                  {formatDate(stats.last_activity)}
                </p>
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-500/10 rounded-lg">
                <Gem className="h-6 w-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400">Whitelist Position</h3>
                <p className="text-2xl font-bold text-indigo-400">
                  #{stats.whitelist_position || 'N/A'}
                </p>
                <p className={`text-sm ${getWhitelistStatusColor(stats.whitelist_status)} mt-1`}>
                  {stats.whitelist_status?.charAt(0).toUpperCase() + stats.whitelist_status?.slice(1) || 'Pending'}
                </p>
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-500/10 rounded-lg">
                <Shield className="h-6 w-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-400">Account Status</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <p className="text-green-400">Active</p>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {user.app_metadata?.provider || 'Email'} login
                </p>
              </div>
            </div>
          </SpotlightCard>
        </div>

        <SpotlightCard className="p-6">
          <h3 className="text-lg font-semibold mb-4">Activity Overview</h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.activity_data}>
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '0.5rem'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="files" 
                  stroke="#818cf8" 
                  strokeWidth={2}
                  dot={{ fill: '#818cf8' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SpotlightCard>
      </motion.div>
    </div>
  );
}
