import { useLoaderData } from "react-router-dom";

const Profile = () => {
  const { user } = useLoaderData();

  const changeAdminStatus = async () => {
    const trueAdmin = await axios.put('/api/addAdmin', username)
  }

  return (
    <>
      <h1>Profile Page</h1>
      <form>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Password: {user.password}</p>
        <button>Edit</button>
      </form>

      <input 
        placeholder="Add an admin"
        type='text'
        value={username}
        onChange={(e) => changeAdminStatus(e.target.value)}
      />
      <button onClick={changeAdminStatus}>Add</button>
    </>
  );
};

export default Profile;
