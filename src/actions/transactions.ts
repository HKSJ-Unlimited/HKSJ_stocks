'use server';

import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { transactions } from "@/server/db/schema";
import { type ITransactions, type IFormSchema } from "@/types";
import { and, eq, inArray } from "drizzle-orm";
import { type z } from "zod";


export async function addTransaction(data: z.infer<typeof IFormSchema>) {
    const session = await auth();

    if (!session?.user) throw new Error("User not authenticated");

    const userId = session.user.id;

    await db.insert(transactions).values({
        userId: userId,
        ticker: data.ticker,
        date: data.date,
        quantity: data.quantity,
        pricePerShare: data.pricePerShare.toString(),
        fees: data.fees.toString(),
        notes: data.notes,
        type: data.type,
    });
}

export async function deleteTransaction(data: z.infer<typeof ITransactions>[]) {
    const session = await auth();

    if (!session?.user) throw new Error("User not authenticated");
    const userId = session.user.id;

    const transactionIds = data.map(item => item.id);

    if (transactionIds.length > 0) {
        try {
            await db.delete(transactions).where(
                and(
                    eq(transactions.userId, userId),
                    inArray(transactions.id, transactionIds)
                )
            );
        } catch (error) {
            console.error("Error deleting transactions:", error);
            throw new Error("Failed to delete transactions");
        }
    }
}