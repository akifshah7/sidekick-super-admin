import { gql } from "@apollo/client";

export const FETCH_ORGANIZATION_BY_ORG_ID = gql`
  query fetchOrganizationByOrgId($orgId: UUID!) {
    organizationsCollection(filter: { id: { eq: $orgId } }, first: 1) {
      edges {
        node {
          name
          id
          walletsCollection {
            edges {
              node {
                balance
              }
            }
          }
          scootersCollection {
            edges {
              node {
                registration_number
                id
                ride_detailsCollection(
                  filter: { scooter_id: { eq: $orgId } }
                  orderBy: { updated_at: DescNullsLast }
                  first: 1
                ) {
                  edges {
                    node {
                      updated_at
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
