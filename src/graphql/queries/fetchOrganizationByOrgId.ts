import { gql } from "@apollo/client";

export const FETCH_ORGANIZATION_BY_ORG_ID = gql`
  query fetchOrganizationByOrgId($orgId: uuid = "") {
    organizations(where: { id: { _eq: $orgId } }) {
      name
      id
      wallets {
        balance
      }
      scooters {
        registration_number
        id
        ride_details(order_by: { updated_at: desc }, limit: 1) {
          updated_at
        }
      }
    }
  }
`;
