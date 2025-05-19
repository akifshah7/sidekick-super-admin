import { gql } from "@apollo/client";

export const FETCH_ACTIVE_ORGANIZATIONS_BY_MONTH = gql`
  query fetchActiveOrganizationsByMonth($gte: Datetime!, $lte: Datetime!) {
    organizationsCollection(
      first: 50
      filter: { updated_at: { gte: $gte, lte: $lte } }
    ) {
      edges {
        node {
          id
          name
          walletsCollection {
            edges {
              node {
                balance
                wallet_transactionsCollection {
                  edges {
                    node {
                      amount
                    }
                  }
                }
              }
            }
          }
          scootersCollection {
            edges {
              node {
                id
                registration_number
                ride_detailsCollection {
                  edges {
                    node {
                      total_cost
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
