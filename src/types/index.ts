import { z } from "zod"

export const IPositions = z.object({
    ticker: z.object({
        symbol: z.string(),
        shortname: z.string(),
        exchDisp: z.string(),
    }),
    daysGain: z.string(),
    shares: z.string(),
    invested: z.string(),
    marketValue: z.string(),
    fees: z.string(),
    unrealizedGain: z.string(),
});
export const ITransactions = z.object({
    id: z.number(),
    ticker: z.string(),
    transactionDate: z.date(),
    currentShares: z.number(),
    tradedShares: z.number(),
    pricePerShare: z.string(),
    totalPrice: z.string(),
    fees: z.string(),
    notes: z.string(),
    type: z.string()
});

export const IFormSchema = z.object({
    ticker: z.object({
        symbol: z.string(),
        shortname: z.string(),
        exchDisp: z.string(),
    }),
    date: z.date(),
    pricePerShare: z.number().gt(0, ({
        message: "Price cannot be 0"
    })),
    quantity: z.number().nonnegative({
        message: "Quantity cannot be negative"
    }),
    fees: z.number().nonnegative({
        message: "Fees cannot be negative"
    }),
    notes: z.string(),
    type: z.enum(['buy', 'sell']).default('buy'),
})

export const IStocks = z.array(z.object(
    {
        exchange: z.string(),
        shortname: z.string(),
        quoteType: z.string(),
        symbol: z.string(),
        index: z.string(),
        score: z.number().optional(),
        typeDisp: z.string(),
        longname: z.string().optional(),
        exchDisp: z.string(),
        sector: z.string().optional(),
        sectorDisp: z.string().optional(),
        industry: z.string().optional(),
        industryDisp: z.string().optional(),
        isYahooFinance: z.boolean().optional()
    }
))