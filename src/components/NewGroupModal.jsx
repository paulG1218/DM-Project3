import React, {useState} from 'react'
import '../css/NewGroupModal.css'
import axios from 'axios';

const NewGroupModal = ({show, handleModal}) => {

    const [groupName, setGroupName] = useState('')

    const focusFirst = () => {
        setTimeout(() => {
          document.getElementById('newGroupName').focus();
        }, 50);
      };

      const handleCreate = async () => {
        const res = await axios.post('/api/createGroup', {groupName: groupName})

        switch (res.data.message) {
            case 'created':
                window.location.href = `/groups/${res.data.group.groupId}`
                break;
            case 'no user':
                window.location.href = '/login'
                break;
            default:
                window.location.href = '/login'

        }
      }

    return (
        <>
          <div className="container-new">
            <div className="create-group-interior">
              <a
                className="btn"
                href="#open-new-modal"
                id="openNewGroupButton"
                onClick={() => {
                    handleModal()
                    focusFirst()
                }}
              >
                Create New Group
              </a>
            </div>
          </div>
          {show ? (
          <div id="open-new-modal" className="new-modal-window">
            <div>
              <a
                title="Close"
                class="modal-close"
                onClick={() => {
                  handleModal()
                }}
              >
                Close
              </a>
              <h1>Name your Group:</h1>
              <br />
              <div className="joinGroupCodeBox">
                <input 
                    type='text' 
                    id='newGroupName' 
                    placeholder='New Group' 
                    value={groupName} 
                    onChange={(e) => setGroupName(e.target.value)}
                    maxLength={15}
                ></input>
              </div>
              <div>
                <p id="errorTxt"></p>
              </div>
              <div>
                <button className="joinSubmit" onClick={() => {
                    handleCreate()
                    }}>
                  Create
                </button>
              </div>
            </div>
          </div>) : null}
        </>
        )
}

export default NewGroupModal
