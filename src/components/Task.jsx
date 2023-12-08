import React, {useState} from 'react'
import axios from 'axios';

const Task = ({task}) => {

    const {title, taskId, checked} = task

    const [isChecked, setIsChecked] = useState(checked)

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

  const handleCheck = async (e, taskId) => {
    const currentTask = document.getElementById(e.target.id);
    // currentTask.disabled = true
    console.log(taskId);
    const res = await axios.put("/api/checkTask", { taskId: taskId });
    if (res.data === "failed") {
      console.log("shit");
      return;
    } else {
        setIsChecked(true)
      console.log(res.data);
    }
  };

    return (
        <div className="taskRow">
          <input
            type="checkbox"
            className="checkbox"
            id={`${title}-${taskId}`}
            disabled={isChecked}
            checked={isChecked}
            readOnly={isChecked}
            onClick={(e) => handleCheck(e, taskId)}
          ></input>
          <p className="task">{title}</p>
        </div>
      );
}

export default Task
