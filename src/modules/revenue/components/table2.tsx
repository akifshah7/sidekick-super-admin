
import React from "react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table"; // Adjust the path if necessary

// Define the type for the user data
type UsersData = {
  sno: number;
  date: string;
  institution: string;
  transactionID: number;
    creditsAdded: number;
    updatedWalletBalance: number;
    amount: number;

};

// Create hardcoded user data
const data: UsersData[] = [
    { sno: 1, date: "2023-10-01", institution: "U001", transactionID: 1001, creditsAdded: 10, updatedWalletBalance: 1010, amount: 100 },
    { sno: 2, date: "2023-10-02", institution: "U002", transactionID: 1002, creditsAdded: 20, updatedWalletBalance: 1020, amount: 200 },
        { sno: 3, date: "2023-10-03", institution: "U003", transactionID: 1003, creditsAdded: 30, updatedWalletBalance: 1030, amount: 300 },
        { sno: 4, date: "2023-10-04", institution: "U004", transactionID: 1004, creditsAdded: 40, updatedWalletBalance: 1040, amount: 400 },
        { sno: 5, date: "2023-10-05", institution: "U005", transactionID: 1005, creditsAdded: 50, updatedWalletBalance: 1050, amount: 500 },
        { sno: 6, date: "2023-10-06", institution: "U006", transactionID: 1006, creditsAdded: 60, updatedWalletBalance: 1060, amount: 600 },
        { sno: 7, date: "2023-10-07", institution: "U007", transactionID: 1007, creditsAdded: 70, updatedWalletBalance: 1070, amount: 700 },
        { sno: 8, date: "2023-10-08", institution: "U008", transactionID: 1008, creditsAdded: 80, updatedWalletBalance: 1080, amount: 800 },
        { sno: 9, date: "2023-10-09", institution: "U009", transactionID: 1009, creditsAdded: 90, updatedWalletBalance: 1090, amount:900 },
        { sno:10 , date:"2023-10-10" , institution:"U010" , transactionID :1010 , creditsAdded :100 , updatedWalletBalance :1100 , amount :1000},
 
];

const UsersTable: React.FC = () => {
  const columnHelper = createColumnHelper<UsersData>();

  const columns: ColumnDef<UsersData, any>[] = [
    columnHelper.accessor("sno", {
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
    columnHelper.accessor("transactionID", { 
      header: "Transaction ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("creditsAdded", {
      header: "Credits Added",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("updatedWalletBalance", {
      header: "Updated Wallet Balance",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("amount", {
      header: "Amount",
      cell: (info) => info.getValue(),
    }),
    // columnHelper.display({
    //   id: "select",
    //   header: () => (
    //     <div className="flex items-center justify-center">
    //       <p>Select</p>
    //     </div>
    //   ),

    //   cell: () => (
    //     <div className="flex items-center justify-center">
    //       <label className="flex items-center cursor-pointer">
    //         <input
    //           type="checkbox"
    //           className="w-4 h-4 text-blue-600 border-gray-300 rounded"
    //         />
    //       </label>
    //     </div>
    //   ),
    // }),
  ];

  return <Table<UsersData> data={data} columns={columns} />;
// Set the default page size to 10
// return <Table<UsersData> data={data} columns={columns} pageSize={10} />;
};

export default UsersTable;