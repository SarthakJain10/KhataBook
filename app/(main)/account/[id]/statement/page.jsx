import { getAccountWithTransactions } from "@/actions/account";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import StatementForm from "../../_components/statement-filter";
import { BarLoader } from "react-spinners";


export default async function StatementPage({ params }) {
  const accountId = params.id;
  const accountData = await getAccountWithTransactions(accountId);

  if (!accountData) notFound();

  const { transactions, ...account } = accountData;

  const accountBalance = account.balance;


  return (
    <div className="space-y-8 px-5">

        {/* Header */}
        <div className="rounded-2xl border bg-card p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            {/* LEFT */}
            <div className="space-y-2 text-center md:text-left">
                <h1
                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight
                bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
                text-transparent bg-clip-text capitalize"
                >
                Statement — {account.name}
                </h1>

                <p className="text-sm text-muted-foreground capitalize">
                {account.type.toLowerCase()} account statement
                </p>
            </div>

            {/* RIGHT */}
            <div className="rounded-xl border bg-muted/40 px-6 py-3 text-center md:text-right">
                <p className="text-sm text-muted-foreground">Current Balance</p>

                <div className="text-2xl sm:text-3xl font-bold">
                ₹{parseFloat(account.balance).toFixed(2)}
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground">
                {account._count.transactions} Transactions
                </p>
            </div>

        </div>


        {/* Filter + Transactions Table */}
        <Suspense
            fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
        >
            <StatementForm 
                transactions={transactions} 
                accountBalance={accountBalance}  
            />
        </Suspense>

        <Link
            href={`/account/${account.id}`}
            className="inline-block px-4 py-2 rounded-xl border hover:bg-muted"
        >
            ← Back to Account
        </Link>

    </div>
  );
}
