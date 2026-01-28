"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/star-rating";
import { formatCurrency } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CartButton } from "./cart-button";
import { getServerProcessedImageUrl, getServerProcessedImageAlt, type ServerProcessedImage } from '@/lib/image-utils';

interface RelatedProductsProps {
  currentProductId: string;
  category?: string;
  limit?: number;
}

export const RelatedProducts = ({ currentProductId, category, limit = 4 }: RelatedProductsProps) => {
  const trpc = useTRPC();

  // Fetch related products based on category or get random products
  const { data: relatedProducts, isLoading } = useQuery(
    trpc.products.getMany.queryOptions({
      category: category || null,
      limit: limit + 1, // Get one extra to exclude current product
    })
  );

  // Filter out current product and limit results
  const filteredProducts = relatedProducts?.docs?.filter(product => product.id !== currentProductId).slice(0, limit) || [];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-foreground">Powiązane produkty</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="bg-card shadow-lg border border-border rounded-2xl overflow-hidden">
              <div className="h-48 bg-muted animate-pulse"></div>
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded animate-pulse mb-2"></div>
                <div className="h-4 bg-muted rounded animate-pulse mb-4 w-3/4"></div>
                <div className="h-6 bg-muted rounded animate-pulse mb-2"></div>
                <div className="h-8 bg-muted rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-foreground">Powiązane produkty</h3>
        <Link href="/products">
          <Button variant="outline" className="flex items-center gap-2 border-[#b19681] hover:border-primary hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[4px] hover:-translate-y-[2px] transition-all duration-300">
            Zobacz wszystkie
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="group bg-card shadow-lg border border-[#b19681] rounded-2xl overflow-hidden hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-[4px] hover:-translate-y-[2px] transition-all duration-300">
            <div className="relative">
              <Link href={`/products/${product.id}`}>
                <div className="aspect-square relative overflow-hidden">
                  {product.images && product.images.length > 0 && product.images[0] ? (
                    <Image
                      src={getServerProcessedImageUrl(product.images[0] as ServerProcessedImage) || '/placeholder.jpg'}
                      alt={getServerProcessedImageAlt(product.images[0] as ServerProcessedImage, product.name)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                      <div className="text-muted-foreground text-4xl">📦</div>
                    </div>
                  )}
                </div>
              </Link>

              {/* Category Badge */}
              {product.category && (
                <Badge 
                  variant="secondary" 
                  className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm text-foreground border-border"
                >
                  {typeof product.category === 'object' && product.category && 'name' in product.category 
                    ? product.category.name 
                    : 'Premium'
                  }
                </Badge>
              )}
            </div>

            <CardContent className="p-6">
              <div className="space-y-3">
                <div>
                  <Link href={`/products/${product.id}`}>
                    <h4 className="font-bold text-foreground text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </h4>
                  </Link>
                </div>

                <div className="flex items-center gap-2">
                  <StarRating rating={product.reviewRating} iconClassName="size-4" />
                  <span className="text-sm text-muted-foreground">
                    ({product.reviewRating})
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-foreground">
                    {formatCurrency(product.price)}
                  </div>
                  <Badge variant="outline" className="bg-muted text-foreground border-border">
                    Dostępny
                  </Badge>
                </div>

                <div className="flex gap-2 pt-2">
                  <Link href={`/products/${product.id}`} className="flex-1">
                    <Button variant="outline" className="w-full border-border hover:border-primary">
                      <Eye className="h-4 w-4 mr-2" />
                      Zobacz
                    </Button>
                  </Link>
                  <CartButton 
                    productId={product.id}
                    showQuantitySelector={false}
                    size="sm"
                    className="flex-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
