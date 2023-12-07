import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CatTesting = () => {
  const [catImageUrl, setCatImageUrl] = useState(null);
  const [showCat, setShowCat] = useState(false);
  const [checklist, setChecklist] = useState([
    { id: 1, label: 'Item 1', checked: false },
    { id: 2, label: 'Item 2', checked: false },
    { id: 3, label: 'Item 3', checked: false },
  ]);
  const [newItemLabel, setNewItemLabel] = useState('');

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

  const handleCheck = (itemId) => {
    setChecklist((prevChecklist) => {
      const updatedChecklist = prevChecklist.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      );

      // Check if the item is being checked
      if (updatedChecklist.find((item) => item.id === itemId)?.checked) {
        getRandomCatGif();
      } else {
        // If the item is being unchecked, reset the cat image state
        setCatImageUrl(null);
        setShowCat(false);
      }

      return updatedChecklist;
    });
  };

  const handleAddItem = () => {
    if (newItemLabel.trim() !== '') {
      const newItem = {
        id: checklist.length + 1,
        label: newItemLabel.trim(),
        checked: false,
      };

      setChecklist((prevChecklist) => [...prevChecklist, newItem]);
      setNewItemLabel('');
    }
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

      {checklist.map((item) => (
        <div key={item.id}>
          <input
            type="checkbox"
            id={`item${item.id}`}
            checked={item.checked}
            onChange={() => handleCheck(item.id)}
          />
          <label htmlFor={`item${item.id}`}>{item.label}</label>
        </div>
      ))}

      <div>
        <input
          type="text"
          placeholder="Enter new item"
          value={newItemLabel}
          onChange={(e) => setNewItemLabel(e.target.value)}
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>

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
