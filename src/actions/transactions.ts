'use server';

import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { transactions } from "@/server/db/schema";
import { type IFormSchema } from "@/types";
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