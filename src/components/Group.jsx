import React, { useEffect } from "react";
import List from "./List.jsx";
import { FaPlus } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import { useState } from "react";
import CreateGroupListForm from "./CreateGroupListForm.jsx";
import axios from "axios";
import "../css/GroupComponent.css";
import { useSelector } from "react-redux";

const Group = ({ group }) => {
  const { groupName, groupLists, groupId, userId } = group;
  const [groupListState, setGroupListState] = useState(groupLists);

  const currentUser = useSelector((state) => state.login.userId)

  const [showGroupForm, setShowGroupForm] = useState(false);
  const [errorGroupMessage, setErrorGroupMessage] = useState(false);

  useEffect(() => {
    setErrorGroupMessage(false);
  }, [showGroupForm]);

  const toggleGroupForm = (e) => {
    setShowGroupForm(!showGroupForm);
  };

  const addGroupList = async (e, groupFormData) => {
    e.preventDefault();
    if (!groupFormData.groupListName || !groupFormData.dueDate) {
      setErrorGroupMessage(true);
      return;
    }

    const res = await axios.post(`/api/addGroupList/${groupId}`, groupFormData);
    const newGroupList = res.data.groupLists;

    setGroupListState([...groupListState, newGroupList]);

    setErrorGroupMessage(false);

    setShowGroupForm(false);
  };

  const listDisplay = groupListState.map((list) => {
    const handleDeleteList = async () => {
      if (
        list.groupListName &&
        confirm(`Are you sure you want to delete ${list.groupListName}?`)
      ) {
        const res = await axios.delete(
          `/api/deleteGroupList/${list.groupListId}`
        );
        if (res.data === "success") {
          console.log("Group List Deleted");
          setGroupListState(
            groupListState.filter((el) => el.groupListId !== list.groupListId)
          );
        }
      }
    };
    return (
      <List
        key={list.groupListId}
        tasks={list.tasks}
        list={list}
        ownerId={userId}
        handleDeleteList={handleDeleteList}
      />
    );
  });

  return (
    <div>
      <div className="addGroupLBtn">
        <h1 className="groupHeading">
          <a href={`/groups/${groupId}`} className="groupName">
            {groupName}
          </a>
          {currentUser === userId &&
          <button onClick={toggleGroupForm} className="addGroupListBtn">
            <FaPlus />
            <CiViewList />
          </button>
          }
        </h1>
      </div>
      {showGroupForm ? (
        <div className="addGroupList">
          <CreateGroupListForm
            addGroupList={addGroupList}
            errorGroupMessage={errorGroupMessage}
          />
        </div>
      ) : (
        <div className="addGroupList"></div>
      )}
      <br />
      {listDisplay}
    </div>
  );
};

export default Group;
