import { gql } from "@apollo/client";

export const FETCH_ACTIVE_ORGANIZATIONS = gql`
  query fetchActiveOrganizations {
    organizationsCollection(first: 50) {
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
              }
            }
          }
        }
      }
    }
  }
`;
