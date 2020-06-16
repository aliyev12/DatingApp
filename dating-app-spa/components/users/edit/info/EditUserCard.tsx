import Link from "next/link";
import React from "react";
import { Button, Col } from "react-bootstrap";
import { IUser } from "../../../../_models";
import { UserInfo } from "../../UserInfo";

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
      <UserInfo user={user}>
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
      </UserInfo>
    </Col>
  );
};

export default EditUserCard;
