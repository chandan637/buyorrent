import React from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { logout } from "../../services/authService";

const navBarStyles = {
  backgroundColor: "#fff",
  backgroundImage: "linear-gradient(0deg, #D2D2D2 0%, #97D9E1 100%);",
  boxShadow: "0 0 6px 0 rgba(0, 0, 0, 0.3)",
};

const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
const userDetails = JSON.parse(localStorage.getItem("user") || "{}");

const Header: React.FC = () => {
  return (
    <div>
      <Navbar
        bg="light"
        variant="light"
        expand="lg"
        sticky="top"
        style={navBarStyles}
      >
        <Container>
          <Navbar.Brand to="/" as={Link}>
            Buy or rent
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {/* <Nav.Link href="/">Home</Nav.Link> */}
              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="/loading">Loading</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            <Nav>
              {!isLoggedIn && <Link to="/login">Login</Link>}
              {isLoggedIn && userDetails.picture && <img src={userDetails.picture} height='40px' /> }
              {isLoggedIn && (
                <NavDropdown
                  title={userDetails.name || "User"}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item>
                    <Link to="/post-property">Post Property</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/list-property">List Property</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Link to="/login" onClick={() => logout()}>
                      Logout
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
