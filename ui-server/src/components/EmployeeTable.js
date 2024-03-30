import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Styled components
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #01d676;
  color: #fff;
`;

const TableHeadCell = styled.th`
  padding: 12px;
`;

const Button = styled.button`
  width: 50%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #01d676;
  color: #fff;
  cursor: pointer;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #131a24;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  color: #ffffff;
`;

// Display all the employee data in the table format
const EmployeeTable = ({ employees, onDelete }) => {
  const navigate = useNavigate(); // Initialize useHistory hook

  // Function to handle edit action
  const handleEdit = (employeeId) => {
    navigate(`/edit/${employeeId}`);
  };

  // Function to format date
  const formatDate = (timestampInSeconds) => {
    const timestampInMillis = timestampInSeconds * 1000;
    const date = new Date(timestampInMillis);
    return date.toLocaleDateString();
  };

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
          <TableHeadCell>Action</TableHeadCell>
        </tr>
      </TableHead>
      <tbody>
        {employees.map((employee) => (
          <TableRow key={employee._id}>
            <TableCell>{employee.firstName}</TableCell>
            <TableCell>{employee.lastName}</TableCell>
            <TableCell>{employee.age}</TableCell>
            <TableCell>{formatDate(employee.dateOfJoining)}</TableCell>
            <TableCell>{employee.title}</TableCell>
            <TableCell>{employee.department}</TableCell>
            <TableCell>{employee.employeeType}</TableCell>
            <TableCell>
              {employee.currentStatus === true ? "Working" : "Retired"}
            </TableCell>
            <TableCell>
              <Button onClick={() => handleEdit(employee._id)}>Edit</Button>
              <Button onClick={() => onDelete(employee._id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
};

export default EmployeeTable;
