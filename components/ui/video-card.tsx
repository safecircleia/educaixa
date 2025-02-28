'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useState, useRef } from 'react';

interface VideoCardProps {
  title: string;
  duration?: string;
  subtitle?: string;
  className?: string;
  thumbnailUrl?: string;
}

export const VideoCard = ({
  title,
  duration = "2:30",
  subtitle = "Watch the demo",
  className = "",
  thumbnailUrl,
}: VideoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={playerRef}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/50 backdrop-blur-sm border border-white/10">
        {/* Background Image */}
        {thumbnailUrl && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{ backgroundImage: `url(${thumbnailUrl})` }}
          />
        )}

        {/* Simple gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Player Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Play Button */}
          <motion.div
            initial={false}
            animate={{
              scale: isHovered ? 1.1 : 1,
              opacity: isHovered ? 1 : 0.9,
            }}
            transition={{ duration: 0.2 }}
            className="relative mb-6"
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="relative w-16 h-16 rounded-full bg-[#4dc8ff] flex items-center justify-center 
                       hover:bg-[#5dceff] transition-colors"
            >
              <Play className="w-6 h-6 text-black fill-black" />
            </motion.button>
          </motion.div>

          {/* Text Content */}
          <div className="text-center space-y-3">
            <h3 className="text-xl font-semibold text-[#4dc8ff]">
              {title}
            </h3>
            <p className="text-sm text-gray-400">{subtitle} ({duration})</p>
          </div>
        </div>

        {/* Simple progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-4"
        >
          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-[#4dc8ff] w-0" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};