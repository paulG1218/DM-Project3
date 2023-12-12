import React, { useState } from "react";

const CreateGroupListForm = ({ addGroupList }) => {
  const [groupListName, setGroupListName] = useState("");
  const [dueDate, setDueDate] = useState("");

  return (
    <>
      <form
        className="addList"
        onSubmit={(e) =>
          addGroupList(e, { groupListName: groupListName, dueDate: dueDate })
        }
      >
        <input
          type="text"
          defaultValue={groupListName}
          placeholder="Group List Name"
          onChange={(e) => setGroupListName(e.target.value)}
        />
        <br />
        <input
          type="date"
          defaultValue={dueDate}
          placeholder="Due Date"
          onChange={(e) => setDueDate(e.target.value)}
        />
        <br />
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default CreateGroupListForm;
