import { gql } from "@apollo/client";

export const FETCH_REVENUE_BY_ORG_ID = gql`
  query fetchRevenueByOrgId(
    $orgId: uuid!
    $start: timestamp!
    $end: timestamp!
  ) {
    organizations(where: { id: { _eq: $orgId } }) {
      scooters(where: { rides: { created_at: { _gte: $start, _lte: $end } } }) {
        rides {
          total_cost
        }
      }
    }
  }
`;
