 
import{
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import {ScrollArea} from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { CategoriesGetManyOutput } from "@/modules/categories/types";

interface Props{
    open:boolean;
    onOpenChange:(open: boolean) => void;
}

export const CategoriesSidebar = ({
    open,
    onOpenChange,
}:Props) =>{
    const trpc = useTRPC();
    const {data} = useQuery(trpc.categories.getMany.queryOptions());
    const router = useRouter();

    const handleCategoryClick = (category:CategoriesGetManyOutput[1]) => {
        if(category.slug === "all"){
            router.push("/");
        } else {
            router.push(`/${category.slug}`);
        }
        onOpenChange(false);
    }

    return(
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="left"
                className="p-0 transition-none"
                style={{backgroundColor: "white"}}
            >
                <SheetHeader className="p-4 border-b">
                    <SheetTitle>
                        Categories
                    </SheetTitle>
                </SheetHeader>
                <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
                    {data?.map((category) => (
                        <button
                            key={category.slug}
                            onClick={() => handleCategoryClick(category)}
                            className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium cursor-pointer"
                        >
                            {category.name}
                        </button>
                    ))}
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};