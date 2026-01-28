import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/modules/checkout/store/use-cart-store";
import { useState } from "react";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { ShoppingCart, Loader2, CheckIcon } from "lucide-react";
import { toast } from "sonner";

interface Props {
  productId: string;
  showQuantitySelector?: boolean;
  size?: "sm" | "lg" | "default" | "icon";
  className?: string;
}

export const CartButton = ({ 
  productId, 
  showQuantitySelector = false, 
  size = "default",
  className 
}: Props) => {
  const addProduct = useCartStore((state) => state.addProduct);
  const [localQuantity, setLocalQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      if (showQuantitySelector) {
        addProduct(productId, localQuantity);
      } else {
        addProduct(productId, 1);
      }
      // Force immediate update by triggering a small delay
      await new Promise(resolve => setTimeout(resolve, 10));
      setIsSuccess(true);
      toast.success("Produkt dodany do koszyka", {
        style: {
          background: '#f5f5dc', // Beige background
          color: '#2c2c2c', // Matte black text
          border: '1px solid #d4af37',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          fontWeight: '500',
        },
        duration: 2000,
      });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => setIsSuccess(false), 1000);
      }, 500);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    setLocalQuantity(newQuantity);
  };

  if (showQuantitySelector) {
    return (
      <div className={cn("space-y-3", className)}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Ilość:</span>
          <QuantitySelector
            value={localQuantity}
            onChange={handleQuantityChange}
            size={size === "default" ? "md" : size === "icon" ? "sm" : size === "lg" ? "lg" : "sm"}
            min={1}
            max={99}
          />
        </div>
        <Button
          variant="elevated"
          className={cn(
            "w-full text-white",
            isSuccess ? "bg-green-600" : "bg-green-700 hover:bg-green-800"
          )}
          onClick={handleAddToCart}
          size={size}
          disabled={isLoading || isSuccess}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Dodawanie...
            </>
          ) : isSuccess ? (
            <>
              <CheckIcon className="h-4 w-4 mr-2" />
              Dodano!
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Dodaj do koszyka
            </>
          )}
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="elevated"
      className={cn(
        "w-full text-white",
        isSuccess ? "bg-green-600" : "bg-green-700 hover:bg-green-800"
      )}
      onClick={handleAddToCart}
      size={size}
      disabled={isLoading || isSuccess}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Dodawanie...
        </>
      ) : isSuccess ? (
        <>
          <CheckIcon className="h-4 w-4 mr-2" />
          Dodano!
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Dodaj do koszyka
        </>
      )}
    </Button>
  );
};

 

