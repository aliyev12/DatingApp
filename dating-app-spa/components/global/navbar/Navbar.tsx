import React from "react";
import {
  Navbar as _Navbar,
  Nav,
  NavDropdown as _NavDropdown,
  Container,
} from "react-bootstrap";
import Link from "next/link";
import styled from "styled-components";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import LoginNavForm from "./LoginNavForm";
import { AuthContext } from "../../../contexts";

const NavbarComponent = () => {
  const { isLoggedIn, logout, user } = React.useContext(AuthContext);

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Link href="/">
          <a>
            <Navbar.Brand className="font">Dating App</Navbar.Brand>
          </a>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link href="/">
              <a className="nav-link">Matches</a>
            </Link>
            <Link href="/lists">
              <a className="nav-link">Lists</a>
            </Link>
            <Link href="/messages">
              <a className="nav-link">Messages</a>
            </Link>

            {/* <Link href="/users">
            <a className="nav-link">Users</a>
          </Link> */}
            {/* <Link href="/about">
            <a className="nav-link">About</a>
          </Link> */}
            {/* <Link href="/users">
            <a className="nav-link">Users</a>
          </Link> */}
            {/* <Nav.Link href="/api/users">Users API</Nav.Link> */}
          </Nav>

          {isLoggedIn ? (
            <>
              <NavDropdown
                title={`Welcome ${user ? user.unique_name : ""}`}
                id="basic-nav-dropdown"
              >
                <Link href="/member/edit">
                  <a className="dropdown-item">
                    <FaUser /> Edit Profile
                  </a>
                </Link>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => logout()}>
                  <FaSignOutAlt /> Logout
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <LoginNavForm />
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;

const Navbar = styled(_Navbar)`
  .navbar-brand {
    font-size: 1.8rem;
  }
`;

const NavDropdown = styled(_NavDropdown)`
  a#basic-nav-dropdown {
    color: var(--white);
    transition: 300ms ease-in;

    &:hover {
      color: var(--light);
    }
  }
`;
