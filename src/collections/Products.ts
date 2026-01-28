import { isSuperAdmin } from "@/lib/access";
import type {CollectionConfig} from "payload";

export const Products: CollectionConfig = {
    slug:"products",
    access: {
        read:() => true,
        create: ({req}) => {
        if(isSuperAdmin(req.user)) return true;
        
        return true; // Allow all authenticated users to create products
      },
      update: ({ req }) => {
        if (isSuperAdmin(req.user)) return true;
        return {
          createdBy: {
            equals: req.user?.id,
          },
        };
      },
      delete: ({ req }) => {
        return isSuperAdmin(req.user);
      },
    },
    admin:{
        useAsTitle:"name",
        description: "Manage products with uploaded images stored in /public/img/products/",
    },
    fields: [
        {
            name:"name",
            type:"text",
            required:true,
            admin: {
                description: "Product name (required)",
            },
        },

        {
            name:"price",
            type:"number",
            required:true,
            admin:{
                description:"Price in PLN (required)"
            },
            validate: (value: number | null | undefined) => {
                if (!value || value <= 0) {
                    return "Price must be greater than 0";
                }
                return true;
            },
        },
        {
            name:"category",
            type:"relationship",
            relationTo:"categories",
            hasMany:false,
            required: false,
            admin: {
                description: "Select a category for this product (optional)",
            },
        },
        {
            name:"productType",
            type:"select",
            options: [
                { label: "Pakiet inwestycyjny", value: "investment-pack" },
                { label: "Łóżka i myjki headspa", value: "beds-and-washers" },
                { label: "Szkolenia online", value: "online-training" },
                { label: "Trening personalny", value: "personal-training" },
                { label: "Inne produkty", value: "other-products" },
            ],
            required: true,
            defaultValue: "other-products",
            admin: {
                description: "Select the product type/category for navigation",
            },
        },
         {
            name:"tags",
            type:"relationship",
            relationTo:"tags",
            hasMany:true,
            required: false,
            admin: {
                description: "Select relevant tags for this product (optional)",
            },
        },
        {
            name: "images",
            type: "array",
            required: true,
            minRows: 1,
            maxRows: 10,
            admin: {
                description: "Add product images by pasting Cloudinary URLs. You can paste multiple URLs separated by commas or add them one by one.",
            },
            fields: [
                {
                    name: "url",
                    type: "text",
                    required: true,
                    admin: {
                        description: "Paste the full Cloudinary URL here (e.g., https://res.cloudinary.com/your-cloud/image/upload/v1234567890/sample.jpg)",
                    },
                    validate: (value: string | null | undefined) => {
                        if (!value || value.trim() === "") {
                            return "Image URL is required";
                        }
                        if (!value.includes('cloudinary.com')) {
                            return "Please use a valid Cloudinary URL";
                        }
                        return true;
                    },
                },
                {
                    name: "alt",
                    type: "text",
                    admin: {
                        description: "Alternative text for accessibility (optional)",
                    },
                },
                {
                    name: "isPrimary",
                    type: "checkbox",
                    defaultValue: false,
                    admin: {
                        description: "Mark as primary image for this product",
                    },
                },
            ],
        },

        {
            name: "characteristics",
            type: "array",
            admin: {
                description: "Product characteristics and features",
            },
            fields: [
                {
                    name: "text",
                    type: "text",
                    required: true,
                    admin: {
                        description: "Characteristic text",
                    },
                    validate: (value: string | null | undefined) => {
                        if (!value || value.trim() === "") {
                            return "Characteristic text is required";
                        }
                        if (value.length > 200) {
                            return "Characteristic text must be less than 200 characters";
                        }
                        return true;
                    },
                },
            ],
        },

        {
            name:"refundPolicy",
            type:"select",
            options:["30-day","14-day","7-day","3-day","1-day","no-refunds"],
            defaultValue:"30-day",
            admin: {
                description: "Select the refund policy for this product",
            },
        },
        {
            name:"content",
            type:"textarea",
            admin:{
                description:
                    "Protected content only visible to customers after purchase. Add product documentation, downloadable files, getting started guides, and bonuses"
            }
        },
        {
            name: "status",
            type: "select",
            options: [
                { label: "Draft", value: "draft" },
                { label: "Published", value: "published" },
                { label: "Archived", value: "archived" },
            ],
            defaultValue: "draft",
            admin: {
                description: "Product status",
            },
        },
    ],
    hooks: {
        beforeChange: [
            async ({ data }) => {
                // Validate required fields
                if (!data.name || data.name.trim() === '') {
                    throw new Error('Product name is required');
                }
                
                if (!data.price || data.price <= 0) {
                    throw new Error('Product price must be greater than 0');
                }

                // Validate productType
                const validProductTypes = ['investment-pack', 'beds-and-washers', 'online-training', 'personal-training', 'other-products'];
                if (data.productType && !validProductTypes.includes(data.productType)) {
                    throw new Error('Invalid product type selected');
                }

                // Validate images
                if (data.images && Array.isArray(data.images)) {
                    if (data.images.length === 0) {
                        throw new Error('At least one image is required');
                    }
                    
                    if (data.images.length > 10) {
                        throw new Error('Maximum 10 images allowed per product');
                    }
                    
                    // Validate each image URL
                    for (let i = 0; i < data.images.length; i++) {
                        const img = data.images[i];
                        if (!img || !img.url) {
                            throw new Error(`Image ${i + 1} URL is missing`);
                        }
                        if (!img.url.includes('cloudinary.com')) {
                            throw new Error(`Image ${i + 1} must be a valid Cloudinary URL`);
                        }
                    }
                }
                
                return data;
            },
        ],
    },
};