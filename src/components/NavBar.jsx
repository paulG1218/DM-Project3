import React, { useEffect } from "react";
import "../css/NavBar.css";
import { useSelector } from "react-redux";
import { IoMdMenu } from "react-icons/io";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.login.userId);
  const username = useSelector((state) => state.login.username);

  const sessionCheck = async () => {
    await axios.get("/api/sessionCheck").then((res) => {
      if (res.data.userId) {
        dispatch({
          type: "authenticated",
          payload: res.data,
        });
        console.log(res.data.userId);
        console.log(res.data.isAdmin);
      } else {
        console.log(res.data);
      }
    });
  };

  const handleLogout = async () => {
    await axios.delete("/api/logout");
    dispatch({
      type: "logout",
    });
    console.log("user logged out ");
  };

  useEffect(() => sessionCheck, [userId]);

  function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
  }

  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
  }

  return (
    <>
      <div className="topnav">
        <div id="icon">
          <button className="openbtn" onClick={() => openNav()}>
            &#9776;
          </button>
        </div>
        <h1 className="title">Title</h1>
      </div>

      <div id="mySidebar" className="sidebar">
        <div className="sidebarHead">
          <a href="/" className="logo">
            LOGO
          </a>
          <a
            href="javascript:void(0)"
            className="closebtn"
            onClick={() => closeNav()}
          >
            &times;
          </a>
        </div>
      {userId ?
        <a href={`/profile`}>{username}</a>
        : <a href="/login">Login</a>
      }
      <a href="#">Services</a>
      <a href="#">Clients</a>
      <a href="#">Contact</a>

      <button onClick={handleLogout}>Logout</button>
    </div>
    </>
  );
};

export default NavBar;
