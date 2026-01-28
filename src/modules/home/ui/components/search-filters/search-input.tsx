"use client"
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ListFilterIcon, SearchIcon } from "lucide-react";
import { CategoriesSidebar } from "./categories-sidebar";

interface Props {
  disabled?: boolean;
}


export const SearchInput = ({
    disabled,
 
}:Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar   open={isSidebarOpen}  onOpenChange={setIsSidebarOpen}  /> 
        <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2  size-4 text-neutral-500"/>
            <Input className="pl-8 pr-12" placeholder="Search products" disabled={disabled}/>
            <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 h-8 w-8 p-0 hover:bg-primary/10 text-neutral-500 hover:text-primary"
                onClick={() => {
                    // Add search functionality here
                    console.log('Search button clicked');
                }}
            >
                <SearchIcon className="h-4 w-4" />
            </Button>
        </div>
         <Button
          variant = "elevated"
          className ="size-12 shrink-0 flex lg:hidden"
          onClick={() => setIsSidebarOpen(true)}
         >
          <ListFilterIcon/>

         </Button> 

    </div>
  )
}

 
