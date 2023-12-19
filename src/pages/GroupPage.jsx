import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLoaderData } from "react-router-dom";
import List from "../components/List.jsx";
import { FaPlus } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import "../css/LeaveGroupModal.css";
import "../css/Groups.css";
import "../css/CreateGroupListFormModal.css"
import CreateGroupListForm from "../components/CreateGroupListForm.jsx";
import axios from 'axios';
import LeaveGroupModal from "../components/LeaveGroupModal.jsx";

const GroupPage = () => {
  const { group, userId } = useLoaderData();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ownerId = group.userId

  const [showLeaveGroupModal, setShowLeaveGroupModal] = useState(false);
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [errorGroupMessage, setErrorGroupMessage] = useState(false);
  const [groupState, setGroupState] = useState(group)

  const { groupName, groupLists, groupId } = groupState;

  console.log(groupState)

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
      console.log("error")
      return;
    }

    const res = await axios.post(`/api/addGroupList/${groupId}`, groupFormData);
    const newGroupList = res.data.groupLists;

    setGroupState({...groupState, groupLists: [...groupState.groupLists, newGroupList]})

    setErrorGroupMessage(false);

    setShowGroupForm(false);
  };

  const handleLeaveGroupModal = () =>
    setShowLeaveGroupModal(!showLeaveGroupModal);

  const handleLeaveGroup = async () => {
    const res = await axios.delete(`/api/leaveGroup/${groupState.groupId}`);
    console.log('User removed from the group:', res.data);
    dispatch({
      type: "leave_group",
      payload: res.data.groupMembers,
    });
    setShowLeaveGroupModal(false);
    window.location.href = "/";
  };

  useEffect(() => {
    if (
      groupState.groupMembers.filter((mem) => mem.userId === userId).length <= 0 ||
      !userId
    ) {
      navigate("/");
      console.log(userId);
    }
  }, []);

  const listDisplay = groupState.groupLists.map((list) => {
    const handleDeleteList = async () => {
      if(
        list.groupListName &&
        confirm(`Are you sure you want to delete ${list.groupListName}`)
      ) {
        const res = await axios.delete(`/api/deleteList/${list.groupListId}`);
        if(res.data === "success") {
          console.log("List Deleted");
          setGroupState({...groupState, groupLists: groupState.groupLists.filter((el) => el.groupListId !== list.groupListId)});
        }
      }
    };
     return (
      <List 
        key={list.groupListId} 
        tasks={list.tasks} 
        list={list} 
        handleDeleteList={handleDeleteList}
      />
    );
     });

  const memberList = group.groupMembers.sort((a, b) => b.score - a.score).map((member) => {
    return <li key={member.user.userId}>{member.user.username} ({member.score})</li>;
  });

  return (
    <div className="groupPageContainer">
      <h1 className="pageHeader">{groupState.groupName}</h1>
      <div>
        {ownerId === userId ? (
          <div>
            <h4 className="groupPageCodeDisplay">Code: {groupState.code}</h4>

            <div className="groupContainer">
              <div className="groupListDisplay">
                <div className="groupListPageHeader">
                  <h1 className="groupListsPageTitle">Lists</h1>
                  
                  <div className="addGroupListPageContainer">
                    <button onClick={toggleGroupForm} className="addGroupListBtn-groupPage">
                      <FaPlus />
                      <CiViewList />
                    </button>
                  </div>

                  {showGroupForm &&
                  <div className="addGroupList">
                    <CreateGroupListForm
                      addGroupList={addGroupList}
                      errorGroupMessage={errorGroupMessage}
                      setShowGroupForm={setShowGroupForm}
                      showGroupForm={showGroupForm}
                    />
                  </div>
                  }
                </div>

                <hr className="homeLines" />
                  {listDisplay}
              </div>

              <div className="groupInfo">
                <h1>Group Info</h1>
                <hr className="homeLines" />
                <h3>Members:</h3>
                <ul>{memberList}</ul>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="leave-group-btn-container">
              <button className="leaveGroupBtn" onClick={handleLeaveGroupModal}>
                Leave Group
              </button>
            </div>

            <LeaveGroupModal 
              show={showLeaveGroupModal}
              handleLeaveGroupModal={handleLeaveGroupModal} 
              handleLeaveGroup={handleLeaveGroup}
            />

            <div className="groupContainer">
              <div className="groupListDisplay">
                <h1 className="groupListsPageTitle-NonGroupOwner">Lists</h1>
                <hr className="homeLines" />
                  {listDisplay}
              </div>

              <div className="groupInfo">
                <h1>Group Info</h1>
                <hr className="homeLines" />
                <h3>Members:</h3>
                <ul>{memberList}</ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GroupPage;
