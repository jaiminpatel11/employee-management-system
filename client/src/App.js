import React from 'react';
import EmployeeDirectory from './components/EmployeeDirectory';
import  EmployeeCreate  from './components/EmployeeCreate';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div style={{ backgroundColor: '#1C1D30', minHeight: '100vh', padding:'20px'}}>
      <EmployeeDirectory />
      <EmployeeCreate />
    </div>
  );
}

export default App;
