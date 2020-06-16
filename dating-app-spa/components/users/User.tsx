import Router from "next/router";
import React from "react";
import {
  Button,
  Card as _Card,
  Col,
  Container,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import styled from "styled-components";
import { AuthContext, getUser } from "../../contexts";
import { NoContent } from "../../utils/alerts";
import { IUser } from "../../_models";
import { Gallery } from "./Gallery";

interface Props {
  id: string;
}

const User: React.FunctionComponent<Props> = ({ id }: Props) => {
  const [user, setUser] = React.useState<IUser | null>();
  const authContext = React.useContext(AuthContext);
  const { userDetails, isLoggedIn } = authContext;

  const isUserOwnProfile = () => userDetails && parseInt(id) === userDetails.id;

  React.useEffect(() => {
    if (userDetails) {
      if (isUserOwnProfile()) {
        setUser(userDetails);
      } else {
        if (isLoggedIn) initUser();
      }
    }
  }, [authContext]);

  const initUser = async () => {
    const res = await getUser(id);
    setUser(res);
  };

  if (!user) return null;
  return (
    <Container className="mt-4">
      <Row>
        <Col sm={4}>
          <h1>
            {user.knownAs}
            {user.knownAs[user.knownAs.length - 1] === "s" ? "'" : "'s"} Profile
          </h1>
        </Col>
        <Col sm={8}></Col>
      </Row>
      <Row>
        <Col sm={4}>
          <Card>
            <Card.Img
              src={user?.photoUrl || "/default-user.webp"}
              data-test="test"
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
                {isUserOwnProfile() ? (
                  <Button
                    variant="warning"
                    className="btn-block w-100"
                    onClick={() => Router.push("/member/edit")}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button variant="primary" className="w-100">
                      Like
                    </Button>
                    <Button variant="success" className="w-100">
                      Message
                    </Button>
                  </>
                )}
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
              <Tab
                eventKey="about"
                title={`About ${user?.knownAs}`}
                className="about-tab"
              >
                {user?.introduction && user?.lookingFor ? (
                  <div className="m-5">
                    {user?.introduction && (
                      <>
                        <h4>Description</h4>
                        <p className="mb-5">{user?.introduction}</p>
                      </>
                    )}
                    {user?.lookingFor && (
                      <>
                        <h4>Looking For</h4>
                        <p>{user?.lookingFor}</p>
                      </>
                    )}
                  </div>
                ) : (
                  <NoContent msg="There is currently nothing about the user" />
                )}
              </Tab>
              <Tab eventKey="interest" title="Interests">
                {user?.interest ? (
                  <div className="m-5">
                    <h4>Interests</h4>
                    <p>{user?.interest}</p>
                  </div>
                ) : (
                  <NoContent msg="User interests are currently not there" />
                )}
              </Tab>
              <Tab eventKey="photos" title="Photos">
                {user.photos && user.photos.length ? (
                  <div className="photos-tab-content">
                    <Gallery photos={user.photos} />
                  </div>
                ) : (
                  <NoContent msg="There are currently no photos" />
                )}
              </Tab>
              <Tab eventKey="messages" title="Messages">
                <NoContent msg="There are currently no messages" />
                {/* <div className="m-5">
                  <p>Messages will go here...</p>
                </div> */}
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
  .tab-content {
    padding-top: 25px !important;
  }
`;
