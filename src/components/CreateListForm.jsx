import React, { useState } from "react";
import "../css/CreateListForm.css";

const CreateListForm = ({ addList, errorMessage }) => {
  const [listName, setListName] = useState("");
  const [dueDate, setDueDate] = useState("");

  return (
    <>
      <form
        onSubmit={(e) => addList(e, { listName: listName, dueDate: dueDate })}
      >
        <div className="addList">
          <input
            type="text"
            className="listName"
            value={listName}
            placeholder="List Name"
            onChange={(e) => setListName(e.target.value)}
          />
          <input
            type="date"
            className="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <button className="addBtn" type="submit">
            Add
          </button>
        </div>
      </form>
      {errorMessage && <div>Please fill out both fields.</div>}
    </>
  );
};

export default CreateListForm;
