import React from 'react'

const LeaveGroupModal = ({ show, handleLeaveGroupModal, handleLeaveGroup }) => {

  return (
    <div className={`modal ${show ? 'show' : ''}`}>
        <div className="modal-content">
          <h2 className="leave-modal-header">Are you sure you want to leave this group?</h2>
          <div className="modal-buttons">
            <button className="modalBtn" onClick={handleLeaveGroupModal}>Cancel</button>
            <button className="modalBtn" onClick={handleLeaveGroup}>Leave Group</button>
          </div>
        </div>
    </div>
  )
}

export default LeaveGroupModal