import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import React from "react";
import Table from "@/components/Table";
import { useLazyQuery } from "@apollo/client";
import { FETCH_ORGANIZATION_BY_ORG_ID } from "@/graphql/queries/fetchOrganizationByOrgId";
import modalStore from "@/globalStore/modalStore";
import InstitutionProfileModal from "./InstitutionProfileModal";

type Data = {
  s_no: number;
  name: string;
  number_of_scooters: number | string;
  credit_balance: number;
  last_requested_servicing: string;
  credits_used: number | string;
  org_id: string;
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
  const { openModal } = modalStore();

  const activeInstitutions: Data[] = institutions.map((inst, index) => ({
    s_no: index + 1,
    name: inst.node.name,
    number_of_scooters: "NA",
    credit_balance: inst.wallet?.balance ?? "NA",
    last_requested_servicing: "NA",
    credits_used: "NA",
    org_id: inst.id,
  }));

  const [fetchOrganizationByOrgId] = useLazyQuery(FETCH_ORGANIZATION_BY_ORG_ID, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      openModal(() => <InstitutionProfileModal data={data} />);
    },
    onError: (err) => {
      console.error("Error fetching organization data:", err);
    },
  });

  const handleRowClick = (rowData: Data) => {
    if (rowData.org_id) {
      fetchOrganizationByOrgId({ variables: { orgId: rowData.org_id } });
    }
  };

  return (
    <Table<Data>
      data={activeInstitutions}
      columns={institutionColumns}
      onRowClick={handleRowClick}
    />
  );
};

export default ActiveInstitutionsTable;
