"use client";

import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, MoveRight, X, LogOut, LayoutDashboard, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { navItems } from '@/components/navbar/links';
import { supabase } from '@/lib/supabase';
import { AuthModal } from '@/components/client/AuthModal';

function Header1() {
    const [isOpen, setOpen] = useState(false);
    const [user, setUser] = useState<{ id: string } | null>(null);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setUser(data.user);
        });
        const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
            setUser(session?.user || null);
        });
        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    const handleSectionClick = (href: string) => {
        if (!href.startsWith('http') && !href.startsWith('/')) {
            const element = document.getElementById(href);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        } else {
            if (href.startsWith('http')) {
                window.open(href, '_blank');
            } else {
                router.push(href);
            }
        }
        setOpen(false);
    };

    return (
        <header className="w-full z-40 fixed top-0 left-0 bg-background/80 backdrop-blur-sm">
            <div className="container relative mx-auto min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center">
                <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
                    <NavigationMenu showViewport={false}>
                        <NavigationMenuList className="flex justify-start gap-4 flex-row">
                            {navItems.map((item) => (
                                <NavigationMenuItem key={item.title} className="relative">
                                    <NavigationMenuTrigger className="font-medium text-sm bg-transparent hover:bg-transparent">
                                        <item.IconComponent className="w-4 h-4 mr-2 opacity-70" />
                                        {item.title}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent 
                                        className="absolute left-1/2 -translate-x-1/2 w-full max-w-[calc(100vw-2rem)] p-4 rounded-lg data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out bg-background/95 backdrop-blur-xl shadow-xl"
                                    >
                                        <div className="flex flex-col gap-4">
                                            <div className="flex items-center gap-3 pb-2 border-b border-border/50">
                                                <div className="p-2 rounded-md bg-muted/50">
                                                    <item.IconComponent className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-base">{item.title}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {getNavigationDescription(item.title)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col text-sm space-y-1">
                                                {item.items.map((subItem) => (
                                                    <button
                                                        key={subItem.label}
                                                        onClick={() => handleSectionClick(subItem.href)}
                                                        disabled={subItem.comingSoon}
                                                        className={`group flex items-center justify-between py-2 px-3 rounded-md transition-all duration-200 ${
                                                            subItem.comingSoon 
                                                                ? 'opacity-50 cursor-not-allowed' 
                                                                : 'hover:bg-muted/80 hover:translate-x-1'
                                                        }`}
                                                    >
                                                        <span className="flex items-center gap-2">
                                                            {subItem.label}
                                                            {subItem.comingSoon && (
                                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-secondary/10 text-secondary border border-secondary/20">
                                                                    Soon
                                                                </span>
                                                            )}
                                                            {subItem.external && (
                                                                <span className="inline-flex items-center text-muted-foreground">
                                                                    <MoveRight className="w-3 h-3" />
                                                                </span>
                                                            )}
                                                        </span>
                                                        {!subItem.comingSoon && (
                                                            <MoveRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="flex lg:justify-center">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image
                            src="/logo-nbg.png"
                            alt="SafeCircle Logo"
                            width={32}
                            height={32}
                            className="w-8 h-8"
                        />
                        <span className="text-xl font-nothing tracking-wider">SafeCircle</span>
                    </Link>
                </div>

                <div className="flex justify-end w-full gap-4">
                    {user ? (
                        <NavigationMenu showViewport={false}>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="bg-transparent hover:bg-transparent p-0 h-auto">
                                        <div className="w-8 h-8 rounded-full overflow-hidden">
                                            <Image
                                                src="/default-avatar.svg"
                                                alt="User avatar"
                                                width={32}
                                                height={32}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent 
                                        className="min-w-[240px] rounded-lg p-0 data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 bg-background/95 backdrop-blur-xl shadow-xl right-0"
                                    >
                                        <div className="px-3 py-2 border-b border-border/50">
                                            <p className="text-sm font-medium">My Account</p>
                                            <p className="text-xs text-muted-foreground">Manage your account settings</p>
                                        </div>
                                        <div className="flex flex-col py-1">
                                            <button 
                                                onClick={() => router.push('/dashboard')} 
                                                className="flex items-center gap-2 px-3 py-2 hover:bg-muted/80 hover:translate-x-1 transition-all duration-200 text-sm"
                                            >
                                                <LayoutDashboard className="w-4 h-4" />
                                                Dashboard
                                            </button>
                                            <button 
                                                onClick={() => router.push('/dashboard/settings')} 
                                                className="flex items-center gap-2 px-3 py-2 hover:bg-muted/80 hover:translate-x-1 transition-all duration-200 text-sm"
                                            >
                                                <Settings className="w-4 h-4" />
                                                Settings
                                            </button>
                                            <button 
                                                onClick={async () => {
                                                    await supabase.auth.signOut();
                                                    setUser(null);
                                                }} 
                                                className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-muted/80 hover:translate-x-1 transition-all duration-200 text-sm"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Logout
                                            </button>
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    ) : (
                        <Button onClick={() => setAuthModalOpen(true)}>
                            Sign In
                        </Button>
                    )}
                </div>

                {/* Mobile menu button */}
                <div className="flex w-12 shrink lg:hidden items-end justify-end">
                    <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                    {isOpen && (
                        <div className="absolute top-20 flex flex-col w-full right-0 bg-background/95 backdrop-blur-xl shadow-xl py-4 container gap-6">
                            {navItems.map((item) => (
                                <div key={item.title} className="space-y-3">
                                    <div className="flex items-center gap-3 pb-2 border-b border-border/50">
                                        <div className="p-2 rounded-md bg-muted/50">
                                            <item.IconComponent className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium">{item.title}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {getNavigationDescription(item.title)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-1 pl-2">
                                        {item.items.map((subItem) => (
                                            <button
                                                key={subItem.label}
                                                onClick={() => handleSectionClick(subItem.href)}
                                                disabled={subItem.comingSoon}
                                                className={`group flex items-center justify-between w-full py-2 px-3 rounded-md transition-all duration-200 ${
                                                    subItem.comingSoon 
                                                        ? 'opacity-50 cursor-not-allowed' 
                                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/80 hover:translate-x-1'
                                                }`}
                                            >
                                                <span className="flex items-center gap-2">
                                                    {subItem.label}
                                                    {subItem.comingSoon && (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-secondary/10 text-secondary border border-secondary/20">
                                                            Soon
                                                        </span>
                                                    )}
                                                    {subItem.external && (
                                                        <span className="inline-flex items-center text-muted-foreground">
                                                            <MoveRight className="w-3 h-3" />
                                                        </span>
                                                    )}
                                                </span>
                                                {!subItem.comingSoon && (
                                                    <MoveRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <AuthModal 
                show={authModalOpen}
                onClose={() => setAuthModalOpen(false)} 
            />
        </header>
    );
}

// Helper function to get navigation descriptions
function getNavigationDescription(section: string): string {
    switch (section) {
        case 'Platform':
            return 'Discover our comprehensive safety and privacy solutions';
        case 'Developers':
            return 'Build and integrate with our secure API and SDKs';
        case 'Community':
            return 'Connect with other parents and safety advocates';
        case 'Token':
            return 'Participate in our decentralized governance system';
        default:
            return '';
    }
}

export { Header1 };