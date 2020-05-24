import React from "react";
import { Col, Card as _Card, Button } from "react-bootstrap";
import { IUser } from "../../../_models";
import styled from "styled-components";

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
          <Button
            variant="success"
            className="btn-block w-100"
            disabled={disabeSubmitBtn}
            type="button"
            onClick={handleSaveChanged}
          >
            Save Changes
          </Button>
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
