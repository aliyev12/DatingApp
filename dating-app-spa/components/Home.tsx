import React from "react";
import Router from "next/router";
import { Container, Button, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { AuthContext } from "../contexts";
import Users from "../components/users/Users";
import Link from "next/link";

const Content = styled.div`
  text-align: center;
`;

interface Props {}

const Home = (props: Props) => {
  const { isLoggedIn } = React.useContext(AuthContext);
  return (
    <Content>
      <h1>Find your match</h1>

      {!isLoggedIn && (
        <>
          <p className="lead">
            Come on in to view your matches... All you need to do is sign up!
          </p>
          <div className="text-center">
            <Link href="/register">
              <a className="btn btn-primary btn-lg mr-3">Register</a>
            </Link>
            <Link href="/learn-more">
              <a className="btn btn-info btn-lg mr-3">Learn more</a>
            </Link>
          </div>
        </>
      )}
      {isLoggedIn && (
        <div className="text-center mt-5">
          <Button
            variant="primary"
            size="lg"
            className="mr-3"
            onClick={() => Router.push("/members")}
          >
            View Matches
          </Button>
          <Button variant="info" size="lg">
            Learn more
          </Button>
        </div>
      )}

      {/* <Container>
        <Row className="justify-content-center">
          <Col xs={12} lg={4}>
          </Col>
        </Row>
      </Container> */}
    </Content>
  );
};

export default Home;
