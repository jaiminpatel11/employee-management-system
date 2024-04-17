import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, gql } from '@apollo/client';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Define allowed titles and departments
  const allowedTitles = ['Employee', 'Manager', 'Director', 'VP'];
  const allowedDepartments = ['IT', 'Marketing', 'HR', 'Engineering'];

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header>Edit Employee</Card.Header>
            <Card.Body>
              {errorMessage && <div className="text-danger">{errorMessage}</div>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    as="select"
                    name="title"
                    value={updatedEmployee.title}
                    onChange={handleChange}
                  >
                    {allowedTitles.map((title) => (
                      <option key={title} value={title}>{title}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Department</Form.Label>
                  <Form.Control
                    as="select"
                    name="department"
                    value={updatedEmployee.department}
                    onChange={handleChange}
                  >
                    {allowedDepartments.map((department) => (
                      <option key={department} value={department}>{department}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Current Status</Form.Label>
                  <Form.Control
                    as="select"
                    name="currentStatus"
                    value={updatedEmployee.currentStatus ? 'Working' : 'Retired'}
                    onChange={handleChange}
                  >
                    <option value="Working">Working</option>
                    <option value="Retired">Retired</option>
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">Save Changes</Button>
              </Form>
              <div className="mt-3">
                <Typography variant="subtitle1"><strong>First Name:</strong> {data.userById.firstName}</Typography>
                <Typography variant="subtitle1"><strong>Last Name:</strong> {data.userById.lastName}</Typography>
                <Typography variant="subtitle1"><strong>Age:</strong> {data.userById.age}</Typography>
                <Typography variant="subtitle1"><strong>Date of Joining:</strong> {formatDate(data.userById.dateOfJoining)}</Typography>
                <Typography variant="subtitle1"><strong>Employee Type:</strong> {data.userById.employeeType}</Typography>
              </div>
            </Card.Body>
          </Card>
          <Snackbar 
            open={openSnackbar} 
            autoHideDuration={2000} 
            onClose={() => setOpenSnackbar(false)} 
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <MuiAlert 
              elevation={6} 
              variant="filled" 
              onClose={() => setOpenSnackbar(false)} 
              severity="success"
            >
              {successMessage}
            </MuiAlert>
          </Snackbar>
        </Col>
      </Row>
    </Container>
  );
};

export default EditEmployee;
