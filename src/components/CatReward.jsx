import React from 'react'

const CatReward = ({handleModal, showModal, cat}) => {
  return (
    <div className='reward' style={{display: (showModal ? "block" : "none")}}>
      <div id="open-cat-reward" className="reward-content">
              <div className="catRewardDisplay">
              <button
                className="reward-modal-close"
                onClick={() => {
                    handleModal()
                }}
              >
                Close
              </button>
                <h1>Cat:</h1>
                <img src={cat} alt="" className='catPic'/>
              </div>
          </div>
    </div>
  )
}

export default CatReward
