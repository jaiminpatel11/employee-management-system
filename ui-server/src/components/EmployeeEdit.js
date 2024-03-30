import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, gql } from '@apollo/client';
import styled from 'styled-components';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Card = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  width: 400px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const CardHeader = styled.h2`
  color: #01D676;
  font-size: 24px;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #01D676;
  color: #fff;
  cursor: pointer;
`;
const AdditionalDetails = styled.div`
  margin-top: 20px;
`;

const GET_EMPLOYEE = gql`
  query GetEmployee($id: ID!) {
    userById(id: $id) {
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

const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $title: String, $department: String, $currentStatus: Boolean) {
    updateEmployee(id: $id, title: $title, department: $department, currentStatus: $currentStatus) {
      _id
    }
  }
`;

const formatDate = (timestampInSeconds) => {
  const timestampInMillis = timestampInSeconds * 1000;
  const date = new Date(timestampInMillis);
  return date.toLocaleDateString();
};

const EditEmployee = () => {
  const { id } = useParams();
  const [updatedEmployee, setUpdatedEmployee] = useState({
    title: '',
    department: '',
    currentStatus: false,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const { loading, error, data } = useQuery(GET_EMPLOYEE, {
    variables: { id },
  });

  useEffect(() => {
    if (data && data.userById) {
      const { title, department, currentStatus } = data.userById;
      setUpdatedEmployee({ title, department, currentStatus });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployee({ ...updatedEmployee, [name]: value });
  };

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEmployee({
        variables: {
          id,
          title: updatedEmployee.title,
          department: updatedEmployee.department,
          currentStatus: updatedEmployee.currentStatus === 'Working', 
        },
      });
      setSuccessMessage('Changes saved successfully');
      setOpenSnackbar(true);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
    setSuccessMessage('');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Define allowed titles and departments
  const allowedTitles = ['Employee', 'Manager', 'Director', 'VP'];
  const allowedDepartments = ['IT', 'Marketing', 'HR', 'Engineering'];

  return (
    <Container>
      <Card>
        <CardHeader>Edit Employee</CardHeader>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <FormControl fullWidth>
              <InputLabel id="titleLabel">Title</InputLabel>
              <Select
                labelId="titleLabel"
                id="title"
                name="title"
                value={updatedEmployee.title}
                onChange={handleChange}
              >
                {allowedTitles.map((title) => (
                  <MenuItem key={title} value={title}>{title}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormControl fullWidth>
              <InputLabel id="departmentLabel">Department</InputLabel>
              <Select
                labelId="departmentLabel"
                id="department"
                name="department"
                value={updatedEmployee.department}
                onChange={handleChange}
              >
                {allowedDepartments.map((department) => (
                  <MenuItem key={department} value={department}>{department}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormControl fullWidth>
              <InputLabel id="currentStatusLabel">Current Status</InputLabel>
              <Select
                labelId="currentStatusLabel"
                id="currentStatus"
                name="currentStatus"
                value={updatedEmployee.currentStatus ? 'Working' : 'Retired'}
                onChange={handleChange}
              >
                <MenuItem value="Working">Working</MenuItem>
                <MenuItem value="Retired">Retired</MenuItem>
              </Select>
            </FormControl>
          </FormGroup>
          <Button variant="contained" type="submit">Save Changes</Button>
        </form>
        <AdditionalDetails>
          <Typography variant="subtitle1"><strong>First Name:</strong> {data.userById.firstName}</Typography>
          <Typography variant="subtitle1"><strong>Last Name:</strong> {data.userById.lastName}</Typography>
          <Typography variant="subtitle1"><strong>Age:</strong> {data.userById.age}</Typography>
          <Typography variant="subtitle1"><strong>Date of Joining:</strong> {formatDate(data.userById.dateOfJoining)}</Typography>
          <Typography variant="subtitle1"><strong>Employee Type:</strong> {data.userById.employeeType}</Typography>
        </AdditionalDetails>
      </Card>
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={2000} 
        onClose={handleSnackbarClose} 
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <MuiAlert 
          elevation={6} 
          variant="filled" 
          onClose={handleSnackbarClose} 
          severity="success"
        >
          {successMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default EditEmployee;
