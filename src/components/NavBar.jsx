import React, { useEffect } from "react";
import "../css/NavBar.css";
import { useSelector } from "react-redux";
import { IoMdMenu } from "react-icons/io";
import { GiCheckMark } from "react-icons/gi";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.login.userId);
  const username = useSelector((state) => state.login.username);
  const score = useSelector((state) => state.login.score);

  const sessionCheck = async () => {
    await axios.get("/api/sessionCheck").then((res) => {
      if (res.data.userId) {
        dispatch({
          type: "authenticated",
          payload: res.data,
        });
      } else {
        console.log(res.data);
      }
    });
  };

  const handleLogout = async () => {
    const res = await axios.get("/api/logout");
    if (!res.data) {
      return;
    }
    dispatch({
      type: "logout",
    });
    console.log("user logged out ");
    navigate("/");
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
        {userId ? (
          <>
            <h1 className="title">Checkr</h1>
            <h2 className="userScore">
              {username}'s Score : {score}
            </h2>
          </>
        ) : (
          <h1 className="title">Checkr</h1>
        )}
      </div>

      <div id="mySidebar" className="sidebar">
        <div className="sidebarHead">
          <a href="/" className="logo">
            <GiCheckMark />
          </a>
          <a
            href="javascript:void(0)"
            className="closebtn"
            onClick={() => closeNav()}
          >
            &times;
          </a>
        </div>
        {userId ? (
          <a href={`/profile`}>{username}</a>
        ) : (
          <a href="/login">Login</a>
        )}
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>

        {userId && <a onClick={() => handleLogout()}>Logout</a>}
      </div>
    </>
  );
};

export default NavBar;
