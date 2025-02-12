'use client';

import { useState, useEffect } from 'react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { User } from '@supabase/supabase-js';
import { supabase, DEFAULT_AVATAR_URL } from '@/lib/supabase';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setFullName(user?.user_metadata?.full_name || '');
      setAvatarUrl(user?.user_metadata?.avatar_url || '');
    });
  }, []);

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          avatar_url: avatarUrl
        }
      });

      if (error) throw error;
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Error updating profile');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      setLoading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setAvatarUrl(publicUrl);
      await handleUpdateProfile();
    } catch (error) {
      toast.error('Error uploading avatar');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <SpotlightCard className="p-6">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={avatarUrl || DEFAULT_AVATAR_URL} />
                  <AvatarFallback>
                    {user.email?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUploadAvatar}
                    className="hidden"
                    id="avatar-upload"
                  />
                  <Button 
                    variant="outline"
                    onClick={() => document.getElementById('avatar-upload')?.click()}
                    disabled={loading}
                  >
                    Change Avatar
                  </Button>
                </div>
              </div>

              <div className="grid gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={user.email} disabled className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <Button 
                  onClick={handleUpdateProfile} 
                  disabled={loading}
                  className="w-full md:w-auto"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </SpotlightCard>
        </TabsContent>

        <TabsContent value="security">
          <SpotlightCard className="p-6">
            <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
            <div className="space-y-4">
              <Button variant="outline" className="w-full md:w-auto">
                Change Password
              </Button>
              <Button variant="outline" className="w-full md:w-auto">
                Enable Two-Factor Authentication
              </Button>
            </div>
          </SpotlightCard>
        </TabsContent>

        <TabsContent value="notifications">
          <SpotlightCard className="p-6">
            <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
            <p className="text-gray-400">Coming soon...</p>
          </SpotlightCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}