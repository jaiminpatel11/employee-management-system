
import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import styled from 'styled-components';
// Import snackbar from material-ui
import Snackbar from '@mui/material/Snackbar'; 
// Import Alert from material-ui 
import MuiAlert from '@mui/material/Alert';


// Style component 
const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #222339;
  margin-top:45px
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #01D676;
  font-weight: bold;
  font-size: 22px;
  font-family: 'Montserrat', sans-serif;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #FFFFFF;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
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

const CREATE_EMPLOYEE = gql`
  mutation CreateUser($firstName: String!, $lastName: String!, $age: Int!, $dateOfJoining: String!, $title: String!, $department: String!, $employeeType: String!) {
    createUser(firstName: $firstName, lastName: $lastName, age: $age, dateOfJoining: $dateOfJoining, title: $title, department: $department, employeeType: $employeeType) {
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

const EmployeeCreate = () => {
  // State variables for form data, error message, success message, and Snackbar open state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    dateOfJoining: '',
    title: '',
    department: '',
    employeeType: '',
  });

  const [createUser] = useMutation(CREATE_EMPLOYEE);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [open, setOpen] = useState(false);

 // Function to handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 // Function to handle Snackbar close
  const handleClose = () => {
    setOpen(false);
    setError('');
    setSuccessMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert age to integer
      const ageInt = parseInt(formData.age);
      const formDataWithIntAge = { ...formData, age: ageInt };
      await createUser({ variables: formDataWithIntAge });
      // Clear form data and set success message
      setFormData({
        firstName: '',
        lastName: '',
        age: '',
        dateOfJoining: '',
        title: '',
        department: '',
        employeeType: '',
      });
      setSuccessMsg('Employee Details Saved Successfully');
      setOpen(true);
    } catch (error) {
      console.error(error);
      setError(error.message);
      setOpen(true);
    }
  };

  return (
    <Container>
      <Title>Please Fill Employee Details</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>First Name</Label>
          <Input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Last Name</Label>
          <Input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Age</Label>
          <Input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Date of Joining</Label>
          <Input
            type="Date"
            name="dateOfJoining"
            value={formData.dateOfJoining}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Title</Label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Department</Label>
          <Input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Employee Type</Label>
          <Input
            type="text"
            name="employeeType"
            value={formData.employeeType}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </form>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={error ? 'error' : 'success'}
        >
          {error || successMsg}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default EmployeeCreate;
