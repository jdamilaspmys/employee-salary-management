import { useState } from "react";
import UserDeleteModal from "./UserDeleteModal";
const UserList = () => {
  const dummyUsers = [
    {
      id: "0001",
      username: "user01",
      fullname: "user 01",
      salary: 1.0,
    },
    {
      id: "0002",
      username: "user01",
      fullname: "user 01",
      salary: 2.0,
    },
    {
      id: "0003",
      username: "user03",
      fullname: "user 03",
      salary: 5.0,
    },
  ];
  const [users, setUsers] = useState(dummyUsers);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState({});

  //   START User Edit Handler
  const editHandler = (id) => {
    const foundUser = users.find((user) => user.id === id);
    if (foundUser) {
      const toUpdateUser = {
        ...foundUser,
        username: foundUser.username,
        salary: foundUser.salary + 0.01,
      };
      setUsers((preState) => {
        return [toUpdateUser, ...preState.filter((user) => user.id !== id)];
      });
    }
  };
  //  START User Delete Handler
  const deleteHandler = (id) => {
    const foundUser = users.find((user) => user.id === id);
    if (foundUser) {
      setUserToDelete(foundUser);
      handlerShowModal();
    }
  };
  const deleteConfirmHandler = () => {
    const foundUser = users.find((user) => user.id === userToDelete.id);
    if (foundUser) {
      // TODO : API to Delete User
      setUsers((preState) => {
        return [...preState.filter((user) => user.id !== userToDelete.id)];
      });
      deleteHandler({});
      handlerCloseModal();
    }
  };
  const handlerShowModal = () => {
    setIsShowDeleteModal(true);
  };
  const handlerCloseModal = () => {
    setIsShowDeleteModal(false);
  };

  return (
    <div>
      <UserDeleteModal
        isShowDeleteModal={isShowDeleteModal}
        handlerCloseModal={handlerCloseModal}
        deleteConfirmHandler={deleteConfirmHandler}
        userToDelete={userToDelete}
      ></UserDeleteModal>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>Fullname</th>
            <th>salary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.fullname}</td>
              <td>${user.salary.toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => editHandler(user.id)}
                >
                  E
                </button>
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteHandler(user.id);
                  }}
                >
                  D
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
