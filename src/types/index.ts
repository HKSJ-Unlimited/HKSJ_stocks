import { z } from "zod"

export const IPositions = z.object({
    ticker: z.string(),
    daysGain: z.string(),
    shares: z.string(),
    invested: z.string(),
    marketValue: z.string(),
    fees: z.string(),
    unrealizedGain: z.string(),
})