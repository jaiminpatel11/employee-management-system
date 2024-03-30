import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 80vh;
`;

const Content = styled.div`
  flex: 1;
`;

const FooterComponent = ({ children }) => {
  return (
    <Container>
      <Content>{children}</Content>
      <MDBFooter className='text-center text-lg-left'>
        <div className='text-center p-3' style={{ backgroundColor: '#ffffff' }}>
          &copy; {new Date().getFullYear()} Copyright:{' '}
          <a className='text-dark' href=''>
              EMS.COM
          </a>
        </div>
      </MDBFooter>
    </Container>
  );
};

export default FooterComponent;
