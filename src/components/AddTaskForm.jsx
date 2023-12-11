import React, { useState } from "react";

const AddTaskForm = ({ addNewTask }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [difficulty, setDifficulty] = useState("")
  const [photo, setPhoto] = useState("")

  return (
    <div>
      AddTaskForm
      <form onSubmit={(e)=>{

        addNewTask(e,{
            title: title,
            desc: desc,
            difficulty: difficulty,
            photo: photo

        })

      }}>
    
        <input
          placeholder="titleplaceholder"
          value={title}
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Desc"
          value={desc}
          type="text"
          onChange={(e) => setDesc(e.target.value)}
        />
        <input 
            placeholder="difficltly"
            value={difficulty}
            onChange={(e)=> setDifficulty(e.target.value)}
        />
        <input 
            placeholder="photo"
            value={photo}
            onChange={(e)=> setPhoto(e.target.value)}
        />
      </form>
      <button type="submit">
        funny btn{" "}
      </button>
    </div>
  );
};

export default AddTaskForm;
