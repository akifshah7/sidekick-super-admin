import { gql } from "@apollo/client";

export const FETCH_ACTIVE_ORGANIZATIONS = gql`
  query fetchActiveOrganizations {
    organizations {
      id
      name
      wallets {
        balance
        wallet_transactions {
          amount
        }
      }
      scooters {
        id
        registration_number
      }
    }
  }
`;
