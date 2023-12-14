import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import List from "../components/List.jsx";
import { useNavigate } from "react-router-dom";
import "../css/Groups.css";
import "../css/LeaveGroupModal.css"
import axios from 'axios';


const GroupPage = () => {
  const { group, userId } = useLoaderData();

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  const handleLeaveGroup = async () => {
    const res = await axios.delete(`/api/leaveGroup/${group.groupId}`)

    console.log('User removed from the group:', res.data)
    setShowModal(false)
  }

  const handleModal = () => {
    
    setShowModal(!showModal)
    console.log("Modal state:", showModal);
  };

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
        <button className="leaveGroupBtn" onClick={handleModal}>Leave Group</button>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2 className="modalHeader">Leave Group</h2>
              <p>Are you sure you want to leave this group?</p>
              <div className="modal-buttons">
                <button className="modalBtn" onClick={handleLeaveGroup}>Leave Group</button>
                <button className="modalBtn" onClick={handleModal}>Cancel</button>
              </div>
            </div>
          </div>
        )}
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
