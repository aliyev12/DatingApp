import React from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

interface Props {
  show: boolean;
  imgUrl: string | undefined;
  imgTitle?: string;
  onHide: () => void;
  ariaLabel?: string;
}

export const ExpandImageModal = ({
  show = false,
  imgUrl = "",
  imgTitle = "Expanded image",
  onHide = () => {},
  ariaLabel = "Image modal",
}: Props) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-label={ariaLabel}
      centered
    >
      <Img
        closeButton
        title={imgTitle}
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
      >
        <button className="btn" onClick={onHide}>
          <FaTimes />
        </button>
      </Img>
    </Modal>
  );
};

const Img = styled(Modal.Body)`
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 70vh;

  button {
    position: absolute;
    top: 4px;
    right: 7px;

    svg {
      color: var(--white);
      box-shadow: 0px 0px 9px 7px #333333;
      border-radius: 50%;
      transition: box-shadow 300ms ease-in;
      background-color: #333333;
    }

    &:hover {
      svg {
        box-shadow: 0px 0px 9px 7px #ffffff;
      }
    }
  }
`;
