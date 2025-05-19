import { gql } from "@apollo/client";

export const FETCH_RIDES = gql(`
  query fetchRides {
    ride_detailsCollection(first: 50) {
      edges {
        node {
          scooters {
            registration_number
            status
          }
          start_time
          end_time
          users {
            full_name
          }
        }
      }
    }
  }
`);
