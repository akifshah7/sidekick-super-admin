import { gql } from "@apollo/client";
// @todo: need to fix this

export const FETCH_REVENUE_BY_ORG_ID = gql`
  query fetchRevenueByOrgId($orgId: UUID!, $start: Datetime!, $end: Datetime!) {
    revenue_by_orgCollection(
      filter: {
        organization_id: { eq: $orgId }
        created_at: { gte: $start, lte: $end }
      }
    ) {
      edges {
        node {
          total_cost
        }
      }
    }
  }
`;
