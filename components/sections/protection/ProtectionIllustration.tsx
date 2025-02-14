import React, { useEffect, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { Shield, AlertCircle, Check, Zap, ShieldCheck } from 'lucide-react';

interface Threat {
  id: string;
  x: number;
  y: number;
  angle: number;
  detected: boolean;
}

export const ProtectionIllustration = () => {
  const controls = useAnimationControls();
  const [threats, setThreats] = useState<Threat[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [detectionCount, setDetectionCount] = useState(0);

  useEffect(() => {
    const generateThreat = () => ({
      id: Math.random().toString(36).substr(2, 9),
      x: Math.random() * 360,
      y: Math.random() * 360,
      angle: Math.random() * 360,
      detected: false
    });

    const interval = setInterval(() => {
      const newThreat = generateThreat();
      setThreats(prev => [...prev, newThreat]);
      
      // Mark threat as detected after delay
      setTimeout(() => {
        setThreats(prev => 
          prev.map(t => 
            t.id === newThreat.id ? { ...t, detected: true } : t
          )
        );
        setDetectionCount(prev => prev + 1);
      }, 1000);

      // Remove threat after animation
      setTimeout(() => {
        setThreats(prev => prev.filter(t => t.id !== newThreat.id));
      }, 2000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const triggerScan = async () => {
    if (isScanning) return;
    setIsScanning(true);
    
    await controls.start({
      scale: [1, 1.1, 1],
      transition: { duration: 0.5, ease: "easeInOut" }
    });
    
    setIsScanning(false);
  };

  return (
    <div className="relative w-[400px] h-[400px] flex items-center justify-center">
      {/* Enhancement: Detection counter */}
      <motion.div 
        className="absolute top-2 right-2 bg-[#FFB800]/10 rounded-lg px-3 py-1 flex items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <ShieldCheck className="w-4 h-4 text-[#FFB800]" />
        <span className="text-sm font-mono text-[#FFB800]">{detectionCount}</span>
      </motion.div>

      {/* Radar background circles with pulse effect */}
      <div className="absolute inset-0">
        {[1, 2, 3, 4].map((ring) => (
          <motion.div
            key={ring}
            className="absolute inset-0 border border-[#FFB800]/10 rounded-full"
            style={{ scale: ring * 0.25 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [ring * 0.25, ring * 0.25 + 0.05, ring * 0.25]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: ring * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Enhanced rotating radar beam with gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute h-full w-1/2 origin-right">
          <div className="h-full w-full bg-gradient-to-l from-[#FFB800]/20 via-[#FFB800]/10 to-transparent" />
        </div>
      </motion.div>

      {/* Interactive central shield with ARIA labels */}
      <motion.button
        onClick={triggerScan}
        className="relative z-10 group"
        animate={controls}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Trigger protection scan"
        role="button"
        tabIndex={0}
      >
        <motion.div 
          className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FFB800]/20 to-[#FFB800]/5 backdrop-blur-sm flex items-center justify-center"
          animate={{ 
            boxShadow: [
              "0 0 20px rgba(251, 191, 36, 0.1)",
              "0 0 40px rgba(251, 191, 36, 0.2)",
              "0 0 20px rgba(251, 191, 36, 0.1)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Shield className="w-12 h-12 text-[#FFB800] transition-transform duration-300 group-hover:scale-110" />
        </motion.div>

        {/* Enhanced pulse effect */}
        {[1, 2].map((ring) => (
          <motion.div
            key={ring}
            className="absolute -inset-4 rounded-full border-2 border-[#FFB800]/20"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0, 0.2]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              delay: ring * 0.5
            }}
          />
        ))}
      </motion.button>

      {/* Enhanced threat indicators with status transitions */}
      {threats.map((threat) => (
        <motion.div
          key={threat.id}
          className="absolute"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1, 0.8],
          }}
          transition={{ duration: 2 }}
          style={{ 
            left: `${threat.x}px`,
            top: `${threat.y}px`,
            rotate: `${threat.angle}deg`
          }}
        >
          <motion.div
            className="relative w-6 h-6 rounded-lg flex items-center justify-center"
            animate={{
              backgroundColor: threat.detected ? "rgba(251, 191, 36, 0.1)" : "rgba(239, 68, 68, 0.1)",
              borderColor: threat.detected ? "rgba(251, 191, 36, 0.3)" : "rgba(239, 68, 68, 0.3)"
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{
                rotate: threat.detected ? 360 : 0,
                scale: threat.detected ? [1, 1.2, 1] : 1
              }}
              transition={{ duration: 0.3 }}
            >
              {threat.detected ? (
                <Check className="w-4 h-4 text-[#FFB800]" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-500" />
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      ))}

      {/* Protection status indicators */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`protection-${i}`}
          className="absolute"
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: -i * 2,
            ease: "linear"
          }}
        >
          <motion.div
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              transform: `rotate(${i * 90}deg) translateY(-120px)`
            }}
          >
            <motion.div
              className="w-8 h-8 -ml-4 -mt-4 rounded-lg bg-[#FFB800]/10 backdrop-blur-sm p-1.5"
              whileHover={{ 
                scale: 1.2,
                backgroundColor: "rgba(251, 191, 36, 0.2)"
              }}
              transition={{
                scale: { type: "spring", stiffness: 300 }
              }}
            >
              {i % 2 === 0 ? (
                <Check className="w-full h-full text-[#FFB800]" />
              ) : (
                <Zap className="w-full h-full text-[#FFB800]" />
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      ))}

      {/* Enhanced scanning line effect */}
      <motion.div
        className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FFB800]/40 to-transparent"
        animate={{
          top: ["0%", "100%"],
          opacity: [0, 1, 0],
          scaleX: [0.8, 1, 0.8]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};