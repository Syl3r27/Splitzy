"use client";

import { useConvexQuery, useConvexMutation } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getCategoryById } from "@/lib/expense-categories";
import { getCategoryIcon } from "@/lib/expense-categories";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ExpenseList({
  expenses,
  showOtherPerson = true,
  isGroupExpense = false,
  otherPersonId = null,
  userLookupMap = {},
}) {
  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);
  const deleteExpense = useConvexMutation(api.expenses.deleteExpense);

  if (!expenses || !expenses.length) {
    return (
      <Card className="border border-slate-100 bg-white/70 backdrop-blur-sm shadow-sm">
        <CardContent className="py-8 text-center text-slate-400">
          No expenses found
        </CardContent>
      </Card>
    );
  }

  // Helper to get user details from cache or look up from expense
  const getUserDetails = (userId) => {
    // For the group context, we need to look up members from somewhere else
    // This is a simplified fallback
    return {
      name:
        userId === currentUser?._id
          ? "You"
          : userLookupMap[userId]?.name || "Other User",
      imageUrl: null,
      id: userId,
    };
  };

  // Check if the user can delete an expense (creator or payer)
  const canDeleteExpense = (expense) => {
    if (!currentUser) return false;
    return (
      expense.createdBy === currentUser._id ||
      expense.paidByUserId === currentUser._id
    );
  };

  // Handle delete expense
  const handleDeleteExpense = async (expense) => {
    // Use basic JavaScript confirm
    const confirmed = window.confirm(
      "Are you sure you want to delete this expense? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      await deleteExpense.mutate({ expenseId: expense._id });
      toast.success("Expense deleted successfully");
    } catch (error) {
      toast.error("Failed to delete expense: " + error.message);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {expenses.map((expense) => {
        const payer = getUserDetails(expense.paidByUserId, expense);
        const isCurrentUserPayer = expense.paidByUserId === currentUser?._id;
        const category = getCategoryById(expense.category);
        const CategoryIcon = getCategoryIcon(category.id);
        const showDeleteOption = canDeleteExpense(expense);

        return (
          <Card
            key={expense._id}
            className="relative overflow-hidden border border-slate-100 bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-[3px] hover:shadow-lg hover:shadow-sky-50 rounded-2xl"
          >
            {/* Soft pastel blob */}
            <div className="pointer-events-none absolute -right-10 top-0 h-24 w-24 rounded-full bg-sky-100/60 blur-3xl" />
            <CardContent className="py-4 relative">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* Category icon */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-50 border border-sky-100 shadow-xs">
                    <CategoryIcon className="h-5 w-5 text-sky-500" />
                  </div>

                  <div className="space-y-0.5">
                    <h3 className="font-medium text-slate-800">
                      {expense.description}
                    </h3>
                    <div className="flex flex-wrap items-center text-xs text-slate-400 gap-2">
                      <span>{format(new Date(expense.date), "MMM d, yyyy")}</span>
                      {showOtherPerson && (
                        <>
                          <span className="text-slate-300">•</span>
                          <span className="flex items-center gap-1">
                            <span className="text-slate-500">
                              {isCurrentUserPayer ? "You" : payer.name}
                            </span>
                            <span className="text-slate-400">paid</span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right space-y-1">
                    <div className="text-lg font-semibold text-slate-800">
                      ${expense.amount.toFixed(2)}
                    </div>
                    {isGroupExpense ? (
                      <Badge
                        variant="outline"
                        className="mt-0.5 border-emerald-100 bg-emerald-50/70 text-emerald-600 text-[11px]"
                      >
                        Group expense
                      </Badge>
                    ) : (
                      <div className="text-xs text-slate-400">
                        {isCurrentUserPayer ? (
                          <span className="text-emerald-500 font-medium">
                            You paid
                          </span>
                        ) : (
                          <span className="text-rose-500 font-medium">
                            {payer.name} paid
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {showDeleteOption && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full text-rose-400 hover:text-rose-600 hover:bg-rose-50 transition-all duration-200 hover:-translate-y-[1px]"
                      onClick={() => handleDeleteExpense(expense)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete expense</span>
                    </Button>
                  )}
                </div>
              </div>

              {/* Display splits info */}
              <div className="mt-3 text-xs">
                <div className="flex gap-2 flex-wrap">
                  {expense.splits.map((split, idx) => {
                    const splitUser = getUserDetails(split.userId, expense);
                    const isCurrentUser = split.userId === currentUser?._id;
                    const shouldShow =
                      showOtherPerson ||
                      (!showOtherPerson &&
                        (split.userId === currentUser?._id ||
                          split.userId === otherPersonId));

                    if (!shouldShow) return null;

                    return (
                      <Badge
                        key={idx}
                        variant={split.paid ? "outline" : "secondary"}
                        className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] transition-all duration-200 ${
                          split.paid
                            ? "border-emerald-100 bg-emerald-50/70 text-emerald-600 hover:bg-emerald-50"
                            : "bg-sky-50 text-sky-700 border border-sky-100 hover:bg-sky-100"
                        }`}
                      >
                        <Avatar className="h-4 w-4">
                          <AvatarImage src={splitUser.imageUrl} />
                          <AvatarFallback className="text-[10px] bg-slate-100 text-slate-500">
                            {splitUser.name?.charAt(0) || "?"}
                          </AvatarFallback>
                        </Avatar>
                        <span>
                          {isCurrentUser ? "You" : splitUser.name}: $
                          {split.amount.toFixed(2)}
                        </span>
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
