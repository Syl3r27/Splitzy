"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { BarLoader } from "react-spinners";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, ArrowLeftRight, ArrowLeft } from "lucide-react";
import { ExpenseList } from "@/components/expense-list";
import {SettlementList} from "@/components/settlements-list";

export default function PersonExpensesPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("expenses");

  const { data, isLoading } = useConvexQuery(
    api.expenses.getExpensesBetweenUsers,
    { userId: params.id }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 via-sky-50 to-emerald-50">
        <div className="container mx-auto py-16 flex flex-col items-center gap-4">
          <BarLoader width={"60%"} color="#38bdf8" />
          <p className="text-sm text-slate-500 animate-pulse">
            Loading your shared expenses...
          </p>
        </div>
      </div>
    );
  }

  const otherUser = data?.otherUser;
  const expenses = data?.expenses || [];
  const settlements = data?.settlements || [];
  const balance = data?.balance || 0;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-8 max-w-4xl space-y-6">
        {/* Header section */}
        <div className="mb-2 space-y-4">
          <Button
            variant="outline"
            size="sm"
            className="mb-2 border-slate-200 bg-white/70 text-slate-600 hover:bg-slate-50 hover:text-slate-800 shadow-sm transition-all duration-200 hover:-translate-y-[1px]"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-16 w-16 border border-sky-100 shadow-sm">
                  <AvatarImage src={otherUser?.imageUrl} />
                  <AvatarFallback className="bg-sky-50 text-sky-600 text-xl">
                    {otherUser?.name?.charAt(0) || "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-400/90 border-2 border-white animate-[pulse_2.5s_ease-in-out_infinite]" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight bg-gradient-to-r from-sky-500 via-emerald-500 to-rose-500 bg-clip-text text-transparent">
                  {otherUser?.name}
                </h1>
                <p className="text-sm text-slate-500">{otherUser?.email}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                asChild
                variant="outline"
                className="border-sky-100 bg-white/70 text-sky-700 hover:bg-sky-50 hover:text-sky-800 shadow-sm transition-all duration-200"
              >
                <Link href={`/settlements/user/${params.id}`}>
                  <ArrowLeftRight className="mr-2 h-4 w-4" />
                  Settle up
                </Link>
              </Button>
              <Button
                asChild
                className="bg-sky-500 text-white hover:bg-sky-400 shadow-md shadow-sky-200 transition-transform duration-200 hover:-translate-y-[2px]"
              >
                <Link href={`/expenses/new`}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add expense
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Balance card */}
        <Card className="mb-4 border-slate-100 bg-white/80 shadow-sm backdrop-blur-sm rounded-2xl transition-all duration-300 hover:-translate-y-[2px] hover:shadow-lg hover:shadow-sky-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-slate-800">
              Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-sm text-slate-600">
                {balance === 0 ? (
                  <p>You are all settled up ✨</p>
                ) : balance > 0 ? (
                  <p>
                    <span className="font-medium text-slate-800">
                      {otherUser?.name}
                    </span>{" "}
                    owes you
                  </p>
                ) : (
                  <p>
                    You owe{" "}
                    <span className="font-medium text-slate-800">
                      {otherUser?.name}
                    </span>
                  </p>
                )}
              </div>
              <div
                className={`text-2xl font-bold ${
                  balance > 0
                    ? "text-emerald-500"
                    : balance < 0
                      ? "text-rose-500"
                      : "text-slate-700"
                }`}
              >
                ${Math.abs(balance).toFixed(2)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for expenses and settlements */}
        <Tabs
          defaultValue="expenses"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-2 rounded-xl bg-white/70 border border-slate-100 shadow-sm backdrop-blur-sm">
            <TabsTrigger
              value="expenses"
              className="data-[state=active]:bg-sky-50 data-[state=active]:text-sky-700 data-[state=active]:shadow-sm rounded-xl transition-all duration-200"
            >
              Expenses ({expenses.length})
            </TabsTrigger>
            <TabsTrigger
              value="settlements"
              className="data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm rounded-xl transition-all duration-200"
            >
              Settlements ({settlements.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="expenses" className="space-y-4">
            <ExpenseList
              expenses={expenses}
              showOtherPerson={false}
              otherPersonId={params.id}
              userLookupMap={{ [otherUser.id]: otherUser }}
            />
          </TabsContent>

          <TabsContent value="settlements" className="space-y-4">
            <SettlementList
              settlements={settlements}
              userLookupMap={{ [otherUser.id]: otherUser }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
