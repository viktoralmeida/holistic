import { CheckoutView } from "@/modules/checkout/ui/views/checkout-view";
import type { Metadata } from "next";
import { Suspense } from "react";
import { LoadingPage } from "@/components/loading-spinner";

export const metadata: Metadata = {
  title: "Kasa - Holistic Point",
  description: "Dokończ zakupy bezpiecznie dzięki naszemu prostemu procesowi kasowemu. Dostępna kasa dla gości.",
  robots: "noindex, nofollow", // Prevent indexing of checkout pages
};

const CheckoutPageContent = async () => {
    return <CheckoutView />
}

const Page = async () => {
    return (
      <Suspense fallback={<LoadingPage text="Ładowanie kasy..." />}>
        <CheckoutPageContent />
      </Suspense>
    )
}

export default Page; 