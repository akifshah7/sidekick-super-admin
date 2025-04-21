import React from "react";
import Table from "@/components/Table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

type AssignedScootersData = {
  s_no: number;
  scooter_id: string;
  last_ride: string;
  battery_health: string;
  last_serviced: string;
};

const columnHelper = createColumnHelper<AssignedScootersData>();

// Define columns for assigned scooters data
const assignedScootersColumns: ColumnDef<AssignedScootersData, any>[] = [
  columnHelper.accessor("s_no", {
    header: () => <div className="flex items-center">S.No.</div>,
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("scooter_id", {
    header: "Scooter ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("last_ride", {
    header: "Last Ride",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("battery_health", {
    header: "Battery Health",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("last_serviced", {
    header: "Last Serviced",
    cell: (info) => info.getValue(),
  }),
];

interface Props {
  data: any[];
}
const AssignedScootersTable: React.FC<Props> = ({ data }) => {
  const scooters: AssignedScootersData[] = data?.map((scooter, index) => ({
    s_no: index + 1,
    scooter_id: scooter.registration_number,
    last_ride: scooter?.rides?.[0]?.updated_at
      ? new Date(scooter.rides[0].updated_at).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "N/A",
    battery_health: "XXXX",
    last_serviced: "XXXX",
  }));
  return (
    <Table<AssignedScootersData>
      data={scooters}
      columns={assignedScootersColumns}
    />
  );
};

export default AssignedScootersTable;
