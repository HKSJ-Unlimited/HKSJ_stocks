import React from "react";
import { db } from "@/server/db";
import { userTransactionHistory } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/server/auth";
import TransactionsTableContainer from "./table";

export default async function Position() {
    const session = await auth();
    if (!session?.user) throw new Error("User not authenticated");
    const history = await db
        .select()
        .from(userTransactionHistory)
        .where(eq(userTransactionHistory.userId, session.user.id));

    return (
        <TransactionsTableContainer data={history} />
    )
}
