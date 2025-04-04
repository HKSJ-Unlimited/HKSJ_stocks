import { DataTable } from "@/components/table/Table";
import React from "react";
import { type ITransactions } from "@/types"
import { type z } from "zod";
import { columns } from "./columns";

const data: z.infer<typeof ITransactions>[] = [
    {
        ticker: "AAPL",
        transactionDate: new Date(),
        currentShares: 10,
        tradedShares: 10,
        pricePerShares: 100,
        totalPrice: 1000,
        fees: 10,
        notes: "Good stock",
        type: "buy"
    },
    {
        ticker: "GOOGL",
        transactionDate: new Date(),
        currentShares: 5,
        tradedShares: 5,
        pricePerShares: 300,
        totalPrice: 1500,
        fees: 15,
        notes: "Good stock",
        type: "sell"
    }
]
export default function Position() {
    return <div className="flex-1 flex-col">
        <DataTable columns={columns} data={data} />
    </div>;
}
