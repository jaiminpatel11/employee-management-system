import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';

// EmployeeSearch component
const EmployeeSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [department, setDepartment] = useState('');

  // Function to handle search button click
  const handleSearch = () => {
    onSearch({ searchTerm, department });
  };

  return (
    <Form>
      <Row className="mb-3">
        <Col>
          <Form.Control
            type="text"
            placeholder="Search by First Name Or Last Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col>
          <Form.Control
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </Col>
        <Col>
          <Button variant="primary" onClick={handleSearch}>Search</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default EmployeeSearch;
