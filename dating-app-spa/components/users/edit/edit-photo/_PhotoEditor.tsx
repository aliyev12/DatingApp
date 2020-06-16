import React from "react";
import { Row as _Row, Col, Card } from "react-bootstrap";
import { FaTrash, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { IPhoto } from "../../../../_models";
import styled from "styled-components";
import UploadPhotos from "./upload-photos/UploadPhotos";
import { AuthContext } from "../../../../contexts";
import API from "../../../../utils/API";
import { toast } from "react-toastify";
import { Confirm } from "../../../../utils/Confirm";

interface Props {
  photos: IPhoto[];
  userId: number;
}

const PhotoEditor = ({ photos, userId }: Props) => {
  const { updateUser, deletePhoto } = React.useContext(AuthContext);
  const [mainPhotoId, setMainPhotoId] = React.useState<number | null>(null);
  const [confirmation, setConfirmation] = React.useState<{
    id: number | undefined;
    show: boolean;
  }>({
    id: undefined,
    show: false,
  });

  React.useEffect(() => {
    const foundPhoto = photos.find((p) => p.isMain);
    if (foundPhoto) {
      setMainPhotoId(foundPhoto.id);
    } else if (!foundPhoto && photos.length) {
      setMainPhotoId(photos[0].id);
    }
  }, []);

  const hideConfirm = () =>
    setConfirmation({
      id: undefined,
      show: false,
    });

  const handleIsMainChange = async (id: number) => {
    await API.post(`/users/${userId}/photos/${id}/setMain`)
      .then((res) => {
        updateUser(res.data.user);
        setMainPhotoId(id);
        toast.success("Main photo successfully updated.");
      })
      .catch((err) => {
        console.log("err = ", err);
        toast.error("Error with updating main photo.");
      });
  };

  const handleDeletePhoto = async (id: number | undefined) => {
    if (id) {
      await API.delete(`/users/${userId}/photos/${id}`)
        .then((res) => {
          deletePhoto(id);
          toast.success("Photo has been successfully deleted.");
        })
        .catch((err) => {
          console.log("err = ", err);
          toast.error("Error while trying to delete photo.");
        });
    }
  };

  if (!mainPhotoId || !photos.length) return null;
  return (
    <>
      <Row>
        {photos.map((photo) => {
          const isMain = mainPhotoId === photo.id;
          return (
            <Col sm={2} key={photo.id}>
              <Card
                border={
                  confirmation.id === photo.id
                    ? "danger"
                    : isMain
                    ? "success"
                    : undefined
                }
                className="mb-4"
              >
                <Card.Img
                  variant="top"
                  src={photo.url || "/default-user.webp"}
                />
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
                  <button
                    className="btn p-0 delete-img-btn text-danger"
                    onClick={() =>
                      setConfirmation({ id: photo.id, show: true })
                    }
                    disabled={photo.isMain}
                  >
                    <FaTrash />
                  </button>
                </Card.Footer>
              </Card>
            </Col>
          );
        })}
      </Row>
      <UploadPhotos />
      <Confirm
        handleCancel={hideConfirm}
        handleOk={() => {
          handleDeletePhoto(confirmation.id);
          hideConfirm();
        }}
        hideConfirm={hideConfirm}
        showConfirm={confirmation.show}
        body="Are you sure you want to delete this photo?"
      />
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
