import React, { useState } from "react";
import "../css/TaskForm.css";

const AddTaskForm = ({ handleAddTask, setShowTaskForm }) => {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState(1);

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleAddTask(e, {
            title: title,
            difficulty: difficulty,
          });
        }}
      >
        <button
          className="cancelBtn"
          onClick={(e) => {
            e.preventDefault();
            setShowTaskForm(false);
          }}
        >
          Cancel
        </button>
        <input
          className="titleBox"
          placeholder="Title"
          value={title}
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className="diff"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button type="submit" className="addTaskBtn" disabled={title === ""}>
          Add task
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;
