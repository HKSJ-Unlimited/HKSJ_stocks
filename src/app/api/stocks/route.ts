import { type NextRequest, NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!query || query.trim() === "") {
        return NextResponse.json({ error: "No query provided" }, { status: 400 });
    }

    try {
        const response = await yahooFinance.search(query, {
            quotesCount: 3,
            newsCount: 0,
            enableFuzzyQuery: true,
        });

        if (!response?.quotes) {
            return NextResponse.json({ error: "No quotes found" }, { status: 404 });
        }

        return NextResponse.json(response.quotes.slice(0, 3), { status: 200 });
    } catch (error) {
        console.error("Yahoo Finance API Error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Unknown error occurred" },
            { status: 500 }
        );
    }
}
