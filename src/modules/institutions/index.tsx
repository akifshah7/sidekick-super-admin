import React, { useMemo, useState } from "react";
// import Table from "./components/table.tsx";
import modalStore from "@/globalStore/modalStore.ts";
import { useQuery } from "@apollo/client";
import { FETCH_ACTIVE_ORGANIZATIONS_BY_MONTH } from "@/graphql/queries/fetchActiveOrganizationsByMonth.ts";
import { getDatesForActiveTab } from "@/utils/tabsHelper.ts";
import ActiveInstitutionsTable from "./components/ActiveInstitutionsTable.tsx";
import RemoveInstitutionModal from "./components/RemoveInstitutionModal.tsx";
// import RemoveInstitutionModal from "./components/removeInstitutionModal.tsx";

const Users: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"This Month" | "Last Month">(
    "This Month"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const dateVariables = useMemo(
    () => getDatesForActiveTab(activeTab),
    [activeTab]
  );

  const { data, error, loading } = useQuery(
    FETCH_ACTIVE_ORGANIZATIONS_BY_MONTH,
    {
      variables: dateVariables,
      fetchPolicy: "network-only",
    }
  );

  const { openModal } = modalStore();

  const baseTabStyles =
    "px-4 py-0.5 rounded-lg transition-colors duration-200 cursor-pointer";

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data!</p>;

  return (
    <div className="">
      {/* Quick Actions Section */}
      <div className="max-h-fit overflow-auto gap-5">
        <h2 className="font-semibold text-lg">Quick Actions</h2>
        <div className="mt-3 flex gap-x-2">
          <button
            className="font-bold text-sm rounded-full px-4 py-2 bg-[#18f27a]"
          >
            Add Institutions
          </button>
          <button
            onClick={() => openModal(RemoveInstitutionModal)}
            // onClick={() => openModal(AssignCredit)}
            className="font-bold text-sm rounded-full px-4 py-2 text-white bg-[#F84848]"
          >
            Remove Institutions
          </button>
          {/* <button
            onClick={() => openModal(BlockedUsersModal)}
            className="font-bold text-sm rounded-full px-4 py-2 bg-gray-200"
          >
            View Block User
          </button> */}
        </div>
      </div>

      {/* Active Users Section */}
      <div className="max-h-fit overflow-auto mt-7 mb-3">
        <h2 className="font-semibold text-lg">Active Institutions</h2>

        <div className="flex justify-between">
          {/* Month Tabs */}
          <div className="flex gap-x-2 mt-2">
            <button
              onClick={() => setActiveTab("This Month")}
              className={`${baseTabStyles} ${
                activeTab === "This Month"
                  ? "bg-tabs-primary text-black"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => setActiveTab("Last Month")}
              className={`${baseTabStyles} ${
                activeTab === "Last Month"
                  ? "bg-tabs-primary text-black"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              Last Month
            </button>
          </div>

          {/* Search Field */}
          <div className="relative ">
            <input
              type="text"
              placeholder="Search Scooter or User"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-full rounded-xl border border-[#296AEB] pl-10 pr-4 text-black
                       placeholder:text-gray-400 focus:outline-none 
                       transition-all duration-200"
            />
            {/* Search Icon (only visible when input is empty) */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#296AEB]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <ActiveInstitutionsTable institutions={data.organizations} />

      <div className="flex justify-between items-center w-full mt-6">
        <div>Click on User to view their profile.</div>

        <div>
          <button className="font-semibold rounded-full px-5 py-2 bg-[#18f27a]">
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
