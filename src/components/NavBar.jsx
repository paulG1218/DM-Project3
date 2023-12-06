import React from 'react'
import '../css/NavBar.css'
import { useSelector } from 'react-redux';
import { IoMdMenu } from "react-icons/io";

const NavBar = () => {

  const userId = useSelector((state) => state.login.userId);
  const username = useSelector((state) => state.login.username)

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
        <button className="openbtn" onClick={() => openNav()}>&#9776;</button>
      </div>
      <h1 className='title'>Title</h1>
    </div>

    <div id="mySidebar" className="sidebar">
      <div className='sidebarHead'>
        <a href='/' className='logo'>LOGO</a>
        <a href="javascript:void(0)" className="closebtn" onClick={() => closeNav()}>&times;</a>
      </div>
      {userId ?
      <a href={`/profile/${userId}`}>{username}</a>
      : <a href="/login">Login</a>
      }
      <a href="#">Services</a>
      <a href="#">Clients</a>
      <a href="#">Contact</a>
    </div>
    </>
  )
}

export default NavBar