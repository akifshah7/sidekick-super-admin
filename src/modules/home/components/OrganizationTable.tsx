import React from "react";
import Table from "@/components/Table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

// Define the organization data structure
export type OrganizationData = {
  s_no: number;
  institution: string;
  balance: number;
};

const columnHelper = createColumnHelper<OrganizationData>();

const organizationColumns: ColumnDef<OrganizationData, any>[] = [
  columnHelper.accessor("s_no", {
    header: () => <div className="flex items-center">S.No.</div>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("institution", {
    header: "Institution",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("balance", {
    header: "Current Balance",
    cell: (info) => info.getValue(),
  }),
];

interface OrganizationTableProps {
  organizations: any[];
}

const OrganizationTable: React.FC<OrganizationTableProps> = ({ organizations }) => {
  const organizationData: OrganizationData[] = organizations.map((ride, index) => ({
    s_no: index + 1,
    institution: ride.name,
    balance: ride.wallet?.balance ?? "0"
  }));
  return (
    <Table<OrganizationData>
      data={organizationData}
      columns={organizationColumns}
      title="Currently Active Institutions"
    />
  );
};

export default OrganizationTable;
