import React from "react";
import RideTable from "./components/RidesTable";
import { useQuery } from "@apollo/client";
import { FETCH_RIDES } from "@/graphql/queries/fetchRides";
import { FETCH_ACTIVE_ORGANIZATIONS } from "@/graphql/queries/fetchActiveOrganizations";
import OrganizationTable from "./components/OrganizationTable";

const HomePage: React.FC = () => {
  const {
    data: orgData,
    loading: orgLoading,
    error: orgError,
  } = useQuery(FETCH_ACTIVE_ORGANIZATIONS);

  const {
    data: ridesData,
    loading: ridesLoading,
    error: ridesError,
  } = useQuery(FETCH_RIDES);

  if (orgLoading || ridesLoading) return <p>Loading...</p>;
  if (orgError || ridesError) return <p>Error loading!</p>;

  return (
    <div className="flex flex-col pt-4 gap-y-4">
      <div className="flex flex-1 justify-center gap-x-4">
        <div className="w-1/2">
          <RideTable rides={ridesData?.ride_details || []} />
        </div>
        <div className="w-1/2">
          <OrganizationTable organizations={orgData?.organizations || []} />
        </div>
      </div>
      <div className="flex justify-between items-center w-full mt-4">
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

export default HomePage;
