import Badge from "@/components/Badge";
import React from "react";

const LiveBadges: React.FC = () => {
  return (
    <div className="flex gap-x-4">
      <Badge data="XXXXXXX" badgeTitle="Revenue Today" />
      <Badge data="10" badgeTitle="Active Institutions" />
      <Badge data="15" badgeTitle="Scooter Under Maintenance" />
    </div>
  );
};

export default LiveBadges;
