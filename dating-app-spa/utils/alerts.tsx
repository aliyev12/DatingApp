import React from "react";
import { Alert as _Alert } from "react-bootstrap";
import styled from "styled-components";

interface Props {
  msg: string;
}

export const NoContent = ({ msg }: Props) => {
  return <Alert variant="info">{msg}</Alert>;
};

const Alert = styled(_Alert)`
  margin-bottom: 0 !important;
  text-align: center;
`;
