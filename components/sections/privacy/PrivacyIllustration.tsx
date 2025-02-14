import React, { useEffect, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { Lock, Shield, Key, FileText, RefreshCcw } from 'lucide-react';

const BinaryStream = ({ className = '' }) => {
  const [binary, setBinary] = useState('');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setBinary(Array(8).fill(0).map(() => Math.random() > 0.5 ? '1' : '0').join(''));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`font-mono text-xs ${className}`}>{binary}</div>
  );
};

export const PrivacyIllustration = () => {
  const controls = useAnimationControls();
  const [isEncrypting, setIsEncrypting] = useState(false);

  const triggerEncryption = async () => {
    if (isEncrypting) return;
    setIsEncrypting(true);
    
    await controls.start({
      scale: [1, 1.1, 1],
      rotate: [0, 360],
      transition: { duration: 1.5, ease: "easeInOut" }
    });
    
    setIsEncrypting(false);
  };

  return (
    <div className="relative w-full h-[300px] flex items-center justify-center overflow-hidden">
      {/* Encryption process visualization */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Binary data streams */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`stream-${i}`}
            className="absolute"
            initial={{ opacity: 0, y: -50 }}
            animate={{ 
              opacity: [0, 1, 0],
              y: [-50, 50],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "linear"
            }}
            style={{
              left: `${15 + (i * 15)}%`,
              color: `rgba(168, 85, 247, ${0.3 - (i * 0.05)})`
            }}
          >
            <BinaryStream />
          </motion.div>
        ))}

        {/* Interactive Central Lock */}
        <motion.button
          onClick={triggerEncryption}
          className="relative z-10 backdrop-blur-xl group cursor-pointer"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={controls}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div 
            className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-500/10 flex items-center justify-center transition-colors duration-300 group-hover:from-purple-500/30 group-hover:to-purple-500/20"
            animate={{ 
              boxShadow: [
                "0 0 20px rgba(168, 85, 247, 0.1)",
                "0 0 40px rgba(168, 85, 247, 0.2)",
                "0 0 20px rgba(168, 85, 247, 0.1)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Lock className="w-12 h-12 text-purple-500 transition-transform duration-300 group-hover:scale-110" />
          </motion.div>

          <motion.div 
            className="absolute inset-0 border-2 border-dashed border-purple-500/20 rounded-2xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Hover effect ring */}
          <motion.div 
            className="absolute -inset-2 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-3xl border border-purple-500/30 animate-[ping_3s_ease-in-out_infinite]" />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Orbiting encryption symbols with hover effects */}
      <div className="absolute inset-0">
        {[
          { Icon: Key, delay: 0, distance: 100, color: "rgba(168, 85, 247, 0.8)" },
          { Icon: Shield, delay: 4, distance: 120, color: "rgba(168, 85, 247, 0.7)" },
          { Icon: FileText, delay: 8, distance: 90, color: "rgba(168, 85, 247, 0.6)" },
          { Icon: RefreshCcw, delay: 12, distance: 110, color: "rgba(168, 85, 247, 0.7)" }
        ].map(({ Icon, delay, distance, color }, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{
              duration: 16,
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
                  duration: 16,
                  repeat: Infinity,
                  ease: "linear",
                  delay: -delay
                }}
                className="w-10 h-10 rounded-xl bg-purple-500/10 backdrop-blur-sm p-2 cursor-pointer"
                whileHover={{ 
                  scale: 1.2, 
                  backgroundColor: "rgba(168, 85, 247, 0.2)",
                  boxShadow: `0 0 20px ${color}`
                }}
              >
                <Icon className="w-full h-full text-purple-400" />
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Dynamic particle field */}
      {[...Array(12)].map((_, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute w-1 h-1 rounded-full bg-purple-500/30"
          initial={{ 
            scale: 0,
            x: 0,
            y: 0,
            opacity: 0
          }}
          animate={{ 
            scale: [0, 1, 0],
            x: [0, (Math.random() - 0.5) * 200],
            y: [0, (Math.random() - 0.5) * 200],
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Enhanced gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-500/5 via-transparent to-transparent animate-pulse" />
      
      {/* Responsive radial rings */}
      {[40, 60, 80].map((size, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute rounded-full border border-purple-500/10"
          style={{ width: size * 2, height: size * 2 }}
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2 - (i * 0.05), 0.1 - (i * 0.02), 0.2 - (i * 0.05)]
          }}
          transition={{ 
            duration: 3 + i,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};