import React, { useState } from "react";
import "../css/CreateGroupListFormModal.css";

const CreateGroupListForm = ({ addGroupList, showGroupForm, setShowGroupForm, errorGroupMessage }) => {
  const [groupListName, setGroupListName] = useState("");
  const [dueDate, setDueDate] = useState("");

  return (
    <div className={`create-group-list-modal ${showGroupForm ? "show" : ""}`}>
      <form
        className="create-group-list-modal-content"
        onSubmit={(e) =>
          addGroupList(e, { groupListName: groupListName, dueDate: dueDate })
        }
      >
        <div className="form-groupList">
          <label htmlFor="groupListName">Group List Name:</label>
          <input
            type="text"
            value={groupListName}
            id="groupListName"
            onChange={(e) => setGroupListName(e.target.value)}
          />
        </div>
        <div className="form-groupList">
          <label htmlFor="groupListDueDate">Due Date:</label>
          <input
            type="date"
            value={dueDate}
            id="groupListDueDate"
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="form-groupList">
          <button type="submit" className="add-group-btn">
            Add
          </button>

          <button
            className="cancelGroupListBtn"
            type="button"
            onClick={() => setShowGroupForm(false)}
          >
            Cancel
          </button>

        </div>
        {errorGroupMessage && <div id="errorTxtGroupList">Please fill out both fields.</div>}
      </form>
    </div>
  );
};

export default CreateGroupListForm;
