'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, useAnimationControls, AnimatePresence } from 'framer-motion';
import { Lock, Shield, Key, FileText, RefreshCcw, Check } from 'lucide-react';

const BinaryStream = React.memo(({ className = '' }: { className?: string }) => {
  const [binary, setBinary] = useState('');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setBinary(Array(8).fill(0).map(() => Math.random() > 0.5 ? '1' : '0').join(''));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`font-mono text-xs ${className}`} aria-hidden="true">{binary}</div>
  );
});

const EncryptionEffect = React.memo(({ isActive }: { isActive: boolean }) => (
  <AnimatePresence>
    {isActive && (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          className="w-full h-full bg-gradient-radial from-purple-500/20 via-transparent to-transparent"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 1,
            repeat: 1,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    )}
  </AnimatePresence>
));

const OrbitalIcon = React.memo(({ 
  Icon, 
  delay, 
  distance, 
  color, 
  label, 
  index, 
  isActive, 
  onActivate, 
  onDeactivate 
}: {
  Icon: typeof Lock;
  delay: number;
  distance: number;
  color: string;
  label: string;
  index: number;
  isActive: boolean;
  onActivate: (index: number) => void;
  onDeactivate: (index: number) => void;
}) => (
  <motion.div
    className="absolute inset-0"
    animate={{ rotate: 360 }}
    transition={{
      duration: 20,
      repeat: Infinity,
      ease: "linear",
      delay: -delay
    }}
  >
    <motion.div
      className="absolute top-1/2 left-1/2"
      style={{
        transform: `rotate(${index * 90}deg) translateY(-${distance}px)`
      }}
    >
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
          delay: -delay
        }}
        className="relative group"
      >
        <motion.div
          role="button"
          tabIndex={0}
          className="w-12 h-12 rounded-xl bg-purple-500/10 backdrop-blur-sm p-2.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          whileHover={{ 
            scale: 1.2, 
            backgroundColor: "rgba(168, 85, 247, 0.2)",
          }}
          onHoverStart={() => onActivate(index)}
          onHoverEnd={() => onDeactivate(index)}
          onFocus={() => onActivate(index)}
          onBlur={() => onDeactivate(index)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onActivate(index);
            }
          }}
          style={{
            boxShadow: `0 0 15px ${color}20`,
            border: `1px solid ${color}30`
          }}
        >
          <Icon className="w-full h-full" style={{ color }} />
        </motion.div>
        
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 rounded-lg backdrop-blur-sm text-sm whitespace-nowrap"
              style={{
                backgroundColor: `${color}20`,
                color,
                boxShadow: `0 0 10px ${color}10`,
                border: `1px solid ${color}30`
              }}
              role="tooltip"
            >
              {label}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  </motion.div>
));

OrbitalIcon.displayName = 'OrbitalIcon';

export const PrivacyIllustration = () => {
  const controls = useAnimationControls();
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [activeIcon, setActiveIcon] = useState<number | null>(null);

  const orbitalIcons = useMemo(() => [
    { Icon: Key, delay: 0, distance: 120, color: "rgb(168, 85, 247)", label: "End-to-End Encryption" },
    { Icon: Shield, delay: 4, distance: 140, color: "rgb(139, 92, 246)", label: "Data Protection" },
    { Icon: FileText, delay: 8, distance: 110, color: "rgb(124, 58, 237)", label: "Secure Documents" },
    { Icon: Check, delay: 12, distance: 130, color: "rgb(109, 40, 217)", label: "Verified Privacy" }
  ], []);

  const triggerEncryption = useCallback(async () => {
    if (isEncrypting) return;
    setIsEncrypting(true);
    
    await controls.start({
      scale: [1, 1.1, 1],
      rotate: [0, 360],
      transition: { duration: 1.5, ease: "easeInOut" }
    });

    controls.start("success");
    
    setTimeout(() => {
      controls.set("initial");
      setIsEncrypting(false);
    }, 2000);
  }, [controls, isEncrypting]);

  return (
    <div 
      className="relative w-full h-[400px] flex items-center justify-center overflow-hidden"
      role="img"
      aria-label="Interactive privacy and encryption visualization"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-purple-500/5 via-transparent to-transparent animate-pulse" />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
              "radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)",
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {/* Binary Streams with Improved Visual Effect */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`stream-${i}`}
          className="absolute"
          initial={{ opacity: 0, y: -50 }}
          animate={{ 
            opacity: [0, 0.7, 0],
            y: [-50, 50],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "linear"
          }}
          style={{
            left: `${10 + (i * 12)}%`,
            color: `rgba(168, 85, 247, ${0.4 - (i * 0.05)})`,
            filter: 'blur(0.5px)',
          }}
        >
          <BinaryStream />
        </motion.div>
      ))}

      {/* Interactive Central Lock with Enhanced Effects */}
      <motion.button
        onClick={triggerEncryption}
        className="relative z-10 backdrop-blur-xl group cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/50 rounded-2xl"
        aria-label="Trigger encryption animation"
        initial="initial"
        animate={controls}
        variants={{
          initial: { scale: 1 },
          success: {
            scale: [1, 1.2, 1],
            transition: { duration: 0.5 }
          }
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div 
          className="w-28 h-28 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-500/10 flex items-center justify-center transition-all duration-300 group-hover:from-purple-500/30 group-hover:to-purple-500/20"
          animate={{ 
            boxShadow: isEncrypting
              ? [
                  "0 0 20px rgba(168, 85, 247, 0.2)",
                  "0 0 40px rgba(168, 85, 247, 0.4)",
                  "0 0 20px rgba(168, 85, 247, 0.2)"
                ]
              : "0 0 20px rgba(168, 85, 247, 0.1)"
          }}
          transition={{ duration: 2, repeat: isEncrypting ? Infinity : 0 }}
        >
          <AnimatePresence mode="wait">
            {isEncrypting ? (
              <motion.div
                key="encrypting"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <RefreshCcw className="w-12 h-12 text-purple-500 animate-spin" />
              </motion.div>
            ) : (
              <motion.div
                key="lock"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <Lock className="w-12 h-12 text-purple-500 transition-transform duration-300 group-hover:scale-110" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <EncryptionEffect isActive={isEncrypting} />
      </motion.button>

      {/* Orbiting Icons */}
      <div className="absolute inset-0">
        {orbitalIcons.map((icon, index) => (
          <OrbitalIcon
            key={index}
            {...icon}
            index={index}
            isActive={activeIcon === index}
            onActivate={setActiveIcon}
            onDeactivate={() => setActiveIcon(null)}
          />
        ))}
      </div>

      {/* Enhanced Particle System with Color Gradients */}
      {[...Array(16)].map((_, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: `linear-gradient(45deg, rgba(168,85,247,0.4), rgba(139,92,246,0.4))`,
            boxShadow: '0 0 5px rgba(168,85,247,0.2)'
          }}
          initial={{ 
            scale: 0,
            x: 0,
            y: 0,
            opacity: 0
          }}
          animate={{ 
            scale: [0, 1, 0],
            x: [0, (Math.random() - 0.5) * 300],
            y: [0, (Math.random() - 0.5) * 300],
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: 2 + Math.random(),
            repeat: Infinity,
            delay: index * 0.15,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};