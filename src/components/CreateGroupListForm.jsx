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
        />
        <br />
        <input type="date" defaultValue={dueDate} placeholder="Due Date" />
        <br />
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default CreateGroupListForm;
