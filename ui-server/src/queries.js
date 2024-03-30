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
export const DELETE_EMPLOYEE = gql`
  mutation deleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;


// Query to fetch a single employee by ID
export const GET_EMPLOYEE_BY_ID = gql`
  query user($id: ID!) {
    user(id: $id) {
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