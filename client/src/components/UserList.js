import { useEffect, useState } from "react";
import UserDeleteModal from "./UserDeleteModal";
import UserEditModal from "./UserEditModal";
import { Button } from "react-bootstrap";
import axios from "axios";
import constants from "../util/Constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoadingError = () => {
  return (
    <div className="alert alert-warning" role="alert">
      Uanble to Load Employee List :(
    </div>
  );
};

const RecordsNotFound = () => {
  return (
    <div className="alert alert-secondary" role="alert">
      Employee Records Not Found
    </div>
  );
};

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState({});
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState({});
  const [isErrorLoadingUserList, setIsErrorLoadingUserList] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load User List
  useEffect(() => {
    axios
      .get(`${constants.SERVER_BASE_URL}/users`)
      .then((res) => {
        setUsers(res.data);
        setIsErrorLoadingUserList(false);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsErrorLoadingUserList(true);
        setIsLoading(false);
      });
  }, []);

  //   START User Edit Handler
  const editHandler = (id) => {
    const foundUser = users.find((user) => user.id === id);
    if (foundUser) {
      setUserToEdit({
        ...foundUser,
        salary: parseFloat(foundUser?.salary).toFixed(2),
      });
      handlerShowEditModal();
    }
  };
  const editConfirmHandler = (userInfo) => {
    const foundUser = users.find((user) => user.id === userToEdit.id);

    if (foundUser) {
      setUserToEdit(foundUser);
      const toUpdateUser = {
        ...foundUser,
        username: userInfo.username,
        fullname: userInfo.fullname,
        salary: userInfo.salary,
      };
      axios
        .put(`${constants.SERVER_BASE_URL}/users/${foundUser.id}`, toUpdateUser)
        .then((res) => {
          if (res.status === 204) {
            successToast(
              `Successfully Update Employee ${foundUser.id} (${foundUser.fullname})`
            );
            setUsers((preState) => {
              const indexOf = preState.findIndex(
                (user) => user.id === foundUser.id
              );
              preState[indexOf] = toUpdateUser;
              return [...preState];
            });
            handlerCloseEditModal();
          } else {
            errorToast(
              `Unable to Update Employee ${foundUser.id} (${foundUser.fullname})`
            );
          }
        })
        .catch((error) => {
          errorToast(
            `Unable to Update Employee ${foundUser.id} (${foundUser.fullname})`
          );
        });
    }
  };
  const handlerShowEditModal = () => {
    setIsShowEditModal(true);
  };
  const handlerCloseEditModal = () => {
    setIsShowEditModal(false);
  };
  //  START User Delete Handler
  const deleteHandler = (id) => {
    const foundUser = users.find((user) => user.id === id);
    if (foundUser) {
      setUserToDelete(foundUser);
      handlerShowDeleteModal();
    }
  };
  const deleteConfirmHandler = () => {
    const foundUser = users.find((user) => user.id === userToDelete.id);
    if (foundUser) {
      axios
        .delete(`${constants.SERVER_BASE_URL}/users/${foundUser.id}`)
        .then((res) => {
          if (res.status === 204) {
            successToast(
              `Successfully Delete Employee ${foundUser.id} (${foundUser.fullname})`
            );
            setUsers((preState) => {
              return [...preState.filter((user) => user.id !== foundUser.id)];
            });
            setUserToDelete({});
            handlerCloseDeleteModal();
          } else {
            errorToast(
              `Unable to Delete Employee ${foundUser.id} (${foundUser.fullname})`
            );
          }
        })
        .catch((error) => {
          errorToast(
            `Unable to Delete Employee ${foundUser.id} (${foundUser.fullname})`
          );
        });
    }
  };
  const handlerShowDeleteModal = () => {
    setIsShowDeleteModal(true);
  };
  const handlerCloseDeleteModal = () => {
    setIsShowDeleteModal(false);
  };
  // Toast
  const successToast = (msg) => {
    toast.success(msg);
  };
  const errorToast = (error) => {
    toast.error(error);
  };
  return (
    <div style={{ marginTop: "20px", borderStyle: "groove" }}>
      <UserDeleteModal
        isShow={isShowDeleteModal}
        onModalClose={handlerCloseDeleteModal}
        onModalConfirm={deleteConfirmHandler}
        user={userToDelete}
      ></UserDeleteModal>
      <ToastContainer limit={10} newestOnTop />
      <UserEditModal
        isShow={isShowEditModal}
        onModalClose={handlerCloseEditModal}
        onModalConfirm={editConfirmHandler}
        user={userToEdit}
      ></UserEditModal>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Username</th>
              <th>Fullname</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.fullname}</td>
                <td>${parseFloat(user.salary).toFixed(2)}</td>
                <td>
                  <Button
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      editHandler(user.id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </Button>
                  <Button
                    className="btn btn-danger"
                    onClick={(e) => {
                      e.preventDefault();
                      deleteHandler(user.id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                      <path
                        fillRule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                      />
                    </svg>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isErrorLoadingUserList ? (
          <LoadingError />
        ) : (
          !isLoading && !users.length && <RecordsNotFound />
        )}
      </div>
    </div>
  );
};

export default UserList;
