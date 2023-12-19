import React, { useState } from "react";
import axios from "axios";
import Task from "./Task.jsx";
import "../css/List.css";
import { useNavigate } from "react-router-dom";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { AnimationEasy, AnimationMedium, AnimationHard } from "./Animation.jsx";
import { useDispatch, useSelector } from "react-redux";
import AddTaskForm from "./AddTaskForm.jsx";
import { FaPencilAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import CatReward from "./CatReward.jsx";
import StoryReward from "./StoryReward.jsx";

const List = ({ list, handleDeleteList, setGroupScore, ownerId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.login.userId)

  const [tasks, setTasks] = useState(
    list.tasks.filter((task) => !task.checked)
  );
  const [completedTasks, setCompletedTasks] = useState(
    list.tasks.filter((task) => task.checked)
  );

  const [titleState, setTitleState] = useState(
    list.listName ? list.listName : list.groupListName
  );
  const [dateState, setDateState] = useState(list.dueDate);
  const [catImageUrl, setCatImageUrl] = useState(null);
  const [story, setStory] = useState("");
  const [showReward, setShowReward] = useState({
    cat: false,
    story: false,
    game: false,
  });
  const [showAnimation, setShowAnimation] = useState({
    easy: false,
    med: false,
    hard: false,
  });
  const [isActive, setIsActive] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [isEditingList, setIsEditingList] = useState(false);
  const [completedIsActive, setCompletedIsActive] = useState(false);
  const [loadingStory, setLoadingStory] = useState(false);
  // const [showSpinner, setShowSpinner] = useState(true);
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

  const getRandomStory = async () => {
    try {
      setLoadingStory(true);
      const res = await axios.get("https://shortstories-api.onrender.com/");
      setStory(res.data.story);
      setShowReward({ ...showReward, story: true });
      setLoadingStory(false);

      const audio = new Audio(
        "http://sfxcontent.s3.amazonaws.com/soundfx/SlideWhistle.mp3"
      );
      audio.play();
    } catch (error) {
      console.error("Error fetching random story:", error);
      setLoadingStory(false);
    }
  };

  const getSnakeGame = () => {
    navigate("/GameBoard");
  };

  const taskDisplay = tasks.map((task) => {
    const groupTask = (list.listName ? false : true)
    const handleCheck = async (taskId) => {
      const res = await axios.put("/api/checkTask", { taskId: taskId, groupTask: groupTask, groupId: list.groupId });
      if (res.data === "failed") {
        console.log("Failed to check task");
        return;
      } else if (groupTask) {
        task = res.data.task;
        setTasks(tasks.filter((t) => t.taskId !== task.taskId))
        switch (task.difficulty) {
          case 1:
            getRandomCatGif();
            setShowReward({ ...showReward, cat: true });
            setGroupScore(res.data.updatedUserScore)
            break;
          case 2:
            getRandomStory();
            setShowReward({ ...showReward, story: true });
            setGroupScore(res.data.updatedUserScore)
            break;
          case 3:
            getSnakeGame();
            setShowReward({ ...showReward, game: true });
            setGroupScore(res.data.updatedUserScore)
            break;
        }
      } else {
        task = res.data.task;
        setTasks(tasks.filter((t) => t.taskId !== task.taskId))
        switch (task.difficulty) {
          case 1:
            getRandomCatGif();
            setShowReward({ ...showReward, cat: true });
            setShowAnimation({ ...showAnimation, easy: true });
            dispatch({ type: "updateScore", payload: { points: 5 } });
            break;
          case 2:
            getRandomStory();
            setShowReward({ ...showReward, story: true });
            setShowAnimation({ ...showAnimation, med: true });
            dispatch({ type: "updateScore", payload: { points: 10 } });
            break;
          case 3:
            getSnakeGame();
            setShowReward({ ...showReward, game: true });
            setShowAnimation({ ...showAnimation, hard: true });
            dispatch({ type: "updateScore", payload: { points: 20 } });
            break;
        }
      }
    };

    const handleDeleteTask = async (taskId) => {
      const res = await axios.delete(`/api/deleteTask/${taskId}`);

      if (res.data === "Task successfully deleted.") {
        console.log("Delete Task with ID:", taskId);
        setTasks(tasks.filter((task) => task.taskId !== taskId));
      }
    };

    return (
      <Task
        key={task.taskId}
        task={task}
        handleCheck={handleCheck}
        isEditingList={isEditingList}
        handleDeleteTask={handleDeleteTask}
      />
    );
  });

  const completedTaskDisplay = completedTasks.map((task) => {
    return (
      <div className="taskRow" key={task.taskId}>
        <input
          type="checkbox"
          key={task.taskId}
          checked={true}
          readOnly={true}
          disabled={true}
        ></input>
        <p className="complete-task">{task.title}</p>
      </div>
    );
  });

  const handleAddTask = async (e, formData) => {
    e.preventDefault();
    const res = await axios.post("/api/addTask", {
      ...formData,
      listId: list.listId,
      groupListId: list.groupListId,
    });
    setTasks(res.data.tasks.filter((task) => !task.checked));
    setCompletedTasks(res.data.tasks.filter((task) => task.checked));

    setShowTaskForm(false);
  };

  const toggleAccordion = () => {
    setIsActive(!isActive);
  };

  const toggleCompletedAccordion = () => {
    setCompletedIsActive(!completedIsActive);
  };

  const handleSaveList = async () => {
    if (list.listName) {
      await axios
        .put("/api/editList", {
          titleState: titleState,
          listId: list.listId,
          dateState: dateState,
        })
        .then((res) => {
          setTitleState(res.data.listName);
          setDateState(res.data.dueDate);

          setIsEditingList(false);
        });
    } else if (list.groupListName) {
      await axios
        .put("/api/editGroupList", {
          titleState: titleState,
          groupListId: list.groupListId,
          dateState: dateState,
        })
        .then((res) => {
          setTitleState(res.data.groupListName);
          setDateState(res.data.dueDate);

          setIsEditingList(false);
        });
    }
  };

  return (
    <div>
      <CatReward
        handleModal={() =>
          setShowReward({ ...showReward, cat: !showReward.cat })
        }
        cat={catImageUrl}
        showModal={showReward.cat}
      />
      <StoryReward
        handleModal={() =>
          setShowReward({ ...showReward, story: !showReward.story })
        }
        story={story}
        showModal={showReward.story}
        setStory={setStory}
      />
      <div className={`accordion-item ${isActive ? "active" : ""}`}>
        <AnimationEasy showAnimation={showAnimation.easy} />
        <AnimationMedium showAnimation2={showAnimation.med} />
        <AnimationHard showAnimation3={showAnimation.hard} />
        <div className="accordion-header">
          {isEditingList ? (
            <h4>
              <input
                type="text"
                className="editInput"
                value={titleState}
                onChange={(e) => setTitleState(e.target.value)}
                maxLength={35}
              />
              <input
                type="date"
                className="editInput"
                value={new Date(dateState).toISOString().split("T")[0]}
                onChange={(e) => {
                  setDateState(e.target.value);
                }}
              />
            </h4>
          ) : (
            <h2 className="listNameHeader" onClick={toggleAccordion}>
              {titleState}
              {isActive ? (
                <TiArrowSortedUp
                  className="dropArrow"
                  onClick={toggleAccordion}
                />
              ) : (
                <TiArrowSortedDown
                  className="dropArrow"
                  onClick={toggleAccordion}
                />
              )}
            </h2>
          )}
          <div className="addTask">
            {isActive && (
              <>
                {isEditingList ? (
                  <>
                    <button
                      className="deleteButton"
                      onClick={() => handleDeleteList()}
                    >
                      <MdDeleteForever />
                    </button>
                    <button
                      className="saveButton"
                      onClick={() => handleSaveList()}
                    >
                      Save
                    </button>
                    <button
                      className="cancelButton"
                      onClick={() => {
                        setIsEditingList(false), titleState;
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  ownerId === userId ? (
                    <>
                    <button
                    className="editButton"
                    onClick={(e) => setIsEditingList(true)}
                    >
                    <FaPencilAlt />
                    </button>
                    <button
                    className="addTaskButton"
                    onClick={() => {
                      setShowTaskForm(true);
                    }}
                    >
                    Add
                    </button>
                    </>
                  ) : null
                )}
              </>
            )}
          </div>
        </div>
        <div className="accordion-body">
          {isActive && <div className="checklist-display">
            {taskDisplay}
            {taskDisplay.length === 0 && !showTaskForm && !isEditingList ?
              <h4>You're all done!</h4> : null
            }
          </div>}
          {showTaskForm && (
            <AddTaskForm
              handleAddTask={handleAddTask}
              setShowTaskForm={setShowTaskForm}
            />
          )}
          {completedTasks.length > 0 && (
            <div className="completed-accordion">
              <div
                className="completed-header"
                onClick={toggleCompletedAccordion}
              >
                <h4 className="completed-title">Completed</h4>
                {completedIsActive ? (
                  <TiArrowSortedUp className="dropArrow" />
                ) : (
                  <TiArrowSortedDown className="dropArrow" />
                )}
              </div>
              {completedIsActive && (
                <div className="completed-accordion-body">
                  {completedTaskDisplay}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
