import { Button } from "@/components/ui/button";
import { useCart } from "../../hooks/use-cart";
import {cn} from "@/lib/utils";
import Link from "next/link";
import { ShoppingCartIcon } from "lucide-react";

 
interface CheckoutButtonProps{
    className?:string;
    hideIfEmpty?:boolean;
}

export const CheckoutButton=({
    className,
    hideIfEmpty,
}:CheckoutButtonProps)=>{
    const {totalItems} = useCart();
    
    if(hideIfEmpty && totalItems === 0) return null;

    return (
        <Button 
            variant="outline" 
            asChild 
            className={cn(
                "relative inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border transition-all duration-300 py-2 px-4 h-8 rounded-md !bg-gradient-to-r !from-primary/90 !to-primary/80 !text-primary-foreground !border-primary/20 backdrop-blur-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[4px] hover:-translate-y-[2px]",
                className
            )}
        >
            <Link href="/checkout">
                <ShoppingCartIcon className="h-4 w-4" />
                {totalItems > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                        {totalItems > 99 ? "99+" : totalItems}
                    </span>
                )}
            </Link>
        </Button>
    )
};

