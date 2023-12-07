import React from "react";
import "../css/List.css";

const List = ({ tasks, list }) => {
  const taskDisplay = tasks.map((task) => {
    return (
      <div className="taskRow">
        <input type="checkbox" className="checkbox"></input>
        <p className="task">{task.title}</p>
      </div>
    );
  });

  return (
    <div className="list">
      <h2>{list.listName}</h2>
      {taskDisplay}
    </div>
  );
};

export default List;
