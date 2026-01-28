"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { useProductFilters } from "../../hooks/use-product-filters";
import { 
  ArrowUp, 
  ArrowDown, 
  Star, 
  Clock, 
  TrendingUp, 
  X
} from "lucide-react";

const sortOptions = [
  { 
    value: "newest", 
    label: "Najnowsze", 
    icon: Clock,
    description: "Sortuj według daty dodania"
  },
  { 
    value: "oldest", 
    label: "Najstarsze", 
    icon: Clock,
    description: "Sortuj według daty dodania"
  },
  { 
    value: "price-low", 
    label: "Cena: od najniższej", 
    icon: ArrowUp,
    description: "Sortuj według ceny rosnąco"
  },
  { 
    value: "price-high", 
    label: "Cena: od najwyższej", 
    icon: ArrowDown,
    description: "Sortuj według ceny malejąco"
  },
  { 
    value: "rating", 
    label: "Najlepiej oceniane", 
    icon: Star,
    description: "Sortuj według ocen"
  },
  { 
    value: "popular", 
    label: "Najpopularniejsze", 
    icon: TrendingUp,
    description: "Sortuj według popularności"
  }
];

export const AdvancedSortFilter = () => {
  const [filters, setFilters] = useProductFilters();

  const handleSortChange = (sortValue: string) => {
    setFilters({ sort: sortValue as "newest" | "oldest" | "price-low" | "price-high" | "rating" | "popular" });
  };

  const clearAllFilters = () => {
    setFilters({ sort: "newest" });
  };

  const hasActiveFilters = filters.sort && filters.sort !== "newest";

  const selectedSort = (sortOptions.find(option => option.value === filters.sort) || sortOptions[0])!;
  const SelectedIcon = selectedSort!.icon;

  return (
    <div className="p-0 m-0 w-full">
      {/* Main Sort Bar */}
      <div className="flex items-center justify-end gap-0 p-0 m-0 w-full">
        {/* Clear All Button */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="h-10 px-3 text-muted-foreground hover:text-foreground"
            onClick={clearAllFilters}
          >
            <X className="w-4 h-4 mr-1" />
            Wyczyść
          </Button>
        )}

        {/* Sort Dropdown */}
        <div className="w-auto min-w-[200px]">
          <Select value={filters.sort || "newest"} onValueChange={handleSortChange}>
            <SelectTrigger className="h-10 bg-card border border-[#b19681] focus:border-primary focus:ring-1 focus:ring-primary/20 text-foreground shadow-sm">
              <div className="flex items-center space-x-2">
                <SelectedIcon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">{selectedSort.label}</span>
              </div>
            </SelectTrigger>
            <SelectContent className="bg-[#b19681] text-white border border-[#b19681] shadow-lg">
              {sortOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <SelectItem key={option.value} value={option.value} className="text-white hover:bg-white/10">
                    <div className="flex items-center space-x-3 py-1">
                      <Icon className="w-4 h-4 text-white/70" />
                      <div>
                        <div className="font-medium text-white">{option.label}</div>
                        <div className="text-xs text-white/70">{option.description}</div>
                      </div>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>

    </div>
  );
};
