import { gql } from "@apollo/client";

export const FETCH_WALLET_TRANSACTIONS = gql`
  query fetchWalletTransactions {
    wallet_transactions {
      transaction_id
      amount
      wallet {
        balance
        organization {
          name
        }
      }
      created_at
    }
  }
`;
