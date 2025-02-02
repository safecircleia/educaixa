'use client';

import { motion } from 'framer-motion';

interface PhantomIconProps {
  className?: string;
  animate?: boolean;
}

export const PhantomIcon = ({ className = '', animate = false }: PhantomIconProps) => {
  const iconVariants = {
    initial: { rotate: 0 },
    animate: { rotate: 360 },
  };

  return (
    <motion.svg
      width="24"
      height="24"
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      variants={iconVariants}
      animate={animate ? "animate" : "initial"}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <motion.path
        d="M124 47.4V77.6C124 89.2 117.6 99.8 107.2 105.4L81.2 120.4C70.8 126 58 126 47.6 120.4L21.6 105.4C11.2 99.8 4.80005 89.2 4.80005 77.6V47.4C4.80005 35.8 11.2 25.2 21.6 19.6L47.6 4.60001C58 -1.00001 70.8 -1.00001 81.2 4.60001L107.2 19.6C117.6 25.2 124 35.8 124 47.4Z"
        fill="url(#phantom_gradient)"
      />
      <motion.path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M81.5 45.8H51.3C50.4 45.8 49.7 46.5 49.7 47.4V78.7C49.7 79.6 50.4 80.3 51.3 80.3H81.5C82.4 80.3 83.1 79.6 83.1 78.7V47.4C83.1 46.5 82.4 45.8 81.5 45.8ZM77.2 71.6H55.6V51.7H77.2V71.6Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="phantom_gradient"
          x1="64.4"
          y1="0"
          x2="64.4"
          y2="125"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4DC8FF" />
          <stop offset="1" stopColor="#38BDF8" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
};
