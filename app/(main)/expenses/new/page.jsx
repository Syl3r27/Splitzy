"use client";

import { useRouter } from "next/navigation";
import { ExpenseForm } from "./components/expense-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function NewExpensePage() {
  const router = useRouter();

  return (
    <div className="min-h-[calc(100vh-4rem)] ">
      <div className="container max-w-3xl mx-auto">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <span className="inline-flex items-center rounded-full bg-emerald-100/70 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300 mb-3">
            New expense • Split smart
          </span>

          <h1 className="text-4xl md:text-5xl font-semibold gradient-title">
            Add a new expense
          </h1>
          <p className="text-muted-foreground mt-2 max-w-md">
            Record what you paid, choose who&apos;s involved, and Splitzy will
            handle the math for you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
        >
          <Card className="border-0 shadow-lg shadow-emerald-100/60 dark:shadow-emerald-500/10 rounded-2xl bg-white/80 dark:bg-slate-900/70 backdrop-blur">
            <CardContent className="pt-6">
              <Tabs defaultValue="individual" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-emerald-50/70 dark:bg-slate-800/70 rounded-full p-1">
                  <TabsTrigger
                    value="individual"
                    className="rounded-full data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-900 dark:data-[state=active]:text-emerald-300 text-xs md:text-sm"
                  >
                    Individual expense
                  </TabsTrigger>
                  <TabsTrigger
                    value="group"
                    className="rounded-full data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-900 dark:data-[state=active]:text-emerald-300 text-xs md:text-sm"
                  >
                    Group expense
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="individual" className="mt-6">
                  <ExpenseForm
                    type="individual"
                    onSuccess={(id) => router.push(`/person/${id}`)}
                  />
                </TabsContent>

                <TabsContent value="group" className="mt-6">
                  <ExpenseForm
                    type="group"
                    onSuccess={(id) => router.push(`/groups/${id}`)}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
