import React, { useMemo } from "react";
import Table from "@/components/Table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import modalStore from "@/globalStore/modalStore";
import UserProfile from "./InstitutionProfileModal";
import { useLazyQuery } from "@apollo/client";
import { FETCH_USER_RIDES_DATA } from "@/graphql/queries/fetchUserRidesData";

type UsersData = {
  s_no: number;
  name: string;
  numberOfScooters: number;
  creditBalance: number;
  lastRequestedServicing: string;
  creditUsed: number;
};

const columnHelper = createColumnHelper<UsersData>();

// Define columns for transaction data
const transactionColumns: ColumnDef<UsersData, any>[] = [
  columnHelper.accessor("s_no", {
    header: () => (
      <div className="flex items-center">
        S.No.
        {/* Add sorting icons if needed */}
      </div>
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("numberOfScooters", {
    header: "Number of Scooters",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("creditBalance", {
    header: "Credit balance",
    cell: (info) => info.getValue(),
  }),
  
  columnHelper.accessor("lastRequestedServicing", {
    header: "Last Requested Servicing",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("creditUsed", {
    header: "Credits Used",
    cell: (info) => info.getValue(),
  }),
];

// Generate sample transaction data
interface UserTableProps {
  users: UsersData[];
}

const TransactionTable: React.FC<UserTableProps> = ({ users }) => {
  const { openModal } = modalStore();
  const usersData = useMemo<UsersData[]>(() => {
    if (!users) return [];

    return users.map((item: any, index: number) => {
      const user = item.user;
      const rides = user?.rides || [];
      const latestRideStep = rides[0]?.ride_steps?.[0]?.updated_at;

      return {
        s_no: index + 1,
        name:
          user.full_name ||
          `${user.first_name ?? ""} ${user.middle_name ?? ""} ${
            user.last_name ?? ""
          }`.trim(),
        employee_id: item.employee_id,
        total_minutes: 0,
        last_ride_ended: latestRideStep
          ? new Date(latestRideStep).toLocaleString()
          : "—",
        credits_spent: 0,
        current_balance: user.wallet?.balance ?? 0,
        user_id: user.id,
      };
    });
  }, [users]);

  const [fetchUserRidesData] = useLazyQuery(FETCH_USER_RIDES_DATA, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      openModal(() => <UserProfile data={data} />);
    },
    onError: (err) => {
      console.error("Error fetching user ride data:", err);
    },
  });

  const handleRowClick = (rowData: UsersData) => {
    if (rowData.user_id) {
      fetchUserRidesData({ variables: { userId: rowData.user_id } });
    }
  };

  return (
    <Table<UsersData>
      data={usersData}
      columns={transactionColumns}
      pageSize={10}
      onRowClick={handleRowClick}
    />
  );
};

export default TransactionTable;
