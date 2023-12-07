import { useLoaderData, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();

  const { data, user } = useLoaderData();
  
  const navigate = useNavigate();

  switch (data.message) {
    case 'success':
      break;
    default:
      window.location.href = '/login'
  }

  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: user.username,
    email: user.email,
    password: user.password,
  });


  const handleSave = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/api/editUser/${user.userId}`, userInfo);
      dispatch({
        type: "userChange",
        payload: userInfo,
      });
    } catch (error) {
      console.log("Error updating User:", error);
    };
    setIsEditing(false)
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
      <form className="editingUser">
        <input
          onChange={(e) =>
            setUserInfo({ ...userInfo, username: e.target.value })
          }
          disabled={!isEditing}
          readOnly={!isEditing}
          value={userInfo.username}
        />
        <input
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          disabled={!isEditing}
          readOnly={!isEditing}
          value={userInfo.email}
        />
        <input
          onChange={(e) => {
            setUserInfo({ ...userInfo, password: e.target.value });
          }}
          disabled={!isEditing}
          readOnly={!isEditing}
          value={userInfo.password}
        />
        {isEditing ? (
          <>
            <button onClick={(e) => handleSave(e)}>Save</button>
            <button
              onClick={(e) => {
                handleDelete(e);
              }}
            >
              Delete
            </button>
          </>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsEditing(true);
            }}
          >
            Edit
          </button>
        )}
      </form>
    </div>
  );
};

export default Profile;
