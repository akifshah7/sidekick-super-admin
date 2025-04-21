import { gql } from "@apollo/client";

export const UPDATE_ORG_BALANCE = gql(`
    mutation updateOrgBalance($balance: numeric = "", $_in: [uuid!] = "") {
    update_wallets(where: {org_id: {_in: $_in}}, _inc: {balance: $balance}) {
        returning {
        id
        balance
        }
    }
    }
`);
