import React from "react";
import { AuthContext, getUser } from "../../contexts";
import { IUser } from "../../_models";
import {
  Container,
  Col,
  Row,
  Card as _Card,
  Button,
  Tabs,
  Tab,
} from "react-bootstrap";
import styled from "styled-components";
import { Gallery } from "./Gallery";
import { useUser } from "./useUser";

interface Props {
  id: string;
}

const User: React.FunctionComponent<Props> = ({ id }: Props) => {
  const { user } = useUser(id);
  if (!user) return null;

  return (
    <Container className="mt-4">
      <Row>
        <h1>
          {user.knownAs}
          {user.knownAs[user.knownAs.length - 1] === "s" ? "'" : "'s"} Profile
        </h1>
      </Row>
      <Row>
        <Col sm={4}>
          <Card>
            <Card.Img
              src={user?.photoUrl}
              alt={user?.knownAs}
              variant="top"
              className="img-thumbnail"
            />
            <Card.Body>
              <div>
                <strong>Location:</strong>
                <p>
                  {user?.city}, {user?.country}
                </p>
              </div>
              <div>
                <strong>Age:</strong>
                <p>{user?.age}</p>
              </div>
              <div>
                <strong>Last Active:</strong>
                <p>{user?.lastActive}</p>
              </div>
              <div>
                <strong>Member since:</strong>
                <p>{user?.created}</p>
              </div>
            </Card.Body>
            <Card.Footer>
              <div className="btn-group d-flex">
                <Button variant="primary" className="w-100">
                  Like
                </Button>
                <Button variant="success" className="w-100">
                  Message
                </Button>
              </div>
            </Card.Footer>
          </Card>
        </Col>
        <Col sm={8}>
          <TabPanel className="tab-panel">
            <Tabs
              id="uncontrolled-tab-example"
              className="member-tabset"
              defaultActiveKey="about"
            >
              <Tab eventKey="about" title={`About ${user?.knownAs}`}>
                <h4>Description</h4>
                <p>{user?.introduction}</p>
                <h4>Looking For</h4>
                <p>{user?.lookingFor}</p>
              </Tab>
              <Tab eventKey="interest" title="Interests">
                <h4>Interests</h4>
                <p>{user?.interest}</p>
              </Tab>
              <Tab eventKey="photos" title="Photos" className="photos-tab">
                <Gallery photos={user.photos} />
              </Tab>
              <Tab eventKey="messages" title="Messages">
                <p>Messages will go here...</p>
              </Tab>
            </Tabs>
          </TabPanel>
        </Col>
      </Row>
    </Container>
  );
};

export default User;

const Card = styled(_Card)`
  .img-thumbnail {
    margin: 2.5rem;
    width: 85%;
    height: 85%;
  }

  .card-body {
    padding: 0 2.5rem;
  }

  .card-footer {
    padding: 1rem 1.5rem;
    background-color: var(--white);
    border-top: none;
  }
`;

const TabPanel = styled.div`
  .photos-tab {
    display: flex;
    justify-content: center;
  }
  .tab-pane {
  }
`;
