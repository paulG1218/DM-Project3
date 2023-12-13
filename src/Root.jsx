import React from 'react'
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import GroupsModal from './components/GroupsModal.jsx';

const Root = () => {
  return (
    <>
      {/* <GroupsModal show={true} /> */}
      <NavBar />

      <Outlet />
    </>
  )
}

export default Root
