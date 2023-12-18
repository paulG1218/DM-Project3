import { useLoaderData, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "../css/Profile.css";

const Profile = () => {
  const dispatch = useDispatch();

  const { data, user } = useLoaderData();

  const navigate = useNavigate();

  const errorTxt = document.getElementById("errorText");

  switch (data.message) {
    case "success":
      break;
    default:
      window.location.href = "/login";
      break;
  }

  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: user.username,
    email: user.email,
    password: user.password,
  });

  const handleSave = async (e) => {
    e.preventDefault();
    const res = await axios.put(`/api/editUser/${user.userId}`, userInfo);
    switch (res.data.message) {
      case "saved":
        dispatch({
          type: "userChange",
          payload: userInfo,
        });
        setIsEditing(false);
        errorTxt.style.color = "green";
        errorTxt.innerText = "Saved!";
        break;
      case "name taken":
        errorTxt.style.color = "red";
        errorTxt.innerText = "Username taken";
        break;
      default:
        errorTxt.style.color = "red";
        errorTxt.innerText = "Something went wrong";
        break;
    }
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

  const isAdmin = useSelector((state) => state.login.isAdmin);

  const [newAdmin, setNewAdmin] = useState("");

  const handleNewAdmin = async (e) => {
    e.preventDefault();
    const res = await axios.put("/api/addAdmin", { newAdmin: newAdmin });
    if (res.data.message === "admin added") {
      errorTxt.style.color = "green";
      errorTxt.innerText = "Admin added!";
      return;
    } else if (res.data.message === "no user") {
      errorTxt.style.color = "red";
      errorTxt.innerText = "User does not exist";
      return;
    } else {
      errorTxt.style.color = "red";
      errorTxt.innerText = "Something went wrong";
      return;
    }
  };

  return (
    <div>
      <h1 className="header">Profile Page</h1>

      <form className="editingUser">
        <input
          onChange={(e) =>
            setUserInfo({ ...userInfo, username: e.target.value })
          }
          disabled={!isEditing}
          readOnly={!isEditing}
          value={userInfo.username}
          className="username"
        />
        <br />
        <input
          className="email"
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          disabled={!isEditing}
          readOnly={!isEditing}
          value={userInfo.email}
        />
        <br />
        <input
          onChange={(e) => {
            setUserInfo({ ...userInfo, password: e.target.value });
          }}
          disabled={!isEditing}
          readOnly={!isEditing}
          type={isEditing ? "text" : "password"}
          value={userInfo.password}
          className="profilePassword"
        />
        <br />
        {isEditing ? (
          <>
            <button onClick={(e) => handleSave(e)} className="save">
              Save
            </button>
            <button
              className="delete"
              onClick={(e) => {
                handleDelete(e);
              }}
            >
              Delete
            </button>
            <button
              className="cancel"
              onClick={() => {
                isEditing(false), userInfo;
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="save"
            onClick={(e) => {
              e.preventDefault();
              setIsEditing(true);
            }}
          >
            Edit
          </button>
        )}
      </form>
      <br />
      <br />
      <br />
      <br />

      {isAdmin && (
        <form onSubmit={(e) => handleNewAdmin(e)}>
          <label className="addmin">Add an admin:</label>
          <input
            placeholder="Add an admin"
            type="text"
            value={newAdmin}
            onChange={(e) => setNewAdmin(e.target.value)}
          />
          <button type="submit" className="save">
            Add
          </button>
        </form>
      )}
      <p id="errorText"></p>
    </div>
  );
};

export default Profile;
