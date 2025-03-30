import { DataTable } from "@/components/table/Table";
import React from "react";
import { columns } from "./columns";
import { type IPositions } from "@/types"
import { type z } from "zod";

const data: z.infer<typeof IPositions>[] = [
  {
    ticker: "AAPL",
    daysGain: "+1.5%",
    shares: "10",
    invested: "$1000",
    marketValue: "$1200",
    fees: "$10",
    unrealizedGain: "$200",
  },
  {
    ticker: "GOOGL",
    daysGain: "-0.5%",
    shares: "5",
    invested: "$1500",
    marketValue: "$1400",
    fees: "$15",
    unrealizedGain: "-$100",
  }
]
export default function Position() {
  return <div className="flex-1 flex-col p-2 mx-10">
    <DataTable columns={columns} data={data} />
  </div>;
}
