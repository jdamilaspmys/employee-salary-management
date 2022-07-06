import UploadUsers from "./UploadUser";
import UserList from "./UserList";

const Dashboard = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <UploadUsers></UploadUsers>
        </div>
        <div className="row">
          <UserList></UserList>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
