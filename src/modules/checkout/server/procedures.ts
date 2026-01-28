import { z } from "zod";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "@/trpc/init";

import { TRPCError } from "@trpc/server";
import type Stripe from "stripe";
import { CheckoutMetadata, ProductMetadata } from "../type";
import { stripe } from "@/lib/stripe";

export const checkoutRouter = createTRPCRouter({

  purchase: protectedProcedure
    .input(
      z.object({
        items: z.array(z.object({
          productId: z.string(),
          quantity: z.number().min(1),
        })).min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const productIds = input.items.map(item => item.productId);
      const products = await ctx.db.find({
        collection: "products",
        depth: 2,
        where: {
          id: {
            in: productIds,
          },
        }
      })

      if (products.totalDocs !== productIds.length) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Products not found" });
      }

      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
        input.items.map((item) => {
          const product = products.docs.find(p => p.id === item.productId);
          if (!product) {
            throw new TRPCError({ code: "NOT_FOUND", message: "Product not found" });
          }
          return {
            quantity: item.quantity,
            price_data: {
              unit_amount: product.price * 100,
              currency: "pln",
              product_data: {
                name: product.name,
                metadata: {
                  id: product.id,
                  name: product.name,
                  price: product.price,
                } as ProductMetadata
              }
            }
          };
        });

      const checkout = await stripe.checkout.sessions.create({
        customer_email: ctx.session.user!.email,
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?cancel=true`,
        mode: "payment",
        line_items: lineItems,
        invoice_creation: {
          enabled: true,
        },
        payment_intent_data: {
          metadata: {
            userId: ctx.session.user!.id,
          }
        },
        metadata: {
          userId: ctx.session.user!.id,
        } as CheckoutMetadata
      });

      if (!checkout.url) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create checkout session" });
      }

      return { url: checkout.url };
    }),

  guestPurchase: baseProcedure
    .input(
      z.object({
        items: z.array(z.object({
          productId: z.string(),
          quantity: z.number().min(1),
        })).min(1),
        email: z.string().email(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const productIds = input.items.map(item => item.productId);
      const products = await ctx.db.find({
        collection: "products",
        depth: 2,
        where: {
          id: {
            in: productIds,
          },
        }
      })

      if (products.totalDocs !== productIds.length) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Products not found" });
      }

      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
        input.items.map((item) => {
          const product = products.docs.find(p => p.id === item.productId);
          if (!product) {
            throw new TRPCError({ code: "NOT_FOUND", message: "Product not found" });
          }
          return {
            quantity: item.quantity,
            price_data: {
              unit_amount: product.price * 100,
              currency: "pln",
              product_data: {
                name: product.name,
                metadata: {
                  id: product.id,
                  name: product.name,
                  price: product.price,
                } as ProductMetadata
              }
            }
          };
        });

      const checkout = await stripe.checkout.sessions.create({
        customer_email: input.email,
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout?cancel=true`,
        mode: "payment",
        line_items: lineItems,
        invoice_creation: {
          enabled: true,
        },
        payment_intent_data: {
          metadata: {
            guestEmail: input.email,
          }
        },
        metadata: {
          guestEmail: input.email,
        } as CheckoutMetadata
      });

      if (!checkout.url) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create checkout session" });
      }

      return { url: checkout.url };
    }),

  getProducts: baseProcedure
    .input(z.object({
      items: z.array(z.object({
        productId: z.string(),
        quantity: z.number().min(1),
      })).optional().default([]),
    }))
    .query(async ({ ctx, input }) => {
      // If no items, return empty result
      if (!input.items || input.items.length === 0) {
        return {
          docs: [],
          totalDocs: 0,
          totalPages: 0,
          page: 1,
          limit: 10,
          hasNextPage: false,
          hasPrevPage: false,
          totalPrice: 0,
        };
      }

      const productIds = input.items.map(item => item.productId);
      const data = await ctx.db.find({
        collection: 'products',
        depth: 1,
        where: {
          id: {
            in: productIds,
          },
        },
      });

      if (data.totalDocs !== productIds.length) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Products not found" });
      }

      const totalPrice = input.items.reduce((acc, item) => {
        const product = data.docs.find(p => p.id === item.productId);
        if (!product) return acc;
        const price = Number(product.price);
        return acc + (isNaN(price) ? 0 : price * item.quantity);
      }, 0);

      return {
        ...data,
        totalPrice: totalPrice,
        docs: data.docs.map((doc) => ({
          ...doc,
          quantity: input.items.find(item => item.productId === doc.id)?.quantity || 1,
          image: doc.images && doc.images.length > 0 ? (() => {
            const firstImage = doc.images[0];
            
            // New URL-based structure (current)
            if (firstImage?.url) {
              return {
                url: firstImage.url,
                alt: firstImage.alt || doc.name
              };
            }
            
            // Legacy structure - check if imageFile exists on the object
            if (firstImage && 'imageFile' in firstImage && firstImage.imageFile) {
              return {
                url: `/img/products/${firstImage.imageFile}`,
                alt: firstImage.alt || doc.name
              };
            }
            
            return null;
          })() : null,
        }))
      };
    }),
});