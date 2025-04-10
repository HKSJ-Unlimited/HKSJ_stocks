"use client"

import { DataTableColumnHeader } from "@/components/table/TableHeader"
import { type ColumnDef } from "@tanstack/react-table"
import { type ITransactions } from "@/types"
import { type z } from "zod"
import { format } from "date-fns"
import { Checkbox } from "@/components/ui/checkbox"

export const columns: ColumnDef<z.infer<typeof ITransactions>>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "ticker",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Ticker" />,
    },
    {
        accessorKey: "transactionDate",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Transaction Date" />,
        cell: ({ row }) => {
            return format(row.original.transactionDate, "dd/MM/yyyy")
        }
    },
    {
        accessorKey: "type",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
        cell: ({ row }) => {
            return <div>
                {row.original.type === "buy" ?
                    <span className="text-green-400 font-bold">Buy</span> :
                    <span className="text-red-400 font-bold">Sell</span>}
            </div>
        }
    },
    {
        accessorKey: "currentShares",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Current Shares" />,
    },
    {
        accessorKey: "tradedShares",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Traded Shares" />,
    },
    {
        accessorKey: "pricePerShare",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Price Per Share" />,
    },
    {
        accessorKey: "totalPrice",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Total Price" />,
    },
    {
        accessorKey: "fees",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Fees" />,
    },
    {
        accessorKey: "notes",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Notes" />,
    }


]
