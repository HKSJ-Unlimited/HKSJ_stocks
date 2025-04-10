import { DataTable } from "@/components/table/Table";
import { columns } from "./columns";
import { type IPositions } from "@/types"
import { type z } from "zod";
import { env } from "@/env";
import { CallAPI } from "@/lib/Client";
import { auth } from "@/server/auth";

export default async function PositionTableContainer() {
    const session = await auth()
    const userId = session?.user.id

    if (!userId) {
        return <div className="flex-1 flex-col">No data</div>;
    }
    const res = await CallAPI<z.infer<typeof IPositions>[]>(`${env.BASE_URL}/api/position?userId=${userId}`, "GET")

    return (
        <DataTable columns={columns} data={res} />
    )
}
