import { Suspense } from "react"
import { ProductFilters } from "../ui/components/product-filters"
import { AdvancedSortFilter } from "../ui/components/advanced-sort-filter"
import { ProductList, ProductListSkeleton } from "../ui/components/product-list"
import { SearchDisplay } from "../ui/components/search-display"
import { LoadingSection } from "@/components/loading-spinner";

interface Props {
    category?: string;
}

const ProductListContent = ({ category }: Props) => {
    return (
        <div className="px-4 lg:px-8 py-6 max-w-7xl mx-auto bg-background min-h-screen">
            <div className="flex flex-col gap-6 mb-8">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                        {category === "beds-and-washers" ? "Łóżka i myjki headspa" :
                         category === "online-training" ? "Szkolenia online" :
                         category === "personal-training" ? "Trening personalny" :
                         category === "investment-pack" ? "Pakiet inwestycyjny" :
                         category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Products` : "Wszystkie produkty"}
                    </h1>
                    <p className="text-sm text-muted-foreground max-w-2xl">
                        {category === "beds-and-washers" ? "Profesjonalne łóżka i myjki headspa dla salonów fryzjerskich" :
                         category === "online-training" ? "Profesjonalne szkolenia online z zakresu headspa" :
                         category === "personal-training" ? "Indywidualne treningi personalne z zakresu headspa" :
                         category === "investment-pack" ? "Kompletne pakiety inwestycyjne dla salonów" :
                         "Odkryj nasze premium produkty spa i wellness"}
                    </p>
                </div>
                
                <div className="w-full lg:ml-auto lg:max-w-[calc(80%-1.5rem)]">
                    <AdvancedSortFilter />
                </div>
            </div>

            <SearchDisplay />
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-1 order-2 lg:order-1">
                    <div className="sticky top-6">
                        <Suspense fallback={<LoadingSection text="Ładowanie filtrów..." />}>
                            <ProductFilters />
                        </Suspense>
                    </div>
                </div>

                <div className="lg:col-span-4 order-1 lg:order-2">
                    <Suspense fallback={<ProductListSkeleton />}>
                        <ProductList category={category} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export const ProductListView = ({ category }: Props) => {
    return (
        <Suspense fallback={<LoadingSection text="Ładowanie produktów..." />}>
            <ProductListContent category={category} />
        </Suspense>
    );
};