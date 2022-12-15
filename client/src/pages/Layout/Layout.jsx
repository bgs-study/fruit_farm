import {Outlet} from 'react-router-dom'
import styled from 'styled-components';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Container = styled.main`
  padding: 0 5%;
  margin: 2% 0;
`

const Layout = () => {
  return (
    <>
      <Header />
        <Container>
          <Outlet />
        </Container>
      <Footer />
    </>
  )
}

export default Layout;
