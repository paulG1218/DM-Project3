
import { useLoaderData, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux"


const Profile = () => {
  const dispatch = useDispatch()

  const { user } = useLoaderData();

  const [isEditing, setIsEditing] = useState();
  const [userInfo, setUserInfo] = useState({
    username: user.username,
    email: user.email,
    password: user.password,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange =(e) => {
    const {name, value} = e.target
    setUserInfo((prev) => {
     return {...prev, [name]: value }
    })
  }

  const handleSave = async (e) => {
    e.preventDefault()

    try {
      await axios.put(`/api/editUser/${user.userId}`, userInfo);
      console.log(userInfo)
    } catch (error) {
      console.log("Error updating User:", error);
    }
    setIsEditing(false);
    navigate(`/profile/${user.userId}`)
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    // Prompt the user for confirmation
    const confirmation = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (confirmation) {
      console.log(confirmation);
      // Make an asynchronous request to your server to delete the account
      const res = await axios.delete("/api/deleteUser");
      if (res.data === "success") {
        alert("Account deleted successfully.");
        dispatch({ type: "logout" });
        navigate("/login");
      }
    } else {
      alert("Account deletion cancelled.");
    }
  };
  return (
    <div>
      <h1>Profile Page</h1>
      {isEditing ? (
        <form className="editingUser">
          <input onChange={(e) => setUserInfo({...userInfo, username: e.target.value})} disabled={false} readOnly={false}  value={userInfo.username}/>
          <input onChange={(e) => setUserInfo({...userInfo, email: e.target.value})} disabled={false} readOnly={false}  value={userInfo.email}/>
          <input onChange={(e) => {setUserInfo({...userInfo, password: e.target.value}); console.log(userInfo)}} disabled={false} readOnly={false}  value={userInfo.password}/>
          <button disabled={false} readOnly={false} onClick={(e) => handleSave(e)}>
            Save
          </button>
          <button
            onClick={(e) => {
              handleDelete(e);
            }}
          >
            Delete
          </button>
        </form>
      ) : (
        <form className="notEdited">
          <input disabled={true} readOnly={true} value={userInfo.username}/>
          <input disabled={true} readOnly={true} value={userInfo.email}/>
          <input disabled={true} readOnly={true} type="password" value={userInfo.password} />
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsEditing(true);
            }}
          >
            Edit
          </button>
        </form>
      )}
    </div>
)
}

export default Profile;