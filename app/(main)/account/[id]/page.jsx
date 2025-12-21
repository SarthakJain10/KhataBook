import { Suspense } from "react";
import { getAccountWithTransactions } from "@/actions/account";
import { BarLoader } from "react-spinners";
import { TransactionTable } from "../_components/transaction-table";
import { notFound } from "next/navigation";
import { AccountChart } from "../_components/account-chart";
import Link from "next/link";

export default async function AccountPage({ params }) {
  const accountData = await getAccountWithTransactions(params.id);

  if (!accountData) {
    notFound();
  }

  const { transactions, ...account } = accountData;

  return (
    <div className="space-y-8 px-5">

      <div className="rounded-2xl border bg-card p-6 md:p-8 shadow-sm">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          {/* LEFT */}
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-block px-3 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
              {account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text capitalize">
              {account.name}
            </h1>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col sm:flex-row items-center gap-5 w-full md:w-auto">

            <div className="rounded-xl border bg-muted/40 px-6 py-3 text-center sm:text-right w-full sm:w-auto">
              <p className="text-sm text-muted-foreground">Current Balance</p>
              <p className="text-3xl font-bold">
                ₹{parseFloat(account.balance).toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground">
                {account._count.transactions} Transactions
              </p>
            </div>

            <Link
              href={`/account/${account.id}/statement`}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition"
            >
              Get Statement
            </Link>

          </div>

        </div>

      </div>


      {/* Chart Section */}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <AccountChart transactions={transactions} />
      </Suspense>

      {/* Transactions Table */}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <TransactionTable transactions={transactions} />
      </Suspense>
    </div>
  );
}
