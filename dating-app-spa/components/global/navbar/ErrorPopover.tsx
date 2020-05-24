import React from "react";
import { Popover as _Popover, Overlay } from "react-bootstrap";
import styled from "styled-components";

interface Props {
  targetRef: any;
  showPopover: boolean;
  message: string;
}

const ErrorPopover = ({ targetRef, showPopover, message }: Props) => {
  return (
    <Overlay show={showPopover} target={targetRef} placement="bottom">
      <Popover id="popover-contained" className="bg-danger">
        <Popover.Content>{message}</Popover.Content>
      </Popover>
    </Overlay>
  );
};

export default ErrorPopover;

const Popover = styled(_Popover)`
  border: 1px solid var(--danger) !important;
  .arrow {
    &::before {
      border-bottom-color: var(--danger) !important;
    }

    &::after {
      border-bottom-color: var(--danger) !important;
    }
  }
  .popover-body {
    color: var(--white) !important;
  }
`;
