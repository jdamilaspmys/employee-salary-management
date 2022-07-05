import { useState } from "react";

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
      salary: 1.0,
    },
  ];
  const [users, setUsers] = useState(dummyUsers);
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

  const deleteHandler = (id) => {
    const foundUser = users.find((user) => user.id === id);
    if (foundUser) {
      setUsers((preState) => {
        return [...preState.filter((user) => user.id !== id)];
      });
    }
  };
  return (
    <table>
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
              <button onClick={() => editHandler(user.id)}>E</button>
              <button onClick={() => deleteHandler(user.id)}>D</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
