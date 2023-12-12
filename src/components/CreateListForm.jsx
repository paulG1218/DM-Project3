import React, { useState } from "react";

const CreateListForm = ({ addList }) => {
  const [listName, setListName] = useState("");
  const [dueDate, setDueDate] = useState("");

  return (
    <>
      <form
        className="addList"
        onSubmit={(e) => addList(e, { listName: listName, dueDate: dueDate })}
      >
        <input
          type="text"
          value={listName}
          placeholder="List Name"
          onChange={(e) => setListName(e.target.value)}
        />
        <br />
        <input
          type="date"
          value={dueDate}
          placeholder="Due Date"
          onChange={(e) => setDueDate(e.target.value)}
        />
        <br />
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default CreateListForm;
