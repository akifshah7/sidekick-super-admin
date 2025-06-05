import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import Table from "./removeInstitutionTable.tsx";
import { FETCH_ACTIVE_ORGANIZATIONS } from "@/graphql/queries/fetchActiveOrganizations.ts";
import { REMOVE_INSTITUTIONS } from "@/graphql/mutations/removeInstitutions.ts";

const RemoveInstitutionModal: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [fetchActiveOrganizations, { data, loading, error, refetch }] = useLazyQuery(
    FETCH_ACTIVE_ORGANIZATIONS,
    {
      fetchPolicy: "network-only",
    }
  );

  const [removeInstitutions, { loading: removing }] = useMutation(REMOVE_INSTITUTIONS);

  useEffect(() => {
    fetchActiveOrganizations();
  }, [fetchActiveOrganizations]);

  const institutionsData = data?.organizations?.map((org: any) => ({
    name: org.name,
    org_id: org.id,
    number_of_scooters: org.scooters?.length
  }));

  const toggleSelection = (orgId: string) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(orgId)
        ? prevSelected.filter((id) => id !== orgId)
        : [...prevSelected, orgId]
    );
  };

  const handleRemove = async () => {
    try {
      await Promise.all(
        selectedIds.map((org_id) =>
          removeInstitutions({
            variables: {
              org_id,
            },
          })
        )
      );
      // Refetch users after removal
      await refetch();
      setSelectedIds([]);
    } catch (err) {
      console.error("Error removing users:", err);
    }
  };

  return (
    <div className="text-center items-center flex flex-col rounded-xl gap-6 mt-4">
      <div className=" gap-1 flex flex-col items-centre">
        <h1 className=" font-jakarta font-bold  leading-[100%] tracking-[0%] text-center text-xl">
          Remove Institutions
        </h1>
        <p className="font-jakarta font-normal text-base leading-[100%] tracking-[0%] text-center text-[#86A0CA] ">
        Please select the institutions that are to be removed.
        </p>
      </div>

      {/* Search and Select All */}
      <div className="w-full gap-x-2 flex items-center">
        <div className=" w-full rounded-xl border border-solid gap-3 p-2 flex items-center border-[#296AEB] px-2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search Users"
            className="w-full  outline-none bg-transparent text-black placeholder:text-gray-400"
          />
        </div>

        <button className="rounded-lg text-sm px-4 py-1 bg-[#296AEB] font-bold text-white">
          Select All
        </button>
      </div>

      {/* Table area */}
      <div className="w-full h-full rounded-xl gap-5">
        {!loading && !error && institutionsData && (
          <Table
            selectedInstitutionIds={selectedIds}
            toggleSelection={toggleSelection}
            institutions={institutionsData}
          />
        )}
      </div>

      {/* Remove Button */}
      <div className=" gap-2.5 flex justify-center">
        <button
          disabled={removing || selectedIds.length === 0}
          onClick={handleRemove}
          className={`w-[104px] h-[44px] rounded-[90px] gap-[12px] px-[20px] py-[12px] text-[16px] leading-[100%] font-semibold tracking-[0] font-[Plus_Jakarta_Sans] text-white ${
            removing || selectedIds.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#F84848] hover:bg-[#dc3c3c]"
          }`}
        >
          {removing ? "Removing..." : "Remove"}
        </button>
      </div>
    </div>
  );
};

export default RemoveInstitutionModal;
