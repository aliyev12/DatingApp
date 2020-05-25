import React from "react";
import { Row as _Row, Col } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { IPhoto } from "../../../_models";
import styled from "styled-components";
import UploadPhotos from "./UploadPhotos";

interface Props {
  photos: IPhoto[];
}

const PhotoEditor = ({ photos }: Props) => {
  return (
    <>
      <Row>
        {photos.map((photo) => (
          <Col sm={2} key={photo.id}>
            <img src={photo.url} alt="" className="img-thumbnail p-1" />
            <div className="text-center">
              <button type="button" className="btn btn-sm">
                Main
              </button>
              <button type="button" className="btn btn-sm btn-danger">
                <FaTrash />
              </button>
            </div>
          </Col>
        ))}
      </Row>
      <UploadPhotos />
    </>
  );
};

export default PhotoEditor;

const Row = styled(_Row)`
  img.img-thumbnail {
    height: 100px;
    min-width: 100px !important;
    margin-bottom: 2px;
  }
`;
