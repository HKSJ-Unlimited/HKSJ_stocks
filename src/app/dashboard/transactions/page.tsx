import React, { Suspense } from "react";
import { db } from "@/server/db";
import { userTransactionHistory } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/server/auth";
import TransactionsTableContainer from "./table";
import TransactionnLoader from "@/components/Skeletons/TransactionLoader";

export default async function Position() {
    const session = await auth();
    if (!session?.user) throw new Error("User not authenticated");
    const history = await db
        .select()
        .from(userTransactionHistory)
        .where(eq(userTransactionHistory.userId, session.user.id));

    return (
        <div className="flex-1 flex-col">
            <Suspense fallback={<TransactionnLoader />}>
                <TransactionsTableContainer data={history} />
            </Suspense>
        </div>

    )
}
