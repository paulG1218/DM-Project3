import React from 'react';
import '../css/Reward.css';

const StoryReward = ({handleModal, showModal, story}) => {
  return (
    <div className='reward' style={{display: (showModal ? "block" : "none")}}>
      <div id="open-story-reward" className="reward-content">
              <button
                className="reward-modal-close"
                onClick={() => {
                    handleModal()
                }}
              >
                Close
              </button>
              <br/>
              <h1 className='modal-title'>A short story:</h1>
              <br />
              <div className="storyRewardDisplay">
                {story}
              </div>
          </div>
    </div>
  )
}

export default StoryReward
