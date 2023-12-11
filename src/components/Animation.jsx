// Animation.jsx

import React, { useEffect, useState } from "react";
import "../Animation.css";

const Animation = ({ showAnimation }) => {
  const [animationVisible, setAnimationVisible] = useState(false);

  useEffect(() => {
    if (showAnimation) {
      setAnimationVisible(true);

      const timeoutId = setTimeout(() => {
        setAnimationVisible(false);
      }, 3000);

      // Clear the timeout on component unmount
      return () => clearTimeout(timeoutId);
    }
  }, [showAnimation]);

  return (
    <div className={`animation-container ${animationVisible ? "pop-up" : ""}`}
        style={{position: "absolute", top: "2%", right: "3%"}}
    >
      +10
    </div>
  );
};

export default Animation;
