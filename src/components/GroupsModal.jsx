import React, { useState } from "react";
import "../css/GroupModal.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GroupsModal = ({ show, handleModal }) => {
  const [joinCodeState, setJoinCodeState] = useState({
    pos1: { disabled: false, value: "" },
    pos2: { disabled: true, value: "" },
    pos3: { disabled: true, value: "" },
    pos4: { disabled: true, value: "" },
    pos5: { disabled: true, value: "" },
    pos6: { disabled: true, value: "" },
  });

  const navigate = useNavigate();

  const handleJoin = async () => {
    const res = await axios.put("/api/addMember", {
      code:
        joinCodeState.pos1.value +
        joinCodeState.pos2.value +
        joinCodeState.pos3.value +
        joinCodeState.pos4.value +
        joinCodeState.pos5.value +
        joinCodeState.pos6.value,
    });

    const errorTxt = document.getElementById("errorTxt");
    switch (res.data.message) {
      case "added":
        setJoinCodeState({
          pos1: { disabled: false, value: "" },
          pos2: { disabled: true, value: "" },
          pos3: { disabled: true, value: "" },
          pos4: { disabled: true, value: "" },
          pos5: { disabled: true, value: "" },
          pos6: { disabled: true, value: "" },
        });
        handleModal();
        window.location.href = `/groups/${res.data.groupMember.groupId}`
        break;
      case "no group":
        errorTxt.innerText = "Group does not exist";
        break;
      case "no user":
        navigate("/");
        break;
      case "already in":
        errorTxt.innerText = "Already a member.";
        break;
      default:
        errorTxt.innerText = "Something went wrong";
        break;
    }
  };

  //I had to set a Timeout to wait for the pop-up to load before trying to focus it

  const focusFirst = () => {
    setTimeout(() => {
      document.getElementById("pos1").focus();
    }, 50);
  };

  const handleKeyDown = (e) => {
    switch (e.target.id) {
      case "pos1":
        if (e.key !== "" && Number.isInteger(+e.key)) {
          setJoinCodeState({
            ...joinCodeState,
            pos1: {
              ...joinCodeState.pos1,
              value: e.key,
              disabled: true,
            },
            pos2: { ...joinCodeState.pos2, disabled: false },
          });
          setTimeout(() => {
            document.getElementById("pos2").focus();
          }, 10);
        } else {
          setJoinCodeState({
            ...joinCodeState,
            pos1: { ...joinCodeState.pos1, value: "" },
          });
        }
        break;
      case "pos2":
        console.log(Number.isInteger(+e.key));
        if (e.key !== "" && Number.isInteger(+e.key)) {
          setJoinCodeState({
            ...joinCodeState,
            pos2: {
              ...joinCodeState.pos2,
              value: e.key,
              disabled: true,
            },
            pos3: { ...joinCodeState.pos3, disabled: false },
          });
          setTimeout(() => {
            document.getElementById("pos3").focus();
          }, 10);
        } else if (e.keyCode === 8) {
          setJoinCodeState({
            ...joinCodeState,
            pos1: {
              ...joinCodeState.pos1,
              value: "",
              disabled: false,
            },
            pos2: {
              ...joinCodeState.pos2,
              value: "",
              disabled: true,
            },
          });
          setTimeout(() => {
            document.getElementById("pos1").focus();
          }, 10);
        }
        break;
      case "pos3":
        if (e.key !== "" && Number.isInteger(+e.key)) {
          setJoinCodeState({
            ...joinCodeState,
            pos3: {
              ...joinCodeState.pos3,
              value: e.key,
              disabled: true,
            },
            pos4: { ...joinCodeState.pos4, disabled: false },
          });
          setTimeout(() => {
            document.getElementById("pos4").focus();
          }, 10);
        } else if (e.keyCode === 8) {
          setJoinCodeState({
            ...joinCodeState,
            pos2: {
              ...joinCodeState.pos2,
              value: "",
              disabled: false,
            },
            pos3: {
              ...joinCodeState.pos3,
              value: "",
              disabled: true,
            },
          });
          setTimeout(() => {
            document.getElementById("pos2").focus();
          }, 10);
        }
        break;
      case "pos4":
        if (e.key !== "" && Number.isInteger(+e.key)) {
          setJoinCodeState({
            ...joinCodeState,
            pos4: {
              ...joinCodeState.pos4,
              value: e.key,
              disabled: true,
            },
            pos5: { ...joinCodeState.pos5, disabled: false },
          });
          setTimeout(() => {
            document.getElementById("pos5").focus();
          }, 10);
        } else if (e.keyCode === 8) {
          setJoinCodeState({
            ...joinCodeState,
            pos3: {
              ...joinCodeState.pos3,
              value: "",
              disabled: false,
            },
            pos4: {
              ...joinCodeState.pos4,
              value: "",
              disabled: true,
            },
          });
          setTimeout(() => {
            document.getElementById("pos3").focus();
          }, 10);
        }
        break;
      case "pos5":
        if (e.key !== "" && Number.isInteger(+e.key)) {
          setJoinCodeState({
            ...joinCodeState,
            pos5: {
              ...joinCodeState.pos5,
              value: e.key,
              disabled: true,
            },
            pos6: { ...joinCodeState.pos6, disabled: false },
          });
          setTimeout(() => {
            document.getElementById("pos6").focus();
          }, 10);
        } else if (e.keyCode === 8) {
          setJoinCodeState({
            ...joinCodeState,
            pos4: {
              ...joinCodeState.pos4,
              value: "",
              disabled: false,
            },
            pos5: {
              ...joinCodeState.pos5,
              value: "",
              disabled: true,
            },
          });
          setTimeout(() => {
            document.getElementById("pos4").focus();
          }, 10);
        }
        break;
      case "pos6":
        if (e.key !== "" && Number.isInteger(+e.key)) {
          setJoinCodeState({
            ...joinCodeState,
            pos6: {
              ...joinCodeState.pos6,
              value: e.key,
            },
          });
        } else if (e.keyCode === 8) {
          if (joinCodeState.pos6.value !== "") {
            setJoinCodeState({
              ...joinCodeState,
              pos6: {
                ...joinCodeState.pos6,
                value: "",
                disabled: false,
              },
            });
          } else {
            setJoinCodeState({
              ...joinCodeState,
              pos5: {
                ...joinCodeState.pos5,
                value: "",
                disabled: false,
              },
              pos6: {
                ...joinCodeState.pos6,
                value: "",
                disabled: true,
              },
            });
            setTimeout(() => {
              document.getElementById("pos5").focus();
            }, 10);
          }
        } else if (e.keyCode === 13 && joinCodeState.pos6.value !== "") {
          handleJoin();
        }
        break;
    }
  };

  return (
    <div className="groupsModal">
      <div className="container">
        <div className="interior">
          <a
            className="btn joinGroupBtn"
            href="#open-modal"
            id="openJoinCodeButton"
            onClick={() => {
              handleModal();
              focusFirst();
            }}
          >
            + Join a group
          </a>
        </div>
      </div>
      {show ? (
        <div id="open-modal" className="modal-window">
          <div>
            <a
              title="Close"
              class="modal-close"
              onClick={() => {
                setJoinCodeState({
                  pos1: { disabled: false, value: "" },
                  pos2: { disabled: true, value: "" },
                  pos3: { disabled: true, value: "" },
                  pos4: { disabled: true, value: "" },
                  pos5: { disabled: true, value: "" },
                  pos6: { disabled: true, value: "" },
                });
                handleModal();
              }}
            >
              Close
            </a>
            <h1>Join a group</h1>
            <div>Enter a group code to join!</div>
            <br />
            <div className="joinGroupCodeBox">
              <input
                type="text"
                className="joinGroupCode"
                id="pos1"
                maxLength={1}
                disabled={joinCodeState.pos1.disabled}
                onKeyDown={(e) => handleKeyDown(e)}
                value={joinCodeState.pos1.value}
                readOnly={joinCodeState.pos1.disabled}
              />
              <input
                type="text"
                className="joinGroupCode"
                id="pos2"
                maxLength={1}
                disabled={joinCodeState.pos2.disabled}
                onKeyDown={(e) => handleKeyDown(e)}
                value={joinCodeState.pos2.value}
                readOnly={joinCodeState.pos2.disabled}
              />
              <input
                type="text"
                className="joinGroupCode"
                id="pos3"
                maxLength={1}
                disabled={joinCodeState.pos3.disabled}
                onKeyDown={(e) => handleKeyDown(e)}
                value={joinCodeState.pos3.value}
                readOnly={joinCodeState.pos3.disabled}
              />
              <input
                type="text"
                className="joinGroupCode"
                id="pos4"
                maxLength={1}
                disabled={joinCodeState.pos4.disabled}
                onKeyDown={(e) => handleKeyDown(e)}
                value={joinCodeState.pos4.value}
                readOnly={joinCodeState.pos4.disabled}
              />
              <input
                type="text"
                className="joinGroupCode"
                id="pos5"
                maxLength={1}
                disabled={joinCodeState.pos5.disabled}
                onKeyDown={(e) => handleKeyDown(e)}
                value={joinCodeState.pos5.value}
                readOnly={joinCodeState.pos5.disabled}
              />
              <input
                type="text"
                className="joinGroupCode"
                id="pos6"
                maxLength={1}
                disabled={joinCodeState.pos6.disabled}
                onKeyDown={(e) => handleKeyDown(e)}
                value={joinCodeState.pos6.value}
                readOnly={joinCodeState.pos6.disabled}
              />
            </div>
            <div>
              <p id="errorTxt"></p>
            </div>
            <div>
              <button
                className="joinSubmit"
                onClick={() => {
                  handleJoin();
                }}
              >
                Join
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default GroupsModal;
