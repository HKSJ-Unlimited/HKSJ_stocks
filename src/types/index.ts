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
    pricePerShare: z.string().nonempty({
        message: "Price cannot be empty"
    }),
    quantity: z.string().nonempty({
        message: "Quantity cannot be empty"
    }),
    fees: z.string().nonempty({
        message: "Fees cannot be empty"
    }),
    notes: z.string()
})