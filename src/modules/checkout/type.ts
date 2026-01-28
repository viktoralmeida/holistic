import type Stripe from "stripe";


export type ProductMetadata = {
    id: string;
    name: string;
    price: number;
};


export type CheckoutMetadata = {
    userId?: string;
    guestEmail?: string;
};

export type ExpandedLineItem = Stripe.LineItem & {
    price: Stripe.Price&{
        product: Stripe.Product & {
            metadata: ProductMetadata,
        };
    };
};