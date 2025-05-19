import { gql } from "@apollo/client";

export const FETCH_WALLET_TRANSACTIONS = gql`
  query fetchWalletTransactions {
    wallet_transactionsCollection(first: 50) {
      edges {
        node {
          transaction_id
          amount
          created_at
          wallets {
            balance
            organizations {
              name
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
