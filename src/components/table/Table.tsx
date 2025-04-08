"use client"

import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    type RowSelectionState,
    useReactTable,
    type VisibilityState,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,

} from "@/components/ui/table"

import { DataTablePagination } from "./Pagination"
import React, { useEffect } from "react"
import { DataTableViewOptions } from "./ColVisibilty"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    action?:
    (selectedRows: TData[], setTableData: React.Dispatch<React.SetStateAction<TData[]>>, setRowSelection: () => void)
        => React.ReactNode
}

export function DataTable<TData, TValue>({
    columns,
    data,
    action,
}: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
    const [tableData, setTableData] = React.useState<TData[]>(data);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        enableRowSelection: true,
        state: {
            columnVisibility,
            rowSelection,
        },
    });
    useEffect(() => {
        setTableData(data)
    }, [data])

    return (
        <>
            <DataTableViewOptions table={table} />
            {action?.(
                table.getSelectedRowModel().rows.map((row) => row.original)
                , setTableData, () => setRowSelection({}))}
            <div className="rounded-md border mb-2">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) =>
                            (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            )
                            )
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </>
    )
}
