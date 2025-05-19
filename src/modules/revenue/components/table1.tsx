import React from "react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Table from "@/components/Table"; // Adjust the path if necessary
import { calculateRevenueSum } from "@/utils/revenue";

// Define the type for the user data
type Data = {
  s_no: number;
  institution: string;
  number_of_scooters: number;
  current_balance: number;
  total_revenue: number;
};

const columnHelper = createColumnHelper<Data>();

const columns: ColumnDef<Data, any>[] = [
  columnHelper.accessor("s_no", {
    header: "S.No",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("institution", {
    header: "Institution",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("number_of_scooters", {
    header: "Number of Scooters",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("current_balance", {
    header: "Current Wallet Balance",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("total_revenue", {
    header: "Total Revenue",
    cell: (info) => info.getValue(),
  }),
];

interface Props {
  data: any;
}

const RevenueTable: React.FC<Props> = ({ data }) => {
  console.log(data);
  const revenueData: Data[] = data?.map((org: any, index: number) => ({
    s_no: index + 1,
    institution: org.node.name,
    number_of_scooters: org.scooters?.length ?? "-",
    current_balance: org.wallet?.balance ?? "-",
    total_revenue: calculateRevenueSum(data)
  }));

  return <Table<Data> data={revenueData} columns={columns} pageSize={10} />;
};

export default RevenueTable;
