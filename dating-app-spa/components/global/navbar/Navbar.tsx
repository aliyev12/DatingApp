import React from "react";
import {
  Navbar as _Navbar,
  Nav,
  Image,
  NavDropdown as _NavDropdown,
  Container,
} from "react-bootstrap";
import Link from "next/link";
import styled from "styled-components";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import LoginNavForm from "./LoginNavForm";
import { AuthContext } from "../../../contexts";

const NavbarComponent = () => {
  const { isLoggedIn, logout, user, userDetails } = React.useContext(
    AuthContext
  );

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Link href="/">
          <a>
            <Navbar.Brand className="font">
              <img
                src="/logo.png"
                className="logo"
                alt="Logo image"
                title="Dating App"
              />
            </Navbar.Brand>
          </a>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {isLoggedIn && (
              <>
                <Link href="/members">
                  <a className="nav-link text-light">Matches</a>
                </Link>
                <Link href="/lists">
                  <a className="nav-link text-light">Lists</a>
                </Link>
                <Link href="/messages">
                  <a className="nav-link text-light">Messages</a>
                </Link>
              </>
            )}

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

          {isLoggedIn && userDetails ? (
            <>
              <Link href="/members/[id]" as={`/members/${userDetails.id}`}>
                <a
                  className="nav-avatar"
                  title="Go to user profile"
                  style={{
                    backgroundImage: `url(${
                      userDetails.photoUrl || "/default-user.webp"
                    })`,
                  }}
                >
                  <span className="sr-only">Go to user profile</span>
                </a>
              </Link>
              <NavDropdown
                title={
                  <span>
                    Welcome{" "}
                    <div className="username">
                      <span>{userDetails.username}</span>
                    </div>
                  </span>
                }
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
  .logo {
    width: 5rem;
    height: 5rem;
    transition: all 300ms ease-in;

    &:hover {
      filter: brightness(1.3);
    }
    &:active {
      filter: invert(1);
    }
  }
  .dropdown-toggle::after {
    vertical-align: 0.155em;
  }
  .dropdown-menu {
    left: 4rem;
  }
  .navbar-brand {
    font-size: 1.8rem;
  }
  .username {
    display: inline-flex;
    padding: 0.3rem 1rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    transform: skew(-20deg);
    border: var(--main-color) solid 1px;
    transition: border 300ms ease-in;
    span {
      transform: skew(20deg);
    }

    &:hover {
      border-color: var(--white);
    }
  }
  .nav-avatar {
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 5rem;
    height: 5rem;
    border: 0.2rem solid var(--white);
    border-radius: 50%;
    transition: border 300ms ease-in;

    &:hover {
      border-color: var(--main-color);
    }
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

  .dropdown-item {
    svg {
      color: var(--main-color);
    }
  }
`;
