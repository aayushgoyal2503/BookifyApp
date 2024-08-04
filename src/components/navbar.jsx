import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";

const MyNav=()=>{
    return(
        <div>
         <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home"></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/book/list">Add Listing</Nav.Link>
            <Nav.Link href="/book/orders">Orders</Nav.Link>
            {/* <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link> */}

          </Nav>
          <Nav>
                        <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                        <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                    </Nav>
        </Container>
      </Navbar>
        </div>
    )
}
export default MyNav;