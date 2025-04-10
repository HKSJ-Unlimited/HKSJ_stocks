"use client"

import { DataTableColumnHeader } from "@/components/table/TableHeader"
import { type ColumnDef } from "@tanstack/react-table"
import { type IPositions } from "@/types"
import { type z } from "zod"

export const columns: ColumnDef<z.infer<typeof IPositions>>[] = [
    {
        accessorKey: "ticker",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Ticker" />,
        cell: ({ row }) => (
            <div className="flex items-center space-x-2">
                <div className="flex flex-col">
                    <span className="text-sm font-medium">{row.original.ticker.symbol}.{row.original.ticker.exchDisp}</span>
                    <span className="text-xs text-muted-foreground">{row.original.ticker.shortname}</span>
                </div>
            </div>
        )
    },
    {
        accessorKey: "daysGain",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Days Gain" />,
        cell: ({ row }) => {
            const gain = row.original.daysGain
            return <span className={parseInt(gain) > 0 ?
                "text-green-400 font-bold" : "text-red-400 font-bold"}>{gain}</span>
        }
    },
    {
        accessorKey: "shares",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Shares" />,
    },
    {
        accessorKey: "invested",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Invested" />,
    },
    {
        accessorKey: "marketValue",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Market Value" />,
    },
    {
        accessorKey: "fees",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Fees" />,
    },
    {
        accessorKey: "unrealizedGain",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Unrealized Gain" />,
        cell: ({ row }) => {
            const gain = row.original.unrealizedGain
            return <span className={parseInt(gain) > 0 ?
                "text-green-400 font-bold" : "text-red-400 font-bold"}>{gain}</span>
        }
    }

]
