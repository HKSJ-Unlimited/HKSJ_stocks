"use client"
import { DataTable } from "@/components/table/Table";
import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { type ITransactions } from "@/types";
import { type z } from "zod";
import { deleteTransaction } from "@/actions/transactions";


export default function TransactionsTableContainer({ data }: { data: z.infer<typeof ITransactions>[] }) {
    return <div className="flex-1 flex-col">
        <DataTable
            action={(selectedRows, setTableData, setRowSelection) => {
                async function handleDelete(selectedRows: z.infer<typeof ITransactions>[]) {
                    await deleteTransaction(selectedRows);
                    const selectedIds = new Set(selectedRows.map(row => row.id))
                    setTableData((prev) => prev.filter((row) => !selectedIds.has(row.id)));
                    setRowSelection();
                }
                if (selectedRows.length === 0) return null;
                return (
                    <div className="flex justify-start pb-2">
                        <Button variant="outline" onClick={() => handleDelete(selectedRows)}>
                            Delete {selectedRows.length} row{selectedRows.length > 1 ? "s" : ""}
                        </Button>
                    </div>
                )
            }}
            columns={columns} data={data} />
    </div>;
}
