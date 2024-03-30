import React from 'react';
import styled from 'styled-components';

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

const LogoContainer = styled.div`
  text-align: center;
`;

const LogoImage = styled.img`
  width: 200px; 
  animation: rotate 2s linear infinite; 
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
    <>
      <Title>Welcome to Our Employee Portal</Title>
      <LogoContainer>
        <LogoImage src="../images/logo.png" alt="React Logo" />
      </LogoContainer>
    </>
  );
};

export default Home;
