import React, { useState } from "react";
import axios from "axios";
import '../css/Task.css'

const Task = ({ task, handleCheck, checkState }) => {
  const { title, taskId } = task;

  return (
    <div className="taskRow">
     
      <input
        type="checkbox"
        className="checkbox"
        id={`${title}-${taskId}`}
        disabled={checkState}
        checked={checkState}
        readOnly={checkState}
        onChange={(e) => handleCheck(e, taskId)}
      ></input>
      <p className="task">{title}</p>
    </div>
  );
};

export default Task;
