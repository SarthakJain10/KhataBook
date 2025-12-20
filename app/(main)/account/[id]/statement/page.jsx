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


  return (
    <div className="space-y-8 px-5">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-6">
        
            <div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight
                bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
                text-transparent bg-clip-text capitalize">
                Statement - {account.name}
                </h1>

                <p className="text-muted-foreground capitalize">
                {account.type.toLowerCase()} account statement
                </p>
            </div>

            <div className="text-right">
                <div className="text-2xl font-bold">
                ₹{parseFloat(account.balance).toFixed(2)}
                </div>

                <p className="text-sm text-muted-foreground">
                {account._count.transactions} Transactions
                </p>
            </div>
        </div>

        {/* Filter + Transactions Table */}
        <Suspense
            fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
        >
            <StatementForm transactions={transactions} />
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
