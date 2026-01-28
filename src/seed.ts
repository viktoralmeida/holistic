import {getPayload} from "payload";
import config from "@payload-config";
 

const categories = [
  {
    name: "HeadSpa",
    slug: "all"
  },

  {
    name: "Lozka i myjki headspa",
    color: "#E0C8C8",
    slug: "spa-treatments"
  },

  {
    name: "Online Training",
    color: "#D6EFE0",
    slug: "wellness-relaxation"
  },

  {
    name: "Personal training",
    color: "#F5E0F1",
    slug: "improvement-care"
  },

  {
    name: "Investment pack",
    color: "#F5E0F0",
    slug: "investment-pack"
  }
];

const seed = async () =>{
    const payload = await getPayload({config});
    
    // Clear existing categories
    const existingCategories = await payload.find({
        collection: "categories",
        limit: 1000,
    });
    
    for (const category of existingCategories.docs) {
        await payload.delete({
            collection: "categories",
            id: category.id,
        });
    }
    
    // Create new categories
    for (const category of categories) {
        await payload.create({
            collection: "categories",
            data: category,
        });
    }
    
    console.log("Categories seeded successfully!");
    process.exit(0);
};

seed();


 