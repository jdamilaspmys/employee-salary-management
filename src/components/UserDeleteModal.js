import { Modal, Button } from "react-bootstrap";

const UserDeleteModal = (props) => {
  return (
    <Modal show={props.isShowDeleteModal} onHide={props.handlerCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Employee </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Do you want to delete <b>{props?.userToDelete?.fullname} </b> employee ?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handlerCloseModal}>
          No
        </Button>
        <Button variant="danger" onClick={props.deleteConfirmHandler}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDeleteModal;
