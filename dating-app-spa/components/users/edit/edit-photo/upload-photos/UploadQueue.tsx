import React from "react";
import { Button, Col, Table, ButtonGroup, ProgressBar } from "react-bootstrap";
import { FaTrash, FaUpload, FaBan } from "react-icons/fa";

interface Props {
  files: (File & { preview: string; path: string })[];
  removeImage: (preview: string) => void;
  removeAllImages: () => void;
  handleUpload: () => void;
  handleCancelUpload: () => void;
  progress: number;
  disableUploadBtn: boolean;
  disableCancelBtn: boolean;
}

const UploadQueue = ({
  files,
  removeImage,
  removeAllImages,
  handleUpload,
  handleCancelUpload,
  progress,
  disableUploadBtn,
  disableCancelBtn,
}: Props) => {
  return (
    <Col sm={8}>
      <h2 className="mb-4">Upload Queue</h2>
      {files.length > 0 ? (
        <>
          <p className="muted">
            Queue length: <strong>{files.length}</strong>
          </p>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Size</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.path}>
                  <td>
                    <strong>{file.path}</strong>
                  </td>
                  <td>
                    <div className="d-flex justify-content-between">
                      <span>
                        {new Intl.NumberFormat("en-US", {
                          maximumSignificantDigits: 3,
                        }).format(file.size)}{" "}
                        bytes
                      </span>
                      <Button
                        variant="outline-danger"
                        // className="del-img-btn"
                        onClick={() => removeImage(file.preview)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <p className="muted mt-5">Queue progress:</p>
          <ProgressBar
            animated={progress < 100}
            now={progress}
            variant={progress < 100 ? "primary" : "success"}
            className="mb-5"
            label={progress > 0 ? `${progress}%` : ""}
          />
          <ButtonGroup aria-label="Basic example">
            <Button
              variant="success"
              onClick={handleUpload}
              disabled={disableUploadBtn}
            >
              <FaUpload className="mr-3" />
              <span>Upload</span>
            </Button>
            <Button
              variant="warning"
              onClick={handleCancelUpload}
              disabled={disableCancelBtn}
            >
              <FaBan className="mr-3" />
              <span>Cancel</span>
            </Button>
            <Button
              variant="danger"
              onClick={removeAllImages}
              disabled={files.length === 0}
            >
              <FaTrash className="mr-3" />
              <span>Remove All</span>
            </Button>
          </ButtonGroup>
        </>
      ) : (
        <p className="muted">No files have been added to queue</p>
      )}
    </Col>
  );
};

export default UploadQueue;
