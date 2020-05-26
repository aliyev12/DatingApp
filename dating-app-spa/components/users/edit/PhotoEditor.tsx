import React, { ChangeEvent } from "react";
import {
  Row as _Row,
  Col,
  Button,
  Form,
  CardDeck,
  Card,
  CardColumns as _CardColumns,
} from "react-bootstrap";
import { FaTrash, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { IPhoto } from "../../../_models";
import styled from "styled-components";
import UploadPhotos from "./UploadPhotos";
import { AuthContext } from "../../../contexts";

interface Props {
  photos: IPhoto[];
}

const PhotoEditor = ({ photos }: Props) => {
  const { updateMainPhoto } = React.useContext(AuthContext);
  const [mainPhotoId, setMainPhotoId] = React.useState<number | null>(null);

  React.useEffect(() => {
    const foundPhoto = photos.find((p) => p.isMain);
    if (foundPhoto) {
      setMainPhotoId(foundPhoto.id);
    } else if (!foundPhoto && photos.length) {
      setMainPhotoId(photos[0].id);
    }
  }, []);

  const handleIsMainChange = (id: number) => {
    // call API
    setMainPhotoId(id);
    updateMainPhoto(id);
  };

  if (!mainPhotoId || !photos.length) return null;
  return (
    <>
      <Row>
        {photos.map((photo) => {
          const isMain = mainPhotoId === photo.id;
          return (
            <Col sm={2} key={photo.id}>
              <Card border={isMain ? "success" : "default"} className="mb-4">
                <Card.Img variant="top" src={photo.url} />
                <Card.Footer className="d-flex justify-content-between">
                  <button
                    onClick={() => handleIsMainChange(photo.id)}
                    disabled={isMain}
                    className={`btn p-0 ${
                      isMain ? "text-success" : "text-secondary"
                    }`}
                  >
                    <div className="d-flex flex-column align-items-center">
                      <div className="main-label">main</div>
                      {isMain ? <FaToggleOff /> : <FaToggleOn />}
                    </div>
                  </button>
                  <button className="btn p-0 delete-img-btn text-danger">
                    <FaTrash />
                  </button>
                </Card.Footer>
              </Card>
            </Col>
          );
        })}
      </Row>
      <UploadPhotos />
    </>
  );
};

export default PhotoEditor;

const Row = styled(_Row)`
  .card-footer {
    padding: 0 3px;
  }
  .main-label {
    font-size: 1rem;
  }

  .img-container {
    background-position: center;
    height: 100px;
    width: 100px;

    img.img-thumbnail {
      height: 100px;
      min-width: 100px !important;
      margin-bottom: 2px;
    }
  }
`;
