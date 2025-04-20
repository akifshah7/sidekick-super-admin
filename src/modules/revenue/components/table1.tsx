
import React from "react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table"; // Adjust the path if necessary

// Define the type for the user data
type UsersData = {
  sno: number;
  institution: string;
  numberOfScooters: number;
  currentWalletBalance: number;
    totalRevenue: number;

};

// Create hardcoded user data
const data: UsersData[] = [
  { sno: 1, institution: "U001", numberOfScooters: 10, currentWalletBalance: 1000, totalRevenue: 5000 },
  { sno: 2, institution: "U002", numberOfScooters: 20, currentWalletBalance: 2000, totalRevenue: 10000 },
    { sno: 3, institution: "U003", numberOfScooters: 30, currentWalletBalance: 3000, totalRevenue: 15000 },
    { sno: 4, institution: "U004", numberOfScooters: 40, currentWalletBalance: 4000, totalRevenue: 20000 },
    { sno: 5, institution: "U005", numberOfScooters: 50, currentWalletBalance: 5000, totalRevenue: 25000 },
    { sno: 6, institution: "U006", numberOfScooters: 60, currentWalletBalance: 6000, totalRevenue: 30000 },
    { sno: 7, institution: "U007", numberOfScooters: 70, currentWalletBalance: 7000, totalRevenue: 35000 },
    { sno: 8, institution: "U008", numberOfScooters: 80, currentWalletBalance: 8000, totalRevenue: 40000 },
    { sno: 9, institution: "U009", numberOfScooters: 90, currentWalletBalance: 9000, totalRevenue: 45000 },
    { sno: 10, institution: "U010", numberOfScooters: 100, currentWalletBalance: 10000, totalRevenue: 50000 },
];

const UsersTable: React.FC = () => {
  const columnHelper = createColumnHelper<UsersData>();

  const columns: ColumnDef<UsersData, any>[] = [
    columnHelper.accessor("sno", {
      header: "S.No",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("institution", {
      header: "Institution",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("numberOfScooters", {
      header: "Number of Scooters",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("currentWalletBalance", { 
      header: "Current Wallet Balance",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("totalRevenue", {
      header: "Total Revenue",
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