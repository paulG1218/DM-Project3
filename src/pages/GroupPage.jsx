import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import List from "../components/List.jsx";
import { useNavigate } from "react-router-dom";
import "../css/Groups.css";
import axios from 'axios';
import { useDispatch } from "react-redux";

const GroupPage = () => {
  const { group, userId } = useLoaderData();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLeaveGroup = async () => {
    const res = await axios.delete(`/api/leaveGroup/${group.groupId}`);
    console.log('User removed from the group:', res.data);
    dispatch({
      type: 'leave_group',
      payload: res.data.groupMembers
    });
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
        {group.userId === userId ? (
            <h4>Code: {group.code}</h4>
          ) : (
            <button className="leaveGroupBtn" onClick={handleLeaveGroup}>Leave Group</button>
          )
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
