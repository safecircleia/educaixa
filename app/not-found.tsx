'use client';

import { motion } from 'framer-motion';
import { Home, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { GodRays } from '@/components/client/GodRays';
import Navbar from '@/components/navbar/index';

export default function NotFound() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-black p-4">
        <GodRays />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center space-y-8"
        >
          <AlertCircle className="w-16 h-16 mx-auto text-[#4dc8ff]" />
          <h1 className="text-4xl font-bold">Page Not Found</h1>
          <p className="text-white/60">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
          <Link href="/">
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full
              bg-white/5 hover:bg-white/10 border border-white/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-4 h-4" />
              Return Home
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
