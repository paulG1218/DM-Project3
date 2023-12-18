import React, { useState } from "react";
import axios from "axios";
import '../css/Task.css'
import { MdDeleteForever } from "react-icons/md";


const Task = ({ task, handleCheck, isEditingList, handleDeleteTask }) => {
  const { title, taskId } = task;

  return (
    <div className="taskRow">
      {isEditingList ? (
        <button className="delete-task-button" onClick={() => handleDeleteTask(taskId)}>
          <MdDeleteForever />
        </button>
      ) : ( 
      <input
          type="checkbox"
          className="checkbox"
          id={`${title}-${taskId}`}
          onChange={() => handleCheck(taskId)}
        />
        )}
      <p className="task">{title}</p>
    </div>
  );
};

export default Task;
