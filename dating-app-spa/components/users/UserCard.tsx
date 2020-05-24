import React from "react";
import { Card as _Card, Button } from "react-bootstrap";
import { IUser } from "../../_models";
import { FaUser, FaHeart, FaEnvelope } from "react-icons/fa";
import styled from "styled-components";
import Link from "next/link";

interface Props {
  user: IUser;
}

const UserCard: React.FunctionComponent<Props> = ({ user }: Props) => {
  return (
    <Card className="mb-4">
      <div className="card-img-wrapper">
        <Card.Img variant="top" src={user.photoUrl} alt={user.knownAs} />
        <ul className="list-inline member-icons animate text-center">
          <li className="list-inline-item">
            <Link href="/members/[id]" as={`/members/${user.id}`}>
              <a className="btn btn-primary">
                <FaUser />
              </a>
            </Link>
          </li>
          <li className="list-inline-item">
            <Button variant="primary">
              <FaHeart />
            </Button>
          </li>
          <li className="list-inline-item">
            <Button variant="primary">
              <FaEnvelope />
            </Button>
          </li>
        </ul>
      </div>
      <Card.Body className=" p-1 mt-3">
        <Card.Title className="text-center mb-1">
          <FaUser /> {user.knownAs}, {user.age}{" "}
        </Card.Title>
        <Card.Text className="card-text text-muted text-center">
          {user.city}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default UserCard;

const Card = styled(_Card)`
  .card-img-wrapper {
    position: relative;
    overflow: hidden;

    img {
      transform: scale(1, 1);
      transition-duration: 500ms;
      transition-timing-function: ease-out;
    }

    .member-icons {
      position: absolute;
      bottom: -30%;
      left: 0;
      right: 0;
      margin-right: auto;
      margin-left: auto;
      opacity: 0;

      &.animate {
        transition: all 0.3s ease-in-out;
      }
    }

    &:hover {
      img {
        transform: scale(1.2, 1.2);
        transition-duration: 500ms;
        transition-timing-function: ease-out;
        opacity: 0.7;
      }

      .member-icons {
        bottom: 0;
        opacity: 1;
      }
    }
  }
`;
