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
        accessorKey: "purchasedDate",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Purchased Date" />,
        cell: ({ row }) => {
            return format(row.original.purchasedDate, "dd/MM/yyyy")
        }
    },
    {
        accessorKey: "currentShares",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Current Shares" />,
    },
    {
        accessorKey: "purchasedShares",
        header: ({ column }) => <DataTableColumnHeader column={column} title="Purchased Shares" />,
    },
    {
        accessorKey: "pricePerShares",
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
