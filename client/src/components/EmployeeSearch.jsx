import React, { useState } from 'react';
import styled from 'styled-components';

// Style Components
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex: 1;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #01D676;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
// EmployeeSearch component
const EmployeeSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [department, setDepartment] = useState('');

// Function to handle search button click
  const handleSearch = () => {
    onSearch({ searchTerm, department });
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search by First Name Or Last Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <SearchInput
        type="text"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />
      <SearchButton onClick={handleSearch}>Search</SearchButton>
    </SearchContainer>
  );
};

export default EmployeeSearch;
