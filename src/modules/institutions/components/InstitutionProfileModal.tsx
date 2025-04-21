import React from "react";
import AssignedScootersTable from "./AssignedScootersTable";
import modalStore from "@/globalStore/modalStore";
import AssignCreditsModal from "./AssignCreditsModal";
import RemoveInstitutionModal from "./removeInstitutionModal";

type Props = {
  data: any;
};

// const InstitutionProfileModal: React.FC<Props> = ({ data }) => {
const InstitutionProfileModal: React.FC<Props> = ({ data }) => {
  console.log('data', data)
  const { openModal, setModalTransitionCallback, closeModal } = modalStore();

  const openAssignCreditsModal = () => {
    setModalTransitionCallback(() => openModal(() => <AssignCreditsModal />));
    closeModal();
  };

  const openRemoveInstitutionModal = () => {
    setModalTransitionCallback(() =>
      openModal(() => <RemoveInstitutionModal />)
    );
    closeModal();
  };
  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-6">
        {/* User Info */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold">
              {data.organizations[0].name}
            </h1>
            <span className="h-3 w-3 rounded-full bg-[#18F27A]" />
          </div>

          <div className="flex gap-4 text-sm">
            <span className="text-blue-600 font-semibold">Wallet Balance</span>
            <span className="text-gray-700">
              {data.organizations[0].wallet?.balance ?? "NA"}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={openRemoveInstitutionModal}
            className="bg-red-500 text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-red-600 transition"
          >
            Remove
          </button>
          <button
            onClick={openAssignCreditsModal}
            className="bg-green-400 text-sm font-medium px-5 py-2 rounded-full hover:bg-green-500 transition"
          >
            Assign Credit
          </button>
        </div>
      </div>

      {/* Recent Rides Section */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Assigned Scooters</h2>
        <AssignedScootersTable data={data.organizations[0]?.scooters} />
      </div>
    </div>
  );
};

export default InstitutionProfileModal;
