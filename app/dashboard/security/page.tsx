'use client';

import { useState } from 'react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { Shield, Key, Smartphone } from 'lucide-react';

export default function SecurityPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
    <div className="container mx-auto px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <h1 className="text-2xl font-bold">Security Settings</h1>

        <SpotlightCard className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-500/10 rounded-lg">
              <Key className="h-6 w-6 text-indigo-400" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Password</h3>
                <p className="text-sm text-gray-400">Update your password regularly to keep your account secure</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline">Change Password</Button>
                <Button variant="outline">Reset Password</Button>
              </div>
            </div>
          </div>
        </SpotlightCard>

        <SpotlightCard className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-500/10 rounded-lg">
              <Smartphone className="h-6 w-6 text-indigo-400" />
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="2fa"
                    checked={twoFactorEnabled}
                    onCheckedChange={setTwoFactorEnabled}
                  />
                  <Label htmlFor="2fa">Enable</Label>
                </div>
              </div>
              {twoFactorEnabled && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="pt-4"
                >
                  <Button variant="outline">Setup 2FA</Button>
                </motion.div>
              )}
            </div>
          </div>
        </SpotlightCard>

        <SpotlightCard className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-500/10 rounded-lg">
              <Shield className="h-6 w-6 text-indigo-400" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Security Log</h3>
                <p className="text-sm text-gray-400">Review your recent security activity</p>
              </div>
              <div className="bg-black/20 rounded-lg p-4">
                <p className="text-sm text-gray-400">No recent security events</p>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </motion.div>
    </div>
  );
}