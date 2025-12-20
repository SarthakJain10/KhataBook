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
      <div className="flex items-center justify-between flex-wrap gap-6">
        
        {/* LEFT - Account Title */}
        <div>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight
            bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
            text-transparent bg-clip-text capitalize"
          >
            {account.name}
          </h1>

          <p className="text-muted-foreground">
            {account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account
          </p>
        </div>

        {/* RIGHT - Balance + Button */}
        <div className="flex items-center gap-6">

          <Link 
            href={`/account/${account.id}/statement`} 
            className="px-5 py-2.5 rounded-xl bg-purple-600 text-white 
            hover:bg-purple-700 transition font-medium shadow-md"
          >
            Get Statement
          </Link>

          <div className="text-right">
            <div className="text-2xl sm:text-3xl font-bold">
              ₹{parseFloat(account.balance).toFixed(2)}
            </div>
            <p className="text-sm text-muted-foreground">
              {account._count.transactions} Transactions
            </p>
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
