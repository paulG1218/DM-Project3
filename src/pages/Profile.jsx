import { useLoaderData } from "react-router-dom";
import { useState } from "react";

const Profile = () => {
  const { user } = useLoaderData();

  const [newAdmin, setNewAdmin] = useState('')

  const handleNewAdmin = async () => {
    const trueAdmin = await axios.put('/api/addAdmin', newAdmin)
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

      <form onSubmit={handleNewAdmin}>
        <label>Add an admin:</label>
        <input 
          placeholder="Add an admin"
          type='text'
          value={newAdmin}
          onChange={(e) => setNewAdmin(e.target.value)}
        />
        <button type='submit'>Add</button>
      </form>
    </>
  );
};

export default Profile;
