 
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const categoriesRouter = createTRPCRouter({
    getMany:baseProcedure.query(async({ctx})=>{
        const data = await ctx.db.find({
            collection:'categories',
            depth:1,
            pagination:false,
            where:{
                parent:{
                    exists:false
                },
            },
            sort:"name"
        });

        return data.docs;
    }),
});