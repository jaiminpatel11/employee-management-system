import React from 'react';
import styled from 'styled-components';
import logo from '../images/logo.png';

// Style component for title
const Title = styled.h1`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 30px;
  color: white;
  font-family: 'Montserrat', sans-serif;
  animation: fadeInUp 1s ease;
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const CenteredImage = styled.img`
  display: block; 
  margin: 0 auto; 
  max-width: 100%; 
  height: auto; 
  animation: rotate 5s linear infinite; 
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Home = () => {
  return (
    <div className="container text-center">
      <Title>Welcome to Our Employee Portal</Title>
      <CenteredImage src={logo} alt="Company Logo" className="img-fluid" />
    </div>
  );
};

export default Home;
