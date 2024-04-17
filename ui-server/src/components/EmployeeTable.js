import React from "react";
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

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
    <table className="table table-striped">
      <thead className="bg-primary text-white">
        <tr>
          <th>FirstName</th>
          <th>LastName</th>
          <th>Age</th>
          <th>DateOfJoining</th>
          <th>Title</th>
          <th>Department</th>
          <th>EmployeeType</th>
          <th>CurrentStatus</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.age}</td>
            <td>{formatDate(employee.dateOfJoining)}</td>
            <td>{employee.title}</td>
            <td>{employee.department}</td>
            <td>{employee.employeeType}</td>
            <td>{employee.currentStatus === true ? "Working" : "Retired"}</td>
            <td>
              <Button variant="primary" onClick={() => handleEdit(employee._id)}>Edit/View</Button>
              <Button variant="danger" onClick={() => onDelete(employee._id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
