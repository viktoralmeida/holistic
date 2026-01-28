import {createLoader,parseAsString, parseAsArrayOf, parseAsStringLiteral} from "nuqs/server";

export const sortValues = ["newest", "oldest", "price-low", "price-high", "rating", "popular"] as const;

export const params={
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


export const loadProductFilters = createLoader(params);
