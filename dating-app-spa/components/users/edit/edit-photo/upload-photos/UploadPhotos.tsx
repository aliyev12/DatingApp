import React from "react";
import { Row } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import AddPhotos from "./AddPhotos";
import { Container } from "./Container";
import Thumbs from "./Thumbs";
import UploadQueue from "./UploadQueue";
import { uploadFiles } from "./uploadFiles";
import { AuthContext } from "../../../../../contexts";
import { IUserContextValues } from "../../../../../_models";
import { toast } from "react-toastify";
import axios from "axios";

const UploadPhotos = () => {
  const { user, addUploadedUserPhotos }: IUserContextValues = React.useContext(
    AuthContext
  );
  const [files, setFiles] = React.useState<(File & { preview: string })[]>([]);
  const [progress, setProgress] = React.useState(0);
  const [cancelToken, setCancelToken] = React.useState(null);

  const dropzoneProps = useDropzone({
    accept: "image/*",
    multiple: true,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length <= 3) {
        setFiles(
          acceptedFiles.map((file: File) => {
            return Object.assign(file, {
              preview: URL.createObjectURL(file),
            });
          })
        );
      } else {
        toast.error(
          "You tried uploading too many files. The limit is 3 files at a time."
        );
      }
    },
  });

  React.useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const removeImage = (preview: string) => {
    const newFiles = files.filter((f) => f.preview !== preview);
    setFiles(newFiles);
  };

  const removeAllImages = () => {
    setFiles([]);
    toast.info("All images have been removed from upload queue.");
  };

  const handleUpload = () => {
    const newSource = axios.CancelToken.source();
    setCancelToken(newSource);
    setProgress(0);
    if (user && user.nameid) {
      uploadFiles(user.nameid, files, setProgress, newSource)
        .then((res) => {
          addUploadedUserPhotos(
            res.filter((r) => r.status === 201).map((r) => r.data)
          );
          setProgress(0);
          toast.success(
            `You photo${
              files.length > 1 ? "s have" : " has"
            } been successfully uploaded.`
          );
          setFiles([]);
        })
        .catch((err) => console.log("err = ", err));
    }
  };

  const handleCancelUpload = () => {
    if (cancelToken && progress < 100) {
      cancelToken.cancel("Request canceled!");
      toast.error("Your upload has been cancelled.");
      toast.info("Your upload has been cancelled.");
      setProgress(0);
    } else {
      toast.error("Unable to cancel upload.");
      toast.error("Unable to cancel upload.");
    }
  };

  return (
    <Container className=" mt-5">
      <Row>
        <AddPhotos dropzoneProps={dropzoneProps} />
        <UploadQueue
          files={files}
          removeImage={removeImage}
          removeAllImages={removeAllImages}
          progress={progress}
          handleUpload={handleUpload}
          handleCancelUpload={() => handleCancelUpload()}
          disableUploadBtn={!user || (user && !user.nameid)}
          disableCancelBtn={!(progress > 0 && progress < 100)}
        />
      </Row>
      <Thumbs files={files} removeImage={removeImage} />
    </Container>
  );
};

export default UploadPhotos;
