import React from "react";
import Table from "@/components/Table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

export type RemoveInstitutionsData = {
  name: string;
  number_of_scooters: number;
  org_id: string;
};

interface RemoveInstitutionsTableProps {
  institutions: RemoveInstitutionsData[];
  selectedInstitutionIds: string[];
  toggleSelection: (institutionId: string) => void;
}

const RemoveInstitutionsTable: React.FC<RemoveInstitutionsTableProps> = ({
  institutions,
  selectedInstitutionIds,
  toggleSelection,
}) => {
  const columnHelper = createColumnHelper<RemoveInstitutionsData>();

  const columns: ColumnDef<RemoveInstitutionsData, any>[] = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("number_of_scooters", {
      header: "Number of Scooters",
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
        const institutionId = info.row.original.org_id;
        const isChecked = selectedInstitutionIds.includes(institutionId);
        return (
          <div className="flex items-center justify-center">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                checked={isChecked}
                onChange={() => toggleSelection(institutionId)}
              />
            </label>
          </div>
        );
      },
    }),
  ];

  return <Table<RemoveInstitutionsData> data={institutions} columns={columns} />;
};

export default RemoveInstitutionsTable;