import React from "react";
import { DropzoneRootProps } from "react-dropzone";
import { Button, Col } from "react-bootstrap";
import { FaUpload } from "react-icons/fa";

interface Props {
  dropzoneProps: DropzoneRootProps;
}

const AddPhotos = ({ dropzoneProps }: Props) => {
  const { getRootProps, getInputProps, open } = dropzoneProps;

  return (
    <Col sm={4}>
      <h2 className="mb-4">Add Photos</h2>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <FaUpload size={30} className="mb-4" />
        <h3>Drop Photos Here</h3>
      </div>
      <Button variant="primary" type="button" onClick={open} className="mt-4">
        Open File Dialog
      </Button>
    </Col>
  );
};

export default AddPhotos;
