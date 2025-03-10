"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./mobile-nav";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { MoveRight, X, AlertTriangle } from "lucide-react";
import { getNavItems } from "@/components/navbar/links";
import AuthModal from "@/components/client/AuthModal";
import { LucideIcon } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { supabase } from '@/lib/supabase';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '@/context/LanguageContext';

function Header1() {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [showTelegramAlert, setShowTelegramAlert] = useState(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('hideTelegramAlert');
            return stored ? false : true;
        }
        return true;
    });
    const [progressValue, setProgressValue] = useState(100);
    const [isHovered, setIsHovered] = useState(false);
    const { t, isLoading } = useLanguage();
    
    // Memoize nav items to prevent unnecessary recalculations
    const navItems = useMemo(() => !isLoading ? getNavItems(t) : [], [t, isLoading]);
    
    // Handle hiding the alert
    const hideTelegramAlert = useCallback(() => {
        setShowTelegramAlert(false);
        if (typeof window !== 'undefined') {
            localStorage.setItem('hideTelegramAlert', 'true');
        }
    }, []);
    
    // Reset localStorage when user exits webpage
    useEffect(() => {
        const handleBeforeUnload = () => {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('hideTelegramAlert');
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);
    
    // Handle user authentication
    useEffect(() => {
        const getUserSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
        };
        getUserSession();
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
        });
        return () => authListener?.subscription.unsubscribe();
    }, []);
    
    // Close AuthModal when user signs in
    useEffect(() => {
      if (user) {
        setShowAuthModal(false);
      }
    }, [user]);
    
    // Auto-hide telegram alert after 10 seconds with progress bar
    useEffect(() => {
        if (showTelegramAlert && !isHovered) {
            const totalDuration = 10000;
            const interval = 16;
            const decrementPerInterval = (interval / totalDuration) * 100;
            
            const progressInterval = setInterval(() => {
                setProgressValue(prev => {
                    const newValue = Math.max(prev - decrementPerInterval, 0);
                    if (newValue === 0) {
                        hideTelegramAlert();
                    }
                    return newValue;
                });
            }, interval);
            
            return () => {
                clearInterval(progressInterval);
            };
        } else if (isHovered) {
            setProgressValue(100);
        }
    }, [showTelegramAlert, isHovered, hideTelegramAlert]);
    
    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
    };
    
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    return (
        <>
            {/* Telegram Warning Banner */}
            {!isLoading && showTelegramAlert && (
                <div 
                    className="fixed w-full z-[60] top-0 left-0 bg-gradient-to-r from-red-950/80 via-background/95 to-red-950/80 text-white shadow-lg backdrop-blur-md border-b border-red-500/20"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="container mx-auto flex flex-col relative">
                        <div className="flex items-center justify-between py-3 px-4">
                            <div className="flex items-center space-x-3 mx-auto text-center">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500/10 to-red-500/5 flex items-center justify-center flex-shrink-0 border border-red-500/20">
                                    <AlertTriangle className="h-4 w-4 text-red-400" />
                                </div>
                                <p className="text-sm sm:text-base font-medium">
                                    {t('navbar.telegramWarning.description')}{' '}
                                    <a 
                                        href="https://t.me/safecirclehub" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="font-semibold text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-4 decoration-blue-500/30"
                                    >
                                        https://t.me/safecirclehub
                                    </a>
                                    <span className="font-bold text-red-400/90">{' '}{t('navbar.telegramWarning.warning')}</span>
                                </p>
                            </div>
                            <button 
                                onClick={hideTelegramAlert}
                                className="text-white/60 hover:text-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1.5 transition-colors hover:bg-white/5"
                                aria-label={t('navbar.telegramWarning.close')}
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                        
                        {/* Modern Progress Bar */}
                        <div className="absolute bottom-0 left-0 w-full overflow-hidden h-[2px]">
                            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-red-500/10 to-transparent" />
                            <div 
                                className={`absolute inset-0 bg-gradient-to-r from-red-400 via-blue-400 to-red-400 transition-transform will-change-transform${
                                    isHovered ? ' duration-150' : ' duration-100'
                                }`}
                                style={{ 
                                    transform: `translateX(${progressValue - 100}%)`,
                                    opacity: isHovered ? '0.9' : '0.7'
                                }}
                            />
                            <div 
                                className="absolute inset-0 blur-sm bg-gradient-to-r from-red-400/30 via-blue-400/30 to-red-400/30"
                                style={{ 
                                    transform: `translateX(${progressValue - 100}%)`,
                                    opacity: isHovered ? '0.4' : '0.2'
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
            
            <header className={`w-full z-50 fixed ${showTelegramAlert && !isLoading ? 'top-[52px] sm:top-[52px]' : 'top-0'} left-0 transition-all duration-300 ${
                scrolled ? 'bg-background/40 backdrop-blur-md shadow-lg' : 'bg-transparent'
            }`}>
                <div className="container relative mx-auto min-h-16 sm:min-h-20 flex items-center px-4">
                    {/* Logo Section */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-90 transition-opacity">
                            <Image
                                src="/logo-nbg.webp" 
                                alt="SafeCircle Logo" 
                                width={50} 
                                height={50} 
                                className="w-10 h-10 sm:w-15 sm:h-15"
                            />
                            <span className="font-semibold text-lg sm:text-xl bg-gradient-to-r from-black to-black/90 bg-clip-text text-transparent">
                                SafeCircle
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        {!isLoading && (
                            <NavigationMenu>
                                <NavigationMenuList>
                                    {navItems.map((item) => (
                                        <NavigationMenuItem key={item.title} className="relative">
                                            {item.href ? (
                                                <Link 
                                                    href={item.href} 
                                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-black/90 hover:text-black hover:bg-black/5 rounded-lg transition-all"
                                                >
                                                    {item.title}
                                                </Link>
                                            ) : (
                                                <>
                                                    <NavigationMenuTrigger className="px-4 py-2 text-sm font-medium text-black/90 hover:text-black data-[state=open]:bg-black/5 rounded-lg transition-all">
                                                        {item.title}
                                                    </NavigationMenuTrigger>
                                                    <NavigationMenuContent>
                                                        <div className="min-w-[400px] lg:min-w-[500px] p-4">
                                                            <ul className="min-w-[400px] lg:min-w-[500px] p-4">
                                                                <div className="flex flex-col gap-4">
                                                                    <div className="space-y-2">
                                                                        <h3 className="text-lg font-semibold text-black">
                                                                            {item.title}
                                                                        </h3>
                                                                        <p className="text-sm text-black/90 leading-relaxed">
                                                                            {item.description}
                                                                        </p>
                                                                    </div>
                                                                    <div className="grid gap-2">
                                                                        {item.items?.map((subItem) => {
                                                                            const Icon = subItem.icon as LucideIcon;
                                                                            const MenuLink = (
                                                                                <Link
                                                                                    key={subItem.label}
                                                                                    href={subItem.comingSoon ? "#" : subItem.href}
                                                                                    className="group flex items-center justify-between p-2 rounded-lg hover:bg-black/10 transition-all"
                                                                                    onClick={(e) => {
                                                                                        if (subItem.comingSoon) {
                                                                                            e.preventDefault();
                                                                                        }
                                                                                    }}
                                                                                    target={subItem.external ? "_blank" : undefined}
                                                                                    rel={subItem.external ? "noopener noreferrer" : undefined}
                                                                                >
                                                                                    <div className="flex items-center gap-3 flex-1">
                                                                                        {Icon && (
                                                                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center group-hover:from-blue-500/20 group-hover:to-cyan-500/20 transition-colors">
                                                                                                <Icon className="w-4 h-4 text-blue-400" />
                                                                                            </div>
                                                                                        )}
                                                                                        <div className="flex flex-col">
                                                                                            <span className="text-sm font-medium text-black group-hover:text-black/90">
                                                                                                {subItem.label}
                                                                                            </span>
                                                                                            {subItem.description && (
                                                                                                <span className="text-xs text-black/60 group-hover:text-black/70">
                                                                                                    {subItem.description}
                                                                                                </span>
                                                                                            )}
                                                                                        </div>
                                                                                    </div>
                                                                                    {subItem.comingSoon ? (
                                                                                        <span className="ml-2 text-xs px-2 py-1 rounded-full bg-blue-950/60 text-blue-300 border border-blue-500/30">
                                                                                            {t('navbar.comingSoon')}
                                                                                        </span>
                                                                                    ) : (
                                                                                        <MoveRight className="w-4 h-4 text-black/40 group-hover:text-black/60 group-hover:translate-x-0.5 transition-all" />
                                                                                    )}
                                                                                </Link>
                                                                            );
                                                                            return subItem.external || subItem.comingSoon ? (
                                                                                <TooltipProvider key={subItem.label}>
                                                                                    <Tooltip>
                                                                                        <TooltipTrigger asChild>
                                                                                            {MenuLink}
                                                                                        </TooltipTrigger>
                                                                                        <TooltipContent>
                                                                                            {subItem.external ? t('navbar.externalLink') : 
                                                                                            subItem.comingSoon ? t('navbar.comingSoonDesc') : null}
                                                                                        </TooltipContent>
                                                                                    </Tooltip>
                                                                                </TooltipProvider>
                                                                            ) : MenuLink;
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            </ul>
                                                        </div>
                                                    </NavigationMenuContent>
                                                </>
                                            )}
                                        </NavigationMenuItem>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        )}
                    </div>

                    {/* Actions Section */}
                    <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0 ml-auto">
                        {/* Language Switcher */}
                        <div className="hidden sm:block">
                            <LanguageSwitcher />
                        </div>
                        
                        {user ? (
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger asChild>
                                    <button className="flex items-center rounded-full ring-offset-background transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                        <Image 
                                            src="/default-avatar.svg" 
                                            alt="User Avatar" 
                                            width={40} 
                                            height={40} 
                                            className="rounded-full w-8 h-8 sm:w-10 sm:h-10 aspect-square object-cover"
                                        />
                                    </button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content className="mt-2 w-56 rounded-lg bg-background/95 backdrop-blur-md border border-black/10 p-2 shadow-lg">
                                    <DropdownMenu.Label className="px-2 py-1.5 text-sm font-medium text-black">
                                        {user.user_metadata?.full_name || user.email}
                                    </DropdownMenu.Label>
                                    <DropdownMenu.Label className="px-2 py-1 text-xs text-black/60">
                                        {user.email}
                                    </DropdownMenu.Label>
                                    <div className="h-px bg-black/10 my-1.5"></div>
                                    <DropdownMenu.Item
                                        className="px-2 py-1.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-md cursor-pointer outline-none"
                                        onSelect={handleLogout}
                                    >
                                        {t('navbar.logout')}
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        ) : (
                            <Button 
                                onClick={() => setShowAuthModal(true)} 
                                className="px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                            >
                                {t('navbar.login')}
                            </Button>
                        )}
                        
                        {/* Mobile Navigation */}
                        <div className="lg:hidden">
                            <MobileNav />
                        </div>
                    </div>
                </div>
                {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
            </header>
        </>
    );
}

export { Header1 };