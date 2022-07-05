import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const UserEditModal = (props) => {
  const [user, setUser] = useState({ username: "", fullname: "", salary: "" });
  useEffect(() => {
    if (props.user.username) {
      setUser({
        username: props.user.username,
        fullname: props.user.fullname,
        salary: props.user.salary,
      });
    }
  }, [props.user]);
  const submitHandler = (event) => {
    event.preventDefault();
    props.onModalConfirm(user);
  };
  const usernameHandler = (event) => {
    setUser((preState) => {
      return { ...preState, username: event.target.value };
    });
  };
  const fullnameHandler = (event) => {
    setUser((preState) => {
      return { ...preState, fullname: event.target.value };
    });
  };
  const salaryHandler = (event) => {
    setUser((preState) => {
      return { ...preState, salary: event.target.value };
    });
  };
  return (
    <Modal show={props.isShow} onHide={props.onModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Employee ( {props.user.id})</Modal.Title>
      </Modal.Header>
      <Form onSubmit={submitHandler}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="forUsername">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              required
              type="text"
              value={user.username}
              onChange={usernameHandler}
              placeholder="Enter Username"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="forUserFullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              required
              type="text"
              onChange={fullnameHandler}
              value={user.fullname}
              placeholder="Enter Full-name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="forSalary">
            <Form.Label>Salary</Form.Label>
            <Form.Control
              required
              type="number"
              min="0.01"
              step="0.01"
              onChange={salaryHandler}
              value={user.salary}
              placeholder="Enter Salary"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onModalClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UserEditModal;
