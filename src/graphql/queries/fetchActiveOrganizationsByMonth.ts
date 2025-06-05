import { gql } from "@apollo/client";

export const FETCH_ACTIVE_ORGANIZATIONS_BY_MONTH = gql`
  query fetchActiveOrganizationsByMonth(
    $_gte: timestamptz = ""
    $_lte: timestamptz = ""
  ) {
    organizations(where: { updated_at: { _gte: $_gte, _lte: $_lte } }) {
      id
      name
      wallets {
        balance
        wallet_transactions {
          amount
        }
      }
      scooters {
        ride_details {
          total_cost
        }
        id
        registration_number
      }
    }
  }
`;
