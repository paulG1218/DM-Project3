import React, { useEffect, useState } from "react";
import "../css/Groups.css";
import { useSelector } from "react-redux";
import Group from "../components/Group.jsx";
import GroupsModal from "../components/GroupsModal.jsx";
import NewGroupModal from "../components/NewGroupModal.jsx";

const Groups = () => {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);

  const handleJoinModal = () => setShowJoinModal(!showJoinModal);

  const handleNewModal = () => setShowNewModal(!showNewModal)

  const isMemberOf = useSelector((state) => state.login.isMemberOf)
  const groups = useSelector((state) => state.login.groups);

  const merge = (a, b, predicate = (a, b) => a === b) => {
    const c = [...a];
    b.forEach((bItem) => (c.some((cItem) => predicate(bItem, cItem)) ? null : c.push(bItem)))
    return c;
}

const groupMap = groups.map((group) => {
  return <Group key={group.groupId} group={group} />;
});

const isMemberMap = isMemberOf.map((groupMember) => {
  return <Group key={groupMember.groupId} group={groupMember.group} score={groupMember.score}/>;
});

  const groupDisplay = merge(isMemberMap, groupMap, (a, b) => a.props.group.groupId === b.props.group.groupId)

  return (
      <div>
        <div className="pageHeader">
          <h1 className="pageTitle">
            Your Groups
          </h1>
        </div>
        <div className="groupsButtons">
          <GroupsModal show={showJoinModal} handleModal={handleJoinModal} />
          <NewGroupModal className="newGroupModal" show={showNewModal} handleModal={handleNewModal}/>
        </div>
        <div className="groupListDisplay">
          <h1 className="groupListHeader">All</h1>
          <hr className="homeLines" />
          {groupDisplay}
        </div>
      </div>
  );
};

export default Groups;
