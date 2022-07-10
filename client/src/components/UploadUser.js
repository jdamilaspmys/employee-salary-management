import { useState, useRef } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import constants from "../util/Constants";
import { ToastContainer } from "react-toastify";

const ErrorDisplay = (props) => {
  let errorMessage = "Unable to upload file :(";
  if (props?.errorType === "INVALID_FILE_TYPE") {
    errorMessage = "Inavalid File Type. Accept file type `csv`";
  }
  if (props?.errorType === "INVALID_HEADER") {
    errorMessage = "Invalid Header";
  }
  if (props?.errorType === "INVALID_CONTENT") {
    errorMessage = "Inavalid Content";
  }
  if (props?.errorType === "DUPLICATE_CONTENT") {
    errorMessage = "Duplicate Content";
  }
  return (
    <>
      <Alert variant="danger">{errorMessage}</Alert>
    </>
  );
};

const UploadUsers = () => {
  const [isShow, setIsShow] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSelectFile, setIsSelectFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const inputRef = useRef();
  const [isUploadSucces, setIsUploadSuccess] = useState(false);
  const [isError, setIsError] = useState("");
  const [errorObject, setErrorObject] = useState({
    errorType: "",
    errorMessage: "",
  });

  const submitHandler = (event) => {
    event.preventDefault();
    setIsUploading(true);
    setIsError("");
    setIsUploadSuccess("");
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
          setIsSelectFile(false);
          setIsUploadSuccess(true);
        } else {
          throw new Error("Unable to upload file :(");
        }
      })
      .catch((error) => {
        setIsUploading(false);
        const errorType = error?.response?.data?.errorType;
        const errorMessage = error?.response?.data?.errorMessage;
        if (errorType) {
          setIsError(true);
          setErrorObject({ errorType, errorMessage });
        } else {
          setIsError(true);
          setErrorObject({
            errorType: "OTHER",
            errorMessage: "Unable to upload file :(",
          });
        }
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
    setIsUploadSuccess("");
    setIsError("");
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
            {isUploadSucces && (
              <Alert variant="success">Upload Success ... !</Alert>
            )}
            {isError && <ErrorDisplay errorType={errorObject?.errorType} />}
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
