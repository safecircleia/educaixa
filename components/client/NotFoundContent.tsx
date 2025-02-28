'use client';

import { motion } from "framer-motion";
import { Home, AlertTriangle } from "lucide-react";
import Link from "next/link";
import Squares from "@/components/ui/squares";
import { Header1 } from '@/components/navbar/header';

export function NotFoundContent() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Header1 />
      {/* Background Decoration */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="#FFD700"
          hoverFillColor="#222"
        />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 max-w-md mx-auto"
        >
          <div className="flex flex-col items-center justify-center" role="alert" aria-live="polite">
            <AlertTriangle className="w-20 h-20 text-red-500" aria-hidden="true" />
            <h1 className="text-6xl font-extrabold mt-4">404</h1>
          </div>
          <h2 className="text-3xl font-bold">Page Not Found</h2>
          <p className="text-lg text-gray-300">
            We can&apos;t seem to find the page you&apos;re looking for. It may have been removed or is temporarily unavailable.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 mt-6 rounded-full bg-red-600 hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <Home className="w-5 h-5" aria-hidden="true" />
            <span>Return Home</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}