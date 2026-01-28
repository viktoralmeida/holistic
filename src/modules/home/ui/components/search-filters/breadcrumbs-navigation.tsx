import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";

interface Props{
    activeCategoryName?: string | null;
    activeCategory?: string | null;
}

export const BreadcrumbNavigation = ({
    activeCategoryName,
    activeCategory,
}: Props)=>{
    if(!activeCategoryName || activeCategory === "all") return null;
    return(
         <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbPage className="text-xl font-medium">
                        {activeCategoryName} 
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
         </Breadcrumb>
    )
};