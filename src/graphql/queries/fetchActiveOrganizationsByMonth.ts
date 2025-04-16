import { gql } from "@apollo/client";

export const FETCH_ACTIVE_ORGANIZATIONS_BY_MONTH = gql`
  query fetchActiveOrganizationsByMonth(
    $_gte: timestamp = ""
    $_lte: timestamp = ""
  ) {
    organizations(where: { updated_at: { _gte: $_gte, _lte: $_lte } }) {
      name
      wallet {
        balance
        wallet_transactions {
          amount
        }
      }
    }
  }
`;
