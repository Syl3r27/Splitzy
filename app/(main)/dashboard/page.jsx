"use client";

import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import { BarLoader } from "react-spinners";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  Users,
  CreditCard,
  ChevronRight,
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
} from "lucide-react";
import Link from "next/link";
import ExpenseSummary from "./components/expense-summary";
import BalanceSummary from "./components/balance-summary";
import { GroupList } from "./components/group-list";

export default function Dashboard() {
  const { data: balances, isLoading: balancesLoading } = useConvexQuery(
    api.dashboard.getUserBalances
  );

  const { data: groups, isLoading: groupsLoading } = useConvexQuery(
    api.dashboard.getUserGroups
  );

  const { data: totalSpent, isLoading: totalSpentLoading } = useConvexQuery(
    api.dashboard.getTotalSpent
  );

  const { data: monthlySpending, isLoading: monthlySpendingLoading } =
    useConvexQuery(api.dashboard.getMonthlySpending);

  const isLoading =
    balancesLoading ||
    groupsLoading ||
    totalSpentLoading ||
    monthlySpendingLoading;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-10 space-y-8">
        {isLoading ? (
          <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-4">
            <BarLoader width={"50%"} color="#38bdf8" />
            <p className="text-sm text-slate-500 animate-pulse">
              Loading your dashboard...
            </p>
          </div>
        ) : (
          <>
            {/* Top header */}
            <div className="flex justify-between flex-col gap-4 sm:flex-row sm:items-center">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/70 px-3 py-1 text-xs font-medium text-sky-600 shadow-sm backdrop-blur-sm animate-[pulse_2.3s_ease-in-out_infinite]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Overview
                </div>
                <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight bg-gradient-to-r from-sky-500 via-emerald-500 to-rose-500 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  A quick snapshot of what you owe, what you&apos;re owed, and how
                  you&apos;ve been spending.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  asChild
                  variant="outline"
                  className="border-sky-100 bg-white/70 text-sky-700 hover:bg-sky-50 hover:text-sky-800 shadow-sm transition-all duration-200"
                >
                  <Link href="/contacts?createGroup=true">
                    <Users className="mr-2 h-4 w-4" />
                    New group
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="gap-2 bg-sky-500 text-white hover:bg-sky-400 shadow-md shadow-sky-200 transition-transform duration-200 hover:-translate-y-[2px]"
                >
                  <Link href="/expenses/new">
                    <PlusCircle className="h-4 w-4" />
                    Add expense
                  </Link>
                </Button>
              </div>
            </div>

            {/* Balance overview cards */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Balance Snapshot
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Total Balance */}
                <Card className="relative overflow-hidden border border-sky-100 bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-100">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-sky-100 blur-3xl" />
                  <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                    <div className="space-y-1">
                      <CardTitle className="text-xs font-medium text-slate-600">
                        Total Balance
                      </CardTitle>
                      <p className="text-[11px] text-slate-400">
                        Net of what you owe and are owed
                      </p>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-50 border border-sky-100">
                      <Wallet className="h-4 w-4 text-sky-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-semibold">
                      {balances?.totalBalance > 0 ? (
                        <span className="text-emerald-500">
                          +${balances?.totalBalance.toFixed(2)}
                        </span>
                      ) : balances?.totalBalance < 0 ? (
                        <span className="text-rose-500">
                          -${Math.abs(balances?.totalBalance).toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-slate-800">$0.00</span>
                      )}
                    </div>
                    <p className="mt-2 text-xs text-slate-500">
                      {balances?.totalBalance > 0
                        ? "You’re currently in the positive."
                        : balances?.totalBalance < 0
                          ? "You owe more than you’re owed right now."
                          : "Nice. Everything is perfectly settled."}
                    </p>
                  </CardContent>
                </Card>

                {/* You are owed */}
                <Card className="relative overflow-hidden border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-sky-50 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-100">
                  <div className="pointer-events-none absolute -right-12 -bottom-12 h-32 w-32 rounded-full bg-emerald-100 blur-3xl" />
                  <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                    <div className="space-y-1">
                      <CardTitle className="text-xs font-medium text-slate-600">
                        You are owed
                      </CardTitle>
                      <p className="text-[11px] text-slate-400">
                        Pending returns coming back to you
                      </p>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 border border-emerald-100 animate-[pulse_2.5s_ease-in-out_infinite]">
                      <ArrowDownCircle className="h-4 w-4 text-emerald-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-semibold text-emerald-500">
                      ${balances?.youAreOwed.toFixed(2)}
                    </div>
                    <p className="mt-2 text-xs text-slate-500">
                      From{" "}
                      <span className="font-semibold">
                        {balances?.oweDetails?.youAreOwedBy?.length || 0}
                      </span>{" "}
                      {balances?.oweDetails?.youAreOwedBy?.length === 1
                        ? "person"
                        : "people"}
                    </p>
                  </CardContent>
                </Card>

                {/* You owe */}
                <Card className="relative overflow-hidden border border-rose-100 bg-gradient-to-br from-rose-50 via-white to-amber-50 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-100">
                  <div className="pointer-events-none absolute -left-12 -bottom-12 h-32 w-32 rounded-full bg-rose-100 blur-3xl" />
                  <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                    <div className="space-y-1">
                      <CardTitle className="text-xs font-medium text-slate-600">
                        You owe
                      </CardTitle>
                      <p className="text-[11px] text-slate-400">
                        Things you still need to settle
                      </p>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-50 border border-rose-100">
                      <ArrowUpCircle className="h-4 w-4 text-rose-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    {balances?.oweDetails?.youOwe?.length > 0 ? (
                      <>
                        <div className="text-3xl font-semibold text-rose-500">
                          ${balances?.youOwe.toFixed(2)}
                        </div>
                        <p className="mt-2 text-xs text-slate-500">
                          To{" "}
                          <span className="font-semibold">
                            {balances?.oweDetails?.youOwe?.length || 0}
                          </span>{" "}
                          {balances?.oweDetails?.youOwe?.length === 1
                            ? "person"
                            : "people"}
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="text-3xl font-semibold text-slate-800">
                          $0.00
                        </div>
                        <p className="mt-2 text-xs text-slate-500">
                          You don&apos;t owe anyone right now 🎉
                        </p>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Main dashboard content */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Left column */}
              <div className="space-y-6 lg:col-span-2">
                <section className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Spending Insights
                    </h2>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <CreditCard className="h-3 w-3" />
                      <span>Monthly trend</span>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-100 bg-white/80 p-1.5 shadow-inner shadow-slate-100 backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:-translate-y-[2px]">
                    <ExpenseSummary
                      monthlySpending={monthlySpending}
                      totalSpent={totalSpent}
                    />
                  </div>
                </section>
              </div>

              {/* Right column */}
              <div className="space-y-6">
                {/* Balance details */}
                <section className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      People & Balances
                    </h2>
                  </div>

                  <Card className="border border-slate-100 bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-[2px] hover:shadow-lg hover:shadow-sky-50">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base text-slate-800">
                          Balance Details
                        </CardTitle>
                        <Button
                          variant="link"
                          asChild
                          className="p-0 text-xs text-sky-500 hover:text-sky-600"
                        >
                          <Link href="/contacts">
                            View all
                            <ChevronRight className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <BalanceSummary balances={balances} />
                    </CardContent>
                  </Card>
                </section>

                {/* Groups */}
                <section className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Groups
                    </h2>
                  </div>

                  <Card className="border border-slate-100 bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-[2px] hover:shadow-lg hover:shadow-emerald-50">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base text-slate-800">
                          Your Groups
                        </CardTitle>
                        <Button
                          variant="link"
                          asChild
                          className="p-0 text-xs text-sky-500 hover:text-sky-600"
                        >
                          <Link href="/contacts">
                            View all
                            <ChevronRight className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <GroupList groups={groups} />
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        asChild
                        className="w-full gap-2 border-sky-100 bg-sky-50/60 text-sky-700 hover:bg-sky-100 hover:text-sky-800 transition-all duration-200"
                      >
                        <Link href="/contacts?createGroup=true">
                          <Users className="h-4 w-4" />
                          Create new group
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </section>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
