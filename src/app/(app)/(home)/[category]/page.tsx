import {   getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
 
import type { SearchParams } from "nuqs/server";
import { loadProductFilters } from "@/modules/products/search-params";
 
import { ProductListView } from "@/modules/products/views/product-list-view";
import { DEFAULT_LIMIT } from "@/constants";
import { Suspense } from "react";
import { LoadingPage } from "@/components/loading-spinner";

export const dynamic = 'force-dynamic';

interface Props{
    params: Promise<{
        category:string;
    }>,
    searchParams: Promise<SearchParams>;

};

const CategoryPageContent = async({params, searchParams}:Props) =>{
    
    const{category} = await params;
    const filters = await loadProductFilters(searchParams);

 

    const queryClient = getQueryClient();
    void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
        ...filters,
        category,
        limit:DEFAULT_LIMIT
        
    }));


    return(
            <HydrationBoundary state = {dehydrate(queryClient)}>
                <ProductListView category={category}/> 
            </HydrationBoundary>
        
    );
};

const Page = async({params, searchParams}:Props) =>{
    return (
        <Suspense fallback={<LoadingPage text="Loading category..." />}>
            <CategoryPageContent params={params} searchParams={searchParams} />
        </Suspense>
    );
};

export default Page;