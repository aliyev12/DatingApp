import React from "react";
import { Button, Modal } from "react-bootstrap";

export const Confirm = ({
  handleCancel = () => {},
  handleOk = () => {},
  hideConfirm = () => {},
  showConfirm = false,
  heading = "Alert",
  body = "",
  cancel = "Cancel",
  ok = "Ok",
}) => {
  return (
    <Modal show={showConfirm} onHide={hideConfirm}>
      <Modal.Header closeButton>
        <Modal.Title>{heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          {cancel}
        </Button>
        <Button variant="primary" onClick={handleOk}>
          {ok}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
