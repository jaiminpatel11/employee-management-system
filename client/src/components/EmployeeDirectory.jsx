import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import EmployeeSearch from './EmployeeSearch';
import EmployeeTable from './EmployeeTable'; 
import { useLazyQuery } from '@apollo/client';
import { GET_EMPLOYEES } from '../queries';

// Style component for title
const Title = styled.h1`
text-align: center;
margin-bottom: 10px;
font-weight: bold;
font-size: 30px;
color: #01D676;
font-family: 'Montserrat', sans-serif;
animation: fadeInUp 1s ease;
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

const EmployeeDirectory = () => {
  // state variable for filtered employees
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [getFilteredEmployees, { loading, error, data }] = useLazyQuery(GET_EMPLOYEES);

  useEffect(() => {
    if (data && data.users) {
      setFilteredEmployees(data.users);
    }
  }, [data]);
  // Function that hundle search
  const handleSearch = ({ searchTerm, department }) => {
    if (searchTerm || department) {
      getFilteredEmployees({
        variables: {
          filter: { searchTerm, department }
        }
      });
    }
  };

  return (
    <div>
  <Title>Welcome to Our Employee Portal</Title>
  <EmployeeSearch onSearch={handleSearch} />
  {loading ? (
    <p style={{ color: 'white', fontSize: '16px' }}>Loading...</p>
  ) : error ? (
    <p style={{ color: 'white', fontSize: '16px' }}>Error: {error.message}</p>
  ) : (
    <EmployeeTable employees={filteredEmployees} />
  )}
</div>

  );
};

export default EmployeeDirectory;
