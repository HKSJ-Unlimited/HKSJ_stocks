"use client"

import { DataTableColumnHeader } from "@/components/table/TableHeader"
import { type ColumnDef } from "@tanstack/react-table"
import { type IPositions } from "@/types"
import { type z } from "zod"

export const columns: ColumnDef<z.infer<typeof IPositions>>[] = [
    {
        accessorKey: "ticker",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Ticker" />,
    },
    {
        accessorKey: "daysGain",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Days Gain" />,
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
    }

]
