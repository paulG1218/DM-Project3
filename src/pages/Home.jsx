import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLoaderData, NavLink } from "react-router-dom";
import List from "../components/List.jsx";
import Group from "../components/Group.jsx";
import "../css/Home.css";

const Home = () => {
  const userId = useSelector((state) => state.login.userId);
  const lists = useSelector((state) => state.login.lists);
  const groups = useSelector((state) => state.login.groups);

  if (!userId) {
    return (

      <div>
        <h1>Welcome to Checkr</h1>
        <p>
          Where you are able to manage your personal and professional tasks all
          in one place.
          <br />
          Please{" "}
          <a className="loginLink" href="/login">
            Login
          </a>{" "}
          to view your account. If you don't have an account{" "}
          <a className="loginLink" href="/registerNewUser">
            Register Here
          </a>
          .
        </p>
      </div>
    );
  }

  const listDisplay = lists.map((list) => {
    return <List key={list.listId} list={list} />;
  });

  const groupDisplay = groups.map((group) => {
    return <Group key={group.groupId} group={group}/>;
  });

  return (
    <div className="dailyView">
      <h1 className="pageHeader">Daily View</h1>
      <div className="listDisplay">
        <h1>Lists</h1>
        <hr className="homeLines"/>
        {listDisplay}
      </div>
      <div className="listDisplay">
        <h1>Groups</h1>
        <hr className="homeLines"/>
        {groupDisplay}
      </div>
    </div>
  );
};

export default Home;
