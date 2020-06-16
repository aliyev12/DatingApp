import moment from "moment";
import React from "react";
import { Card as _Card } from "react-bootstrap";
import styled from "styled-components";

interface Props {
  user: any;
  children: any;
}

export const UserInfo: React.FunctionComponent<Props> = ({
  user,
  children,
}: Props) => {
  return (
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
          <p>{moment(user?.lastActive).fromNow()}</p>
        </div>
        <div>
          <strong>Member since:</strong>
          <p>{moment(user?.created).format("MMMM Do, YYYY")}</p>
        </div>
      </Card.Body>
      <Card.Footer>
        <div className="btn-group d-flex">{children}</div>
      </Card.Footer>
    </Card>
  );
};

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
