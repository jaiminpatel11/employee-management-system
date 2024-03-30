import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import EmployeeSearch from './EmployeeSearch';
import EmployeeTable from './EmployeeTable'; 
import { useLazyQuery, useMutation, gql } from '@apollo/client';
import { GET_EMPLOYEES } from '../queries';

const StyledContainer = styled.div`
  padding: 20px;
`;

const StyledHeaderText = styled.h4`
  color: white;
  font-size: 18px;
  margin-bottom: 10px;
`;

const StyledButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #01D676;
  color: #fff;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 20px;
  cursor: pointer;

  &:hover {
    background-color: #0BB54E;
  }
`;

const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;

const EmployeeDirectory = () => {
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [getFilteredEmployees, { loading, error, data }] = useLazyQuery(GET_EMPLOYEES);
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);

  useEffect(() => {
    if (data && data.users) {
      setFilteredEmployees(data.users);
    }
  }, [data]);

  const handleSearch = ({ searchTerm, department }) => {
    if (searchTerm || department) {
      getFilteredEmployees({
        variables: {
          filter: { searchTerm, department }
        }
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data: { deleteEmployee: isDeleted } } = await deleteEmployee({ variables: { id } });
      if (isDeleted) {
        setFilteredEmployees(filteredEmployees.filter(employee => employee._id !== id));
        console.log(`Employee with ID ${id} deleted successfully`);
      }
    } catch (error) {
      console.error(error);
      // Handle errors, display error message or toast
    }
  };

  const filterEmployeeByType = (employeeType) => {
    getFilteredEmployees({
      variables: {
        filter: { employeeType }
      }
    });
  };

  return (
    <StyledContainer>
      <EmployeeSearch onSearch={handleSearch} />
      <StyledHeaderText>You can also filter employees by type</StyledHeaderText>
      <StyledButtonContainer>
        <StyledButton onClick={() => filterEmployeeByType('FullTime')}>Full Time</StyledButton>
        <StyledButton onClick={() => filterEmployeeByType('PartTime')}>Part Time</StyledButton>
        <StyledButton onClick={() => filterEmployeeByType('Contract')}>Contract</StyledButton>
        <StyledButton onClick={() => filterEmployeeByType('Seasonal')}>Seasonal</StyledButton>
        <StyledButton onClick={() => filterEmployeeByType(null)}>All Employees</StyledButton>
      </StyledButtonContainer>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <EmployeeTable employees={filteredEmployees} onDelete={handleDelete} />
      )}
    </StyledContainer>
  );
};

export default EmployeeDirectory;
