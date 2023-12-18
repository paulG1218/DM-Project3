import React, { useState } from "react";
import "../css/CreateListForm.css";
import "../css/Home.css";

const CreateListForm = ({ addList, showForm, setShowForm, errorMessage }) => {
  const [listName, setListName] = useState("");
  const [dueDate, setDueDate] = useState("");

  return (
    <div className={`create-list-modal ${showForm ? "show" : ""}`}>
      <form
        className="create-list-modal-content"
        onSubmit={async (e) => {
          const res = await addList(e, {
            listName: listName,
            dueDate: dueDate,
          });
          if (res === "Success") {
            setListName("");
            setDueDate("");
          }
          return;
        }}
      >
        <div className="form-group">
          <label htmlFor="listName">List Name:</label>
          <input
            type="text"
            id="listName"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            maxLength={35}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="addBtn" type="submit">
            Add
          </button>
          <button
            className="create-list-cancelBtn"
            type="button"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </div>
        {errorMessage && <div id="errorTxt">Please fill out both fields.</div>}
      </form>
    </div>
  );
};

export default CreateListForm;
