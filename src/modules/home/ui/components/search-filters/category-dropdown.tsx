"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { CategoriesGetManyOutput } from "@/modules/categories/types";

interface Props{
    category: CategoriesGetManyOutput[1];
    isActive?:boolean;
    isNavigationHovered?:boolean;
}

export const CategoryDropdown=({
    category,
    isActive,
    isNavigationHovered

}: Props)=>{
    return(
        <div className="relative">
            <Button 
                variant="elevated"
                className={cn(
                    "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black ",
                    isActive && !isNavigationHovered && "bg-white border-primary"
                )}
                asChild
            >
                <Link href={`/${category.slug==="all" ? "":category.slug}`}>
                    {category.name}
                </Link>
            </Button>
        </div>
    )
}