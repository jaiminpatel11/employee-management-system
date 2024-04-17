import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Container, Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setOpen(false);
    setError('');
    setSuccessMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ageInt = parseInt(formData.age);
      const formDataWithIntAge = { ...formData, age: ageInt };
      await createUser({ variables: formDataWithIntAge });
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
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Please Fill Employee Details</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Date of Joining</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateOfJoining"
                    value={formData.dateOfJoining}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Department</Form.Label>
                  <Form.Control
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Employee Type</Form.Label>
                  <Form.Control
                    type="text"
                    name="employeeType"
                    value={formData.employeeType}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <div className="" style={{ display: 'flex', justifyContent:'center', padding:'10px 15px'}}>
                  <Button type="submit" variant="primary" className="mb-3" size="lg" >
                    Submit
                  </Button>
                </div>
              </Form>
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeeCreate;
