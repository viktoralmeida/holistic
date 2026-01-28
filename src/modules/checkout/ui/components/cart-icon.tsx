"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/modules/checkout/store/use-cart-store";

interface CartIconProps {
    className?: string;
}

export const CartIcon = ({ className }: CartIconProps) => {
    const cartItemCount = useCartStore((state) => {
        return state.items.reduce((total, item) => total + item.quantity, 0);
    });

    return (
        <Button
            variant="outline"
            size="icon"
            asChild
            className={cn("relative transition-all duration-200 !bg-gradient-to-r !from-primary/90 !to-primary/80 !text-primary-foreground !border-[#b19681] backdrop-blur-sm rounded-md hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[4px] hover:-translate-y-[2px] h-9 w-9 sm:h-10 sm:w-10 lg:h-10 lg:w-10 xl:h-9 xl:w-9", className)}
        >
            <Link href="/checkout" aria-label={`Cart with ${cartItemCount} items`}>
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 lg:h-5 lg:w-5 xl:h-4 xl:w-4" />
                {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-medium">
                        {cartItemCount > 99 ? "99+" : cartItemCount}
                    </span>
                )}
            </Link>
        </Button>
    );
}; 