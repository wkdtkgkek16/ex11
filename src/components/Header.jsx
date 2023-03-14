import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, withRouter } from 'react-router-dom';
import back from '../images/back.jpg'

const Header = ({history}) => {
    let email=sessionStorage.getItem('email')
    const onLogout = (e) =>{
        e.preventDefault();
        sessionStorage.removeItem('email');
        history.push('/ex11')
    }
  return (
    <>
        <img src={back} style={{width:'100%'}}/>
        <Navbar bg="primary" variant="dark" className='header'>
        <Container>
          <Navbar.Brand href="/">인천일보</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/users">회원목록</Nav.Link>
            {email ? 
                <Nav.Link href="/logout" onClick={onLogout}>로그아웃</Nav.Link>
                :
                <Nav.Link href="/login">로그인</Nav.Link>
            }
            {email && <NavLink to="mypage">{email}</NavLink>}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
export default withRouter(Header)