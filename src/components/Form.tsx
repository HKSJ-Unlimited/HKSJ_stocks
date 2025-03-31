"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { type z } from "zod"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { IFormSchema } from "@/types"
import { Textarea } from "./ui/textarea"
import { useState } from "react"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { Input } from "./ui/input"

const tickers = [
    {
        value: "AAPL",
        label: "AAPL",
    },
    {
        value: "GOOGL",
        label: "GOOGL",
    },
    {
        value: "AMZN",
        label: "AMZN",
    },
    {
        value: "MSFT",
        label: "MSFT",
    },
    {
        value: "TSLA",
        label: "TSLA",
    },
    {
        value: "META",
        label: "META",
    },
    {
        value: "NFLX",
        label: "NFLX",
    },

]

export function TransactionForm() {
    const form = useForm<z.infer<typeof IFormSchema>>({
        resolver: zodResolver(IFormSchema),
        defaultValues: {
            notes: "",
            fees: "0",
            pricePerShare: "",
            quantity: "1",
            ticker: '',
            purchaseDate: new Date()
        },
    })
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    function onSubmit(values: z.infer<typeof IFormSchema>) {
        console.log(values)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                <FormField
                    control={form.control}
                    name="ticker"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Ticker</FormLabel>
                            <FormControl>
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            className="justify-between"
                                        >
                                            {value
                                                ? tickers.find((ticker) => ticker.value === value)?.label
                                                : "Select a ticker..."}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="flex-1 min-w-[400px] p-0">
                                        <Command>
                                            <CommandInput placeholder="Search a ticker..." />
                                            <CommandList>
                                                <CommandEmpty>No ticker found.</CommandEmpty>
                                                <CommandGroup>
                                                    {tickers.map((ticker) => (
                                                        <CommandItem
                                                            key={ticker.value}
                                                            value={ticker.value}
                                                            onSelect={(currentValue) => {
                                                                setValue(currentValue === value ? "" : currentValue)
                                                                setOpen(false)
                                                                field.onChange(currentValue)
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    value === ticker.value ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                            {ticker.label}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </FormControl>
                            <FormDescription>
                                Search by ticker, name or ISIN.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex items-center justify-between">
                    <FormField
                        control={form.control}
                        name="purchaseDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Purchase Date</FormLabel>
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "justify-start text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon />
                                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={(newDate) => {
                                                    field.onChange(newDate)
                                                }}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </FormControl>
                                <FormDescription>
                                    Search by ticker, name or ISIN.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="pricePerShare"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Price per share</FormLabel>
                                <FormControl>
                                    <div className="flex items-center">
                                        <p className="absolute mx-1">€</p>
                                        <Input className="px-4" placeholder="Price" {...field} />
                                    </div>
                                </FormControl>
                                <FormDescription>
                                    This is the price you paid for the share(s).
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>
                <div className="flex items-center justify-between">
                    <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Quantity</FormLabel>
                                <FormControl className="">
                                    <Input placeholder="Quantity" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is no of shares you bought.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="fees"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Fees</FormLabel>
                                <FormControl>
                                    <div className="flex items-center">
                                        <p className="absolute mx-1">€</p>
                                        <Input className="px-4" placeholder="Price" {...field} />
                                    </div>
                                </FormControl>
                                <FormDescription>
                                    This is the fees you paid for the share(s).
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                                <Textarea placeholder="note" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your note about the transaction.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
