import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeDirectory from './components/EmployeeDirectory';
import EmployeeCreate from './components/EmployeeCreate';
import Home from './components/HomeComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavComponent from './components/NavComponent';
import EditEmployee from './components/EmployeeEdit'; 
import FooterComponent from './components/FooterComponent'

function App() {
  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh'}}>
      <Router>
        <NavComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<EmployeeDirectory />} />
          <Route path="/create" element={<EmployeeCreate />} />
          <Route path="/edit/:id" element={<EditEmployee />} />
        </Routes>
      </Router>
      <FooterComponent></FooterComponent>
    </div>
  );
}

export default App;
