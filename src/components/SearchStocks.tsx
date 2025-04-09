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
    onChange: (value: { symbol: string, exchDisp: string, shortname: string }) => void
}) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<{ symbol: string, exchDisp: string, shortname: string } | null>(null);
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
        console.log(res)
        const result = IStocks.safeParse(res)
        if (result.success) {
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
                    {value
                        ? `${value.shortname} (${value.symbol}) - ${value.exchDisp}`
                        : "Select a ticker"}
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
                            {tickers.map((ticker) => {
                                return (
                                    <CommandItem
                                        key={ticker.symbol}
                                        value={ticker.symbol}
                                        onSelect={() => {
                                            const selected = {
                                                symbol: ticker.symbol,
                                                exchDisp: ticker.exchDisp,
                                                shortname: ticker.shortname,
                                            };
                                            setValue(selected);
                                            setOpen(false);
                                            onChange(selected);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value?.symbol === ticker.symbol ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {ticker.shortname} ({ticker.symbol}) - {ticker.exchDisp}
                                    </CommandItem>
                                )
                            }
                            )}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}