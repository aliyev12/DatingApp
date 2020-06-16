import React from "react";
import { Col, Card as _Card, Button } from "react-bootstrap";
import { IUser } from "../../../../_models";
import styled from "styled-components";
import Router from "next/router";
import Link from "next/link";

interface Props {
  user: IUser;
  disabeSubmitBtn: boolean;
  handleSaveChanged: () => void;
}

const EditUserCard = ({
  user,
  disabeSubmitBtn = false,
  handleSaveChanged,
}: Props) => {
  return (
    <Col sm={4}>
      <Card>
        <Card.Img
          src={user?.photoUrl || "/default-user.webp"}
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
            <Button
              variant="success"
              className="w-100"
              disabled={disabeSubmitBtn}
              type="button"
              onClick={handleSaveChanged}
            >
              Save Changes
            </Button>
            <Link href="/members/[id]" as={`/members/${user.id}`}>
              <a
                // variant="info"
                className="btn btn-info w-100"
              >
                Done Editing
              </a>
            </Link>
          </div>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default EditUserCard;

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
