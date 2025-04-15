import { gql } from "@apollo/client";

export const FETCH_ACTIVE_ORGANIZATIONS = gql`
  query fetchActiveOrganizations {
    organizations {
      name
      wallet {
        balance
      }
    }
  }
`;
