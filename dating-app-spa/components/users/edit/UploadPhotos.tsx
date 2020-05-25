import React from "react";
import { Alert, AlertProps, Row } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import AddPhotos from "./AddPhotos";
import { Container } from "./Container";
import Thumbs from "./Thumbs";
import UploadQueue from "./UploadQueue";

interface Props {}

const UploadPhotos = (props: Props) => {
  const [files, setFiles] = React.useState<(File & { preview: string })[]>([]);
  const [progress, setProgress] = React.useState(0);
  const [alertState, setAlertState] = React.useState<{
    display: boolean;
    alert: {
      variant: AlertProps["variant"];
      msg: string;
    };
  }>({
    display: false,
    alert: {
      variant: undefined,
      msg: "",
    },
  });

  const handleAlert = (type: string) => {
    const alertMessages: any = {
      tooManyFiles: {
        variant: "danger",
        msg:
          "You tried uploading too many files. The limit is 3 files at a time.",
      },
    };
    setAlertState({
      display: true,
      alert: alertMessages[type],
    });

    setTimeout(() => {
      setAlertState({
        display: false,
        alert: {
          variant: undefined,
          msg: "",
        },
      });
    }, 5000);
  };

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
        handleAlert("tooManyFiles");
      }
    },
  });
  const { open, getRootProps, getInputProps } = dropzoneProps;

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

  return (
    <Container className="container mt-5">
      <Row>
        {alertState.display ? (
          <Alert variant={alertState.alert.variant}>
            {alertState.alert.msg}
          </Alert>
        ) : null}
      </Row>
      <Row>
        <AddPhotos dropzoneProps={dropzoneProps} />
        <UploadQueue
          files={files}
          removeImage={removeImage}
          progress={progress}
        />
      </Row>
      <Thumbs files={files} removeImage={removeImage} />
    </Container>
  );
};

export default UploadPhotos;
