"use client" 
import { Poppins } from "next/font/google"
import Link from "next/link";
import {cn} from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { MenuIcon, SearchIcon, X, LogIn, UserPlus } from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { NavbarSidebar } from "./navbar-sidebar";
import { CartIcon } from "@/modules/checkout/ui/components/cart-icon";
import { Input } from "@/components/ui/input";
import { NavbarDropdown } from "./navbar-dropdown";
import { useResponsive } from "@/hooks/use-mobile";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchResults } from "@/modules/products/ui/components/search-results";
import { ClientOnly } from "@/components/client-only";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"],
});

interface NavbarItemProps {
    href: string;
    children: React.ReactNode;
    isActive?: boolean;
    className?: string;
}

// Responsive text sizing for navigation buttons
const getButtonTextSize = (windowWidth: number) => {
    if (windowWidth >= 768 && windowWidth < 1000) return "text-sm";
    if (windowWidth >= 1024 && windowWidth < 1430) return "text-sm";
    if (windowWidth >= 1430) return "text-sm"; // Slightly bigger text for desktop screens
    return "text-xs sm:text-sm";
};

// Responsive padding for navigation buttons
const getButtonPadding = (windowWidth: number) => {
    if (windowWidth >= 1024) return "px-2 py-1.5"; // Smaller padding for desktop
    return "px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2";
};

const NavbarItem = ({
    href,
    children,
    isActive,
    className,
}: NavbarItemProps) => {
    const { windowWidth } = useResponsive();

    return (
        <Button
            variant="outline"
            className={cn(
                "relative inline-flex items-center justify-center gap-1 sm:gap-2 whitespace-nowrap font-semibold disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive  rounded-md sm:rounded-md",
                windowWidth >= 1024 && windowWidth < 1430 ? "h-7" : "h-8 sm:h-9 lg:h-10",
                getButtonTextSize(windowWidth),
                getButtonPadding(windowWidth),
                "!bg-gradient-to-r !from-primary/90 !to-primary/80 !text-primary-foreground !border-[#b19681] backdrop-blur-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[4px] hover:-translate-y-[2px]",
                isActive && "!bg-gradient-to-r !from-accent/90 !to-accent/80 !text-accent-foreground !border-[#b19681] !shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] !-translate-x-[4px] !-translate-y-[2px]",
                className
            )}
            asChild
        >
            <Link href={href}>
                <div className="relative z-10">
                    {children}
                </div>

            </Link>
        </Button>
    )
}

const navbarItems = [
    { href: "/about", children: "SALON W WARSZAWIE" },
    { href: "/contact", children: "KONTAKT" },
];

