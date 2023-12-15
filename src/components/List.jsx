import React, { useState } from "react";
import axios from "axios";
import Task from "./Task.jsx";
import "../css/List.css";
import { useNavigate } from "react-router-dom";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import { AnimationEasy, AnimationMedium, AnimationHard } from "./Animation.jsx";
import { useDispatch } from "react-redux";
import AddTaskForm from "./AddTaskForm.jsx";
import { FaPencilAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/js/src/modal";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const List = ({ list, handleDeleteList }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [tasks, setTasks] = useState(
    list.tasks.filter((task) => !task.checked)
  );
  const [completedTasks, setCompleteTasks] = useState(
    list.tasks.filter((task) => task.checked)
  );
  const [checkStates, setCheckStates] = useState(
    tasks.map((task) => task.checked)
  );
  const [titleState, setTitleState] = useState(
    list.listName ? list.listName : list.groupListName
  );
  const [dateState, setDateState] = useState(list.dueDate);
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
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [isEditingList, setIsEditingList] = useState(false);
  const [completedIsActive, setCompletedIsActive] = useState(false);
  const [isHovered, setHovered] = useState(false);

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
        setCheckStates((prevCheckStates) => {
          const updatedCheckStates = [...prevCheckStates];
          updatedCheckStates[index] = true;
          return updatedCheckStates;
        });

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
            setShowAnimation3(true);
            dispatch({ type: "updateScore", payload: { points: 20 } });
            break;
        }
      }
      handleShow();
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
        checkState={checkStates[index]}
        isEditingList={isEditingList}
        handleDeleteTask={handleDeleteTask}
      />
    );
  });

  const completedTaskDisplay = completedTasks.map((task) => {
    return (
      <div className="taskRow">
        <input
          type="checkbox"
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
    setCompleteTasks(res.data.tasks.filter((task) => task.checked));

    setShowTaskForm(false);
  };

  const toggleAccordion = () => {
    setIsActive(!isActive);
  };

  const toggleCompletedAccordion = () => {
    setCompletedIsActive(!completedIsActive);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      {/* <Button variant="primary" onClick={handleShow}>
                      Launch demo modal
                    </Button> */}

      <Modal show={show} onHide={handleClose} variant="dark">
        <Modal.Header closeButton>
          <Modal.Title>Cat Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          1cat
          {catImageUrl ?? (
            <img
              src={catImageUrl}
              alt="Random Cat GIF"
              style={{ width: "300px", height: "200px" }}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show} onHide={handleClose} style={{ color: "black" }}>
        <Modal.Header closeButton>
          <Modal.Title>Short Story</Modal.Title>
        </Modal.Header>
        <Modal.Body>{story ?? { story }}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={`accordion-item ${isActive ? "active" : ""}`}>
        <div className="accordion-header">
          {isEditingList ? (
            <h2>
              <input
                value={titleState}
                className="editInput"
                type="text"
                maxLength={25}
                onChange={(e) => setTitleState(e.target.value)}
              />
              <input
                className="editInput"
                value={dateState}
                type="date"
                onChange={(e) => setDateState(e.target.value)}
              />
            </h2>
          ) : (
            <h2
              className="listHeader"
              onClick={toggleAccordion}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                cursor: isHovered ? "pointer" : "default",
              }}
            >
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
                    />
                  </>
                ) : (
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
                )}
              </>
            )}
          </div>
        </div>
        <div className="accordion-body">
          {isActive && <div className="checklist-display">{taskDisplay}</div>}
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
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                  cursor: isHovered ? "pointer" : "default",
                }}
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

      <div className="list">
        <AnimationEasy showAnimation={showAnimation} />
        <AnimationMedium showAnimation2={showAnimation2} />
        <AnimationHard showAnimation3={showAnimation3} />
        {showReward.cat && (
          <div className="cat-container">
            Hello from cat
            <div
              className="modal fade"
              id="catImg"
              tabIndex="-1"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <button className="close-button" onClick={handleCloseCat}>
                    X
                  </button>

                  <div
                    className="modal show"
                    style={{ display: "block", position: "initial" }}
                  ></div>

                  <>
                    <Button variant="primary" onClick={handleShow}>
                      Launch demo modal
                    </Button>

                    <Modal
                      show={show}
                      onHide={handleClose}
                      style={{ color: "black" }}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Cat Picture</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <img
                          src={catImageUrl}
                          alt="Random Cat GIF"
                          style={{ width: "300px", height: "200px" }}
                        />
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </>
                </div>
              </div>
            </div>
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
