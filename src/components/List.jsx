import React, { useState } from "react";
import axios from "axios";
import Task from "./Task.jsx";
import "../css/List.css";
import { useNavigate } from "react-router-dom";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";

import { AnimationEasy, AnimationMedium, AnimationHard } from "./Animation.jsx";
import { useSelector, useDispatch } from "react-redux";
import AddTaskForm from "./AddTaskForm.jsx";

const List = ({ list, ownerId }) => {
  const navigate = useNavigate();
  
  const dispatch = useDispatch();

  const [tasks, setTasks] = useState(list.tasks)


  const [checkStates, setCheckStates] = useState(tasks.map((task) => task.checked));
  
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

  const [isActive, setIsActive] = useState(false);
  
  const [showTaskForm, setShowTaskForm] = useState(false)
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
    navigate("/GameBoard");
  };

  const handleCloseStory = () => {
    setShowReward({ ...showReward, story: false });
  };

  const taskDisplay = tasks.map((task, index) => {

    const handleCheck = async (e, taskId) => {

      const res = await axios.put("/api/checkTask", { taskId: taskId });
      if (res.data === "failed") {
        console.log("Failed to check task");
        return;
      } else {
        task = res.data.task;
        setCheckStates(prevCheckStates => {
          const updatedCheckStates = [...prevCheckStates];
          updatedCheckStates[index] = true;
          return updatedCheckStates;
        })

        switch (task.difficulty) {
          case 1:
            getRandomCatGif();
            setShowAnimation(true);
            dispatch({ type: "updateScore", payload: { points: 5 } });
            break;
          case 2:
            getRandomStory();
            setShowAnimation2(true);
            dispatch({ type: "updateScore", payload: { points: 10 } });
            break;
          case 3:
            getSnakeGame();
            console.log("TODO");
            setShowAnimation3(true);
            dispatch({ type: "updateScore", payload: { points: 20 } });
            break;
        }
      }
    };



    

    return (
      <Task
        key={task.taskId}
        task={task}
        handleCheck={handleCheck}
        checkState={checkStates[index]}
      />
    );
  });

  const handleAddTask = async (e, formData) => {
    e.preventDefault()
    console.log({when: 'start', list: list})
    const res = await axios.post('/api/addTask', {...formData, listId: list.listId, groupListId: list.groupListId})
    console.log(res.data)
    setTasks(res.data.tasks)
    console.log({data: res.data.tasks})

    setShowTaskForm(false)
  }


  const toggleAccordion = () => {
    setIsActive(!isActive);
  };


  const [isHovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };
  return (
    <div>
      <div className={`accordion-item ${isActive ? "active" : ""}`}>
        <div className="accordion-header" >
          <h2 className="listHeader" onClick={toggleAccordion} onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        
        cursor: isHovered ? 'pointer' : 'default',
      }} >
            {list.listName ? list.listName : list.groupListName}
            {isActive ? <TiArrowSortedUp className="dropArrow"/> : <TiArrowSortedDown className="dropArrow"/>}
          </h2>
          <div className="addTask">
            {isActive &&
              <button className="addTaskButton" onClick={() => {
                setShowTaskForm(true) 
              }}>Add</button>
            }
          </div>
        </div>
        <div className="accordion-body">
          {/* Render your taskDisplay content here */}
          {isActive && <div className="checklist-display">{taskDisplay}</div>}
          {showTaskForm && <AddTaskForm handleAddTask={handleAddTask}/>}
        </div>
      </div>

      <div className="list">
        <AnimationEasy showAnimation={showAnimation} />
        <AnimationMedium showAnimation2={showAnimation2} />
        <AnimationHard showAnimation3={showAnimation3} />
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
    </div>
  );
};

export default List;
