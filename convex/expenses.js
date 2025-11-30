import { v } from "convex/values";
import { query } from "./_generated/server";
import { internal } from "./_generated/api";

export const getExpensesBetweenUsers = query({
    args: {userId: v.id("users")},
    handler: async(ctx, {userId}) =>{
        const me = await ctx.runQuery(internal.users.getCurrentUser);
        if(me._id === userId) throw new Error("Cannot query yourself");

        /* 1. One on one expenses where either user is the payer */

        const myPaid = await ctx.db
            .query("expenses")
            .withIndex("by_user_and_group", (q)=>
            q.eq("paidByUserId", me._id).eq("groupId",undefined)
        ).collect();

        const theirPaid = await ctx.db
            .query("expenses")
            .withIndex("by_user_and_group", (q)=>
            q.eq("paidByUserId", userId).eq("groupId",undefined)
        ).collect();

        const candidateExpenses = [...myPaid,...theirPaid];

        // Keep only rows where both users are involved (payer or split)
        const expenses = candidateExpenses.filter(e=>{
            const meInSplits = e.splits.some((s)=> s.userId === me._id);
            const themInSplits = e.splits.some((s)=> s.userId === userId);

            const meInvolved = e.paidByUserId===me._id || meInSplits;
            const themInvolved = e.paidByUserId === userId || themInSplits;

            return meInvolved && themInvolved;
        })

        expenses.sort((a ,b) => b.date - a.date);

        // Settlements between the two of us (groupId = undefined)

        const settlements = await ctx.db
            .query("settlements")
            .filter((q)=>
                q.and(
                    q.eq(q.field("groupId"),undefined),
                    q.or(
                        q.eq(q.field("paidByUserId"), me._id),
                        q.eq(q.field("receivedByUserId"),userId)
                    ),
                    q.and(
                        q.eq(q.field("paidByUserId"),userId),
                        q.eq(q.field("receivedByUserId"),me._id)
                    )
                )
            )
            .collect();

        settlements.sort((a,b)=> b.date-a.date);

        //* Compute Running Balance

        let balance = 0;

        for await (const e of expenses){
            if(e.paidByUserId === me.id){
                const split = e.splits.find((s)=> s.userId === userId && !s.paid);
                if(split) balance += split.amount;
            } else{
                const split = e.splits.find((s)=> s.userId=== me._id && !s.paid);
                if (split) balance -= split.amount;
            }
        }

        for (const s of settlements){
            if (s.paidByUserId === me._userId)
                balance += s.amount; // I paid them back
            else balance -= s.amount; // they paid me back
        }

        //* Return Payload

        const other = await ctx.db.get(userId);
        if(!other) throw new Error("User Not Found");

        return {
            expenses,
            settlements,
            otherUser:{
                id: other._id,
                name: other.name,
                email: other.email,
                imageUrl: other.imageUrl,
            },
            balance,
        }

    }
})