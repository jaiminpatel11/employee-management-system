import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  background-color: #01D676;
  padding: 20px 30px;
  display: flex;
  justify-content: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const NavbarList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
`;

const NavbarItem = styled.li`
  margin-right: 20px;
`;

const NavbarLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-weight: bold;
  transition: color 0.3s ease;
  padding: 10px 15px;
  font-size: 18px;
  border-radius: 5px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Navbar = () => {
  return (
    <>
      <NavbarContainer>
        <NavbarList>
          <NavbarItem>
            <NavbarLink to="/">Home</NavbarLink>
          </NavbarItem>
          <NavbarItem>
            <NavbarLink to="/search">Search Employee</NavbarLink>
          </NavbarItem>
          <NavbarItem>
            <NavbarLink to="/create">Create Employee</NavbarLink>
          </NavbarItem>
        </NavbarList>
      </NavbarContainer>

      <Outlet />
    </>
  );
};

export default Navbar;
