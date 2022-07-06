import { Modal, Button } from "react-bootstrap";

const UserDeleteModal = (props) => {
  return (
    <Modal show={props.isShow} onHide={props.onModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Employee </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Do you want to delete <b>{props?.user?.fullname} </b> employee ?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onModalClose}>
          No
        </Button>
        <Button variant="danger" onClick={props.onModalConfirm}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDeleteModal;
