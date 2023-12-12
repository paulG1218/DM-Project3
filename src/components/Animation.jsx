// Animation.jsx

import React, { useEffect, useState } from "react";
import "../Animation.css";

export const AnimationEasy = ({ showAnimation }) => {
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
      +5
    </div>
  );
};

 export const AnimationMedium = ({ showAnimation2 }) => {
    const [animationVisible, setAnimationVisible] = useState(false);
  
    useEffect(() => {
      if (showAnimation2) {
        setAnimationVisible(true);
  
        const timeoutId = setTimeout(() => {
          setAnimationVisible(false);
        }, 3000);
  
        // Clear the timeout on component unmount
        return () => clearTimeout(timeoutId);
      }
    }, [showAnimation2]);
  
    return (
      <div className={`animation-container ${animationVisible ? "pop-up" : ""}`}
          style={{position: "absolute", top: "2%", right: "3%"}}
      >
        +10
      </div>
    );
  };
 export const AnimationHard = ({ showAnimation3 }) => {
    const [animationVisible, setAnimationVisible] = useState(false);
  
    useEffect(() => {
      if (showAnimation3) {
        setAnimationVisible(true);
  
        const timeoutId = setTimeout(() => {
          setAnimationVisible(false);
        }, 3000);
  
        // Clear the timeout on component unmount
        return () => clearTimeout(timeoutId);
      }
    }, [showAnimation3]);
  
    return (
      <div className={`animation-container ${animationVisible ? "pop-up" : ""}`}
          style={{position: "absolute", top: "2%", right: "3%"}}
      >
        +20
      </div>
    );
  };
  

// export default {AnimationEasy, animationVisible, Animationhard};

