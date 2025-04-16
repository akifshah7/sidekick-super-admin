import React from "react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table"; // Adjust the path if necessary

// Define the type for the user data
type UsersData = {
  name: string;
  user_id: string;
};

// Create hardcoded user data
const data: UsersData[] = [
  { name: "Alice Smith", user_id: "U001" },
  { name: "Bob Johnson", user_id: "U002" },
  { name: "Charlie Brown", user_id: "U003" },
];

const UsersTable: React.FC = () => {
  const columnHelper = createColumnHelper<UsersData>();

  const columns: ColumnDef<UsersData, any>[] = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("user_id", {
      header: "User ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: "select",
      header: () => (
        <div className="flex items-center justify-center">
          <p>Select</p>
        </div>
      ),
      cell: () => (
        <div className="flex items-center justify-center">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded"
            />
          </label>
        </div>
      ),
    }),
  ];

  return <Table<UsersData> data={data} columns={columns} />;
};

export default UsersTable;
