import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import List from "../components/List.jsx";
import { Group } from "../components/Group.jsx";
import "../css/Home.css";
import { FaPlus } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import CreateListForm from "../components/CreateListForm.jsx";
import CreateGroupListForm from "../components/CreateGroupListForm.jsx";
import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";

const Home = () => {
  const userId = useSelector((state) => state.login.userId);
  const groups = useSelector((state) => state.login.groups);
  const initialState = useSelector((state) => state.login.lists);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [lists, setLists] = useState(initialState);

  // "lists" was not getting updated once "initialState" got updated.
  // On refresh, the Redux store was wiped, and before it could be repopulated with the promised return of the session check from Home.jsx, initialState grabbed the [] value from the default store initialState
  // When Redux state updates, all components 'watching' with a useSelector (like this one)
  // re-render with the new value, so locally here, 'initialState' became correct, however 'lists' stayed as []
  // This useEffect's dependency array watches for changes to 'initialState' only, and so when initialState gets the correct data, useEffect runs, which updates 'lists'
  useEffect(() => {
    setLists(initialState);
  }, [initialState]);

  console.log("initial state: ", initialState);
  console.log("lists: ", lists);

  const [showForm, setShowForm] = useState(false);
  const [showGroupForm, setShowGroupForm] = useState(false);

  const toggleForm = (e) => {
    setShowForm(!showForm);
  };

  const toggleGroupForm = (e) => {
    setShowGroupForm(!showGroupForm);
  };

  const addList = async (e, FormData) => {
    e.preventDefault();
    const res = await axios.post("/api/addList", FormData);
    const newList = res.data.list;
    console.log(newList);

    setLists([...lists, newList]);

    setShowForm(false);
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
    return <Group key={group.groupId} lists={group.groupLists} />;
  });

  return (
    <div className="dailyView">
      <h1 className="pageHeader">Daily View</h1>
      <div className="listDisplay">
        <h1>Lists</h1>
        {showForm ? (
          <>
            <button onClick={toggleForm}>
              <FaPlus />
              <CiViewList />
            </button>
            <CreateListForm addList={addList} />
          </>
        ) : (
          <button onClick={toggleForm}>
            <FaPlus />
            <CiViewList />
          </button>
        )}
        <hr className="homeLines" />
        {listDisplay}
      </div>
      <div className="listDisplay">
        <h1>Group List's</h1>
        {showGroupForm ? (
          <>
            <button onClick={toggleGroupForm}>
              <FaPlus />
              <CiViewList />
            </button>
            <CreateGroupListForm addList={addGroupList} />
          </>
        ) : (
          <button onClick={toggleGroupForm}>
            <FaPlus />
            <CiViewList />
          </button>
        )}
        <hr className="homeLines" />
        {groupDisplay}
      </div>
    </div>
  );
};

export default Home;
