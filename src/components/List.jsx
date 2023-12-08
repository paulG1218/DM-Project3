import React from "react";
import axios from "axios";
import Task from "./Task.jsx";
import "../css/List.css";

const List = ({ tasks, list }) => {
  


  const taskDisplay = tasks.map((task) => {
    return <Task task={task}/>
  });

  return (
    <div className="list">
      <h2>{list.listName}</h2>
      <h2>{list.groupListName}</h2>
      {taskDisplay}
    </div>
  );
};

export default List;
