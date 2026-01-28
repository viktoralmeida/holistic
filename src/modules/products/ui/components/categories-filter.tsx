import { cn } from "@/lib/utils";
import { Check, Package, GraduationCap, Dumbbell, Briefcase, Grid3X3 } from "lucide-react";

interface CategoriesFilterProps {
  value?: string[] | null;
  onChange: (value: string[]) => void;
}

const productCategories = [
  { 
    value: "investment-pack", 
    label: "Pakiet inwestycyjny",
    icon: Briefcase
  },
  { 
    value: "beds-and-washers", 
    label: "Łóżka i myjki headspa",
    icon: Package
  },
  { 
    value: "online-training", 
    label: "Szkolenia online",
    icon: GraduationCap
  },
  { 
    value: "personal-training", 
    label: "Trening personalny",
    icon: Dumbbell
  },
  { 
    value: "other-products", 
    label: "Inne produkty",
    icon: Grid3X3
  }
];

export const CategoriesFilter = ({ value, onChange }: CategoriesFilterProps) => {
  const onClick = (categoryValue: string) => {
    if (value?.includes(categoryValue)) {
      onChange(value?.filter((c) => c !== categoryValue) || []);
    } else {
      onChange([...(value || []), categoryValue]);
    }
  };

  return (
    <div className="space-y-0">
      {productCategories.map((category, index) => {
        const Icon = category.icon;
        const isSelected = value?.includes(category.value);
        
        return (
          <div
            key={category.value}
            className={cn(
              "group relative p-3 cursor-pointer transition-all duration-200",
              index > 0 && "border-t border-border/30",
              isSelected 
                ? "bg-primary/5" 
                : "hover:bg-muted/30"
            )}
            onClick={() => onClick(category.value)}
          >
            <div className="flex items-center space-x-3">
              <div className={cn(
                "flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center transition-colors duration-200",
                isSelected 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
              )}>
                <Icon className="w-4 h-4" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className={cn(
                  "font-medium text-sm transition-colors duration-200",
                  isSelected ? "text-primary" : "text-foreground group-hover:text-primary"
                )}>
                  {category.label}
                </h3>
              </div>
              
              <div className={cn(
                "flex-shrink-0 w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-200",
                isSelected 
                  ? "border-primary bg-primary" 
                  : "border-muted-foreground/30 group-hover:border-primary/50"
              )}>
                {isSelected && (
                  <Check className="w-2.5 h-2.5 text-primary-foreground" />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

