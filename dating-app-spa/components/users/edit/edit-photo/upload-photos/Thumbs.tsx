import React from "react";
import { Button, Row, Col, Tooltip, OverlayTrigger } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

interface Props {
  files: (File & { preview: string; path: string })[];
  removeImage: (preview: string) => void;
}

const Thumbs = ({ files, removeImage }: Props) => {
  return (
    <Row>
      <Col>
        <div className="thumb-container mt-5">
          {files.map((file) => (
            <OverlayTrigger
              key={file.name}
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={(props) => {
                return (
                  <Tooltip id="button-tooltip" {...props}>
                    {file.path}
                  </Tooltip>
                );
              }}
            >
              <div className="thumb">
                <div className="thumb-inner">
                  <img
                    src={file.preview || "/default-user.webp"}
                    className="thumb-img"
                  />
                  <Button
                    variant="outline-danger"
                    className="del-img-btn"
                    onClick={() => removeImage(file.preview)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </div>
            </OverlayTrigger>
          ))}
        </div>
      </Col>
    </Row>
  );
};

export default Thumbs;
