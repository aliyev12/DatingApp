import * as React from "react";
import Link from "next/link";
import Router from "next/router";
import { IUser } from "../../_models";
import { Container, Row, Col } from "react-bootstrap";
import { AuthContext, getUsers } from "../../contexts";
import UserCard from "./UserCard";

type Props = {};

const Users: React.FunctionComponent<Props> = () => {
  const authContext = React.useContext(AuthContext);
  const [users, setUsers] = React.useState<IUser[] | null>();

  React.useEffect(() => {
    if (authContext.isLoggedIn) initUsers();
  }, [authContext]);

  const initUsers = async () => {
    const res = await getUsers();
    setUsers(res);
  };

  if (!users || (users && !users.length)) {
    return null;
  }

  return (
    <Container className="mt-5">
      <Row>
        {users.map((user, i) => {
          return (
            <Col lg={2} md={3} sm={6} key={user.id + i}>
              <UserCard user={user} />
            </Col>
          );
        })}
        {/* <div>
            Users:{" "}
            {users.map((u, i) => (
              <div key={i}>
                {" "}
                <Link href="/users/[id]" as={`/users/${u.id}`}>
                  {u.username}
                </Link>
              </div>
            ))}
          </div> */}
      </Row>
    </Container>
  );
};

export default Users;
