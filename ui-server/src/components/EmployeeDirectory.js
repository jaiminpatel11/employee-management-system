import React, { useState, useEffect } from 'react';
import EmployeeSearch from './EmployeeSearch';
import EmployeeTable from './EmployeeTable'; 
import { useLazyQuery, useMutation, gql } from '@apollo/client';
import { GET_EMPLOYEES } from '../queries';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;

const EmployeeDirectory = () => {
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [getFilteredEmployees, { loading, error, data }] = useLazyQuery(GET_EMPLOYEES);
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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

  const handleDelete = async (id, currentStatus) => {
    if (currentStatus === true) {
      console.log("can not delete emplopyee")
      setSnackbarOpen(true);
      return; 
    }

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

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="container">
      <EmployeeSearch onSearch={handleSearch} />
      <h4 className="text-white mt-4">You can also filter employees by type</h4>
      <div className="btn-group mt-2" role="group">
        <button type="button" className="btn btn-success" onClick={() => filterEmployeeByType('FullTime')}>Full Time</button>
        <button type="button" className="btn btn-success" onClick={() => filterEmployeeByType('PartTime')}>Part Time</button>
        <button type="button" className="btn btn-success" onClick={() => filterEmployeeByType('Contract')}>Contract</button>
        <button type="button" className="btn btn-success" onClick={() => filterEmployeeByType('Seasonal')}>Seasonal</button>
        <button type="button" className="btn btn-success" onClick={() => filterEmployeeByType(null)}>All Employees</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <EmployeeTable employees={filteredEmployees} onDelete={handleDelete} />
      )}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert 
          elevation={6} 
          variant="filled" 
          onClose={handleSnackbarClose} 
          severity="error"
        >
          CAN'T DELETE EMPLOYEE - STATUS ACTIVE
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default EmployeeDirectory;