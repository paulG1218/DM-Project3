import React, { useState } from "react";
import axios from "axios";
import '../css/Task.css'
import { MdDeleteForever } from "react-icons/md";

const Task = ({ task, handleCheck, checkState, isEditingList, handleDeleteTask }) => {
  const { title, taskId } = task;
  const [isHovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div className="taskRow">
      {isEditingList ? (
        <button className="delete-task-button" onClick={() => handleDeleteTask(taskId)}>
          <MdDeleteForever />
        </button>
      ): null}
      {!isEditingList ? (
        <input
          type="checkbox"
          className="checkbox"
          id={`${title}-${taskId}`}
          disabled={checkState}
          checked={checkState}
          readOnly={checkState}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            cursor: isHovered ? "pointer" : "default",
          }}
          onChange={(e) => handleCheck(e, taskId)}
        />
      ): null}
      <p className="task">{title}</p>
    </div>
  );
};

export default Task;
