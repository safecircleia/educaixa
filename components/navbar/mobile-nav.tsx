"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { links } from "./links";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

/**
 * Mobile navigation component that follows accessibility best practices
 * and implements smooth animations with Framer Motion
 */
export function MobileNav() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);

  // Close the mobile menu when pathname changes (navigation occurs)
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Animation variants for menu items
  const itemVariants = {
    hidden: { opacity: 0, x: -16 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
    exit: {
      opacity: 0,
      x: -8,
      transition: {
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="p-2 text-slate-700 hover:text-slate-900"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-full flex-col bg-white pt-6 sm:max-w-sm"
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
            <img src="/logo.svg" alt="Logo" className="h-6 w-6" />
            <span className="font-semibold text-lg text-slate-800">SafeCircle</span>
          </Link>
          <Button
            variant="ghost"
            className="p-2 text-slate-600 hover:text-slate-900"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="mt-6 flex flex-col space-y-1">
          <AnimatePresence mode="wait">
            {links.map((link, i) => {
              const isActive = pathname === link.href;
              
              return (
                <motion.div
                  key={link.href}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full"
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "group flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition-all",
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-700 hover:bg-blue-50/50 hover:text-blue-600"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{t(link.label) || link.label}</span>
                    <ChevronRight 
                      className={cn(
                        "h-4 w-4 transition-transform",
                        isActive ? "text-blue-600" : "text-slate-400 group-hover:text-blue-500",
                        "group-hover:translate-x-1"
                      )} 
                    />
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </nav>
        
        <div className="mt-auto border-t border-slate-100 pt-4">
          <div className="flex flex-col space-y-3 px-3 pb-4">
            <Link
              href="/token"
              className={cn(
                "flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium",
                "border border-blue-100 hover:border-blue-200",
                "text-slate-700 hover:text-slate-800",
                "transition-all duration-200",
                "bg-gradient-to-r from-blue-50 to-blue-100/50 hover:from-blue-100 hover:to-blue-200/50"
              )}
              onClick={() => setIsOpen(false)}
            >
              {t("nav.token") || "Token"}
            </Link>
            <Link
              href="#get-started"
              className={cn(
                "flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium",
                "text-white",
                "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600",
                "transition-all duration-200 shadow-sm hover:shadow"
              )}
              onClick={() => setIsOpen(false)}
            >
              {t("nav.getStarted") || "Get Started"}
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}