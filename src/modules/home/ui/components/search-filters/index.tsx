"use client"
import { SearchInput } from "./search-input";
import { Categories } from "./categories";
 
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { BreadcrumbNavigation } from "./breadcrumbs-navigation";

export const SearchFilters = () => {
  const trpc = useTRPC();
  const params = useParams();
  
  // All hooks must be called unconditionally
  const {data} = useSuspenseQuery(trpc.categories.getMany.queryOptions());

  const categoryParam = params.category as string | undefined;
  const activeCategory = categoryParam || "all";

  const activeCategoryData = data.find((category)=> category.slug === activeCategory);
  const activeCategoryName = activeCategoryData?.name || null;

  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full relative z-[90]"
        style={{
          backgroundColor: '#fdfbf7',
        }}
        >
      <SearchInput  />
      <div className="hidden lg:block">
           <Categories data={data}/>
      </div>
        <BreadcrumbNavigation
          activeCategoryName={activeCategoryName}
          activeCategory={activeCategory}
        /> 
    </div>
  )
};

export const SearchFiltersSkeleton = () =>{
    return(
      <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full relative z-[90]"
        style={{
          backgroundColor: '#fdfbf7',
        }}
      >
        <SearchInput disabled/>
        <div className="hidden lg:block">
                <div className="h-11"/>
        </div>
      </div>
    )
}



 
