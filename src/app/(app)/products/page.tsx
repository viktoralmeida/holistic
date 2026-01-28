import { DEFAULT_LIMIT } from "@/constants";
import { loadProductFilters } from "@/modules/products/search-params";
import { ProductListView } from "@/modules/products/views/product-list-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs";
import type { Metadata } from "next";
import { Suspense } from "react";
import { LoadingPage } from "@/components/loading-spinner";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Products - HeadSpa",
  description: "Discover our premium organic spa treatments and wellness products. Browse our collection of high-quality, natural products designed for your wellness journey.",
  keywords: "spa products, organic treatments, wellness, natural products, spa treatments",
};

interface Props {
    searchParams: Promise<SearchParams>;
}

const ProductsPageContent = async ({ searchParams }: Props) => {
    const filters = await loadProductFilters(searchParams);

    const queryClient = getQueryClient();
    void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
        ...filters,
        limit: DEFAULT_LIMIT
    }));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductListView />
        </HydrationBoundary>
    );
}

const Page = async ({ searchParams }: Props) => {
    return (
        <Suspense fallback={<LoadingPage text="Loading products..." />}>
            <ProductsPageContent searchParams={searchParams} />
        </Suspense>
    );
}

export default Page; 