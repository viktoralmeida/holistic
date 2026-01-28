"use client"

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

export const QuantitySelector = ({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
  size = "md",
  disabled = false,
}: QuantitySelectorProps) => {
  const handleIncrement = () => {
    if (value < max && !disabled) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min && !disabled) {
      onChange(value - 1);
    }
  };


  const sizeClasses = {
    sm: "h-8 text-sm",
    md: "h-10 text-base",
    lg: "h-12 text-lg",
  };

  const buttonSizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const iconSizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <div className={cn("flex items-center border border-border rounded-sm bg-background shadow-sm", className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDecrement}
        disabled={disabled || value <= min}
        className={cn(
          "rounded-r-none border-r border-border hover:bg-muted/50 transition-colors",
          buttonSizeClasses[size],
          "focus:ring-2 focus:ring-primary/20",
          "hover:bg-gray-100 active:bg-gray-200"
        )}
        aria-label="Decrease quantity"
      >
        <Minus className={cn(iconSizeClasses[size], "text-gray-600")} />
      </Button>
      
      <div
        className={cn(
          "w-12 text-center border-0 bg-transparent flex items-center justify-center",
          sizeClasses[size],
          "font-semibold text-foreground",
          "disabled:opacity-50"
        )}
        aria-label="Quantity"
      >
        {value}
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={handleIncrement}
        disabled={disabled || value >= max}
        className={cn(
          "rounded-l-none border-l border-border hover:bg-muted/50 transition-colors",
          buttonSizeClasses[size],
          "focus:ring-2 focus:ring-primary/20",
          "hover:bg-gray-100 active:bg-gray-200"
        )}
        aria-label="Increase quantity"
      >
        <Plus className={cn(iconSizeClasses[size], "text-gray-600")} />
      </Button>
    </div>
  );
};
