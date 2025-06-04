import React, { useMemo, useState } from "react";
import ModalStore from "@/globalStore/modalStore";
import AssignCreditsModal from "@/modules/institutions/components/AssignCreditsModal.tsx";
import Table1 from "./components/table1.tsx";
import Table2 from "./components/table2.tsx";
import { FETCH_REVENUE_BY_ORG_ID } from "@/graphql/queries/fetchRevenueByOrgId.ts";
import { useQuery } from "@apollo/client";
import { getDatesForActiveTab } from "@/utils/tabsHelper.ts";
import { calculateRevenueSum } from "@/utils/revenue.ts";
import { FETCH_ACTIVE_ORGANIZATIONS_BY_MONTH } from "@/graphql/queries/fetchActiveOrganizationsByMonth.ts";
import { FETCH_WALLET_TRANSACTIONS } from "@/graphql/queries/fetchWalletTransactions.ts";

const Revenue: React.FC = () => {
  const [activeTabRevenue, setActiveTabRevenue] = useState<
    "This Month" | "Last Month"
  >("This Month");
  const [activeTabTransactions, setActiveTabTransactions] = useState<
    "This Month" | "Last Month"
  >("This Month");
  const { openModal } = ModalStore();

  const now = new Date();
  const start = new Date(
    now.getFullYear(),
    now.getMonth(),
    1,
    0,
    0,
    0,
    0
  ).toISOString();
  const end = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  ).toISOString();

  const dateVariables = useMemo(
    () => getDatesForActiveTab(activeTabRevenue),
    [activeTabRevenue]
  );

  const transactionsDateVars = useMemo(
    () => getDatesForActiveTab(activeTabTransactions),
    [activeTabTransactions]
  );

  const {
    data: revenueData,
    loading: revenueLoading,
    error: revenueError,
  } = useQuery(FETCH_REVENUE_BY_ORG_ID, {
    variables: {
      orgId: "bbf0dda2-1c0b-4193-9ca0-0f4b45a8f8d0",
      start,
      end,
    },
  });

  const {
    data: orgData,
    loading: orgLoading,
    error: orgError,
  } = useQuery(FETCH_ACTIVE_ORGANIZATIONS_BY_MONTH, {
    variables: dateVariables,
    fetchPolicy: "network-only",
  });

  const {
    data: transactionsData,
    loading: transactionsLoading,
    error: transactionsError
  } = useQuery(FETCH_WALLET_TRANSACTIONS, {
    variables: transactionsDateVars,
    fetchPolicy: "network-only"
  });

  if (orgLoading || transactionsLoading) return <p>Loading...</p>;
  if (orgError || transactionsError) return <p>Error loading!</p>;

  return (
    <div className="flex flex-col gap-y-4">
      {/* Revenue Summary Card */}
      <div className="gap-y-4 bg-card-background w-full px-2 py-4 flex flex-col rounded-md h-40 shadow-sm justify-center items-center">
        <h2 className="font-bold text-xl leading-[100%] tracking-[0%]">
          Revenue this Month
        </h2>

        {revenueLoading ? (
          <p className="text-gray-400 text-[28px] animate-pulse">Loading...</p>
        ) : revenueError ? (
          <p className="text-red-600 font-medium text-center text-lg">
            Error loading revenue
          </p>
        ) : (
          <h1 className="font-[Plus Jakarta Sans] font-bold text-[34px] leading-[100%] tracking-[0%]">
            ₹ {calculateRevenueSum(revenueData).toFixed(2)}
          </h1>
        )}
      </div>

      {/* Action Button */}
      <div className="flex justify-end gap-x-2">
        <button
          onClick={() => openModal(AssignCreditsModal)}
          className="bg-btn-primary px-4 py-1.5 text-sm font-medium rounded-full"
        >
          Assign Credits
        </button>
      </div>

      {/* Revenue Table */}
      <div className="max-h-fit overflow-auto">
        <h2 className="font-semibold text-lg">Revenue</h2>
        <div className="flex gap-x-2 mt-2">
          {["This Month", "Last Month"].map((label) => (
            <button
              key={label}
              onClick={() =>
                setActiveTabRevenue(label as typeof activeTabRevenue)
              }
              className={`px-4 py-0.5 rounded-lg transition-colors duration-200 cursor-pointer ${
                activeTabRevenue === label
                  ? "bg-tabs-primary text-black"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="w-full mt-2">
          <Table1 data={orgData} />
        </div>
        <div className="flex w-full justify-end mt-2">
          <button className="bg-btn-primary px-4 py-1.5 text-sm font-medium rounded-full">
            Export
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="max-h-fit overflow-auto">
        <h2 className="font-semibold text-lg">Transaction History</h2>
        <div className="flex gap-x-2 mt-2">
          {["This Month", "Last Month"].map((label) => (
            <button
              key={label}
              onClick={() =>
                setActiveTabTransactions(label as typeof activeTabTransactions)
              }
              className={`px-4 py-0.5 rounded-lg transition-colors duration-200 cursor-pointer ${
                activeTabTransactions === label
                  ? "bg-tabs-primary text-black"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="w-full mt-2">
          <Table2 transactions={transactionsData.wallet_transactions}  />
        </div>
        <div className="flex w-full justify-end mt-2">
          <button className="bg-btn-primary px-4 py-1.5 text-sm font-medium rounded-full">
            Export
          </button>
        </div>
        <br />
        <br />
      </div>
    </div>
  );
};

export default Revenue;
