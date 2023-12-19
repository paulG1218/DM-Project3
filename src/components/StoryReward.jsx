import React from 'react';
import '../css/Reward.css';
import { useState } from 'react';
// import spinner from './public/spinner.svg'
const StoryReward = ({handleModal, showModal, story, setStory}) => {


  return (
    <div className='reward' style={{display: (showModal ? "block" : "none")}}>
      <div id="open-story-reward" className="reward-content">
              <button
                className="reward-modal-close"
                onClick={() => {
                  setStory('')
                  handleModal()
                }}
              >
                Close
              </button>
              <br/>
              <h1 className='modal-title'>A short story:</h1>
              <br />
              <div className="storyRewardDisplay">
                {story ? (
                  <div>{story}</div>
                  ) : (
                  <img src='Spinner3.svg'  />
                )}
              </div>
                </div>
    </div>
  )
}

export default StoryReward
