import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
Link
function Header() {
  const [displayName,setdisplay] = useState("")
  const [loginStatus,setLoginStatus] = useState(false)
 useEffect(()=>{
  if(sessionStorage.getItem("token")) {
    setLoginStatus(true)
  }else{
    setLoginStatus(false)
  }
 },[])

 useEffect(()=>{
  if (sessionStorage.getItem("exisitingUser")) {
    const {username} = JSON.parse(sessionStorage.getItem("exisitingUser"))
    setdisplay(username)
  }else{
    setdisplay("")
  }
  },[])
  return (
    <>
       <div className="">
            <Navbar expand="lg" className="sticky-top" data-bs-theme="light">
              <Container>
                <Navbar.Brand className="ms-auto"
                  style={{ letterSpacing: "3px", fontWeight: "700" }}
                  
                >
                  <Link className="nav-link" to="/">Smart Water Tracker</Link>
                  
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarNav" />
                <Navbar.Collapse id="navbarNav">
                <Nav className="mx-auto">
              
             
              
              
            </Nav>
                { loginStatus?
                <Link to={'/dashboard'}>
                <button className="btn ">
                  <i className="fa-solid fa-user border rounded-circle p-2"></i>{" "}
                  {displayName}
                </button>
                 </Link>:
                  <Link to={'/login'}>
                <button className="btn ">
                  <i className="fa-solid fa-user border rounded-circle p-2"></i>{" "}
                  Login
                </button>
                 </Link>}
                 </Navbar.Collapse>
              </Container>
            </Navbar>
            <hr className="ms-5 me-5 mt-1" />
          </div>
    </>
  )
}

export default Header
