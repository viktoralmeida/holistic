import { cn, formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { QuantitySelector } from "@/components/ui/quantity-selector";

interface CheckoutItemProps {
    isLast?: boolean;
    image?: { url: string; alt: string } | null;
    name: string;
    productUrl: string;
    price: number;
    quantity: number;
    onRemove: () => void;
    onQuantityChange: (quantity: number) => void;
}

export const CheckoutItem = ({
    isLast,
    image,
    name,
    productUrl,
    price,
    quantity,
    onRemove,
    onQuantityChange,
}: CheckoutItemProps) => {
    const totalPrice = price * quantity;

    return (
        <div
            className={cn(
                "p-6 border-b border-[#b19681]",
                isLast && "border-b-0"
            )}
        >
            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-[8.5rem_1fr_auto] gap-6">
                <div className="overflow-hidden border-r border-[#b19681]">
                    <div className="relative aspect-square h-full rounded-sm overflow-hidden">
                        {image?.url ? (
                            <Image
                                src={image.url}
                                alt={image.alt || name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center rounded-sm">
                                <span className="text-muted-foreground text-sm">Brak obrazu</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="py-4 flex flex-col justify-between">
                    <div>
                        <Link href={productUrl}>
                            <h4 className="font-bold text-lg text-foreground hover:text-primary transition-colors">{name}</h4>
                        </Link>
                        <div className="mt-3 flex items-center gap-3">
                            <span className="text-sm text-muted-foreground font-medium">Ilość:</span>
                            <QuantitySelector
                                value={quantity}
                                onChange={onQuantityChange}
                                size="sm"
                                min={1}
                                max={99}
                                className="shadow-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="py-4 flex flex-col justify-between items-end">
                    <div className="text-right">
                        <p className="text-sm text-muted-foreground mb-1">
                            {formatCurrency(price)} × {quantity}
                        </p>
                        <p className="font-bold text-xl text-foreground">
                            {formatCurrency(totalPrice)}
                        </p>
                    </div>
                    <button 
                        className="text-sm underline font-medium cursor-pointer text-red-600 hover:text-red-800 transition-colors mt-2" 
                        onClick={onRemove} 
                        type="button"
                    >
                        Usuń
                    </button>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden space-y-4">
                <div className="flex gap-4">
                    <div className="flex-shrink-0">
                        <div className="relative w-20 h-20 rounded-sm overflow-hidden">
                            {image?.url ? (
                                <Image
                                    src={image.url}
                                    alt={image.alt || name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-muted flex items-center justify-center rounded-sm">
                                    <span className="text-muted-foreground text-xs">Brak obrazu</span>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <Link href={productUrl}>
                            <h4 className="font-bold text-base text-foreground hover:text-primary transition-colors line-clamp-2">{name}</h4>
                        </Link>
                        <div className="mt-2 flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                                {formatCurrency(price)} × {quantity}
                            </div>
                            <div className="font-bold text-lg text-foreground">
                                {formatCurrency(totalPrice)}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Quantity controls under image on mobile */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground font-medium">Ilość:</span>
                        <QuantitySelector
                            value={quantity}
                            onChange={onQuantityChange}
                            size="sm"
                            min={1}
                            max={99}
                            className="shadow-sm"
                        />
                    </div>
                    <button 
                        className="text-sm underline font-medium cursor-pointer text-red-600 hover:text-red-800 transition-colors" 
                        onClick={onRemove} 
                        type="button"
                    >
                        Usuń
                    </button>
                </div>
            </div>
        </div>
    )
};