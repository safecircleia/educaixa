"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, MoveRight, X, ChevronDown } from "lucide-react";
import { navItems } from "@/components/navbar/links";
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

function Header1() {
    const [isOpen, setOpen] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);

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
        <header className={`w-full z-40 fixed top-0 left-0 transition-all duration-300 ${
            scrolled ? 'bg-background/40 backdrop-blur-md border-b border-white/10 shadow-lg' : 'bg-transparent'
        }`}>
            <div className="container relative mx-auto min-h-20 flex items-center px-4">
                {/* Logo Section */}
                <div className="flex-shrink-0">
                    <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                        <Image 
                            src="/logo-nbg.png" 
                            alt="SafeCircle Logo" 
                            width={40} 
                            height={40} 
                            className="w-10 h-10"
                        />
                        <span className="font-semibold text-xl bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
                            SafeCircle
                        </span>
                    </Link>
                </div>

                {/* Navigation Section */}
                <div className="hidden lg:flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <NavigationMenu>
                        <NavigationMenuList>
                            {navItems.map((item) => (
                                <NavigationMenuItem key={item.title} className="relative">
                                    {item.href ? (
                                        <Link 
                                            href={item.href} 
                                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                                        >
                                            {item.title}
                                        </Link>
                                    ) : (
                                        <>
                                            <NavigationMenuTrigger className="px-4 py-2 text-sm font-medium text-white/90 hover:text-white data-[state=open]:bg-white/5 rounded-lg transition-all">
                                                {item.title}
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent>
                                                <div className="min-w-[400px] lg:min-w-[500px] p-4">
                                                    <ul className="min-w-[400px] lg:min-w-[500px] p-4">
                                                        <div className="flex flex-col gap-4">
                                                            <div className="space-y-2">
                                                                <h3 className="text-lg font-semibold text-white">
                                                                    {item.title}
                                                                </h3>
                                                                <p className="text-sm text-white/90 leading-relaxed">
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
                                                                            className="group flex items-center justify-between p-2 rounded-lg hover:bg-white/10 transition-all"
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
                                                                                    <span className="text-sm font-medium text-white group-hover:text-white/90">
                                                                                        {subItem.label}
                                                                                    </span>
                                                                                    {subItem.description && (
                                                                                        <span className="text-xs text-white/60 group-hover:text-white/70">
                                                                                            {subItem.description}
                                                                                        </span>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                            {subItem.comingSoon ? (
                                                                                <span className="ml-2 text-xs px-2 py-1 rounded-full bg-blue-950/60 text-blue-300 border border-blue-500/30">
                                                                                    Próximamente
                                                                                </span>
                                                                            ) : (
                                                                                <MoveRight className="w-4 h-4 text-white/40 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all" />
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
                                                                                    {subItem.external ? 'Opens in new tab' : 
                                                                                     subItem.comingSoon ? 'This feature is coming soon!' : null}
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
                </div>

                {/* Actions Section */}
                <div className="flex items-center gap-4 flex-shrink-0 ml-auto">
                    {user ? (
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger asChild>
                                <button className="flex items-center rounded-full ring-offset-background transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                    <Image 
                                        src="/default-avatar.svg" 
                                        alt="User Avatar" 
                                        width={40} 
                                        height={40} 
                                        className="rounded-full w-10 h-10 aspect-square object-cover"
                                    />
                                </button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content className="mt-2 w-56 rounded-lg bg-background/95 backdrop-blur-md border border-white/10 p-2 shadow-lg">
                                <DropdownMenu.Label className="px-2 py-1.5 text-sm font-medium text-white">
                                    {user.user_metadata?.full_name || user.email}
                                </DropdownMenu.Label>
                                <DropdownMenu.Label className="px-2 py-1 text-xs text-white/60">
                                    {user.email}
                                </DropdownMenu.Label>
                                <div className="h-px bg-white/10 my-1.5"></div>
                                <DropdownMenu.Item
                                    className="px-2 py-1.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-md cursor-pointer outline-none"
                                    onSelect={handleLogout}
                                >
                                    Cerrar Sesión
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    ) : (
                        <Button 
                            onClick={() => setShowAuthModal(true)} 
                            className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
                        >
                            Iniciar Sesión
                        </Button>
                    )}

                    {/* Mobile Menu Button */}
                    <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setOpen(!isOpen)}
                        className="lg:hidden"
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="absolute top-full left-0 right-0 border-t border-white/10 bg-background/95 backdrop-blur-md shadow-lg lg:hidden">
                        <div className="container mx-auto py-4 px-4 space-y-4">
                            {navItems.map((item) => (
                                <div key={item.title} className="border-b border-white/10 last:border-none pb-4">
                                    <div className="flex flex-col gap-2 px-4">
                                        {item.href ? (
                                            <Link 
                                                href={item.href} 
                                                className="flex justify-between items-center text-base font-semibold text-white hover:text-white/90 transition-colors py-2"
                                                onClick={() => setOpen(false)}
                                            >
                                                <span>{item.title}</span>
                                                <MoveRight className="w-4 h-4 stroke-1 text-white/70" />
                                            </Link>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => setOpenMobileSection(openMobileSection === item.title ? null : item.title)}
                                                    className="flex justify-between items-center text-base font-semibold text-white py-2"
                                                >
                                                    <span>{item.title}</span>
                                                    <ChevronDown 
                                                        className={`w-4 h-4 transition-transform ${
                                                            openMobileSection === item.title ? 'rotate-180' : ''
                                                        }`} 
                                                    />
                                                </button>
                                                {openMobileSection === item.title && (
                                                    <div className="space-y-2 mt-2">
                                                        <p className="text-sm text-white/80 mb-4">{item.description}</p>
                                                        <div className="space-y-2 pl-2">
                                                            {item.items?.map((subItem) => {
                                                                const Icon = subItem.icon as LucideIcon;
                                                                const MobileLink = (
                                                                    <Link
                                                                        key={subItem.label}
                                                                        href={subItem.comingSoon ? "#" : subItem.href}
                                                                        className={`group flex justify-between items-center py-2 text-sm text-white hover:text-white/90 transition-colors ${
                                                                            subItem.comingSoon ? 'opacity-60 cursor-not-allowed' : ''
                                                                        }`}
                                                                        onClick={(e) => {
                                                                            if (subItem.comingSoon) {
                                                                                e.preventDefault();
                                                                            } else {
                                                                                setOpen(false);
                                                                            }
                                                                        }}
                                                                        target={subItem.external ? "_blank" : undefined}
                                                                        rel={subItem.external ? "noopener noreferrer" : undefined}
                                                                    >
                                                                        <div className="flex items-center gap-3">
                                                                            {Icon && (
                                                                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-colors">
                                                                                    <Icon className="w-4 h-4 text-blue-400" />
                                                                                </div>
                                                                            )}
                                                                            <div className="flex flex-col">
                                                                                <span className="font-medium text-white">{subItem.label}</span>
                                                                                {subItem.description && (
                                                                                    <span className="text-xs text-white/70">
                                                                                        {subItem.description}
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                        {subItem.comingSoon ? (
                                                                            <span className="text-xs px-2 py-1 rounded-full bg-blue-950/60 text-blue-300 border border-blue-500/30">
                                                                                Próximamente
                                                                            </span>
                                                                        ) : (
                                                                            <MoveRight className="w-4 h-4 stroke-1 group-hover:translate-x-0.5 transition-transform text-white/70" />
                                                                        )}
                                                                    </Link>
                                                                );

                                                                return subItem.external || subItem.comingSoon ? (
                                                                    <TooltipProvider key={subItem.label}>
                                                                        <Tooltip>
                                                                            <TooltipTrigger asChild>
                                                                                {MobileLink}
                                                                            </TooltipTrigger>
                                                                            <TooltipContent>
                                                                                {subItem.external ? 'Opens in new tab' : 
                                                                                 subItem.comingSoon ? 'This feature is coming soon!' : null}
                                                                            </TooltipContent>
                                                                        </Tooltip>
                                                                    </TooltipProvider>
                                                                ) : MobileLink;
                                                            })}
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
        </header>
    );
}

export { Header1 };