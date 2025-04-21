import { gql } from "@apollo/client";

export const REMOVE_INSTITUTIONS = gql(`
  mutation removeInstitutions($org_id: [uuid!] = "") {
    delete_organizations(where: {id: {_in: $org_id}}) {
      affected_rows
      returning {
        id
      }
    }
  }
`);
