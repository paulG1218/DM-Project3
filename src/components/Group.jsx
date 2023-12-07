import React from "react";
import List from "./List.jsx";

export const Group = ({lists}) => {

  const listDisplay = lists.map((list) => 
  <List key={list.listId} tasks={list.tasks} list={list} />
  )

  return <div>
    {listDisplay}
  </div>;
};
