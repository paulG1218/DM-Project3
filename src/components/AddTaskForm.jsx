import React, { useState } from "react";

const AddTaskForm = ({handleAddTask, setShowTaskForm}) => {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState(1)

  return (
    <div>
      <form onSubmit={(e)=>{
        handleAddTask(e,{
            title: title,
            difficulty: difficulty,
        })

      }}>
        <button
          className="cancelButton"
           onClick={(e) => {
            e.preventDefault()
          setShowTaskForm(false);
          }}
        >
         Cancel
       </button>
        <input
          placeholder="title"
          value={title}
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={difficulty} onChange={(e)=> setDifficulty(e.target.value)}>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
        </select>
      <button type="submit" disabled={title === ''}>
        Add task
      </button>
      </form>

    </div>
  );
};

export default AddTaskForm;
