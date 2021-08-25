import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Logout } from "../Containers/SignIn/SignInAction";

/**
 * @author
 * @function Header
 **/

const Header = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(Logout());
  };
  const CheckSignInOrNot = () => {
    if (auth.authenticate) {
      return (

        <Nav>
          <Nav.Link style={{ textTransform: "uppercase" }}>
            <b>{auth.user.firstName}</b>
          </Nav.Link>
          <Nav.Link onClick={logout}>Sign Out</Nav.Link>
        </Nav>

      );
    } else {
      return (

        <Nav>
          <NavLink to="/Signin" style={{ margin: "5px", color: "white" }}>Sign in</NavLink>
          <NavLink to="/Signup" style={{ margin: "5px", color: "white" }}>
            Sign up
          </NavLink>
        </Nav>

      );
    }
  };
  return (
    <div>
      <Navbar
        fixed="top"
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        style={{ zIndex: "1" }}
      >
        <Navbar.Brand href="/">Admin Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          {CheckSignInOrNot()}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
