import { Metadata } from "next";
import { Suspense } from "react";
import { LoadingPage } from "@/components/loading-spinner";
import { CategoryPageContent } from "@/modules/products/ui/views/category-page-content";

export const metadata: Metadata = {
    title: "Trening personalny - HeadSpa",
    description: "Indywidualne treningi personalne z zakresu headspa. Osobiste szkolenia i konsultacje.",
    keywords: "trening personalny, headspa, szkolenia indywidualne, konsultacje, masaż głowy",
    openGraph: {
        title: "Trening personalny - HeadSpa",
        description: "Indywidualne treningi personalne z zakresu headspa",
        type: "website",
    },
};

const PersonalTrainingPageContent = async () => {
    return <CategoryPageContent category="personal-training" />
};

const PersonalTrainingPage = () => {
    return (
        <Suspense fallback={<LoadingPage text="Ładowanie treningów personalnych..." />}>
            <PersonalTrainingPageContent />
        </Suspense>
    );
};

export default PersonalTrainingPage;
