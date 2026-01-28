import { Metadata } from "next";
import { Suspense } from "react";
import { LoadingPage } from "@/components/loading-spinner";
import { CategoryPageContent } from "@/modules/products/ui/views/category-page-content";

export const metadata: Metadata = {
    title: "Łóżka i myjki headspa - HeadSpa",
    description: "Odkryj nasze profesjonalne łóżka i myjki headspa. Najwyższej jakości sprzęt do salonów fryzjerskich i spa.",
    keywords: "łóżka headspa, myjki headspa, sprzęt fryzjerski, salon fryzjerski, spa equipment",
    openGraph: {
        title: "Łóżka i myjki headspa - HeadSpa",
        description: "Profesjonalne łóżka i myjki headspa dla salonów fryzjerskich",
        type: "website",
    },
};

const BedsAndWashersPageContent = async () => {
    return <CategoryPageContent category="beds-and-washers" />
};

const BedsAndWashersPage = () => {
    return (
        <Suspense fallback={<LoadingPage text="Ładowanie łóżek i myjek..." />}>
            <BedsAndWashersPageContent />
        </Suspense>
    );
};

export default BedsAndWashersPage;
