"use client";

import React, { useRef, useEffect, ElementType } from "react";
import { motion, useAnimation, useReducedMotion, Variant, MotionProps, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface FadeInProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  viewportOnce?: boolean;
  viewportMargin?: string;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  variants?: Record<string, Variant>;
  as?: ElementType;
  motionProps?: MotionProps;
}

export function FadeIn({
  children,
  className,
  viewportOnce = true,
  viewportMargin = "-50px",
  delay = 0,
  duration = 0.6,
  y = 20,
  x = 0,
  variants,
  as: Component = motion.div,
  motionProps = {},
  ...props
}: FadeInProps) {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Default variants with good performance settings
  const defaultVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : y, x: prefersReducedMotion ? 0 : x },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0, 
      transition: {
        duration: prefersReducedMotion ? 0 : duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Improved easing function
      }
    },
  };

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
          if (viewportOnce && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!viewportOnce) {
          controls.start("hidden");
        }
      },
      {
        root: null,
        rootMargin: viewportMargin,
        threshold: 0.1,
      }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls, viewportMargin, viewportOnce]);

  return (
    <Component
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={controls}
      variants={variants || defaultVariants}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  );
}

interface FadeInStaggerProps extends Omit<HTMLMotionProps<"div">, 'variants'> {
  children: React.ReactNode;
  className?: string;
  faster?: boolean;
  slower?: boolean;
  staggerDelay?: number;
}

export function FadeInStagger({
  children,
  className,
  faster = false,
  slower = false,
  staggerDelay: customStaggerDelay,
  ...props
}: FadeInStaggerProps) {
  // Calculate stagger delay based on preferences
  const staggerDelay = customStaggerDelay ?? (faster ? 0.05 : slower ? 0.15 : 0.1);
  
  const prefersReducedMotion = useReducedMotion();
  
  // Optimized stagger variants
  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  return (
    <motion.div
      className={cn("flex flex-col", className)}
      initial="hidden"
      animate="visible"
      variants={staggerVariants}
      {...props}
    >
      {children}
    </motion.div>
  );
}