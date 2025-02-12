'use client';

import { useEffect, useState } from 'react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase, DEFAULT_AVATAR_URL } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6">
        <SpotlightCard spotlightColor="rgba(99, 102, 241, 0.2)" className="p-8">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user?.user_metadata?.avatar_url || DEFAULT_AVATAR_URL} />
              <AvatarFallback>
                {user.email?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Welcome back</h1>
              <p className="text-gray-400">{user.email}</p>
            </div>
          </div>
        </SpotlightCard>

        <div className="grid md:grid-cols-3 gap-6">
          <SpotlightCard className="p-6">
            <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
            <p className="text-gray-400">No recent activity</p>
          </SpotlightCard>

          <SpotlightCard className="p-6">
            <h3 className="text-lg font-semibold mb-2">Security Status</h3>
            <p className="text-green-500">Protected</p>
          </SpotlightCard>

          <SpotlightCard className="p-6">
            <h3 className="text-lg font-semibold mb-2">Account Type</h3>
            <p className="text-gray-400">Free Plan</p>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}
