import React from "react";
import List from "./List.jsx";

const Group = ({group}) => {

  const {groupName, groupLists, groupId} = group

  const listDisplay = groupLists.map((list) => 
  <List key={list.groupListId} tasks={list.tasks} list={list} />
  )

  return <div>
    <h1>
      <a href={`/groups/${groupId}`}>{groupName}</a>
    </h1>
    {listDisplay}
  </div>;
};

export default Group