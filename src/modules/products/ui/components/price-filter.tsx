 
import {ChangeEvent} from "react";

import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";


interface Props{
    minPrice?: string | null;
    maxPrice?: string | null;

    onMinPriceChange: (value: string) => void;
    onMaxPriceChange: (value: string) => void;
}


export const formatAsCurrency = (value: string)=>{
    const numericValue = value.replace(/[^0-9.]/g,"");

    const parts = numericValue.split(".");
    const formattedValue = 
        parts[0] +(parts.length > 1 ? "." + parts[1]?.slice(0,2):"");

        if(!formattedValue) return "";

        const numberValue = parseFloat(formattedValue);
        if(isNaN(numberValue)) return "";

        return new Intl.NumberFormat("pl-PL",{
            style:"currency",
            currency:"PLN",
            minimumFractionDigits:0,
            maximumFractionDigits:0,
        }).format(numberValue);
};
        export const PriceFilter = ({
            minPrice,
            maxPrice,
            onMinPriceChange,
            onMaxPriceChange,
        }: Props)=>{

            const handleMinPriceChange = (e:ChangeEvent<HTMLInputElement>)=>{
                const numericValue = e.target.value.replace(/[^0-9.]/g,"");
                onMinPriceChange(numericValue);
            }

            
            const handleMaxPriceChange = (e:ChangeEvent<HTMLInputElement>)=>{
                const numericValue = e.target.value.replace(/[^0-9.]/g,"");
                onMaxPriceChange(numericValue);
            }


            return(
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                        <Label className="font-medium text-base">
                            Cena minimalna
                        </Label>
                        <Input
                            type="text"
                            placeholder="0 zł"
                            value={minPrice?formatAsCurrency(minPrice):""}
                            onChange={handleMinPriceChange}
                        /> 
                    </div>
                           <div className="flex flex-col gap-2">
                        <Label className="font-medium text-base">
                            Cena maksymalna
                        </Label>
                        <Input
                            type="text"
                            placeholder="10000 zł"
                            value={maxPrice?formatAsCurrency(maxPrice):""}
                            onChange={handleMaxPriceChange}
                        /> 
                    </div>
                </div>
            )

        };
