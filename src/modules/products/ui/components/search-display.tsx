"use client"

import { useProductFilters } from "../../hooks/use-product-filters";
import { X, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SearchDisplay = () => {
  const [filters, setFilters] = useProductFilters();
  
  if (!filters.search || filters.search.trim() === "") {
    return null;
  }

  const clearSearch = () => {
    setFilters({ search: "" });
  };

  return (
    <div className="mb-6 p-4 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <SearchIcon className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              Wyniki wyszukiwania dla: <span className="text-primary font-semibold">&ldquo;{filters.search}&rdquo;</span>
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Użyj filtrów poniżej, aby zawęzić wyniki
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearSearch}
          className="h-8 w-8 p-0 hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-colors duration-150"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
