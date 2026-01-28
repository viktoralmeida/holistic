"use client";

import { formatCurrency } from "@/lib/utils";
import { CartButton } from "./cart-button";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import type { Category } from "@/payload-types";

interface ProductCardProps {
  id: string;
  name: string;
  image?: { url: string; alt: string } | null;
  price: number;
  category?: string | Category | null | undefined;
  productType?: 'investment-pack' | 'beds-and-washers' | 'online-training' | 'personal-training' | 'other-products';
}

export const ProductCard = ({
  id,
  name,
  image,
  price,
  category,
  productType,
}: ProductCardProps) => {
  return (
    <div className="group relative rounded-md border border-[#b19681] overflow-hidden bg-card hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[4px] hover:-translate-y-[2px] transition-all duration-300">
      <Link href={`/products/${id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted to-muted/50">
          {image?.url ? (
            <Image
              src={image.url}
              alt={image.alt || name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
              <span className="text-muted-foreground text-sm font-medium">Brak obrazu</span>
            </div>
          )}
          {/* Category Badge - Top Left */}
          {(category || productType) && (
            <div className="absolute top-1 left-1">
              <div 
                className="px-2 py-1 rounded text-xs font-bold hover:opacity-90 bg-[#8d9d4f] text-white border border-[#7a8a42]"
              >
                {typeof category === 'object' && category ? category.name : 
                  (productType === 'investment-pack' ? 'Pakiet inwestycyjny' :
                  productType === 'beds-and-washers' ? 'Łóżka i myjki' :
                  productType === 'online-training' ? 'Szkolenia online' :
                  productType === 'personal-training' ? 'Trening personalny' :
                  'Inne produkty')}
              </div>
            </div>
          )}
          {/* Price Badge - Bottom Right */}
          <div className="absolute bottom-2 right-2">
            <Badge variant="secondary" className="text-sm font-semibold bg-white text-[#b19681] border-[#b19681] hover:bg-gray-50">
              {formatCurrency(price)}
            </Badge>
          </div>
        </div>
      </Link>

      <div className="p-5 space-y-4">
        <div className="space-y-3">
          <Link href={`/products/${id}`} className="block">
            <h3 className="font-semibold text-card-foreground line-clamp-2 leading-tight uppercase">
              {name}
            </h3>
          </Link>
          
        </div>

        <div className="space-y-2.5">
          <CartButton productId={id} showQuantitySelector={false} size="sm" />
          
          <Button
            variant="elevated"
            className="w-full h-8 text-sm font-medium text-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[4px] hover:-translate-y-[2px] transition-all bg-[#8d9d4f] hover:bg-[#7a8a42] border-[#b19681]"
            asChild
          >
            <Link href={`/products/${id}`} className="flex items-center justify-center gap-2">
              <Info className="h-3.5 w-3.5" />
              Dowiedz się więcej
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="rounded-md border border-[#b19681] overflow-hidden bg-card">
      <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 animate-pulse" />
      <div className="p-5 space-y-4">
        <div className="space-y-3">
          <div className="h-4 bg-muted rounded animate-pulse" />
          <div className="flex justify-between">
            <div className="h-6 w-16 bg-muted rounded animate-pulse" />
            <div className="h-4 w-12 bg-muted rounded animate-pulse" />
          </div>
        </div>
        <div className="space-y-2.5">
          <div className="h-8 bg-muted rounded animate-pulse" />
          <div className="h-8 bg-muted rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};
