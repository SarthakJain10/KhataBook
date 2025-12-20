"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export default function StatementForm({ transactions, accountBalance }) {
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [quickRange, setQuickRange] = useState("");
  const [amountRange, setAmountRange] = useState({ min: "", max: "" });
  const [typeFilter, setTypeFilter] = useState("all");
  const [showTable, setShowTable] = useState(false);

  const applyQuickRange = (range) => {
    setQuickRange(range);

    const now = new Date();
    let startDate = new Date();

    if (range === "last_week") startDate.setDate(now.getDate() - 7);
    else if (range === "last_month") startDate.setMonth(now.getMonth() - 1);
    else if (range === "last_year") startDate.setFullYear(now.getFullYear() - 1);
    else return;

    setDateRange({
      start: startDate.toISOString().split("T")[0],
      end: now.toISOString().split("T")[0],
    });
  };

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    // Date Filter
    if (dateRange.start && dateRange.end) {
      const start = new Date(dateRange.start);
      start.setHours(0, 0, 0, 0);
      const end = new Date(dateRange.end);
      end.setHours(23, 59, 59, 999);

      result = result.filter((t) => {
        const tDate = new Date(t.date);
        return tDate >= start && tDate <= end;
      });
    }

    // Amount Filter
    if (amountRange.min !== "" || amountRange.max !== "") {
      result = result.filter((t) => {
        const amount = Number(t.amount);
        if (amountRange.min && amount < amountRange.min) return false;
        if (amountRange.max && amount > amountRange.max) return false;
        return true;
      });
    }

    // Type Filter
    if (typeFilter !== "all") {
    const typeMap = {
        credit: "INCOME",
        debit: "EXPENSE",
    };

    result = result.filter((t) => t.type === typeMap[typeFilter]);
    }

    return result;
  }, [transactions, dateRange, amountRange, typeFilter]);

  // RESET Functionality 
  const clearFilters = () => {
    setDateRange({ start: "", end: "" });
    setQuickRange("");
    setAmountRange({ min: "", max: "" });
    setTypeFilter("all");
    setShowTable(false);
  };

  // Calculating Balance 
  const allSortedDesc = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  let running = accountBalance;  
  const balanceMap = {};

  allSortedDesc.forEach((t) => {
    const amount = Number(t.amount);

    const afterBalance = running;

    balanceMap[t.id] = {
      crdr: t.type === "EXPENSE" ? "DR" : "CR",
      balance: afterBalance,
    };

    if (t.type === "EXPENSE") {
      running = afterBalance + amount;
    } else {
      running = afterBalance - amount;
    }
  });



  // For PDF  
  const exportPDF = () => {
    const doc = new jsPDF();

    const sorted = [...filteredTransactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    const tableRows = sorted.map((t) => [
      new Date(t.date).toLocaleDateString(),
      t.description,
      balanceMap[t.id].crdr,
      t.type === "EXPENSE"
        ? `-${Number(t.amount).toFixed(2)}`
        : `+${Number(t.amount).toFixed(2)}`,
      balanceMap[t.id].balance.toFixed(2),
    ]);


    autoTable(doc, {
      startY: 20,
      head: [["Date", "Description", "CR/DR", "Amount", "Balance"]],
      body: tableRows,
      theme: "grid",
      headStyles: {
        fillColor: [63, 81, 181],
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      styles: { cellPadding: 3, fontSize: 10 },
    });

    doc.save("statement.pdf");
  };

  // For Excel 
  const exportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Statement");

    worksheet.columns = [
      { header: "Date", key: "date", width: 15 },
      { header: "Description", key: "description", width: 30 },
      { header: "CR/DR", key: "crdr", width: 10 },
      { header: "Amount", key: "amount", width: 15 },
      { header: "Balance", key: "balance", width: 18 },
    ];

    const sorted = [...filteredTransactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    sorted.forEach((t) => {
      const amount = Number(t.amount);

      worksheet.addRow({
        date: new Date(t.date).toLocaleDateString(),
        description: t.description,
        crdr: balanceMap[t.id].crdr,
        amount: t.type === "EXPENSE" ? -amount : amount,
        balance: balanceMap[t.id].balance,
      });
    });

    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).alignment = { horizontal: "center" };

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "statement.xlsx");
  };

  return (
    <div className="space-y-6">
      {/* FILTER CARD */}
      <div className="p-6 border rounded-2xl shadow-md bg-white space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Filters</h2>
          {(dateRange.start ||
            dateRange.end ||
            amountRange.min ||
            amountRange.max ||
            quickRange ||
            typeFilter !== "all") && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="text-sm underline text-gray-600 hover:text-black"
            >
              Reset
            </Button>
          )}
        </div>

        {/* Date Range */}
        <div className="space-y-2">
            <p className="font-medium text-sm">Select Date Range</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

                <Input
                type="date"
                value={dateRange.start}
                onChange={(e) =>
                    setDateRange((p) => ({ ...p, start: e.target.value }))
                }
                className="rounded-xl focus:ring-2 focus:ring-purple-500"
                />

                <Input
                type="date"
                value={dateRange.end}
                onChange={(e) =>
                    setDateRange((p) => ({ ...p, end: e.target.value }))
                }
                className="rounded-xl focus:ring-2 focus:ring-purple-500"
                />

                {/* Quick Range Buttons */}
                <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-wrap gap-2">

                <Button
                    variant={quickRange === "last_week" ? "default" : "outline"}
                    onClick={() => applyQuickRange("last_week")}
                    className="rounded-xl flex-1 min-w-[110px]"
                >
                    Last Week
                </Button>

                <Button
                    variant={quickRange === "last_month" ? "default" : "outline"}
                    onClick={() => applyQuickRange("last_month")}
                    className="rounded-xl flex-1 min-w-[110px]"
                >
                    Last Month
                </Button>

                <Button
                    variant={quickRange === "last_year" ? "default" : "outline"}
                    onClick={() => applyQuickRange("last_year")}
                    className="rounded-xl flex-1 min-w-[110px]"
                >
                    Last Year
                </Button>
                </div>
            </div>
        </div>


        {/* Amount Range */}
        <div className="space-y-2">
          <p className="font-medium text-sm">Transaction Amount Range</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              type="number"
              placeholder="Min Amount"
              value={amountRange.min}
              onChange={(e) =>
                setAmountRange((p) => ({ ...p, min: e.target.value }))
              }
              className="rounded-xl focus:ring-2 focus:ring-purple-500"
            />

            <Input
              type="number"
              placeholder="Max Amount"
              value={amountRange.max}
              onChange={(e) =>
                setAmountRange((p) => ({ ...p, max: e.target.value }))
              }
              className="rounded-xl focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Type */}
        <div className="space-y-2">
          <p className="font-medium text-sm">Transaction Type</p>

          <div className="flex gap-3">
            {["all", "credit", "debit"].map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-4 py-2 rounded-xl border transition ${
                  typeFilter === type
                    ? "bg-purple-600 text-white border-purple-600"
                    : "hover:bg-gray-100"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-end">
          <button
            onClick={() => setShowTable(true)}
            className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 shadow-sm"
          >
            View Transactions →
          </button>
        </div>
      </div>

      {/* RESULTS SECTION */}
      {showTable && (
        <div className="border rounded-2xl overflow-hidden shadow-sm bg-white">
            {filteredTransactions.length > 0 && (
                <div
                className="
                    flex flex-col gap-3
                    px-5 py-4 border-b bg-gray-50
                    sm:flex-row sm:items-center sm:justify-between
                "
                >
                    <h3 className="text-lg font-semibold">
                        Filtered Statement
                    </h3>

                    <div className="flex flex-wrap gap-2 sm:justify-end">
                        <Button
                            variant="outline"
                            className="rounded-xl w-full sm:w-auto"
                            onClick={exportPDF}
                        >
                            Download PDF
                        </Button>

                        <Button
                            variant="outline"
                            className="rounded-xl w-full sm:w-auto"
                            onClick={exportExcel}
                        >
                            Download Excel
                        </Button>
                    </div>
                </div>
            )}


          {filteredTransactions.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No transactions found for selected filters 😕
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-right">Amount</th>
                </tr>
              </thead>

              <tbody>
                {filteredTransactions.map((t) => (
                  <tr key={t.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">
                      {new Date(t.date).toLocaleDateString()}
                    </td>

                    <td className="p-3">{t.description}</td>

                    <td
                      className={`p-3 text-right font-medium ${
                        t.type === "EXPENSE"
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    >
                      {t.type === "EXPENSE" ? "-" : "+"}₹{t.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
