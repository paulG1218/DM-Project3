import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CatTesting = () => {
  const [catImageUrl, setCatImageUrl] = useState(null);
  const [showCat, setShowCat] = useState(false);
  const [checkboxes, setCheckboxes] = useState({
    1: false,
    2: false,
    3: false,
  });

  const getRandomCatGif = async () => {
    try {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search?order=random&format=gif');
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
    setCheckboxes((prevCheckboxes) => {
      const updatedCheckboxes = { ...prevCheckboxes, [checkboxNumber]: !prevCheckboxes[checkboxNumber] };

      // Check if the checkbox is being checked
      if (updatedCheckboxes[checkboxNumber]) {
        getRandomCatGif();
      } else {
        // If the checkbox is being unchecked, reset the cat image state
        setCatImageUrl(null);
        setShowCat(false);
      }

      return updatedCheckboxes;
    });
  };

  useEffect(() => {
    // Clean up when the component unmounts
    return () => {
      setCatImageUrl(null);
      setShowCat(false);
    };
  }, []);

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
