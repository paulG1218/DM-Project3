import React, { useEffect } from "react";
import List from "./List.jsx";
import { FaPlus } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import { useState } from "react";
import CreateGroupListForm from "./CreateGroupListForm.jsx";
import axios from "axios";

const Group = ({ group }) => {
  const { groupName, groupLists, groupId, userId } = group;
  const [groupListState, setGroupListState] = useState(groupLists);

  const [showGroupForm, setShowGroupForm] = useState(false);
  const [errorGroupMessage, setErrorGroupMessage] = useState(false);

  useEffect(() => {
    setErrorGroupMessage(false)
  }, [showGroupForm]);

  const toggleGroupForm = (e) => {
    setShowGroupForm(!showGroupForm);
  };

  const addGroupList = async (e, groupFormData) => {
    e.preventDefault();
    if(!groupFormData.groupListName || !groupFormData.dueDate) {
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
    return <List key={list.groupListId} tasks={list.tasks} list={list} ownerId={userId}/>;
  });

  return (
    <div>
      <h1>
        <a href={`/groups/${groupId}`} className="groupName">
          {groupName}
        </a>
      </h1>
      {showGroupForm ? (
        <div className="addGroupList">
          <button onClick={toggleGroupForm} className="addGroupListBtn">
            <FaPlus />
            <CiViewList />
          </button>
          <CreateGroupListForm addGroupList={addGroupList} errorGroupMessage={errorGroupMessage} />
        </div>
      ) : (
        <div className="addGroupList">
          <button onClick={toggleGroupForm} className="addGroupListBtn">
            <FaPlus />
            <CiViewList />
          </button>
        </div>
      )}
      <br />
      {listDisplay}
    </div>
  );
};

export default Group;
