import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import List from "../components/List.jsx";
import Group from "../components/Group.jsx";
import "../css/Home.css";
import { FaPlus } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import CreateListForm from "../components/CreateListForm.jsx";
import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";

const Home = () => {
  const userId = useSelector((state) => state.login.userId);
  const groups = useSelector((state) => state.login.groups);
  const initialState = useSelector((state) => state.login.lists);

  const [lists, setLists] = useState(initialState);

  useEffect(() => {
    setLists(initialState);
  }, [initialState]);

  const [showForm, setShowForm] = useState(false);

  const toggleForm = (e) => {
    setShowForm(!showForm);
  };

  const addList = async (e, FormData) => {
    e.preventDefault();
    const res = await axios.post("/api/addList", FormData);
    const newList = res.data.list;

    setLists([...lists, newList]);

    setShowForm(false);
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
    return <Group key={group.groupId} group={group} />;
  });

  return (
    <div className="dailyView">
      <h1 className="pageHeader">Daily View</h1>
      <div className="listDisplay">
        <h1 className="listTitle">Lists</h1>
        {showForm ? (
          <div className="addListBtn">
            <button onClick={toggleForm}>
              <FaPlus />
              <CiViewList />
            </button>
            <CreateListForm addList={addList} />
          </div>
        ) : (
          <div className="addListBtn">
            <button onClick={toggleForm}>
              <FaPlus />
              <CiViewList />
            </button>
          </div>
        )}
        <br />
        <hr className="homeLines" />
        {listDisplay}
      </div>
      <div className="listDisplay">
        <h1 className="groupListTitles">Group List's</h1>
        <hr className="homeLines" />
        {groupDisplay}
      </div>
    </div>
  );
};

export default Home;
