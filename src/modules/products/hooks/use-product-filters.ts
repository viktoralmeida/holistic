import {   useQueryStates, parseAsString,parseAsArrayOf, parseAsStringLiteral} from "nuqs";
 

const sortValues = ["newest", "oldest", "price-low", "price-high", "rating", "popular"] as const;



  const params={

    sort:parseAsStringLiteral(sortValues).withDefault("newest"),


       minPrice:parseAsString
        .withOptions({
            clearOnDefault:true,
        })
        .withDefault(""),

        maxPrice:parseAsString
        .withOptions({
            clearOnDefault:true,
        })
        .withDefault(""),
        categories:parseAsArrayOf(parseAsString)
        .withOptions({
            clearOnDefault:true,
        })
         .withDefault([]),
        search:parseAsString
        .withOptions({
            clearOnDefault:true,
        })
        .withDefault(""),
};

export const useProductFilters = ()=>{
    return useQueryStates(params);

};

 

