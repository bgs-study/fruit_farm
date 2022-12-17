import {Outlet} from 'react-router-dom'
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Container = styled.main`
  min-height: 100vh;
  padding: 3% 5% 10% 5%;
  box-sizing: border-box;
  position: relative;
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
