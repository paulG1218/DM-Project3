import React, {useState} from 'react'
import axios from 'axios';

const Task = ({task, handleCheck, checkState}) => {

    const {title, taskId} = task

    const getRandomCatGif = async () => {
        try {
          const response = await axios.get(
            "https://api.thecatapi.com/v1/images/search?order=random&format=gif"
          );
          const gifUrl = response.data[0]?.url;
          setCatImageUrl(gifUrl);
          setShowCat(true);
    
          // Play the spring sound
          const audio = new Audio(
            "https://sfxcontent.s3.amazonaws.com/soundfx/Spring-Boing.mp3"
          );
          audio.play();
        } catch (error) {
          console.error("Error fetching random cat GIF:", error);
        }
      };

    return (
        <div className="taskRow">
          <input
            type="checkbox"
            className="checkbox"
            id={`${title}-${taskId}`}
            disabled={checkState}
            checked={checkState}
            readOnly={checkState}
            onChange={(e) => handleCheck(e, taskId)}
          ></input>
          <p className="task">{title}</p>
        </div>
      );
}

export default Task
