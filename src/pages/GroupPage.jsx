import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLoaderData } from "react-router-dom";
import List from "../components/List.jsx";
import { useNavigate } from "react-router-dom";
import "../css/LeaveGroupModal.css";
import "../css/Groups.css";
import axios from 'axios';
import LeaveGroupModal from "../components/LeaveGroupModal.jsx";

const GroupPage = () => {
  const { group, userId } = useLoaderData();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showLeaveGroupModal, setShowLeaveGroupModal] = useState(false);

  const handleLeaveGroupModal = () => setShowLeaveGroupModal(!showLeaveGroupModal)

  const handleLeaveGroup = async () => {
    const res = await axios.delete(`/api/leaveGroup/${group.groupId}`);
    console.log('User removed from the group:', res.data);
    dispatch({
      type: 'leave_group',
      payload: res.data.groupMembers
    });
    setShowLeaveGroupModal(false)
    window.location.href = '/'
  }

  useEffect(() => {
    if (
      group.groupMembers.filter((mem) => mem.userId === userId).length <= 0 ||
      !userId
    ) {
      navigate("/");
      console.log(userId);
    }
  }, []);

  const listDisplay = group.groupLists.map((list) => (
    <List key={list.groupListId} tasks={list.tasks} list={list} />
  ));

  const memberList = group.groupMembers.map((member) => {
    return <li key={member.user.userId}>{member.user.username}</li>;
  });

  return (
    <div>
      <h1 className="pageHeader">{group.groupName}</h1>
      <div>
        {group.userId !== userId && 
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
          </div>
        }
      </div>
      <div className="groupListDisplay">
        <h1>Lists</h1>
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
  );
};

export default GroupPage;
