// UsersTable.tsx
import React from "react";
import Table from "@/components/Table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

type Data = {
  name: string;
  org_id: string;
  number_of_scooters: number;
  balance: number;
};

interface TableProps {
  users: Data[];
  selectedUserIds: string[];
  toggleSelection: (userId: string) => void;
}

const UsersTable: React.FC<TableProps> = ({ users, selectedUserIds, toggleSelection }) => {
  const columnHelper = createColumnHelper<Data>();

  // Define columns for user data. We use a "display" column for checkboxes.
  const columns: ColumnDef<Data, any>[] = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("number_of_scooters", {
      header: "Number of Scooters",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("balance", {
        header: "Credit Balance",
        cell: (info) => info.getValue(),
      }),
    columnHelper.display({
      id: "select",
      header: () => (
        <div className="flex items-center justify-center">
          <p>Select</p>
        </div>
      ),
      cell: (info) => {
        const userId = info.row.original.org_id;
        const isChecked = selectedUserIds.includes(userId);
        return (
          <div className="flex items-center justify-center">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                checked={isChecked}
                onChange={() => toggleSelection(userId)}
              />
            </label>
          </div>
        );
      },
    }),
  ];

  return <Table<Data> data={users} columns={columns} />;
};

export default UsersTable;
