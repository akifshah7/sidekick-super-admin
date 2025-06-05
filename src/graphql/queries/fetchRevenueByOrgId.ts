import { gql } from "@apollo/client";

export const FETCH_REVENUE_BY_ORG_ID = gql`
  query fetchRevenue(
    $start: timestamptz!
    $end: timestamptz!
    $orgId: uuid = ""
  ) {
    organizations(where: { id: { _eq: $orgId } }) {
      scooters(
        where: { ride_details: { created_at: { _gte: $start, _lte: $end } } }
      ) {
        ride_details {
          total_cost
        }
      }
    }
  }
`;
