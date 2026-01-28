import { z } from "zod";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { Sort, Where } from "payload";
import { sortValues } from "../search-params";
import { DEFAULT_LIMIT } from "@/constants";
import {headers as getHeaders} from "next/headers";
 
export const productsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, "Product name is required"),

        price: z.number().positive("Price must be greater than 0"),
        category: z.string().optional(),
        productType: z.enum(["investment-pack", "beds-and-washers", "online-training", "personal-training", "other-products"]).optional(),
        tags: z.array(z.string()).optional(),
         images: z.array(z.object({
           url: z.string().min(1, "Image URL is required").url("Must be a valid URL"),
           alt: z.string().optional(),
           isPrimary: z.boolean().optional()
         })).min(1, "At least one image is required"),
         characteristics: z.array(z.object({
           text: z.string().min(1, "Characteristic text is required").max(200, "Characteristic text must be less than 200 characters")
         })).optional(),
        refundPolicy: z.enum(["30-day", "14-day", "7-day", "3-day", "1-day", "no-refunds"]).default("30-day"),
        content: z.string().optional(),
        status: z.enum(["draft", "published", "archived"]).default("draft")
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const product = await ctx.db.create({
          collection: "products",
                    data: {
            name: input.name,
            price: input.price,
                         category: input.category || null,
             productType: input.productType || "other-products",
             tags: input.tags || [],
             images: input.images,
             characteristics: input.characteristics || [],
            refundPolicy: input.refundPolicy,
            content: input.content || "",
            status: input.status
          }
        });

        return product;
      } catch (error) {
        console.error("Error creating product:", error);
        throw new Error("Failed to create product. Please try again.");
      }
    }),

  getOne: baseProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
   
  .query(async({ctx,input})=>{
    const headers = await getHeaders();
    const session = await ctx.db.auth({headers});


    const product = await ctx.db.findByID({
      collection:"products",
      id:input.id,
      depth:2,
      select:{
        content:false,
      },
    });

    let isPurchased = false;

    if(session.user){
      const ordersData = await ctx.db.find({
        collection:"orders",
        pagination: false,
        limit: 1,
        where:{
          and:[
            {
              product:{
                equals: input.id,
              },
            },
            {
              user:{
                equals:session.user.id,
              },
            },

          ],
        },
      });

      isPurchased = !!ordersData.docs[0];

    }


    const reviews = await ctx.db.find({
      collection: "reviews",
      pagination: false,
      where: {
        product:{
          equals:input.id,
        },
      },

    });


    const reviewRating = 
      reviews.docs.length > 0
      ? reviews.docs.reduce((acc, review)=> acc +review.rating, 0) / reviews.totalDocs
      : 0;

    const ratingDistribution: Record<number,  number> = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    if(reviews.totalDocs > 0 ){
      reviews.docs.forEach((review)=>{
        const rating = review.rating;

        if(rating >= 1 && rating <= 5){
          ratingDistribution[rating] = (ratingDistribution[rating] || 0) +1;

        }
      });

      Object.keys(ratingDistribution).forEach((key)=>{
        const rating = Number(key);
        const count = ratingDistribution[rating] || 0;
        ratingDistribution[rating] = Math.round(
          (count/reviews.totalDocs) * 100,
        );
      });


    }


    // Process images to create a consistent format
    const processedImage = product.images && product.images.length > 0 ? (() => {
      const firstImage = product.images[0];
      
      // New URL-based structure (current)
      if (firstImage?.url) {
        return {
          url: firstImage.url,
          alt: firstImage.alt || product.name
        };
      }
      
      // Legacy structure - check if imageFile exists on the object
      if (firstImage && 'imageFile' in firstImage && firstImage.imageFile) {
        return {
          url: `/img/products/${firstImage.imageFile}`,
          alt: firstImage.alt || product.name
        };
      }
      
      return null;
    })() : null;

    // Process all images for the images array
    const processedImages = product.images ? product.images.map(img => {
      // New URL-based structure (current)
      if (img?.url) {
        return {
          ...img,
          url: img.url,
          alt: img.alt || product.name
        };
      }
      
      // Legacy structure - check if imageFile exists on the object
      if (img && 'imageFile' in img && img.imageFile) {
        return {
          ...img,
          url: `/img/products/${img.imageFile}`,
          alt: img.alt || product.name
        };
      }
      
      return img;
    }).filter(img => 'url' in img && img.url) : [];

    return {
      ...product,
      isPurchased,
      image: processedImage,
      images: processedImages,
      characteristics: product.characteristics ? product.characteristics : [],
      reviewRating,
      reviewCount: reviews.totalDocs,
      ratingDistribution,
    };
  }),


   
  getMany:baseProcedure.
      input(z.object({
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_LIMIT),
        category: z.string().nullable().optional(),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
        categories: z.array(z.string()).nullable().optional(),
        search: z.string().nullable().optional(),
        sort:z.enum(sortValues).nullable().optional(),


      }),
     
    ).query(async({ctx, input})=>{
         const where: Where = {};
         let sort: Sort = "-createdAt";

         // Handle sorting options
         switch(input.sort) {
           case "newest":
             sort = "-createdAt";
             break;
           case "oldest":
             sort = "+createdAt";
             break;
           case "price-low":
             sort = "+price";
             break;
           case "price-high":
             sort = "-price";
             break;
           case "rating":
             sort = "-createdAt"; // We'll need to implement rating-based sorting
             break;
           case "popular":
             sort = "-createdAt"; // We'll need to implement popularity-based sorting
             break;
           default:
             sort = "-createdAt";
         }


          if(input.minPrice && input.maxPrice){
            const minPrice = parseFloat(input.minPrice);
            const maxPrice = parseFloat(input.maxPrice);
            if(!isNaN(minPrice) && !isNaN(maxPrice)){
              where.price = {             
                greater_than_equal: minPrice,
                less_than_equal: maxPrice,
              }
            }
          }else if(input.minPrice){
               const minPrice = parseFloat(input.minPrice);
               if(!isNaN(minPrice)){
                 where.price={
                   greater_than_equal: minPrice,
                 }
               }
          }else if(input.maxPrice){
              const maxPrice = parseFloat(input.maxPrice);
              if(!isNaN(maxPrice)){
                where.price = {              
                  less_than_equal: maxPrice
                }
              }
          }




            if(input.category){
                // Check if it's one of our new product types
                if(['beds-and-washers', 'online-training', 'personal-training', 'investment-pack'].includes(input.category)) {
                    where.productType = {
                        equals: input.category
                    };
                } else {
                    // Fallback to category slug for other categories
                    where["category.slug"] = {
                        equals: input.category
                    };
                }
            }


            if(input.categories && input.categories.length>0){
              where.productType ={
                in:input.categories,
              };
            };

            if(input.search && input.search.trim() !== ""){
              where.name = {
                contains: input.search.trim()
              };
            };

            const data = await ctx.db.find({
              collection:'products',
              depth:2, //image and category populate 
              where,
              sort,
              page: input.cursor,
              limit:input.limit,
              select:{
                content:false,
              },
          });


          const dataWithSummarizedReviews = await Promise.all(
            data.docs.map(async (doc)=>{
              const reviewsData = await ctx.db.find({
                collection: "reviews",
                pagination: false,
                where:{
                  product:{
                    equals: doc.id,
                  },
                },
              });

              return {
                ...doc,
                reviewCount: reviewsData.totalDocs,
                reviewRating:
                  reviewsData.docs.length === 0
                    ? 0
                    : reviewsData.docs.reduce((acc, review)=> acc+ review.rating, 0)/ reviewsData.totalDocs
                    
              }
            })
          )



        return {
          ...data,
          docs: dataWithSummarizedReviews.map((doc) => {
            // Process images to create a consistent format
            const processedImage = doc.images && doc.images.length > 0 ? (() => {
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
            })() : null;

            // Process all images for the images array
            const processedImages = doc.images ? doc.images.map(img => {
              // New URL-based structure (current)
              if (img?.url) {
                return {
                  ...img,
                  url: img.url,
                  alt: img.alt || doc.name
                };
              }
              
              // Legacy structure - check if imageFile exists on the object
              if (img && 'imageFile' in img && img.imageFile) {
                return {
                  ...img,
                  url: `/img/products/${img.imageFile}`,
                  alt: img.alt || doc.name
                };
              }
              
              return img;
            }).filter(img => 'url' in img && img.url) : [];

            return {
              ...doc,
              image: processedImage,
              images: processedImages,
              characteristics: doc.characteristics ? doc.characteristics : [],
            };
          })
        };
    }),
});