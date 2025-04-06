import { DataTable } from "@/components/table/Table";
import React from "react";
import { columns } from "./columns";
import { db } from "@/server/db";
import { userTransactionHistory } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/server/auth";

export default async function Position() {
    const session = await auth();
    if (!session?.user) throw new Error("User not authenticated");
    const history = await db
        .select()
        .from(userTransactionHistory)
        .where(eq(userTransactionHistory.userId, session.user.id));

    return <div className="flex-1 flex-col">
        <DataTable columns={columns} data={history} />
    </div>;
}
