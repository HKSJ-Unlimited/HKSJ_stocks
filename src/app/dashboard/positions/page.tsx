import { DataTable } from "@/components/table/Table";
import React, { Suspense } from "react";
import { columns } from "./columns";
import { type IPositions } from "@/types"
import { type z } from "zod";
import { auth } from "@/server/auth";
import { CallAPI } from "@/lib/Client";
import PositionLoader from "@/components/Skeletons/PositionLoader";

export default async function Position() {
  const session = await auth()
  const userId = session?.user.id

  if (!userId) {
    return <div className="flex-1 flex-col">No data</div>;
  }
  const res = await CallAPI<z.infer<typeof IPositions>[]>(`http:localhost:3000/api/position?userId=${userId}`, "GET")
  return <div className="flex-1 flex-col">
    <Suspense fallback={<PositionLoader />}>
      <DataTable columns={columns} data={res} />
    </Suspense>
  </div>;
}
