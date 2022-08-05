import React, { useState,useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";


import { Logout } from "../../service/auth";

import {  useDispatch } from "react-redux";
import { setLogout} from "../../Reducer/reducer";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);

  function SignOut() {
    dispatch(setLogout({
     type:'Logout'
  }));
     Logout();
     setValidated(true);
  }
  if(validated){
    navigate("/");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isMyTokenExpired = isExpired(token);
    if (isMyTokenExpired) {
      navigate("/");
    }
  },[]);
  
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img src="../../img/logo.png" alt="logo" /> 
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/products">Pricing</Nav.Link>
            <Nav.Link href="/user/packages">Packages</Nav.Link>
            <Nav.Link href="/user/assigntopackage">Assign to Package</Nav.Link>
            <Nav.Link href="#" onClick={SignOut}>
              Sign Out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
