"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useResponsive } from "@/hooks/use-mobile";


interface NavbarDropdownProps {
    children: React.ReactNode;
    isActive?: boolean;
}

const dropdownItems = [
    { name: "Pakiet inwestycyjny", href: "/investment-pack" },
    { name: "Łóżka i myjki headspa", href: "/beds-and-washers" },
    { name: "Trening personalny", href: "/personal-training" },
];

export const NavbarDropdown = ({ children, isActive }: NavbarDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const { windowWidth, isMobile, isHydrated } = useResponsive();
    
    // Responsive text sizing for dropdown buttons
    const getButtonTextSize = () => {
        if (windowWidth >= 768 && windowWidth < 1000) return "text-sm";
        if (windowWidth >= 1024 && windowWidth < 1430) return "text-sm";
        if (windowWidth >= 1430) return "text-sm"; // Slightly bigger text for desktop screens
        return "text-xs sm:text-sm";
    };

    // Responsive padding for dropdown buttons
    const getButtonPadding = () => {
        if (windowWidth >= 1024) return "px-2 py-1.5"; // Smaller padding for desktop
        return "px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2";
    };

    // Simplified logic: only mobile is touch-only
    const handleMouseEnter = () => {
        if (!isHydrated) return; // Prevent hydration mismatches
        if (!isMobile) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            setIsOpen(true);
        }
    };

    const handleMouseLeave = () => {
        if (!isHydrated) return; // Prevent hydration mismatches
        if (!isMobile) {
            timeoutRef.current = setTimeout(() => {
                setIsOpen(false);
            }, 200);
        }
    };

    const handleClick = (e: React.MouseEvent) => {
        if (!isHydrated) return; // Prevent hydration mismatches
        if (isMobile) {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(!isOpen);
        } else {
            // On desktop, clicking the dropdown button navigates to /products
            window.location.href = '/products';
        }
    };

    // Clear timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Removed console.log to reduce noise

    return (
        <div
            className="relative inline-block"
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <Button
                variant="outline"
                className={cn(
                    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive  rounded-md sm:rounded-md",
                    windowWidth >= 1024 && windowWidth < 1430 ? "h-7" : "h-8 sm:h-9 lg:h-10",
                    getButtonTextSize(),
                    getButtonPadding(),
                    "!bg-gradient-to-r !from-primary/90 !to-primary/80 !text-primary-foreground !border-[#b19681] backdrop-blur-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[4px] hover:-translate-y-[2px]",
                    isMobile && "cursor-pointer",
                    isActive && "!bg-gradient-to-r !from-accent/90 !to-accent/80 !text-accent-foreground !border-[#b19681] !shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] !-translate-x-[4px] !-translate-y-[2px]",
                    isOpen && "!bg-gradient-to-r !from-accent/90 !to-accent/80 !text-accent-foreground !border-[#b19681] !shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] !-translate-x-[4px] !-translate-y-[2px]"
                )}
            >
                <div className="relative z-10 flex items-center gap-2">
                    {children}
                    <ChevronDown className={cn(
                        "w-4 h-4 ",
                        isOpen && "rotate-180"
                    )} />
                </div>
            </Button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div 
                    className="fixed z-[999999] min-w-[220px]"
                    onMouseEnter={() => {
                        if (!isMobile && timeoutRef.current) {
                            clearTimeout(timeoutRef.current);
                        }
                    }}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        position: 'fixed',
                        zIndex: 999999,
                        top: dropdownRef.current ? dropdownRef.current.getBoundingClientRect().bottom + 8 : 0,
                        left: dropdownRef.current ? dropdownRef.current.getBoundingClientRect().left : 0,
                        minWidth: '220px',
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                    }}
                >
 

                    {/* Dropdown content */}
                    <div className="bg-background rounded-md overflow-hidden">
                        {dropdownItems.map((item, index) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "block w-full px-4 py-3 text-foreground hover:bg-accent hover:text-accent-foreground text-sm font-medium ",
                                    index === 0 && "rounded-md",
                                    index === dropdownItems.length - 1 && "rounded-b-lg"
                                )}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
