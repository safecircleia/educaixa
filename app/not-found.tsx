"use client";

import { motion } from "framer-motion";
import { Home, Construction, HardHat } from "lucide-react";
import Link from "next/link";
import Squares from "@/components/ui/squares";

export default function NotFound() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0 opacity-40">
        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="#FFD700"
          hoverFillColor="#222"
        />
      </div>
      <div className="relative z-10 min-h-screen flex items-center justify-center bg-transparent p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center space-y-8"
        >
          <motion.div
            animate={{
              rotate: [0, -10, 10, -10, 0],
              y: [0, -5, 0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="relative"
          >
            <Construction className="w-16 h-16 mx-auto text-yellow-400" />
            <motion.div
              animate={{ y: [-10, 0, -10] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute top-0 left-1/2 -translate-x-1/2"
            >
              <HardHat className="w-8 h-8 text-yellow-500" />
            </motion.div>
          </motion.div>

          <h1 className="text-4xl font-bold text-yellow-400">
            Under Construction
          </h1>
          <p className="text-yellow-200/60">
            This page is currently being built. Please check back later!
          </p>

          <Link href="/" className="block mt-8">
            <motion.button
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full
              bg-yellow-400/10 hover:bg-yellow-400/20 border border-yellow-400/30
              text-yellow-400 transition-colors cursor-pointer w-auto mx-auto
              font-medium text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-5 h-5" />
              Return Home
            </motion.button>
          </Link>
        </motion.div>

        <div
          className="absolute bottom-0 left-0 right-0 h-8 bg-yellow-400/10 
        flex items-center justify-center"
        >
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex items-center gap-4"
          >
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-8 h-2 bg-yellow-400/50 skew-x-12" />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
