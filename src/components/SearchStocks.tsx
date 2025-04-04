"use client"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"

import { type z } from "zod"
import { Button } from "@/components/ui/button"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { IStocks } from "@/types"
import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import useDebounce from "@/lib/debouncedSearch"
import { CallAPI } from "@/lib/Client"
import Spinner from "./Spinner"

export const SearchStocks = ({ onChange }: {
    onChange: (value: string) => void
}) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [tickers, setTickers] = useState<z.infer<typeof IStocks>>([])
    const [searchValue, setSearchValue] = useState("");
    const [loading, setLoading] = useState(false)

    useDebounce(
        searchValue,
        (query: string) => fetchTickers(query),
        1000
    );
    function seachTicker(value: string) {
        setLoading(true)
        setSearchValue(value)
    }
    async function fetchTickers(query: string) {
        const res = await CallAPI<z.infer<typeof IStocks>>(`/api/stocks?query=${query}`, "GET");
        const result = IStocks.safeParse(res)
        if (result.success) {
            console.log(result.data)
            setTickers(result.data)
        }
        else {
            console.log(result.error)
            setTickers([])
        }
        setLoading(false)
    }
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between"
                >
                    {value ?? "Select a ticker"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="flex-1 min-w-[400px] p-0">
                <Command shouldFilter={false}>
                    <CommandInput onValueChange={seachTicker} placeholder="Search Ticker, name, ISIN..." />
                    <CommandList>
                        <CommandEmpty>
                            {loading ? <div className="flex items-center justify-center p-4"><Spinner /></div> : "No Ticker found."
                            }
                        </CommandEmpty>
                        <CommandGroup>
                            {tickers.map((ticker) => (
                                <CommandItem
                                    key={ticker.symbol}
                                    value={`${ticker.symbol} - (${ticker.exchDisp})`}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                        onChange(currentValue.split(" - ")[0] ?? "")
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === `${ticker.symbol} - (${ticker.exchDisp})` ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {ticker.longname} ({ticker.symbol}) - {ticker.exchDisp}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}