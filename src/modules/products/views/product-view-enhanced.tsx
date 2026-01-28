"use client"
import { StarRating } from "@/components/star-rating";
import { Button } from "@/components/ui/button";
import { formatCurrency, cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { 
  CheckIcon, 
  AlertCircle, 
  MessageSquare, 
  Star, 
  Truck, 
  Award, 
  ChevronRight,
  Clock,
  Package,
  CheckCircle,
  Share2,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  Headphones,
  Loader2,
  ShoppingCart
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useMutation } from "@tanstack/react-query";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ProductImageCarousel } from "@/components/product-image-carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCartStore } from "@/modules/checkout/store/use-cart-store";
import { QuantitySelector } from "@/components/ui/quantity-selector";

interface ProductViewProps {
  productId: string;
}

export const ProductViewEnhanced = ({ productId }: ProductViewProps) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.products.getOne.queryOptions({ id: productId })
  );
  
  const session = useQuery(trpc.auth.session.queryOptions());
  const [isCopied, setIsCopied] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Cart state
  const addProduct = useCartStore((state) => state.addProduct);

  // Fetch all reviews for this product
  const reviewsQuery = useQuery(trpc.reviews.getAll.queryOptions({ productId }));
  // Fetch current user's review for this product
  const myReviewQuery = useQuery(trpc.reviews.getOne.queryOptions({ productId }));

  const createReview = useMutation(trpc.reviews.create.mutationOptions({
    onSuccess: () => {
      toast.success("Recenzja została dodana pomyślnie!");
      setIsReviewDialogOpen(false);
      setReviewText("");
      setReviewRating(5);
      setEditingReviewId(null);
      reviewsQuery.refetch();
      myReviewQuery.refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Nie udało się dodać recenzji");
    },
  }));

  const updateReview = useMutation(trpc.reviews.update.mutationOptions({
    onSuccess: () => {
      toast.success("Recenzja została zaktualizowana pomyślnie!");
      setIsReviewDialogOpen(false);
      setReviewText("");
      setReviewRating(5);
      setEditingReviewId(null);
      reviewsQuery.refetch();
      myReviewQuery.refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Nie udało się zaktualizować recenzji");
    },
  }));

  if (!data) {
    return (
      <div className="px-4 lg:px-8 py-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Produkt nie został znaleziony. Może został usunięty lub nie jest już dostępny.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Prepare review dialog for create or edit
  const openReviewDialog = () => {
    if (myReviewQuery.data) {
      setReviewText(myReviewQuery.data.description);
      setReviewRating(myReviewQuery.data.rating);
      setEditingReviewId(myReviewQuery.data.id);
    } else {
      setReviewText("");
      setReviewRating(5);
      setEditingReviewId(null);
    }
    setIsReviewDialogOpen(true);
  };

  const handleReviewSubmit = () => {
    if (!session.data?.user) {
      toast.error("Zaloguj się, aby zostawić recenzję");
      return;
    }
    if (!reviewText.trim()) {
      toast.error("Wprowadź recenzję");
      return;
    }
    if (editingReviewId) {
      updateReview.mutate({
        reviewId: editingReviewId,
        rating: reviewRating,
        description: reviewText.trim(),
      });
    } else {
      createReview.mutate({
        productId,
        rating: reviewRating,
        description: reviewText.trim(),
      });
    }
  };

  // Helper for avatar fallback
  const getInitial = (user: { username?: string } | string): string => {
    if (user && typeof user === 'object' && user.username) {
      return user.username[0]?.toUpperCase() || '?';
    }
    return '?';
  };


  // Trust indicators
  const trustIndicators = [
    { icon: ShieldCheck, text: "Bezpieczne płatności", color: "text-green-600" },
    { icon: Truck, text: "Szybka dostawa 24h", color: "text-blue-600" },
    { icon: RefreshCw, text: "30 dni na zwrot", color: "text-purple-600" },
    { icon: Headphones, text: "Wsparcie 24/7", color: "text-orange-600" },
    { icon: Award, text: "Gwarancja jakości", color: "text-yellow-600" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Breadcrumb */}
      <div className="bg-card border-b border-[#b19681]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground transition-colors">Strona główna</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/products" className="hover:text-foreground transition-colors">Produkty</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">{data.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* Left Column - Product Images and Details */}
           <div className="space-y-6">
             <ProductImageCarousel 
               images={data.images || []}
               showThumbnails={true}
               className="w-full"
             />
             
             {/* Product Details Tabs - Moved to Left Side */}
             <div className="bg-card rounded-sm shadow-xl border border-border p-6">
               <Tabs defaultValue="characteristics" className="w-full">
                 <div className="flex justify-center">
                   <TabsList className="inline-flex gap-3 bg-transparent p-0 border-0">
                     <TabsTrigger 
                       value="characteristics" 
                       className="!px-6 !py-2.5 !text-sm !font-semibold !text-gray-800 !border !border-gray-300 !transition-colors !border-transparent hover:!bg-gray-100 data-[state=active]:!bg-gray-100 data-[state=active]:!text-gray-800 data-[state=active]:!border-gray-300"
                       style={{ backgroundColor: "#fdfbf7" }}
                     >
                       Charakterystyka
                     </TabsTrigger>
                     <TabsTrigger 
                       value="reviews" 
                       className="!px-6 !py-2.5 !text-sm !font-semibold !text-gray-800 !border !border-gray-300 !transition-colors !border-transparent hover:!bg-gray-100 data-[state=active]:!bg-gray-100 data-[state=active]:!text-gray-800 data-[state=active]:!border-gray-300"
                       style={{ backgroundColor: "#fdfbf7" }}
                     >
                       Recenzje
                     </TabsTrigger>
                   </TabsList>
                 </div>

                 <TabsContent value="characteristics" className="mt-0">
                   {data.characteristics && data.characteristics.length > 0 ? (
                     <div className="space-y-1">
                       {data.characteristics.map((characteristic, index) => (
                         <div key={index} className="group relative">
                           <div className="flex items-start gap-2 p-4 rounded-sm border border-border/40 hover:border-border hover:bg-muted/20 transition-all duration-200 ease-in-out">
                             <div className="flex-shrink-0 w-1.5 h-1.5 bg-primary rounded-sm mt-2 opacity-60 group-hover:opacity-100 transition-opacity duration-200"></div>
                             <p className="text-foreground leading-relaxed text-sm font-normal flex-1">
                               {characteristic.text}
                             </p>
                           </div>
                         </div>
                       ))}
                     </div>
                   ) : (
                     <div className="text-center py-12">
                       <div className="w-16 h-16 mx-auto mb-4 bg-muted/50 rounded-sm flex items-center justify-center">
                         <Sparkles className="h-8 w-8 text-muted-foreground/60" />
                       </div>
                       <h3 className="text-lg font-semibold text-foreground mb-2">Brak charakterystyk</h3>
                       <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                         Charakterystyki produktu nie zostały jeszcze dodane przez sprzedawcę.
                       </p>
                     </div>
                   )}
                 </TabsContent>

                 <TabsContent value="reviews" className="mt-0">
                   {reviewsQuery.isLoading ? (
                     <div className="text-center py-8">
                       <div className="w-12 h-12 mx-auto mb-3 bg-muted rounded-md flex items-center justify-center animate-pulse">
                         <MessageCircle className="h-6 w-6 text-muted-foreground" />
                       </div>
                       <p className="text-xs text-muted-foreground">Ładowanie recenzji...</p>
                     </div>
                   ) : Array.isArray(reviewsQuery.data) && reviewsQuery.data.length === 0 ? (
                     <div className="text-center py-8">
                       <div className="w-12 h-12 mx-auto mb-3 bg-muted rounded-md flex items-center justify-center">
                         <MessageCircle className="h-6 w-6 text-muted-foreground" />
                       </div>
                       <h3 className="text-base font-semibold text-foreground mb-1">Brak recenzji</h3>
                       <p className="text-xs text-muted-foreground">Bądź pierwszym, który zostawi recenzję dla tego produktu!</p>
                     </div>
                   ) : (
                     <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin">
                       {Array.isArray(reviewsQuery.data) && reviewsQuery.data.map((review) => (
                         <div key={review.id} className="p-4 rounded-md bg-muted/30 border border-border/50 hover:bg-muted/50 hover:border-primary/20 transition-all duration-200">
                           <div className="flex items-start gap-3">
                             <Avatar className="w-8 h-8 border border-border">
                               <AvatarFallback className="text-xs font-bold bg-gradient-to-br from-primary to-accent text-primary-foreground">
                                 {getInitial(review.user)}
                               </AvatarFallback>
                             </Avatar>
                             <div className="flex-1 min-w-0">
                               <div className="flex items-center justify-between mb-2">
                                 <div>
                                   <h4 className="font-semibold text-foreground text-xs">
                                     {typeof review.user === 'object' ? (review.user.username || "Anonimowy") : "Anonimowy"}
                                   </h4>
                                   <p className="text-xs text-muted-foreground">
                                     {new Date(review.createdAt).toLocaleDateString('pl-PL', {
                                       year: 'numeric',
                                       month: 'short',
                                       day: 'numeric'
                                     })}
                                   </p>
                                 </div>
                                 <div className="flex items-center gap-2">
                                   <StarRating rating={review.rating} iconClassName="size-3" />
                                   <Badge variant="secondary" className="bg-muted text-foreground border-border text-xs px-2 py-0.5">
                                     {review.rating}/5
                                   </Badge>
                                 </div>
                               </div>
                               <p className="text-foreground leading-relaxed text-xs">
                                 {review.description}
                               </p>
                             </div>
                           </div>
                         </div>
                       ))}
                     </div>
                   )}
                 </TabsContent>
               </Tabs>
             </div>
           </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Product Header */}
            <div className="bg-card rounded-md shadow-xl border border-border p-4 sm:p-8">
              <div className="mb-6">
                {/* Desktop Badge Layout */}
                <div className="hidden sm:flex items-center gap-3 mb-4">
                  <Badge variant="secondary" className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-4 py-2 text-sm font-semibold">
                    {typeof data.category === 'object' && data.category && 'name' in data.category ? data.category.name : 'Premium'}
                  </Badge>
                  <Badge variant="outline" className="border-primary text-primary">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Dostępny
                  </Badge>
                </div>
                
                {/* Mobile Badge Layout */}
                <div className="sm:hidden flex flex-col gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-3 py-1 text-xs font-semibold">
                      {typeof data.category === 'object' && data.category && 'name' in data.category ? data.category.name : 'Premium'}
                    </Badge>
                    <Badge variant="outline" className="border-primary text-primary text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Dostępny
                    </Badge>
                  </div>
                </div>
                
                <h1 className="text-2xl sm:text-4xl font-bold text-foreground mb-4 leading-tight">
                  {data.name}
                </h1>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <StarRating rating={data.reviewRating} iconClassName="size-4 sm:size-5" />
                    <span className="text-xs sm:text-sm font-medium text-muted-foreground">
                      {data.reviewRating} ({reviewsQuery.data?.length || 0} recenzji)
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-3xl sm:text-5xl font-bold text-foreground mb-2">
                    {formatCurrency(data.price)}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    Cena zawiera podatek VAT
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8">
                {trustIndicators.map((indicator, index) => (
                  <div key={index} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-md bg-muted border border-border">
                    <indicator.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-foreground">{indicator.text}</span>
                  </div>
                ))}
              </div>

               {/* Action Buttons */}
               <div className="space-y-4">
                 {/* Desktop Layout - Side by Side */}
                 <div className="hidden sm:flex flex-row gap-3">
                  <Button
                    variant="elevated"
                    className={cn(
                      "flex-1 h-10 text-sm font-semibold text-gray-800 border border-gray-300",
                      "px-4 transition-all duration-200",
                      isCopied ? "bg-green-100" : "hover:bg-gray-100"
                    )}
                    style={{ backgroundColor: isCopied ? "#f0f9f0" : "#fdfbf7" }}
                    onClick={() => {
                      setIsCopied(true);
                      navigator.clipboard.writeText(window.location.href);
                      toast.success("Link do produktu skopiowany do schowka");
                      setTimeout(() => setIsCopied(false), 1000);
                    }}
                    disabled={isCopied}
                  >
                    {isCopied ? <CheckIcon className="h-4 w-4 mr-2" /> : <Share2 className="h-4 w-4 mr-2" />}
                    <span className="truncate">
                      {isCopied ? "Skopiowano!" : "Udostępnij"}
                    </span>
                  </Button>

                  <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="elevated"
                        className="flex-1 h-10 text-sm font-semibold text-gray-800 border border-gray-300 hover:bg-gray-100 px-4 transition-all duration-200" 
                        style={{ backgroundColor: "#fdfbf7" }}
                        onClick={openReviewDialog}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        <span className="truncate">
                          {myReviewQuery.data ? "Edytuj recenzję" : "Napisz recenzję"}
                        </span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                          {editingReviewId ? "Edytuj recenzję" : "Napisz recenzję"}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6">
                        {!session.data?.user && (
                          <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              Zaloguj się, aby zostawić recenzję dla tego produktu.
                            </AlertDescription>
                          </Alert>
                        )}
                        
                        <div>
                          <Label className="text-base font-semibold">Ocena</Label>
                          <div className="flex gap-1 mt-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Button
                                key={star}
                                variant="ghost"
                                size="sm"
                                onClick={() => setReviewRating(star)}
                                className="p-2 hover:bg-yellow-50"
                              >
                                <Star 
                                  className={`h-6 w-6 ${star <= reviewRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                />
                              </Button>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="review-text" className="text-base font-semibold">Recenzja</Label>
                          <Textarea
                            id="review-text"
                            placeholder="Podziel się swoimi doświadczeniami z tym produktem..."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            className="mt-3 min-h-[120px] text-base"
                            rows={4}
                          />
                        </div>
                        
                        <div className="flex gap-3">
                          <Button 
                            onClick={handleReviewSubmit}
                            disabled={!session.data?.user || createReview.isPending || updateReview.isPending}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                            size="lg"
                          >
                            {(createReview.isPending || updateReview.isPending)
                              ? "Zapisywanie..."
                              : editingReviewId ? "Zaktualizuj recenzję" : "Wyślij recenzję"}
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => setIsReviewDialogOpen(false)}
                            size="lg"
                          >
                            Anuluj
                          </Button>
                        </div>
                      </div>
                     </DialogContent>
                   </Dialog>
                 </div>

                 {/* Mobile Layout - Stacked */}
                 <div className="sm:hidden space-y-3">
                   <Button
                     variant="elevated"
                     className={cn(
                       "w-full h-10 text-sm font-semibold text-gray-800 border border-gray-300",
                       "px-4 transition-all duration-200",
                       isCopied ? "bg-green-100" : "hover:bg-gray-100"
                     )}
                     style={{ backgroundColor: isCopied ? "#f0f9f0" : "#fdfbf7" }}
                     onClick={() => {
                       setIsCopied(true);
                       navigator.clipboard.writeText(window.location.href);
                       toast.success("Link do produktu skopiowany do schowka");
                       setTimeout(() => setIsCopied(false), 1000);
                     }}
                     disabled={isCopied}
                   >
                     {isCopied ? <CheckIcon className="h-4 w-4 mr-2" /> : <Share2 className="h-4 w-4 mr-2" />}
                     <span className="truncate">
                       {isCopied ? "Skopiowano!" : "Udostępnij"}
                     </span>
                   </Button>

                   <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
                     <DialogTrigger asChild>
                       <Button 
                         variant="elevated"
                         className="w-full h-10 text-sm font-semibold text-gray-800 border border-gray-300 hover:bg-gray-100 px-4 transition-all duration-200" 
                         style={{ backgroundColor: "#fdfbf7" }}
                         onClick={openReviewDialog}
                       >
                         <MessageSquare className="h-4 w-4 mr-2" />
                         <span className="truncate">
                           {myReviewQuery.data ? "Edytuj recenzję" : "Napisz recenzję"}
                         </span>
                       </Button>
                     </DialogTrigger>
                     <DialogContent className="max-w-2xl">
                       <DialogHeader>
                         <DialogTitle className="text-2xl font-bold">
                           {editingReviewId ? "Edytuj recenzję" : "Napisz recenzję"}
                         </DialogTitle>
                       </DialogHeader>
                       <div className="space-y-6">
                         {!session.data?.user && (
                           <Alert>
                             <AlertCircle className="h-4 w-4" />
                             <AlertDescription>
                               Zaloguj się, aby zostawić recenzję dla tego produktu.
                             </AlertDescription>
                           </Alert>
                         )}
                         
                         <div>
                           <Label className="text-base font-semibold">Ocena</Label>
                           <div className="flex gap-1 mt-3">
                             {[1, 2, 3, 4, 5].map((star) => (
                               <Button
                                 key={star}
                                 variant="ghost"
                                 size="sm"
                                 onClick={() => setReviewRating(star)}
                                 className="p-2 hover:bg-yellow-50"
                               >
                                 <Star 
                                   className={`h-6 w-6 ${star <= reviewRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                 />
                               </Button>
                             ))}
                           </div>
                         </div>
                         
                         <div>
                           <Label htmlFor="review-text" className="text-base font-semibold">Recenzja</Label>
                           <Textarea
                             id="review-text"
                             placeholder="Podziel się swoimi doświadczeniami z tym produktem..."
                             value={reviewText}
                             onChange={(e) => setReviewText(e.target.value)}
                             className="mt-3 min-h-[120px] text-base"
                             rows={4}
                           />
                         </div>
                         
                         <div className="flex gap-3">
                           <Button 
                             onClick={handleReviewSubmit}
                             disabled={!session.data?.user || createReview.isPending || updateReview.isPending}
                             className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                             size="lg"
                           >
                             {(createReview.isPending || updateReview.isPending)
                               ? "Zapisywanie..."
                               : editingReviewId ? "Zaktualizuj recenzję" : "Wyślij recenzję"}
                           </Button>
                           <Button 
                             variant="outline" 
                             onClick={() => setIsReviewDialogOpen(false)}
                             size="lg"
                           >
                             Anuluj
                           </Button>
                         </div>
                       </div>
                     </DialogContent>
                   </Dialog>
                 </div>
                 
                 {/* Quantity Selector and Add to Cart */}
                 <div className="w-full space-y-4">
                   {/* Desktop Layout */}
                   <div className="hidden sm:flex items-center justify-between">
                     <span className="text-base font-semibold text-foreground">Ilość:</span>
                     <QuantitySelector
                       value={quantity}
                       onChange={setQuantity}
                       size="lg"
                       min={1}
                       max={99}
                     />
                   </div>
                   
                   {/* Mobile Layout */}
                   <div className="sm:hidden space-y-3">
                     <span className="text-sm font-semibold text-foreground block">Ilość:</span>
                     <div className="flex justify-center">
                       <QuantitySelector
                         value={quantity}
                         onChange={setQuantity}
                         size="md"
                         min={1}
                         max={99}
                       />
                     </div>
                   </div>
                   
                   <Button
                     variant="elevated"
                     className={cn(
                       "w-full h-11 sm:h-12 text-base sm:text-lg font-medium sm:font-semibold text-white",
                       "px-4 sm:px-6 transition-all duration-200",
                       isSuccess ? "bg-green-600" : "bg-green-700 hover:bg-green-800"
                     )}
                     onClick={async () => {
                       setIsAddingToCart(true);
                       try {
                         addProduct(productId, quantity);
                         // Force immediate update by triggering a small delay
                         await new Promise(resolve => setTimeout(resolve, 10));
                         setIsSuccess(true);
                         toast.success("Produkt dodany do koszyka", {
                           style: {
                             background: '#f5f5dc', // Beige background
                             color: '#2c2c2c', // Matte black text
                             border: '1px solid #d4af37',
                             borderRadius: '8px',
                             boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                             fontWeight: '500',
                           },
                           duration: 2000,
                         });
                       } finally {
                         setTimeout(() => {
                           setIsAddingToCart(false);
                           setTimeout(() => setIsSuccess(false), 1000);
                         }, 500);
                       }
                     }}
                     disabled={isAddingToCart || isSuccess}
                   >
                     {isAddingToCart ? (
                       <>
                         <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 animate-spin" />
                         <span className="hidden sm:inline">Dodawanie...</span>
                         <span className="sm:hidden">Dodawanie</span>
                       </>
                     ) : isSuccess ? (
                       <>
                         <CheckIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                         <span className="hidden sm:inline">Dodano!</span>
                         <span className="sm:hidden">Dodano</span>
                       </>
                     ) : (
                       <>
                         <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                         <span className="hidden sm:inline">Dodaj do koszyka</span>
                         <span className="sm:hidden">Dodaj</span>
                       </>
                     )}
                   </Button>
                 </div>
               </div>
             </div>



            {/* Delivery Information */}
            <div className="bg-card rounded-md shadow-xl border border-border p-8">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                <Truck className="h-6 w-6 text-primary" />
                Informacje o dostawie
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-md bg-muted border border-border">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold text-foreground">Szybka dostawa</div>
                    <div className="text-sm text-muted-foreground">1-2 dni robocze</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-md bg-muted border border-border">
                  <Package className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold text-foreground">Darmowa dostawa</div>
                    <div className="text-sm text-muted-foreground">Od 200 zł</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-md bg-muted border border-border">
                  <RefreshCw className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold text-foreground">Zwroty</div>
                    <div className="text-sm text-muted-foreground">30 dni na zwrot</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};
