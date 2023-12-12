// List.jsx

import React, { useState } from "react";
import axios from "axios";
import Task from "./Task.jsx";
import "../css/List.css";
import { useNavigate } from "react-router-dom";
import { AnimationEasy, AnimationMedium ,AnimationHard } from "./Animation.jsx";
import { useSelector, useDispatch } from "react-redux";

const List = ({ list }) => {
  const navigate = useNavigate();
  const tasks = list.tasks;

  const dispatch = useDispatch()

  const state = useSelector((state) => state.login)

  const [catImageUrl, setCatImageUrl] = useState(null);
  const [story, setStory] = useState("");
  const [score, setScore] = useState(0);
  const [showReward, setShowReward] = useState({
    cat: false,
    story: false,
    game: false,
  });
  const [showAnimation, setShowAnimation] = useState(false);
  const [showAnimation2, setShowAnimation2] = useState(false);
  const [showAnimation3, setShowAnimation3] = useState(false);
  const getRandomCatGif = async () => {
    try {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search?order=random&format=gif"
      );
      const gifUrl = response.data[0]?.url;
      setCatImageUrl(gifUrl);
      setShowReward({ ...showReward, cat: true });

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
    setShowReward({ ...showReward, cat: false });
  };

  const getRandomStory = async () => {
    const res = await axios.get("https://shortstories-api.onrender.com/");
    setStory(res.data.story);
    setShowReward({ ...showReward, story: true });

    const audio = new Audio(
      "http://sfxcontent.s3.amazonaws.com/soundfx/SlideWhistle.mp3"
    );
    audio.play();
  };

  const getSnakeGame = () => {
    navigate("/GameBoard")
  }

  const handleCloseStory = () => {
    setShowReward({ ...showReward, story: false });
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

        switch (task.difficulty) {
          case 1:
            getRandomCatGif();
            setShowAnimation(true);
            dispatch({ type: 'updateScore', payload: { points: 5 } });
            break;
          case 2:
            getRandomStory();
            setShowAnimation2(true)
            dispatch({ type: 'updateScore', payload: { points: 10 } });
            break;
          case 3: 
          getSnakeGame()
            console.log("TODO");
            setShowAnimation3(true);
            dispatch({ type: 'updateScore', payload: { points: 20 } });
            break;
        }
        console.log(state)
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
      <AnimationEasy showAnimation={showAnimation} />
      <AnimationMedium showAnimation2={showAnimation2} />
      <AnimationHard showAnimation3={showAnimation3} />
      {taskDisplay}
      {showReward.cat && (
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
      {showReward.story && (
        <div className="story">
          {story}
          <button onClick={handleCloseStory}>X</button>
        </div>
      )}

     
    </div>
  );
};

export default List;