export const Navbar = () => {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSearchResults, setShowSearchResults] = useState(false);
    const navbarRef = useRef<HTMLElement>(null);
    
    const trpc = useTRPC();
    const session = useQuery(trpc.auth.session.queryOptions());

    const { isDesktop, windowWidth } = useResponsive();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close search when screen size changes
    useEffect(() => {
        if (isDesktop) {
            setIsSearchExpanded(false);
        }
    }, [isDesktop]);



    // Responsive logo sizing
    const getLogoSize = () => {
        if (windowWidth < 480) return { width: 'w-20', textMain: 'text-base', textSub: 'text-xs' };
        if (windowWidth < 640) return { width: 'w-24', textMain: 'text-lg', textSub: 'text-sm' };
        if (windowWidth < 768) return { width: 'w-28', textMain: 'text-lg', textSub: 'text-sm' };
        if (windowWidth < 1000) return { width: 'w-32', textMain: 'text-2xl', textSub: 'text-base' };
        if (windowWidth < 1024) return { width: 'w-36', textMain: 'text-2xl', textSub: 'text-base' };
        if (windowWidth < 1280) return { width: 'w-40', textMain: 'text-2xl', textSub: 'text-base' };
        if (windowWidth <= 1430) return { width: 'w-32', textMain: 'text-lg', textSub: 'text-xs' }; // Smaller container and text for 1430px and below
        if (windowWidth <= 1440) return { width: 'w-36', textMain: 'text-xl', textSub: 'text-sm' }; // Smaller container for 1440px
        return { width: 'w-44', textMain: 'text-2xl', textSub: 'text-base' }; // Default for larger screens
    };

    const logoSize = getLogoSize();

    return (
        <nav 
            ref={navbarRef}
            className={cn(
                "sticky top-0 z-[9997] ",
                "bg-background border-b border-[#b19681]",
                isScrolled && "shadow-lg bg-background"
            )}
        >
            {/* Main navbar container */}
            <div className="max-w-[2000px] mx-auto">
                {/* Top bar with logo and actions */}
                <div className={cn(
                    "flex items-center justify-between ",
                    "h-16 sm:h-18 lg:h-20 xl:h-22",
                    "pr-2 sm:pr-4 lg:pr-6 xl:pr-8"
                )}>
                    {/* Logo Section - Responsive sizing */}
                    <div className={cn(
                        "flex items-center justify-center h-full bg-[#7A1317]  flex-shrink-0",
                        logoSize.width
                    )}>
                        <Link 
                            href="/" 
                            className=" hover:opacity-80 group w-full h-full flex items-center justify-center"
                        >
                            <div className="text-center px-1 sm:px-2">
                                <div className={cn(
                                    "font-semibold text-white leading-tight",
                                    poppins.className,
                                    logoSize.textMain
                                )}>
                                    HOLISTIC
                                </div>
                                <div className={cn(
                                    "font-medium text-white leading-tight",
                                    poppins.className,
                                    logoSize.textSub
                                )}>
                                    POINT
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation - Show on larger screens */}
                    {windowWidth >= 1024 && (
                        <div className="hidden lg:flex items-center justify-center flex-1 px-4 xl:px-8">
                            <div className="flex items-center gap-1 xl:gap-2 2xl:gap-3 justify-center flex-wrap">
                                {/* GŁÓWNA */}
                                <NavbarItem
                                    href="/"
                                    isActive={pathname === "/"}
                                >
                                    GŁÓWNA
                                </NavbarItem>
                                
                                {/* WDROŻENIE HEAD SPA Dropdown 
                                <NavbarDropdown 
                                    isActive={pathname.startsWith('/products') || pathname.startsWith('/beds-and-washers') || pathname.startsWith('/personal-training') || pathname.startsWith('/investment-pack')}
                                >
                                    WDROŻENIE HEAD SPA
                                </NavbarDropdown>
                                */}

                                   <NavbarItem
                                    href="/products"
                                    isActive={pathname === "/products"}
                                >
                                     WDROŻENIE HEAD SPA
                                </NavbarItem>
                
                                {/* Other navigation items */}
                                {navbarItems.map((item) => (
                                    <NavbarItem
                                        key={item.href}
                                        href={item.href}
                                        isActive={pathname === item.href}
                                    >
                                        {item.children}
                                    </NavbarItem>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Right side actions */}
                    <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 xl:gap-4">
                        {/* Search Toggle */}
                        <Button
                            variant="outline"
                            size="icon"
                            className={cn(
                                "relative  !bg-gradient-to-r !from-primary/90 !to-primary/80 !text-primary-foreground !border-[#b19681] backdrop-blur-sm rounded-md hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[4px] hover:-translate-y-[2px]",
                                "h-9 w-9 sm:h-10 sm:w-10 lg:h-10 lg:w-10 xl:h-9 xl:w-9"
                            )}
                            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                            aria-label="Przełącz wyszukiwanie"
                        >
                            {isSearchExpanded ? (
                                <X className="h-4 w-4 sm:h-5 sm:w-5 lg:h-5 lg:w-5 xl:h-4 xl:w-4" />
                            ) : (
                                <SearchIcon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-5 lg:w-5 xl:h-4 xl:w-4" />
                            )}
                        </Button>

                        {/* Cart Icon - Always visible */}
                        <CartIcon />

                        {/* Theme Toggle - Always visible */}
                        <ClientOnly fallback={<div className="h-9 w-9" />}>
                            <ThemeToggle />
                        </ClientOnly>

                        {/* Desktop Actions */}
                        {windowWidth >= 1024 && (
                            <div className="flex items-center gap-2 xl:gap-3">
                                
                                {session.data?.user ? (
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="relative inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm xl:text-base font-semibold disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border py-2 xl:py-3 has-[>svg]:px-3 xl:has-[>svg]:px-4 h-12 xl:h-14 px-4 xl:px-6 rounded-md xl:rounded-md !bg-gradient-to-r !from-accent/90 !to-accent/80 !text-accent-foreground !border-[#b19681] backdrop-blur-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[4px] hover:-translate-y-[2px]"
                                    >
                                        <Link href="/Panel">
                                            <div className="relative z-10">Panel</div>
                                        </Link>
                                    </Button>
                                ) : (
                                    <>
                                                                                <Button
                                            asChild
                                            variant="outline"
                                            className={cn(
                                                "relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border rounded-md backdrop-blur-sm",
                                                // Same font size as other navigation items
                                                getButtonTextSize(windowWidth),
                                                // Same padding as other navigation items
                                                getButtonPadding(windowWidth),
                                                // Fixed height - no reduction for 1430px screens
                                                "h-9 sm:h-10 lg:h-11",
                                                // Flat theme-aware color scheme with consistent border
                                                "!bg-primary !text-primary-foreground !border-[#b19681] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[4px] hover:-translate-y-[2px]",
                                                pathname === "/sign-in" 
                                                    ? "!bg-primary !text-primary-foreground !border-[#b19681] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[4px] -translate-y-[2px]"
                                                    : ""
                                            )}
                                        >
                                            <Link prefetch href="/sign-in">
                                                <LogIn className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button
                                            asChild
                                            variant="outline"
                                            className={cn(
                                                "relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border rounded-md backdrop-blur-sm",
                                                // Same font size as other navigation items
                                                getButtonTextSize(windowWidth),
                                                // Same padding as other navigation items
                                                getButtonPadding(windowWidth),
                                                // Fixed height - no reduction for 1430px screens
                                                "h-9 sm:h-10 lg:h-11",
                                                // Flat theme-aware color scheme with consistent border
                                                "!bg-primary !text-primary-foreground !border-[#b19681] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[4px] hover:-translate-y-[2px]",
                                                pathname === "/sign-up" 
                                                    ? "!bg-primary !text-primary-foreground !border-[#b19681] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[4px] -translate-y-[2px]"
                                                    : ""
                                            )}
                                        >
                                            <Link prefetch href="/sign-up">
                                                <UserPlus className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                        )}

                        {/* Menu Toggle for Mobile/Tablet */}
                        {windowWidth < 1024 && (
                            <Button
                                variant="outline"
                                size="icon"
                                className={cn(
                                    " !bg-gradient-to-r !from-primary/90 !to-primary/80 !text-primary-foreground !border-[#b19681] backdrop-blur-sm rounded-md hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[4px] hover:-translate-y-[2px]",
                                    "h-9 w-9 sm:h-10 sm:w-10"
                                )}
                                onClick={() => setIsSidebarOpen(true)}
                                aria-label="Otwórz menu"
                            >
                                <MenuIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                            </Button>
                        )}
                    </div>
                </div>

                {/* Expandable Search Bar */}
                {isSearchExpanded && (
                    <div className="border-t border-[#b19681] bg-background/95 backdrop-blur-sm relative z-[9998]">
                        <div className="px-4 py-4 max-w-2xl mx-auto">
                            <div className="relative z-[9999]">
                                <div className="relative">
                                    <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary-foreground/70"/>
                                    <Input 
                                        className="pl-11 pr-12 py-3 h-12 !bg-gradient-to-r !from-primary/90 !to-primary/80 !text-primary-foreground !border-[#b19681] rounded-md focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-200 placeholder:text-primary-foreground/70 text-sm font-medium" 
                                        placeholder="Szukaj produktów..."
                                        value={searchQuery}
                                        onChange={(e) => {
                                            setSearchQuery(e.target.value);
                                            setShowSearchResults(e.target.value.trim().length > 0);
                                        }}
                                        onFocus={() => {
                                            if (searchQuery.trim().length > 0) {
                                                setShowSearchResults(true);
                                            }
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && searchQuery.trim()) {
                                                window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
                                            }
                                            if (e.key === 'Escape') {
                                                setShowSearchResults(false);
                                                setIsSearchExpanded(false);
                                            }
                                        }}
                                        autoFocus
                                    />
                                    {searchQuery.trim() && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-primary/10 text-primary"
                                            onClick={() => {
                                                if (searchQuery.trim()) {
                                                    window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
                                                }
                                            }}
                                        >
                                            <SearchIcon className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                                <SearchResults
                                    searchQuery={searchQuery}
                                    isOpen={showSearchResults}
                                    onClose={() => setShowSearchResults(false)}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Tablet Navigation Bar - Show on tablet sizes */}
                {windowWidth >= 768 && windowWidth < 1024 && (
                    <div className="border-t border-[#b19681] bg-background relative">
                        <div className="px-4 py-3 overflow-x-auto scrollbar-hide">
                            <div className="flex items-center gap-3 min-w-max">
                                {/* GŁÓWNA */}
                                <NavbarItem
                                    href="/"
                                    isActive={pathname === "/"}
                                    className={windowWidth >= 768 && windowWidth < 1000 ? "text-xs" : "text-sm"}
                                >
                                    GŁÓWNA
                                </NavbarItem>
                                
                                {/* WDROŻENIE HEAD SPA Dropdown */}
                                <ClientOnly fallback={
                                    <NavbarItem
                                        href="/products"
                                        isActive={pathname.startsWith('/products') || pathname.startsWith('/beds-and-washers') || pathname.startsWith('/online-training') || pathname.startsWith('/personal-training') || pathname.startsWith('/investment-pack')}
                                        className={windowWidth >= 768 && windowWidth < 1000 ? "text-xs" : "text-sm"}
                                    >
                                        WDROŻENIE HEAD SPA
                                    </NavbarItem>
                                }>
                                    <NavbarDropdown 
                                        isActive={pathname.startsWith('/products') || pathname.startsWith('/beds-and-washers') || pathname.startsWith('/online-training') || pathname.startsWith('/personal-training') || pathname.startsWith('/investment-pack')}
                                    >
                                        WDROŻENIE HEAD SPA
                                    </NavbarDropdown>
                                </ClientOnly>
                                
                                {/* Other navigation items */}
                                {navbarItems.map((item) => (
                                    <NavbarItem
                                        key={item.href}
                                        href={item.href}
                                        isActive={pathname === item.href}
                                        className={windowWidth >= 768 && windowWidth < 1000 ? "text-xs" : "text-sm"}
                                    >
                                        {item.children}
                                    </NavbarItem>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Sidebar */}
            <NavbarSidebar
                items={navbarItems}
                open={isSidebarOpen}
                onOpenChange={setIsSidebarOpen}
            />
        </nav>
    );
};