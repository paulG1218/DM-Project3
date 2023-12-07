import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import List from "../components/List.jsx";
import "../css/Home.css";

const Home = () => {
  const userId = useSelector((state) => state.login.userId);
  const lists = useSelector((state) => state.login.lists);

  console.log(lists);

  if (!userId) {
    return <p>TODO if no user logged in</p>;
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
