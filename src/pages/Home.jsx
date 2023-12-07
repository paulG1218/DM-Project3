import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLoaderData, NavLink } from "react-router-dom";
import List from "../components/List.jsx";
import "../css/Home.css";

const Home = () => {
  const userId = useSelector((state) => state.login.userId);
  const lists = useSelector((state) => state.login.lists);
  const groups = useSelector((state) => state.login.groups);

  console.log(groups);

  if (!userId) {
    return (
      <div>
        <h1>Welcome to Title</h1>
        <p>
          Where you are able to manage your personal and professional tasks all
          in one place. Please{" "}
          <a className="loginLink" href="/login">
            Login
          </a>{" "}
          to view your account
        </p>
      </div>
    );
  }

  const listDisplay = lists.map((list) => {
    console.log(list.tasks);
    return <List key={list.listId} tasks={list.tasks} list={list} />;
  });

  console.log(listDisplay);

  return (
    <>
      <h1>Daily View</h1>
      <div className="listDisplay">
        <h1>List's</h1>
        {listDisplay}
      </div>
      <div>
        <h2>Group's</h2>
        {}
      </div>
    </>
  );
};

export default Home;
