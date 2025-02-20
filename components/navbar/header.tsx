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
            <div className="container relative mx-auto min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center">
                <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
                    <NavigationMenu className="flex justify-start items-start">
                        <NavigationMenuList className="flex justify-start gap-4 flex-row">
                            {navItems.map((item) => (
                                <NavigationMenuItem key={item.title}>
                                    {item.href ? (
                                        <NavigationMenuLink asChild>
                                            <Link 
                                                href={item.href} 
                                                className="text-base font-semibold text-white/90 hover:text-white transition-colors"
                                            >
                                                {item.title}
                                            </Link>
                                        </NavigationMenuLink>
                                    ) : (
                                        <>
                                            <NavigationMenuTrigger className="text-base font-semibold text-white/90 hover:text-white transition-colors">
                                                {item.title}
                                            </NavigationMenuTrigger>
                                            <NavigationMenuContent className="!w-[700px] p-6 bg-background/95 backdrop-blur-md border border-white/10 shadow-xl">
                                                <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                                                    <div className="flex flex-col h-full justify-between">
                                                        <div className="flex flex-col space-y-2">
                                                            <p className="text-lg font-semibold text-white">{item.title}</p>
                                                            <p className="text-sm text-white/80">{item.description}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col text-base font-normal h-full justify-end space-y-1">
                                                        {item.items?.map((subItem) => {
                                                            const Icon = subItem.icon as LucideIcon;
                                                            const MenuLink = (
                                                                <NavigationMenuLink
                                                                    href={subItem.comingSoon ? "#" : subItem.href}
                                                                    key={subItem.label}
                                                                    className={`group flex flex-row justify-between items-center hover:bg-white/10 py-2 px-4 rounded transition-colors ${
                                                                        subItem.comingSoon ? 'opacity-60 cursor-not-allowed' : ''
                                                                    }`}
                                                                    onClick={(e) => {
                                                                        if (subItem.comingSoon) {
                                                                            e.preventDefault();
                                                                        }
                                                                    }}
                                                                >
                                                                    <div className="flex items-center gap-3">
                                                                        {Icon && (
                                                                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-colors ${
                                                                                subItem.comingSoon ? 'from-gray-500/20 to-gray-500/20' : ''
                                                                            }`}>
                                                                                <Icon className="w-4 h-4 text-blue-400" />
                                                                            </div>
                                                                        )}
                                                                        <div className="flex flex-col">
                                                                            <span className="text-sm font-medium text-white">
                                                                                {subItem.label}
                                                                            </span>
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
                                                                        <MoveRight className="w-4 h-4 text-white/70 group-hover:translate-x-0.5 transition-transform" />
                                                                    )}
                                                                </NavigationMenuLink>
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
                                            </NavigationMenuContent>
                                        </>
                                    )}
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="flex lg:justify-center items-center">
                    <Image src="/logo-nbg.png" alt="Logo" width={40} height={40} className="mr-2" />
                    <p className="font-semibold text-xl">SafeCircle</p>
                </div>

                <div className="flex justify-end w-full gap-4">
                    {user ? (
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger asChild>
                                <button className="flex items-center rounded-full focus:outline-none">
                                    <Image src="/default-avatar.svg" alt="Avatar" width={40} height={40} className="rounded-full" />
                                </button>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content className="mt-2 rounded-md bg-background shadow-lg p-2 w-56">
                                {/* Display user info */}
                                <DropdownMenu.Label className="px-2 py-1 text-sm font-medium text-white">
                                    {user.user_metadata?.full_name || user.email}
                                </DropdownMenu.Label>
                                <DropdownMenu.Label className="px-2 py-1 text-xs text-muted-foreground">
                                    {user.email}
                                </DropdownMenu.Label>
                                <div className="h-px bg-white/10 my-1"></div>
                                <DropdownMenu.Item
                                    className="cursor-pointer text-red-500 hover:bg-red-100 rounded-md px-2 py-1"
                                    onSelect={handleLogout}
                                >
                                    Logout
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    ) : (
                        <Button onClick={() => setShowAuthModal(true)} className="text-base font-semibold">
                            Iniciar Sesión
                        </Button>
                    )}
                </div>

                <div className="flex w-12 shrink lg:hidden items-end justify-end">
                    <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                    {isOpen && (
                        <div className="absolute top-20 border-t flex flex-col w-full right-0 bg-background/95 backdrop-blur-md shadow-lg py-4 container gap-4">
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
                                                                    >
                                                                        <div className="flex items-center gap-3">
                                                                            {Icon && (
                                                                                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-colors ${
                                                                                    subItem.comingSoon ? 'from-gray-500/20 to-gray-500/20' : ''
                                                                                }`}>
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
                    )}
                </div>
            </div>
            {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
        </header>
    );
}

export { Header1 };