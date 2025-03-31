import { z } from "zod"

export const IPositions = z.object({
    ticker: z.string(),
    daysGain: z.string(),
    shares: z.string(),
    invested: z.string(),
    marketValue: z.string(),
    fees: z.string(),
    unrealizedGain: z.string(),
});

export const IFormSchema = z.object({
    ticker: z.string(),
    purchaseDate: z.date(),
    pricePerShare: z.string(),
    quantity: z.string(),
    fees: z.string(),
    notes: z.string().min(5, {
        message: "Note must be at least 5 characters.",
    }).optional()
})