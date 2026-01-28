import{
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

import {ScrollArea} from "@/components/ui/scroll-area";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Home, ShoppingCart, User, LogIn, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

interface NavbarItem{
    href: string;
    children: React.ReactNode;
}

interface Props{
    items: NavbarItem[];
    open: boolean;
    onOpenChange:(open: boolean) => void;
}

const dropdownItems = [
    { name: "Pakiet inwestycyjny", href: "/investment-pack" },
    { name: "Łóżka i myjki headspa", href: "/beds-and-washers" },
    { name: "Trening personalny", href: "/personal-training" },
];

export const NavbarSidebar = ({
    items,
    open,
    onOpenChange,
}:Props)=>{
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const pathname = usePathname();
    
    const trpc = useTRPC();
    const session = useQuery(trpc.auth.session.queryOptions());

    return(
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="left"
                className="p-0  w-80 sm:w-96"
            >
                <SheetHeader className="p-6 border-b border-border/50 bg-gradient-to-r from-background to-card/50">
                    <SheetTitle className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        HOLISTIC POINT
                    </SheetTitle>
                </SheetHeader>
                
                <ScrollArea className="flex flex-col overflow-y-auto h-full">
                    <div className="p-4 space-y-2">
                        {/* GŁÓWNA */}
                        <Link
                            href="/"
                            className={cn(
                                "w-full flex items-center gap-3 p-4 rounded-md transition-all duration-200 group",
                                "bg-gradient-to-r from-primary/90 to-primary/80 text-primary-foreground border border-primary/20 backdrop-blur-sm",
                                "hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[4px] -translate-y-[2px] hover:-translate-x-[4px] hover:-translate-y-[2px]",
                                pathname === "/" && "bg-gradient-to-r from-accent/90 to-accent/80 text-accent-foreground border border-accent/20 backdrop-blur-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[4px] -translate-y-[2px]-translate-x-[4px] -translate-y-[2px]"
                            )}
                            onClick={() => onOpenChange(false)}
                        >
                            <Home className="h-5 w-5  text-primary-foreground" />
                            <span className="font-semibold  text-primary-foreground">
                                GŁÓWNA
                            </span>
                        </Link>

                        {/* WDROŻENIE HEAD SPA Dropdown */}
                        <div className="space-y-1">
                            <div className="relative">
                                <Link
                                    href="/products"
                                    className={cn(
                                        "w-full flex items-center justify-between p-4 rounded-md  group",
                                                                        "bg-gradient-to-r from-primary/90 to-primary/80 text-primary-foreground border border-primary/20 backdrop-blur-sm",
                                "hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[4px] -translate-y-[2px] hover:-translate-x-[4px] hover:-translate-y-[2px]",
                                (pathname.startsWith('/products') || pathname.startsWith('/beds-and-washers') || pathname.startsWith('/personal-training') || pathname.startsWith('/investment-pack')) && 
                                "bg-gradient-to-r from-accent/90 to-accent/80 text-accent-foreground border border-accent/20 backdrop-blur-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[4px] -translate-y-[2px]"
                                    )}
                                    onClick={() => onOpenChange(false)}
                                >
                                    <div className="flex items-center gap-3">
                                        <ShoppingCart className="h-5 w-5  text-primary-foreground" />
                                        <span className="font-semibold  text-primary-foreground">
                                            WDROŻENIE HEAD SPA
                                        </span>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setIsDropdownOpen(!isDropdownOpen);
                                        }}
                                        className="p-1 hover:bg-primary/10 rounded"
                                    >
                                        <ChevronDown className={cn(
                                            "h-4 w-4 ",
                                            isDropdownOpen ? "rotate-180" : "rotate-0"
                                        )} />
                                    </button>
                                </Link>
                            </div>
                            
                            <div className={cn(
                                "overflow-hidden ",
                                isDropdownOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                            )}>
                                <div className="pl-11 space-y-1">
                                    <Link
                                        href="/products"
                                        className={cn(
                                            "w-full flex items-center p-3 rounded-md  group",
                                            "hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5",
                                            "hover:shadow-sm ",
                                            pathname === "/products" && "bg-gradient-to-r from-primary/10 to-accent/10 shadow-sm "
                                        )}
                                        onClick={() => onOpenChange(false)}
                                    >
                                        <span className={cn(
                                            "text-sm font-medium ",
                                            pathname === "/products" ? "text-primary" : "text-foreground group-hover:text-primary"
                                        )}>
                                            Wszystkie produkty
                                        </span>
                                    </Link>
                                    {dropdownItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={cn(
                                                "w-full flex items-center p-3 rounded-md  group",
                                                "hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5",
                                                "hover:shadow-sm ",
                                                pathname === item.href && "bg-gradient-to-r from-primary/10 to-accent/10 shadow-sm "
                                            )}
                                            onClick={() => onOpenChange(false)}
                                        >
                                            <span className={cn(
                                                "text-sm font-medium ",
                                                pathname === item.href ? "text-primary" : "text-foreground group-hover:text-primary"
                                            )}>
                                                {item.name}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* SZKOLENIA ONLINE - Separate button */}
                        <Link
                            href="/online-training"
                            className={cn(
                                "w-full flex items-center gap-3 p-4 rounded-md transition-all duration-200 group",
                                "bg-gradient-to-r from-primary/90 to-primary/80 text-primary-foreground border border-primary/20 backdrop-blur-sm",
                                "hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[4px] -translate-y-[2px] hover:-translate-x-[4px] hover:-translate-y-[2px]",
                                pathname === "/online-training" && "bg-gradient-to-r from-accent/90 to-accent/80 text-accent-foreground border border-accent/20 backdrop-blur-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[4px] -translate-y-[2px]"
                            )}
                            onClick={() => onOpenChange(false)}
                        >
                            <User className="h-5 w-5  text-primary-foreground" />
                            <span className="font-semibold  text-primary-foreground">
                                SZKOLENIA ONLINE
                            </span>
                        </Link>

                        {/* Other navigation items */}
                        {items.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "w-full flex items-center gap-3 p-4 rounded-md transition-all duration-200 group",
                                                                    "bg-gradient-to-r from-primary/90 to-primary/80 text-primary-foreground border border-primary/20 backdrop-blur-sm",
                                "hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[4px] -translate-y-[2px] hover:-translate-x-[4px] hover:-translate-y-[2px]",
                                pathname === item.href && "bg-gradient-to-r from-accent/90 to-accent/80 text-accent-foreground border border-accent/20 backdrop-blur-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[4px] -translate-y-[2px]"
                                )}
                                onClick={() => onOpenChange(false)}
                            >
                                <User className="h-5 w-5  text-primary-foreground" />
                                <span className="font-semibold  text-primary-foreground">
                                    {item.children}
                                </span>
                            </Link>
                        ))}
                    </div>

                    {/* Auth Section */}
                    <div className="mt-auto p-4 border-t border-border/50 bg-gradient-to-r from-card/50 to-background/50">
                        <div className="space-y-2">
                            {session.data?.user ? (
                                <Link
                                    href="/Panel"
                                    className="w-full flex items-center gap-3 p-4 rounded-md transition-all duration-200 group bg-gradient-to-r from-accent/90 to-accent/80 text-accent-foreground border border-accent/20 backdrop-blur-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[4px] -translate-y-[2px] hover:-translate-x-[4px] hover:-translate-y-[2px]"
                                    onClick={() => onOpenChange(false)}
                                >
                                    <User className="h-5 w-5 text-accent-foreground" />
                                    <span className="font-semibold text-accent-foreground">
                                        Panel
                                    </span>
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href="/sign-in"
                                        className="w-full flex items-center justify-center p-4 rounded-md transition-all duration-200 group bg-primary text-primary-foreground border border-[#b19681] backdrop-blur-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[4px] -translate-y-[2px] hover:-translate-x-[4px] hover:-translate-y-[2px]"
                                        onClick={() => onOpenChange(false)}
                                    >
                                        <LogIn className="h-5 w-5 text-primary-foreground" />
                                    </Link>
                                    <Link
                                        href="/sign-up"
                                        className="w-full flex items-center justify-center p-4 rounded-md transition-all duration-200 group bg-primary text-primary-foreground border border-[#b19681] backdrop-blur-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[4px] -translate-y-[2px] hover:-translate-x-[4px] hover:-translate-y-[2px]"
                                        onClick={() => onOpenChange(false)}
                                    >
                                        <UserPlus className="h-5 w-5 text-primary-foreground" />
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
};