import React from "react";
import { Row as _Row, Col } from "react-bootstrap";
import { FaTrash, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { IPhoto } from "../../../../_models";
import styled from "styled-components";
import UploadPhotos from "./upload-photos/UploadPhotos";
import { AuthContext } from "../../../../contexts";
import API from "../../../../utils/API";
import { toast } from "react-toastify";
import { Confirm } from "../../../../utils/Confirm";
import { ExpandImageModal } from "../../../../utils/ExpandImageModal";
import { NoContent } from "../../../../utils/alerts";

interface Props {
  photos: IPhoto[];
  userId: number;
}

const PhotoEditor = ({ userId }: Props) => {
  const { userDetails, updateUser, deletePhoto } = React.useContext(
    AuthContext
  );
  const [mainPhotoId, setMainPhotoId] = React.useState<number | null>(null);
  const [expandImage, setExpandImage] = React.useState<{
    imgUrl: string | undefined;
    show: boolean;
  }>({
    imgUrl: undefined,
    show: false,
  });
  const [confirmation, setConfirmation] = React.useState<{
    id: number | undefined;
    show: boolean;
  }>({
    id: undefined,
    show: false,
  });

  const photos = userDetails && userDetails.photos ? userDetails.photos : [];

  React.useEffect(() => {
    const foundPhoto = photos.find((p) => p.isMain);
    if (foundPhoto) {
      setMainPhotoId(foundPhoto.id);
    } else if (!foundPhoto && photos.length) {
      setMainPhotoId(photos[0].id);
    }
  }, [userDetails]);

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

  return (
    <>
      {!photos.length ? (
        <NoContent msg="There are currently no photos" />
      ) : (
        <Row>
          {photos.map((photo) => {
            const isMain = mainPhotoId && mainPhotoId === photo.id;
            return (
              <Col sm={2} key={photo.id}>
                <Card
                  isBeingDeleted={confirmation.id === photo.id}
                  isMain={isMain}
                >
                  <Img
                    title={photo.description}
                    style={{
                      backgroundImage: `url(${
                        photo.url || "/default-user.webp"
                      })`,
                    }}
                    onClick={() =>
                      setExpandImage({
                        imgUrl: photo.url,
                        show: true,
                      })
                    }
                  />
                  <Footer>
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
                      disabled={photo.isMain && photos.length > 1}
                    >
                      <FaTrash />
                    </button>
                  </Footer>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
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
      <ExpandImageModal
        show={expandImage.show}
        imgUrl={expandImage.imgUrl}
        onHide={() =>
          setExpandImage({
            imgUrl: undefined,
            show: false,
          })
        }
      />
    </>
  );
};

export default PhotoEditor;

const Card = styled.div`
  height: 10rem;
  width: 100%;
  height: 140px;
  margin-bottom: 2rem;
  border-radius: 5px;
  box-shadow: 1px -1px 7px 2px ${({ isBeingDeleted, isMain }) => (isBeingDeleted ? "var(--red)" : isMain ? "var(--green)" : "#1111116e")};
`;
const Img = styled.div`
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  transition: border 300ms ease-in;
  cursor: pointer;

  &:hover {
    border-color: var(--main-color);
  }
`;
const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  padding: 0 3px;

  .main-label {
    font-size: 1rem;
  }
`;

const DelBtn = styled.button``;

const Row = styled(_Row)`
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
