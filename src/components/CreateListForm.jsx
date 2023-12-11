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
        <input type="text" defaultValue={listName} placeholder="List Name" />
        <br />
        <input type="date" defaultValue={dueDate} placeholder="Due Date" />
        <br />
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default CreateListForm;
