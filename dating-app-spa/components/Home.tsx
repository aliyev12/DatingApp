import React from "react";
import Router from "next/router";
import { Container, Button, Row, Col } from "react-bootstrap";
import styled from "styled-components";

const Content = styled.div`
  text-align: center;
`;

interface Props {}

const Home = (props: Props) => {
  return (
    <Content>
      <h1>Find your match</h1>
      <p className="lead">
        Come on in to view your matches... All you need to do is sign up!
      </p>
      <div className="text-center">
        <Button
          variant="primary"
          size="lg"
          className="mr-2"
          onClick={() => Router.push("/register")}
        >
          Register
        </Button>
        <Button variant="info" size="lg">
          Learn more
        </Button>
      </div>

      <Container>
        <Row className="justify-content-center">
          <Col xs={12} lg={4}>
            col
          </Col>
        </Row>
      </Container>
    </Content>
  );
};

export default Home;
