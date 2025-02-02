'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const scrambleChars = '!<>-_\\/[]{}—=+*^?#_______';

interface TextScrambleProps {
  text: string;
  delay?: number;
  className?: string;
  highlight?: boolean;
  scrambleSpeed?: number;
}

export const TextScramble = ({ 
  text, 
  delay = 0, 
  className = '',
  highlight = false,
  scrambleSpeed = 3 // Higher number = faster animation
}: TextScrambleProps) => {
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let frame = 0;
    let iteration = 0;
    const frameRate = 30;
    
    const animate = () => {
      setIsAnimating(true);
      const newText = text
        .split('')
        .map((char, index) => {
          if (index < iteration) return char;
          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        })
        .join('');

      setDisplayText(newText);
      
      if (iteration >= text.length) {
        setIsAnimating(false);
        return;
      }

      if (frame % scrambleSpeed === 0) {
        iteration++;
      }
      
      frame++;
      setTimeout(animate, 1000 / frameRate);
    };

    const timeout = setTimeout(() => animate(), delay);
    return () => clearTimeout(timeout);
  }, [text, delay, scrambleSpeed]);

  return (
    <motion.span 
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        color: isAnimating 
          ? '#4dc8ff' 
          : highlight 
            ? 'rgba(77, 200, 255, 0.95)' 
            : 'rgba(255, 255, 255, 0.8)',
      }}
      transition={{ 
        duration: 0.3,
        type: "spring",
        stiffness: 400,
        damping: 30
      }}
      className={`${className} ${highlight ? 'font-medium' : ''}`}
    >
      {displayText}
    </motion.span>
  );
};
