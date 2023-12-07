import React, { useState } from 'react';
import axios from 'axios';

const CatTesting = () => {
  const [catImageUrl, setCatImageUrl] = useState(null);

  const getRandomCatGif = async () => {
    try {
      const response = await axios.get('https://api.thecatapi.com/v1/images/search?order=random&format=gif');
      // Assuming the response data has a 'url' property
      const gifUrl = response.data[0]?.url;
      setCatImageUrl(gifUrl);

      // Play the spring sound
      const audio = new Audio('https://sfxcontent.s3.amazonaws.com/soundfx/Spring-Boing.mp3');
      audio.play();
    } catch (error) {
      console.error('Error fetching random cat GIF:', error);
    }
  };

  const handleButtonClick = () => {
    getRandomCatGif();
  };

  return (
    <div>
      <h2>Random Cat GIF Testing</h2>
      <button onClick={handleButtonClick}>Fetch Random Cat GIF</button>
      {catImageUrl && <img src={catImageUrl} alt="Random Cat GIF" style={{ width: '300px', height: '200px' }} />}
    </div>
  );
};

export default CatTesting;
