import { DataTable } from "@/components/table/Table";
import React from "react";
import { type ITransactions } from "@/types"
import { type z } from "zod";
import { columns } from "./columns";

const data: z.infer<typeof ITransactions>[] = [
    {
        ticker: "AAPL",
        purchasedDate: new Date(),
        currentShares: 10,
        purchasedShares: 10,
        pricePerShares: 100,
        totalPrice: 1000,
        fees: 10,
        notes: "Good stock",
    },
    {
        ticker: "GOOGL",
        purchasedDate: new Date(),
        currentShares: 5,
        purchasedShares: 5,
        pricePerShares: 300,
        totalPrice: 1500,
        fees: 15,
        notes: "Good stock",
    }
]
export default function Position() {
    return <div className="flex-1 flex-col">
        <DataTable columns={columns} data={data} />
    </div>;
}
