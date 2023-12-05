import { useLoaderData } from "react-router-dom";

const Profile = () => {
  const { user } = useLoaderData();

  return (
    <>
      <h1>Profile Page</h1>
      <form>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Password: {user.password}</p>
        <button>Edit</button>
      </form>
    </>
  );
};

export default Profile;
