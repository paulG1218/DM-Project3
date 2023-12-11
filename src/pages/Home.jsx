import React, { useState } from "react";
import { useSelector } from "react-redux";
import List from "../components/List.jsx";
import Group from "../components/Group.jsx";
import "../css/Home.css";
import { FaPlus } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import CreateListForm from "../components/CreateListForm.jsx";
import CreateGroupListForm from "../components/CreateGroupListForm.jsx";

const Home = () => {
  const userId = useSelector((state) => state.login.userId);
  const lists = useSelector((state) => state.login.lists);
  const groups = useSelector((state) => state.login.groups);

  const [showForm, setShowForm] = useState(false);
  const [showGroupForm, setShowGroupForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const toggleGroupForm = () => {
    setShowGroupForm(!showGroupForm);
  };

  const addList = async (e, FormData) => {
    e.preventDefault();
    setShowForm(false);
    await axios.post("/api/addList", FormData);
  };

  const addGroupList = async (e, groupFormData) => {
    e.preventDefault();
    setShowGroupForm(false);
    await axios.post("/api/addGroupList", groupFormData);
  };

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
        <button onClick={toggleForm}>
          <FaPlus />
          <CiViewList />
          {showForm && <CreateListForm addList={addList} />}
        </button>
        <hr className="homeLines" />
        {listDisplay}
      </div>
      <div className="listDisplay">
        <h1>Group List's</h1>
        <button onClick={toggleGroupForm}>
          <FaPlus />
          <CiViewList />
          {showGroupForm && <CreateGroupListForm addGroupList={addGroupList} />}
        </button>
        <hr className="homeLines" />
        {groupDisplay}
      </div>
    </div>
  );
};

export default Home;
