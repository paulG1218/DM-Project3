import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import List from "../components/List.jsx";
import { useNavigate } from "react-router-dom";
import "../css/Groups.css";

const GroupPage = () => {
  const { group, userId } = useLoaderData();

  const navigate = useNavigate();

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
