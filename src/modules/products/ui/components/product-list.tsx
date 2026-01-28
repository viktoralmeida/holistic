"use client";

import { useTRPC } from "@/trpc/client"
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useProductFilters } from "../../hooks/use-product-filters";
import { ProductCard, ProductCardSkeleton } from "./product-card";
import { DEFAULT_LIMIT } from "@/constants";
import { Button } from "@/components/ui/button";
import { InboxIcon, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Props {
    category?: string;
}

export const ProductList = ({ category }: Props) => {
    const [filters] = useProductFilters();

    const trpc = useTRPC();
    const {
        data,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
        error
    } = useSuspenseInfiniteQuery(trpc.products.getMany.infiniteQueryOptions(
        {
            ...filters,
            category,
            limit: DEFAULT_LIMIT
        },
        {
            getNextPageParam: (lastPage) => {
                return lastPage.docs.length > 0 ? lastPage.nextPage : undefined;
            },
        }
    ));

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                    {error.message || "Wystąpił błąd podczas ładowania produktów. Spróbuj ponownie."}
                </AlertDescription>
            </Alert>
        );
    }

    if (data.pages?.[0]?.docs.length === 0) {
        return (
            <div className="border border-dashed border-[#b19681] rounded-lg flex items-center justify-center p-12 flex-col gap-y-4 bg-muted/20">
                <InboxIcon className="h-8 w-8 text-muted-foreground" />
                <p className="text-base font-medium">Nie znaleziono produktów</p>
                <p className="text-sm text-muted-foreground text-center max-w-sm">
                    Spróbuj dostosować filtry lub przeglądaj naszą pełną kolekcję
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data?.pages.flatMap((page) => page.docs).map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        image={product.image}
                        price={product.price}
                        category={product.category}
                        productType={product.productType}
                    />
                ))}
            </div>

            {hasNextPage && (
                <div className="flex justify-center pt-8">
                    <Button
                        disabled={isFetchingNextPage}
                        onClick={() => fetchNextPage()}
                        className="font-medium disabled:opacity-50"
                        variant="outline"
                    >
                        {isFetchingNextPage ? "Ładowanie..." : "Załaduj więcej"}
                    </Button>
                </div>
            )}
        </>
    );
};

export const ProductListSkeleton = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: DEFAULT_LIMIT }).map((_, index) => (
                <ProductCardSkeleton key={index} />
            ))}
        </div>
    );
};