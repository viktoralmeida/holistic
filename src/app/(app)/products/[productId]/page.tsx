import { ProductView } from "@/modules/products/views/product-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";
import { Suspense } from "react";
import { LoadingPage } from "@/components/loading-spinner";

export const dynamic = 'force-dynamic';

interface Props {
    params: Promise<{ productId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { productId } = await params;
    
    try {
        const queryClient = getQueryClient();
        const product = await queryClient.fetchQuery(trpc.products.getOne.queryOptions({ id: productId }));
        
        return {
            title: `${product.name} - HeadSpa`,
            description: `Discover ${product.name} - a premium organic spa treatment from HeadSpa.`,
            keywords: `${product.name}, spa treatment, organic, wellness, HeadSpa`,
        };
    } catch {
        return {
            title: "Product - HeadSpa",
            description: "Discover premium organic spa treatments from HeadSpa.",
        };
    }
}

const ProductDetailContent = async ({ params }: Props) => {
    const { productId } = await params;

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.products.getOne.queryOptions({
        id: productId,
    }));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductView productId={productId} />
        </HydrationBoundary>
    );
}

const Page = async ({ params }: Props) => {
    return (
        <Suspense fallback={<LoadingPage text="Loading product details..." />}>
            <ProductDetailContent params={params} />
        </Suspense>
    );
}

export default Page; 