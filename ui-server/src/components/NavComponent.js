import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  margin-bottom: 20px;
`;

const CustomNavLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-weight: bold;
  padding: 10px 15px;
  font-size: 18px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const CustomNavbar = styled(BootstrapNavbar)`
  background-color: #4663A9;
  display: flex;
  justify-content: center;
`;

const Navbar = () => {
  return (
    <>
      <NavbarContainer>
        <CustomNavbar variant="light">
            <CustomNavLink as={NavLink} to="/">Home</CustomNavLink>
            <CustomNavLink as={NavLink} to="/search">Search Employee</CustomNavLink>
            <CustomNavLink as={NavLink} to="/create">Create Employee</CustomNavLink>
        </CustomNavbar>
      </NavbarContainer>

      <Outlet />
    </>
  );
};

export default Navbar;
