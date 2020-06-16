import Router from "next/router";
import React from "react";
import { Button, Form } from "react-bootstrap";

const Actions = (props: any) => {
  const { isSubmitting, isValid, dirty } = props;

  return (
    <Form.Group>
      <Button
        variant="success"
        className="mt-3 mt-lg-0"
        type="submit"
        disabled={isSubmitting || !(isValid && dirty)}
      >
        Register{isSubmitting ? "ing..." : ""}
      </Button>
      <Button
        variant="secondary"
        className="ml-sm-2 mt-3 mt-lg-0"
        type="button"
        onClick={() => Router.push("/")}
      >
        Cancel
      </Button>
    </Form.Group>
  );
};

export default Actions;
