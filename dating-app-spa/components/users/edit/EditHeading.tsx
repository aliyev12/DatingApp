import React from "react";
import { Row, Col } from "react-bootstrap";

interface Props {
  alertType: string;
}

const alertTypes: {
  [key: string]: {
    message: string;
  };
} = {
  info: {
    message: "Your changes have not been saved",
  },
  success: {
    message: "Your form has been submitted",
  },
};

const EditHeading = ({ alertType = "info" }: Props) => {
  return (
    <Row>
      <Col sm={4}>
        <h1>Your Profile</h1>
      </Col>
      <Col sm={8}>
        <div className={`alert alert-${alertType}`}>
          <strong>Information:</strong>
          {alertTypes[alertType].message}
        </div>
      </Col>
    </Row>
  );
};

export default EditHeading;
