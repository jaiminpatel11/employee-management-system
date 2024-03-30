const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    age: Int!
    dateOfJoining: String!
    title: String!
    department: String!
    employeeType: String!
    currentStatus: Boolean!
  }

  input UserFilterInput  {
    searchTerm: String
    department: String
    employeeType: String
  }

  type Query {
    users(filter: UserFilterInput): [User!]!
    userById(id:ID!): User!
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, age: Int!, dateOfJoining: String!, title: String!, department: String!, employeeType: String!): User!
    updateEmployee(id: ID!, title: String, department: String, currentStatus: Boolean): User  
    deleteEmployee(id: ID!): Boolean
  }
`;

module.exports = typeDefs;
