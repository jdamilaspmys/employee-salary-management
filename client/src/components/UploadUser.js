import { useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import constants from "../util/Constants";
import { ToastContainer } from "react-toastify";

const UploadUsers = () => {
  const [isShow, setIsShow] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSelectFile, setIsSelectFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const inputRef = useRef();
  const [isUploadSucces, setIsUploadSuccess] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    axios
      .post(constants.SERVER_BASE_URL + "/users", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.status === 201) {
          inputRef.current.value = "";
          setIsUploading(false);
          isSelectFile(false);
          setIsUploadSuccess(true);
        } else {
          setIsUploading(false);
        }
      })
      .catch((error) => {
        setIsUploading(false);
      });
  };

  const hideHandler = () => {
    setIsShow(false);
  };

  const openUploadModalClick = () => {
    setIsShow(true);
  };

  const onFileChangeHandler = () => {
    setIsSelectFile(true);
    setSelectedFile(inputRef.current.files[0]);
  };

  return (
    <>
      <ToastContainer limit={10} newestOnTop />
      <Modal show={isShow} onHide={!isUploading && hideHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Employee</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitHandler}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formFile">
              <Form.Control
                ref={inputRef}
                required
                type="file"
                onChange={onFileChangeHandler}
                disabled={isUploading}
              />
            </Form.Group>
            {isUploading && (
              <div
                className="spinner-border text-primary center"
                role="status"
              ></div>
            )}
            {isUploadSucces && <p> Upload Success </p>}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              type="submit"
              disabled={isUploading || !isSelectFile}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <div className="container" style={{ marginTop: "20px" }}>
        <div className="row">
          <div className="col">
            <Button
              style={{ float: "right", display: "flex" }}
              onClick={openUploadModalClick}
            >
              {`Upload Employee . `}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-upload"
                viewBox="0 0 16 16"
              >
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadUsers;
