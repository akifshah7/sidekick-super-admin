import React from "react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table";

// Define the type for your transaction data
export type TransactionData = {
  s_no: number;
  date: string;
  institution: string;
  transaction_id: number;
  credits_added: number;
  updated_wallet_balance: number;
  amount: number;
};

const columnHelper = createColumnHelper<TransactionData>();

const columns: ColumnDef<TransactionData, any>[] = [
  columnHelper.accessor("s_no", {
    header: "S.No",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("date", {
    header: "Date",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("institution", {
    header: "Institution",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("transaction_id", {
    header: "Transaction ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("credits_added", {
    header: "Credits Added",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("updated_wallet_balance", {
    header: "Updated Wallet Balance",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
    cell: (info) => info.getValue(),
  }),
];

interface TransactionsTableProps {
  transactions: any[];
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions,
}) => {
  const transactionsData = transactions.map((transaction, index) => {
    const formattedDate = new Date(transaction.created_at).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }
    );

    return {
      s_no: index + 1,
      date: formattedDate,
      institution: transaction.wallet?.organization?.name,
      transaction_id: transaction?.transaction_id,
      credits_added: transaction?.amount ?? "-",
      updated_wallet_balance: transaction.wallet?.balance ?? "-",
      amount: transaction.amount ?? "-",
    };
  });

  return (
    <Table<TransactionData>
      data={transactionsData}
      columns={columns}
      pageSize={10}
    />
  );
};

export default TransactionsTable;
