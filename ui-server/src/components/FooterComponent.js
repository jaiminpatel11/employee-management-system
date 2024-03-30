import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
`;

const StickyFooter = styled(MDBFooter)`
  position: sticky;
  bottom: 0;
  width: 100%;
  z-index: 100;
  padding:2px
`;

const FooterComponent = ({ children }) => {
  return (
    <Container>
      <Content>{children}</Content>
      <StickyFooter className='text-center text-lg-left' style={{ backgroundColor: '#ffffff' }}>
        <div className='text-center p-3'>
          &copy; {new Date().getFullYear()} EMS.COM
        </div>
      </StickyFooter>
    </Container>
  );
};

export default FooterComponent;
