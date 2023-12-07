import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLoaderData, NavLink } from "react-router-dom";
import List from "../components/List.jsx";
import { Group } from "../components/Group.jsx";
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

  console.log(groups)

  const groupDisplay = groups.map((group) => {
    return <Group key={group.groupId} lists={group.groupLists}/>
  })

  console.log(listDisplay);

  return (
    <div className="dailyView">
      <h1 className="pageHeader">Daily View</h1>
      <div className="listDisplay">
        <h1>Lists</h1>
        {listDisplay}
      </div>
      <div  className="listDisplay">
        <h1>Groups</h1>
        {groupDisplay}
      </div>
    </div>
  );
};

export default Home;
