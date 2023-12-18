import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import List from "../components/List.jsx";
import Group from "../components/Group.jsx";
import "../css/Home.css";
import "../css/CreateListForm.css";
import { FaPlus } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import CreateListForm from "../components/CreateListForm.jsx";
import axios from "axios";

const Home = () => {
  const userId = useSelector((state) => state.login.userId);
  const groups = useSelector((state) => state.login.groups);
  const initialState = useSelector((state) => state.login.lists);
  const isMemberOf = useSelector((state) => state.login.isMemberOf);

  const sortedLists = initialState.sort((a, b) => {

    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  const [lists, setLists] = useState(sortedLists);
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    setErrorMessage(false);
  }, [showForm]);

  useEffect(() => {
    setLists(initialState);
  }, [initialState]);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const closeForm = () => {
    setShowForm(false)
  }

  const addList = async (e, FormData) => {
    e.preventDefault();
    if (!FormData.listName || !FormData.dueDate) {
      setErrorMessage(true);
      return;
    }

    const res = await axios.post("/api/addList", FormData);
    const newList = res.data.list;

    setLists(
      [...lists, newList].sort(function (a, b) {
        return new Date(a.dueDate) - new Date(b.dueDate);
      })
    );

    setErrorMessage(false);

    setShowForm(false);
  };

  if (!userId) {
    return (
      <div>
        <br />
        <h1 className="welcome">
          Welcome to{"\u00A0"}
          <span className="Checkr">Checkr</span>
        </h1>
        <h3>
          Where you are able to manage your personal and professional tasks all
          in one place.
        </h3>
        <br />
        <a className="loginLinkHome" href="/login">
          Login
        </a>
        <br />
        <a className="loginLinkHome" href="/registerNewUser">
          Register
        </a>
      </div>
    );
  }

  const listDisplay = lists.map((list) => {
    const handleDeleteList = async () => {
      if (
        list.listName &&
        confirm(`Are you sure you want to delete ${list.listName}?`)
      ) {
        const res = await axios.delete(`/api/deleteList/${list.listId}`);
        if (res.data === "success") {
          console.log("List Deleted");
          setLists(lists.filter((el) => el.listId !== list.listId));
        }
      }
    };

    return (
      <List
        key={list.listId}
        list={list}
        ownerId={userId}
        handleDeleteList={handleDeleteList}
      />
    );
  });

  const merge = (a, b, predicate = (a, b) => a === b) => {
    const c = [...a];
    b.forEach((bItem) =>
      c.some((cItem) => predicate(cItem, bItem)) ? null : c.push(bItem)
    );
    return c;
  };

  const groupMap = groups.map((group) => {
    return <Group key={group.groupId} group={group} />;
  });

  const isMemberMap = isMemberOf.map((groupMember) => {
    return <Group key={groupMember.groupId} group={groupMember.group} />;
  });

  const groupDisplay = merge(
    groupMap,
    isMemberMap,
    (a, b) => a.props.group.groupId === b.props.group.groupId
  );

  return (
    <div className="dailyView">
      <h1 className="pageHeader">Daily View</h1>
      <div className="listDisplay">
        <div className="listHeader">
          <h1 className="listTitle">Lists</h1>
            <div className="addListContainer">
              <button onClick={toggleForm} className="addListBtn">
               <FaPlus />
                <CiViewList />
              </button>
            </div>
            <div className="listFormPopup">
              <CreateListForm 
                addList={addList} 
                errorMessage={errorMessage}
                setShowForm={setShowForm}
                showForm={showForm}
              />
            </div>
        </div>
        <br />
        <hr className="homeLines" />
        <div className="listBody">
          {listDisplay}
        </div>
      </div>
      <div className="listDisplay">
        <h1 className="groupListTitles">Group Lists</h1>
        <hr className="homeLines" />
        <div className="listBody">
          {groupDisplay}
        </div>
      </div>
    </div>
  );
};
export default Home;
