import React, {useState} from "react";
import axios from "axios";
import Task from "./Task.jsx";
import "../css/List.css";
import { useNavigate } from "react-router-dom";

const List = ({ list }) => {

    const navigate = useNavigate()

    const tasks = list.tasks
    
    const taskDisplay = tasks.map((task) => {
        
        const [checkState, setCheckState] = useState(task.checked)
        
        const handleCheck = async (e, taskId) => {
        const res = await axios.put("/api/checkTask", { taskId: taskId });
        if (res.data === "failed") {
            console.log("shit");
            return;
        } else {
            task = res.data.task
            setCheckState(true)
        }
      };

    return <Task key={task.taskId} task={task} handleCheck={handleCheck} checkState={checkState}/>
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
