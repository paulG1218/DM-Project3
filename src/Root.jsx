import React from 'react'
import { Outlet } from "react-router-dom";
import NavBar from "./src/components/NavBar.jsx";

const Root = () => {
  return (
    <>
      <NavBar />

      <Outlet />
    </>
  )
}

export default Root
