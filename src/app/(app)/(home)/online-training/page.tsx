import { Metadata } from "next";
import { Suspense } from "react";
import { LoadingPage } from "@/components/loading-spinner";
import { CategoryPageContent } from "@/modules/products/ui/views/category-page-content";

export const metadata: Metadata = {
    title: "Szkolenia online - HeadSpa",
    description: "Profesjonalne szkolenia online z zakresu headspa. Naucz się technik masażu głowy i relaksacji.",
    keywords: "szkolenia online, headspa, masaż głowy, techniki relaksacji, kursy online",
    openGraph: {
        title: "Szkolenia online - HeadSpa",
        description: "Profesjonalne szkolenia online z zakresu headspa",
        type: "website",
    },
};

const OnlineTrainingPageContent = async () => {
    return <CategoryPageContent category="online-training" />
};

const OnlineTrainingPage = () => {
    return (
        <Suspense fallback={<LoadingPage text="Ładowanie szkoleń online..." />}>
            <OnlineTrainingPageContent />
        </Suspense>
    );
};

export default OnlineTrainingPage;
