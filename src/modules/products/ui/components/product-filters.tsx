"use client"

import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronRightIcon, Filter, X } from "lucide-react";
import { useState } from "react";
import { PriceFilter } from "./price-filter";
import { useProductFilters } from "../../hooks/use-product-filters";
import { CategoriesFilter } from "./categories-filter";

interface ProductFilterProps{
    title:string;
    className?:string;
    children:React.ReactNode;
}

const ProductFilter = ({title, className,children}:ProductFilterProps) =>{
   
    

    const [isOpen, setIsOpen] = useState(false);

    const Icon = isOpen ? ChevronDownIcon : ChevronRightIcon;

    return(
        <div className={cn(
            "border-b border-border/50 last:border-b-0",
            className
        )}>
            <div
                onClick={() => setIsOpen((current)=> !current)}
                className="flex items-center justify-between cursor-pointer p-4 hover:bg-muted/30 transition-colors duration-200"
            >
                <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <p className="font-semibold text-sm text-foreground">{title}</p>
                </div>
                <Icon className="w-4 h-4 text-muted-foreground transition-transform duration-200"/> 
            </div>
            {isOpen && (
                <div className="px-4 pb-4">
                    {children}
                </div>
            )}
        </div>
    )
}

export const  ProductFilters = () =>{
    const [filters, setFilters] = useProductFilters();

    const hasAnyFilters = Object.entries(filters).some(([ key, value])=>{
        if(key === "sort") return false;

        if(Array.isArray(value)){
            return value.length>0;
        }

        if(typeof value ==="string"){
            return value !== "";
        }
        return value!=null;
    })


    const onClear = () =>{
        setFilters({
            minPrice:"",
            maxPrice:"",
            categories:[],
        });
    };

    const onChange = (key:keyof typeof filters, value: unknown)=>{
        setFilters(prev => ({...prev, [key]: value }));
    };


    return(
       <div className="border border-[#b19681] rounded-lg bg-card shadow-sm">
            {hasAnyFilters && (
                <div className="p-4 border-b border-border/50 bg-muted/20">
                    <div className="flex items-center justify-end">
                        <button 
                            className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-primary transition-colors duration-200" 
                            onClick={()=>onClear()} 
                            type="button"
                        >
                            <X className="w-3 h-3" />
                            <span>Wyczyść filtry</span>
                        </button>
                    </div>
                </div>
            )}
            
            <div className="divide-y divide-border/50">
                <ProductFilter title="Cena">
                   <PriceFilter
                        minPrice={filters.minPrice}
                        maxPrice={filters.maxPrice}
                        onMinPriceChange={(value)=>onChange("minPrice", value)}
                        onMaxPriceChange={(value)=>onChange("maxPrice", value)}
                   />
                </ProductFilter>  
                
                <ProductFilter title="Kategorie">
                   <CategoriesFilter
                        value={filters.categories}
                        onChange={(value) =>onChange("categories", value)}
                   />
                </ProductFilter>  
            </div>
       </div>
        
    );
};