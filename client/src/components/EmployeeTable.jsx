import React from 'react';
import styled from 'styled-components';

// Srtle component
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #01D676;
  color: #fff;
`;

const TableHeadCell = styled.th`
  padding: 12px;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #131A24;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  color: #ffffff; 

`;
// Display all the employee data in to the table format
const EmployeeTable = ({ employees }) => {
  return (
    <Table>
      <TableHead>
        <tr>
          <TableHeadCell>FirstName</TableHeadCell>
          <TableHeadCell>LastName</TableHeadCell>
          <TableHeadCell>Age</TableHeadCell>
          <TableHeadCell>DateOfJoining</TableHeadCell>
          <TableHeadCell>Title</TableHeadCell>
          <TableHeadCell>Department</TableHeadCell>
          <TableHeadCell>EmployeeType</TableHeadCell>
          <TableHeadCell>CurrentStatus</TableHeadCell>
        </tr>
      </TableHead>
      <tbody>
        
        {employees.map((employee) => (
          <TableRow key={employee._id}>
            <TableCell>{employee.firstName}</TableCell>
            <TableCell>{employee.lastName}</TableCell>
            <TableCell>{employee.age}</TableCell>
            <TableCell>{employee.dateOfJoining}</TableCell>
            <TableCell>{employee.title}</TableCell>
            <TableCell>{employee.department}</TableCell>
            <TableCell>{employee.employeeType}</TableCell>
            <TableCell>{employee.currentStatus ? 'Working' : 'Retired'}</TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};

export default EmployeeTable;
