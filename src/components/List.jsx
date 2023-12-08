// List.jsx

import React, { useState } from "react";
import axios from "axios";
import Task from "./Task.jsx";
import "../css/List.css";
import { useNavigate } from "react-router-dom";

const List = ({ list }) => {
  const navigate = useNavigate();
  const tasks = list.tasks;

  const [catImageUrl, setCatImageUrl] = useState(null);
  const [showCat, setShowCat] = useState(false);

  const getRandomCatGif = async () => {
    try {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search?order=random&format=gif"
      );
      const gifUrl = response.data[0]?.url;
      setCatImageUrl(gifUrl);
      setShowCat(true);

      // Play the spring sound
      const audio = new Audio(
        "https://sfxcontent.s3.amazonaws.com/soundfx/Spring-Boing.mp3"
      );
      audio.play();
    } catch (error) {
      console.error("Error fetching random cat GIF:", error);
    }
  };

  const handleCloseCat = () => {
    setShowCat(false);
  };

  const taskDisplay = tasks.map((task) => {
    const [checkState, setCheckState] = useState(task.checked);

    const handleCheck = async (e, taskId) => {
      const res = await axios.put("/api/checkTask", { taskId: taskId });
      if (res.data === "failed") {
        console.log("Failed to check task");
        return;
      } else {
        task = res.data.task;
        setCheckState(true);
    
        // Check if the task has difficulty level 1 before displaying cat image
        if (task.difficulty === 1) {
          getRandomCatGif(); // Fetch cat image and play sound on task check
        }
      }
    };

    return (
      <Task
        key={task.taskId}
        task={task}
        handleCheck={handleCheck}
        checkState={checkState}
      />
    );
  });

  return (
    <div className="list">
      <h2>{list.listName}</h2>
      <h2>{list.groupListName}</h2>
      {taskDisplay}

      {showCat && (
        <div className="cat-container">
          <button className="close-button" onClick={handleCloseCat}>
            X
          </button>
          <img
            src={catImageUrl}
            alt="Random Cat GIF"
            style={{ width: "300px", height: "200px" }}
          />
        </div>
      )}
    </div>
  );
};

export default List;

