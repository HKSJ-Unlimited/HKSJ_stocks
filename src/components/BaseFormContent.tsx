import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Textarea } from "./ui/textarea"
import { CalendarIcon, } from "lucide-react"
import { Input } from "./ui/input"
import { SearchStocks } from "./SearchStocks"
import { type UseFormReturn } from "react-hook-form"

type Props = {
    form: UseFormReturn<{
        ticker: string;
        date: Date;
        pricePerShare: number;
        quantity: number;
        fees: number;
        notes: string;
        type: "buy" | "sell";
    }>,
    type: "buy" | "sell";
}
export const BaseForm = ({ form, type }: Props) => {
    return (
        <div className="flex flex-col gap-4">
            <FormField
                control={form.control}
                name="ticker"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <FormLabel>Ticker</FormLabel>
                        <FormControl>
                            <SearchStocks onChange={field.onChange} />
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
                    name="date"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>
                                {type === "buy" ? "Purchase date" : "Sell date"}
                            </FormLabel>
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
                                    <p className="absolute mx-1">$</p>
                                    <Input type="number" className="px-4" placeholder="Price"
                                        value={field.value}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            field.onChange(Number(e.target.value));
                                        }}

                                    />
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
                                <Input type="number" placeholder="Quantity" value={field.value}
                                    onChange={(e) => {
                                        field.onChange(Number(e.target.value))
                                    }} />
                            </FormControl>
                            <FormDescription>
                                This is no of share(s) you bought.
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
                                    <p className="absolute mx-1">$</p>
                                    <Input type="number" className="px-4" placeholder="Price" value={field.value}
                                        onChange={(e) => {
                                            field.onChange(Number(e.target.value))
                                        }} />
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
        </div>
    );
}