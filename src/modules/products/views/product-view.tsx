"use client"
import { StarRating } from "@/components/star-rating";
import { Button } from "@/components/ui/button";

import { formatCurrency } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import dynamic from "next/dynamic";
import { useSuspenseQuery, useQuery } from "@tanstack/react-query";
import { 
  CheckIcon, 
  LinkIcon, 
  AlertCircle, 
  ArrowLeft, 
  MessageSquare, 
  Star, 
  Shield, 
  Truck, 
  Award, 
  Heart, 
  ChevronDown, 
  ChevronUp
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ProductViewEnhanced } from './product-view-enhanced';

const CartButton = dynamic(
  () => import("../ui/components/cart-button").then(
    (mod) => mod.CartButton,
  ),
  {
    ssr: false,
    loading: () => <Button disabled className="flex-1 bg-green-700">Dodaj do koszyka</Button>
  }
)

interface ProductViewProps {
  productId: string;
}

export const ProductView = ({ productId }: ProductViewProps) => {
  return <ProductViewEnhanced productId={productId} />;
};

export const ProductViewOriginal = ({ productId }: ProductViewProps) => {
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
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);

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

  return (
    <div className="px-4 lg:px-8 py-6 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-4">
        <Link 
          href="/products" 
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Powrót do produktów
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image Carousel */}
        <ProductImageCarousel 
          images={data.images || []}
        />

        {/* Product Info */}
        <div className="space-y-6">
          {/* Product Header */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 rounded-2xl"></div>
            <div className="relative border border-border/50 rounded-2xl p-6 bg-background/80 backdrop-blur-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-foreground mb-3 leading-tight">
                    {data.name}
                  </h1>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xl px-4 py-2 font-bold bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                        {formatCurrency(data.price)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <StarRating rating={data.reviewRating} iconClassName="size-5" />
                      <span className="text-sm font-medium text-muted-foreground">
                        {data.reviewRating} recenzji
                      </span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="text-muted-foreground">Gwarancja</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-4 w-4 text-blue-600" />
                  <span className="text-muted-foreground">Szybka dostawa</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Award className="h-4 w-4 text-yellow-600" />
                  <span className="text-muted-foreground">Premium</span>
                </div>
              </div>
            </div>
          </div>


          {/* Product Characteristics */}
          {data.characteristics && data.characteristics.length > 0 && (
            <Card className="border-2 border-border/30 shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center">
                    <Star className="h-4 w-4 text-secondary-foreground" />
                  </div>
                  Charakterystyka produktu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {data.characteristics.map((characteristic, index) => (
                    <div key={index} className="group flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-muted/30 to-transparent hover:from-muted/50 transition-all duration-300 border border-transparent hover:border-border/50">
                      <div className="flex-shrink-0 w-3 h-3 mt-2 bg-gradient-to-br from-primary to-primary/70 rounded-full group-hover:scale-125 transition-transform duration-300 shadow-sm"></div>
                      <span className="text-base text-foreground leading-relaxed font-medium group-hover:text-primary/90 transition-colors duration-300">
                        {characteristic.text}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Product Details */}
          <Card className="border-2 border-border/30 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center">
                  <Award className="h-4 w-4 text-accent-foreground" />
                </div>
                Szczegóły produktu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Collapsible open={isDetailsExpanded} onOpenChange={setIsDetailsExpanded}>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-border/30">
                        <span className="font-medium text-muted-foreground">Kategoria</span>
                        <Badge variant="outline">
                          {typeof data.category === 'object' && data.category && 'name' in data.category ? data.category.name : 'N/A'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-border/30">
                        <span className="font-medium text-muted-foreground">Polityka zwrotów</span>
                        <Badge variant={data.refundPolicy === "no-refunds" ? "destructive" : "secondary"}>
                          {data.refundPolicy === "no-refunds" ? "Bez zwrotów" : `Gwarancja ${data.refundPolicy}`}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-border/30">
                        <span className="font-medium text-muted-foreground">Dostępność</span>
                        <Badge variant="default" className="bg-green-600">Dostępny</Badge>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-border/30">
                        <span className="font-medium text-muted-foreground">ID produktu</span>
                        <span className="text-sm font-mono text-muted-foreground">{data.id}</span>
                      </div>
                    </div>
                  </div>
                  
                  {data.tags && data.tags.length > 0 && (
                    <div className="pt-4 border-t border-border/30">
                      <h4 className="font-medium text-foreground mb-3">Tagi</h4>
                      <div className="flex flex-wrap gap-2">
                        {data.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {typeof tag === 'object' && tag && 'name' in tag ? tag.name : String(tag)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full p-0 h-auto text-primary hover:text-primary/80">
                      {isDetailsExpanded ? (
                        <>
                          <ChevronUp className="h-4 w-4 mr-1" />
                          Ukryj szczegóły
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4 mr-1" />
                          Pokaż więcej szczegółów
                        </>
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </div>
              </Collapsible>
            </CardContent>
          </Card>
          {/* Action Buttons */}
          <Card className="border-2 border-border/30 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <CartButton productId={productId} />
                </div>
                
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      setIsCopied(true);
                      navigator.clipboard.writeText(window.location.href);
                      toast.success("Link do produktu skopiowany do schowka");
                      setTimeout(() => setIsCopied(false), 1000);
                    }}
                    disabled={isCopied}
                    className="border-2 hover:border-primary/50 transition-colors"
                  >
                    {isCopied ? <CheckIcon className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
                  </Button>

                  {/* Review Button: Show 'Edit your review' if user has a review, else 'Write Review' */}
                  <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2 border-2 hover:border-primary/50 transition-colors" onClick={openReviewDialog}>
                        <MessageSquare className="h-4 w-4" />
                        <span className="hidden sm:inline">{myReviewQuery.data ? "Edytuj recenzję" : "Napisz recenzję"}</span>
                        <span className="sm:hidden">Recenzja</span>
                      </Button>
                    </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingReviewId ? "Edytuj recenzję" : "Napisz recenzję"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {!session.data?.user && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Zaloguj się, aby zostawić recenzję dla tego produktu.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <div>
                    <Label>Ocena</Label>
                    <div className="flex gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Button
                          key={star}
                          variant="ghost"
                          size="sm"
                          onClick={() => setReviewRating(star)}
                          className="p-1"
                        >
                          <Star 
                            className={`h-5 w-5 ${star <= reviewRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                          />
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="review-text">Recenzja</Label>
                    <Textarea
                      id="review-text"
                      placeholder="Podziel się swoimi doświadczeniami z tym produktem..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      className="mt-2"
                      rows={4}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleReviewSubmit}
                      disabled={!session.data?.user || createReview.isPending || updateReview.isPending}
                      className="flex-1"
                    >
                      {(createReview.isPending || updateReview.isPending)
                        ? "Zapisywanie..."
                        : editingReviewId ? "Zaktualizuj recenzję" : "Wyślij recenzję"}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsReviewDialogOpen(false)}
                    >
                      Anuluj
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Opinie klientów</h2>
          <p className="text-muted-foreground">Poznaj doświadczenia innych użytkowników</p>
        </div>
        
        {reviewsQuery.isLoading ? (
          <Card className="border-2 border-border/30 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="text-muted-foreground">Ładowanie recenzji...</div>
            </CardContent>
          </Card>
        ) : Array.isArray(reviewsQuery.data) && reviewsQuery.data.length === 0 ? (
          <Card className="border-2 border-border/30 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="text-muted-foreground italic">Brak recenzji. Bądź pierwszym, który zostawi recenzję!</div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {Array.isArray(reviewsQuery.data) && reviewsQuery.data.map((review) => (
              <Card key={review.id} className="border-2 border-border/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="w-12 h-12 border-2 border-border/50">
                      <AvatarFallback className="text-lg font-semibold">{getInitial(review.user)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-foreground text-lg">
                            {typeof review.user === 'object' ? (review.user.username || "Anonimowy") : "Anonimowy"}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(review.createdAt).toLocaleDateString('pl-PL', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <StarRating rating={review.rating} iconClassName="size-5" />
                          <Badge variant="secondary" className="text-xs">
                            {review.rating}/5
                          </Badge>
                        </div>
                      </div>
                      <div className="text-base text-foreground leading-relaxed bg-muted/20 p-4 rounded-lg border border-border/30">
                        {review.description}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
