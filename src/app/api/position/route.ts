import { db } from "@/server/db";
import { transactions } from "@/server/db/schema";
import { type IPositions } from "@/types";
import { eq } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";
import { type z } from "zod";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId)
        return NextResponse.json({ error: "No userId provided" }, { status: 400 });

    try {
        const userTransactions = await db.select()
            .from(transactions)
            .where(eq(transactions.userId, userId))

        if (!userTransactions.length)
            return NextResponse.json([], { status: 400 })
        const res: z.infer<typeof IPositions>[] = [];

        const buyTransactions = userTransactions.filter(tx => tx.type === 'buy');

        const sellTransactions = userTransactions.filter(tx => tx.type === 'sell');

        const tickers = new Set<string>()
        userTransactions.forEach(tx => tickers.add(tx.ticker));

        for (const tx of tickers) {
            let totalBuyCost = 0;
            let totalBuyQuantity = 0;
            let totalFees = 0;

            buyTransactions.forEach(item => {
                if (item.ticker === tx) {
                    totalBuyCost += Number(item.pricePerShare) * item.quantity
                    totalBuyQuantity += item.quantity
                    totalFees += Number(item.fees)
                }
            });

            sellTransactions.forEach(item => {
                if (item.ticker === tx) {
                    totalFees += Number(item.fees)
                }
            });

            const avgBuyPrice = totalBuyQuantity > 0 ? totalBuyCost / totalBuyQuantity : 0;

            let totalSharesHeld = 0;
            buyTransactions.forEach(item => {
                if (item.ticker === tx)
                    totalSharesHeld += item.quantity;
            });

            sellTransactions.forEach(item => {
                if (item.ticker === tx)
                    totalSharesHeld -= item.quantity
            })

            const { regularMarketPrice: currentPrice } = await yahooFinance.quote(tx);
            console.log("Current Price:", currentPrice, "Ticker:", tx)
            if (currentPrice) {
                const daysGain = avgBuyPrice > 0 ? ((currentPrice - avgBuyPrice) / avgBuyPrice) * 100 : 0

                const marketValue = currentPrice * totalSharesHeld;

                const invested = avgBuyPrice * totalSharesHeld;

                const unrealizedGain = marketValue - invested;

                res.push({
                    ticker: {
                        symbol: tx,
                        shortname: userTransactions.find(item => item.ticker === tx)?.shortname ?? '',
                        exchDisp: userTransactions.find(item => item.ticker === tx)?.exchDisp ?? ''
                    },
                    daysGain: Number(daysGain.toFixed(2)),
                    shares: Number(totalSharesHeld.toFixed(2)),
                    invested: Number(invested.toFixed(2)),
                    marketValue: Number(marketValue.toFixed(2)),
                    fees: Number(totalFees.toFixed(2)),
                    unrealizedGain: Number(unrealizedGain.toFixed(2))
                })
            }

        }
        return NextResponse.json(res, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Unknown error occurred" },
            { status: 500 }
        );
    }


}