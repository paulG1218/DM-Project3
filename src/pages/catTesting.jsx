import React, { useState } from 'react';
import axios from 'axios';

const CatTesting = () => {
  const [catImageUrl, setCatImageUrl] = useState(null);
  const [showCat, setShowCat] = useState(false);
  const [checkboxes, setCheckboxes] = useState({
    1: false,
    2: false,
    3: false,
  });
  const [tasks, setTasks] = useState([]);

  const getRandomCatGif = async () => {
    try {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search?order=random&format=gif');
      // Assuming the response data has a 'url' property
      const gifUrl = response.data[0]?.url;
      setCatImageUrl(gifUrl);
      setShowCat(true);

      // Play the spring sound
      const audio = new Audio('https://sfxcontent.s3.amazonaws.com/soundfx/Spring-Boing.mp3');
      audio.play();
    } catch (error) {
      console.error('Error fetching random cat GIF:', error);
    }
  };

  const handleCloseCat = () => {
    setShowCat(false);
  };

  const handleCheckboxChange = (checkboxNumber) => {
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [checkboxNumber]: !prevCheckboxes[checkboxNumber],
    }));

    if (!checkboxes[checkboxNumber]) {
      getRandomCatGif();
    }
  };

  const handleAddTask = () => {
    const newTask = prompt('Enter the new task:');
    if (newTask) {
      setTasks((prevTasks) => [...prevTasks, { task: newTask, checked: false }]);
    }
  };

  const handleTaskCheckboxChange = (index) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index].checked = !updatedTasks[index].checked;
      return updatedTasks;
    });

    // You may add additional logic here based on checkbox change for tasks
  };

  return (
    <div>
      <h2>Random Cat GIF Testing</h2>

      {Object.keys(checkboxes).map((checkboxNumber) => (
        <React.Fragment key={checkboxNumber}>
          <input
            type="checkbox"
            id={`garage${checkboxNumber}`}
            name={checkboxNumber}
            checked={checkboxes[checkboxNumber]}
            onChange={(e) => handleCheckboxChange(e.target.name)}
          />
          <label htmlFor={`garage${checkboxNumber}`}> Clean Garage{checkboxNumber}</label>
        </React.Fragment>
      ))}

      <button onClick={handleAddTask}>Add Task</button>

      {tasks.map((task, index) => (
        <div key={index}>
          <input
            type="checkbox"
            id={`task${index}`}
            checked={task.checked}
            onChange={() => handleTaskCheckboxChange(index)}
          />
          <label htmlFor={`task${index}`}>{task.task}</label>
        </div>
      ))}

      {showCat && (
        <div className="cat-container">
          <button className="close-button" onClick={handleCloseCat}>
            X
          </button>
          <img
            src={catImageUrl}
            alt="Random Cat GIF"
            style={{ width: '300px', height: '200px' }}
          />
        </div>
      )}
    </div>
  );
};

export default CatTesting;
