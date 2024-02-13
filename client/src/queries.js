import { gql } from '@apollo/client';

export const GET_EMPLOYEES = gql`
  query users($filter: UserFilterInput) {
    users(filter: $filter) {
      _id
      firstName
      lastName
      age
      dateOfJoining
      title
      department
      employeeType
      currentStatus
    }
  }
`;
