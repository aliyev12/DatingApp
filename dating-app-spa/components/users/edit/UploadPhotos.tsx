import React from "react";
import { Alert, AlertProps, Row } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import AddPhotos from "./AddPhotos";
import { Container } from "./Container";
import Thumbs from "./Thumbs";
import UploadQueue from "./UploadQueue";
import { uploadFiles } from "./uploadFiles";
import { AuthContext } from "../../../contexts";
import { IUserContextValues } from "../../../_models";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

interface Props {}

const UploadPhotos = (props: Props) => {
  const { user, addUploadedUserPhotos }: IUserContextValues = React.useContext(
    AuthContext
  );
  const [files, setFiles] = React.useState<(File & { preview: string })[]>([]);
  const [progress, setProgress] = React.useState(0);
  const [cancelToken, setCancelToken] = React.useState(null);

  React.useEffect(() => {
    console.log("progress = ", progress);
  }, [progress]);
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
      uploadCancelled: {
        variant: "info",
        msg: "Your upload has been cancelled.",
      },
      unableCancel: {
        variant: "danger",
        msg: "Unable to cancel upload.",
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

  const handleUpload = () => {
    const newSource = axios.CancelToken.source();
    setCancelToken(newSource);
    setProgress(0);
    if (user && user.nameid) {
      uploadFiles(user.nameid, files, setProgress, newSource)
        .then((res) => {
          console.log("files from handle = ", files);
          console.log("res from handle = ", res);

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
      handleAlert("uploadCancelled");
      toast.info("Your upload has been cancelled.");
      setProgress(0);
    } else {
      handleAlert("unableCancel");
      toast.error("Unable to cancel upload.");
    }
    // axiosSource.cancel("Request canceled!");
    // stopped at trying to figure out why the screen is so extra wide and need to fix toast positionning...
  };

  return (
    <Container className=" mt-5">
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
