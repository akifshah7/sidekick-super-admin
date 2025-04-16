import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import React from "react";
import Table from "@/components/Table";

type Data = {
  s_no: number;
  name: string;
  number_of_scooters: number;
  credit_balance: number;
  last_requested_servicing: string;
  credits_used: number;
};

const columnHelper = createColumnHelper<Data>();

const institutionColumns: ColumnDef<Data, any>[] = [
  columnHelper.accessor("s_no", {
    header: () => <div className="flex items-center">S.No.</div>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("number_of_scooters", {
    header: "Number of Scooters",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("credit_balance", {
    header: "Credit Balance",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("last_requested_servicing", {
    header: "Last Requested Servicing",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("credits_used", {
    header: "Credit Used",
    cell: (info) => info.getValue(),
  }),
];

interface Props {
  institutions: any[];
}
const ActiveInstitutionsTable: React.FC<Props> = ({ institutions }) => {
  return (
    <Table<Data>
      data={institutions}
      columns={institutionColumns}
    />
  );
};

export default ActiveInstitutionsTable;
