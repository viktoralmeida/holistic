"use client"

import { toast } from "sonner";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCart } from "../../hooks/use-cart";
import { useEffect, useState, useCallback } from "react";
import { CheckoutItem } from "../components/checkout-item";
import { CheckoutSidebar } from "../components/checkout-sidebar";
import { InboxIcon, AlertCircle, ArrowLeft } from "lucide-react";
import { useCheckoutStates } from "../../hooks/use-checkout-states";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery as useAuthQuery } from "@tanstack/react-query";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/loading-spinner";
import Link from "next/link";

export const CheckoutView = () => {
  const router = useRouter();
  const [states, setStates] = useCheckoutStates();
  const { productIds, items, removeProduct, updateQuantity, clearCart } = useCart();
  const [guestEmail, setGuestEmail] = useState("");
  const [isGuestCheckout, setIsGuestCheckout] = useState(false);
  const [emailError, setEmailError] = useState("");

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const session = useAuthQuery(trpc.auth.session.queryOptions());

  const { data, error, isLoading } = useQuery(trpc.checkout.getProducts.queryOptions({
    items: items,
  }));

  const purchase = useMutation(trpc.checkout.purchase.mutationOptions({
    onMutate: () => {
      setStates({ success: false, cancel: false });
    },
    onSuccess: (data) => {
      window.location.href = data.url;
    },
    onError: (error) => {
      if (error.data?.code === "UNAUTHORIZED") {
        setIsGuestCheckout(true);
      } else {
        toast.error(error.message || "Płatność nie powiodła się. Spróbuj ponownie.");
      }
    },
  }));

  const guestPurchase = useMutation(trpc.checkout.guestPurchase.mutationOptions({
    onMutate: () => {
      setStates({ success: false, cancel: false });
    },
    onSuccess: (data) => {
      window.location.href = data.url;
    },
    onError: (error) => {
      toast.error(error.message || "Płatność nie powiodła się. Spróbuj ponownie.");
    },
  }));

  // Send payment success emails directly from checkout success page
  const sendPaymentEmails = useCallback(async () => {
    try {
      // Get session ID from URL state
      const sessionId = states.session_id;
      
      if (!sessionId) {
        console.log('No session ID found, skipping email sending');
        return;
      }

      console.log('📧 Sending payment emails for session:', sessionId);

      // Call our API to retrieve order details from Stripe and send emails
      const response = await fetch('/api/send-payment-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: sessionId
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('✅ Payment emails sent successfully!', result);
      } else {
        console.error('❌ Failed to send payment emails:', result);
      }
    } catch (error) {
      console.error('❌ Error sending payment emails:', error);
    }
  }, [states.session_id]);

  useEffect(() => {
    if (states.success && states.session_id) {
      setStates({ success: false, cancel: false, session_id: null });
      clearCart();
      toast.success("Płatność zakończona pomyślnie!");
      
      // Send payment success emails
      sendPaymentEmails();
    }
  }, [
    states.success,
    states.session_id,
    clearCart,
    setStates,
    queryClient,
    sendPaymentEmails,
  ]);

  useEffect(() => {
    if (error?.data?.code === "NOT_FOUND") {
      clearCart();
      toast.warning("Znaleziono nieprawidłowe produkty, koszyk został wyczyszczony")
    }
  }, [error, clearCart]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePurchase = () => {
    if (session.data?.user) {
      purchase.mutate({ items });
    } else if (isGuestCheckout && guestEmail) {
      if (!validateEmail(guestEmail)) {
        setEmailError("Proszę podać prawidłowy adres email");
        return;
      }
      setEmailError("");
      guestPurchase.mutate({ items, email: guestEmail });
    } else {
      setIsGuestCheckout(true);
    }
  };

  // Redirect if cart is empty
  useEffect(() => {
    if (productIds.length === 0) {
      router.push("/products");
    }
  }, [productIds.length, router]);

  if (productIds.length === 0) {
    return (
      <div className="px-4 lg:px-8 py-6 max-w-4xl mx-auto">
        <div className="border border-dashed rounded-lg flex items-center justify-center p-12 flex-col gap-y-4 bg-muted/20">
          <InboxIcon className="h-12 w-12 text-muted-foreground" />
          <h2 className="text-xl font-semibold">Twój koszyk jest pusty</h2>
          <p className="text-muted-foreground text-center max-w-sm">
            Dodaj produkty do koszyka, aby kontynuować zakupy
          </p>
          <Button onClick={() => router.push("/products")} className="mt-4">
            Kontynuuj zakupy
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="px-4 lg:px-8 py-6 max-w-4xl mx-auto">
        <div className="border border-dashed rounded-lg flex items-center justify-center p-12 flex-col gap-y-4 bg-muted/20">
          <LoadingSpinner size="lg" text="Ładowanie koszyka..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 lg:px-8 py-6 max-w-4xl mx-auto">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error.message || "Wystąpił błąd podczas ładowania koszyka. Spróbuj ponownie."}
          </AlertDescription>
        </Alert>
        <div className="mt-4">
          <Button variant="outline" onClick={() => router.push("/products")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Powrót do produktów
          </Button>
        </div>
      </div>
    );
  }

  if (data?.totalDocs === 0) {
    return (
      <div className="px-4 lg:px-8 py-6 max-w-4xl mx-auto">
        <div className="border border-dashed rounded-lg flex items-center justify-center p-12 flex-col gap-y-4 bg-muted/20">
          <InboxIcon className="h-12 w-12 text-muted-foreground" />
          <h2 className="text-xl font-semibold">Nie znaleziono produktów</h2>
          <p className="text-muted-foreground text-center max-w-sm">
            Produkty w Twoim koszyku mogły zostać usunięte lub są już niedostępne
          </p>
          <Button onClick={() => router.push("/products")} className="mt-4">
            Kontynuuj zakupy
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 lg:px-8 py-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link 
          href="/products" 
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Powrót do produktów
        </Link>
        <h1 className="text-3xl font-bold mt-2">Kasa</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="border border-[#b19681] rounded-lg overflow-hidden bg-card">
            {data?.docs.map((product, index) => (
              <CheckoutItem
                key={product.id}
                isLast={index === data.docs.length - 1}
                image={product.image}
                name={product.name}
                productUrl={`/products/${product.id}`}
                price={product.price}
                quantity={product.quantity}
                onRemove={() => removeProduct(product.id)}
                onQuantityChange={(quantity) => updateQuantity(product.id, quantity)}
              />
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-3">
          {isGuestCheckout && !session.data?.user && (
            <div className="mb-6 p-4 border border-[#b19681] rounded-lg bg-card">
              <Label htmlFor="guest-email" className="text-sm font-medium">Email do paragonu</Label>
              <Input
                id="guest-email"
                type="email"
                placeholder="Wprowadź swój email"
                value={guestEmail}
                onChange={(e) => {
                  setGuestEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                className={`mt-2 ${emailError ? "border-red-500" : ""}`}
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
              <p className="text-sm text-muted-foreground mt-2">
                Wyślemy paragon i potwierdzenie zamówienia na ten email.
              </p>
            </div>
          )}
          
          <CheckoutSidebar
            total={data?.totalPrice || 0}
            onPurchase={handlePurchase}
            isCanceled={states.cancel}
            disabled={purchase.isPending || guestPurchase.isPending || (isGuestCheckout && !guestEmail)}
          />
        </div>
      </div>
    </div>
  );
};