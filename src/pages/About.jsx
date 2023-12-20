import React from "react";
import "../css/About.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const redirect = useNavigate();

  const [isHovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleClick = () => {
    redirect("/Kyle");
  };

  return (
    <>
      <div className="aboutPage">
        <h1 className="aboutTitle">
          Welcome to <div className="checkr">Checkr</div>!
        </h1>
        <div className="infoBox">
          <div className="one">
            <h4 id="numberedList">1. Start Your Journey</h4>
            <h5 className="subHeader">
              Sign Up:
              <p className="points">
                Begin by creating your account on our user-friendly platform.
              </p>
            </h5>
          </div>
          <div className="two">
            <h4 id="numberedList">2. Home Page</h4>
            <h5 className="subHeader">
              Overview:
              <p className="overviewPoints">
                Your home page displays personal and group lists by due date for
                a comprehensive view.
              </p>
            </h5>
          </div>
          <div className="three">
            <h4 id="numberedList">3. Task Rewards</h4>
            <h5 className="subHeader">
              Levels:
              <div id="numbers">
                <p className="points">
                  1. (5 Points): Cat photos await for easy tasks.
                </p>
                <p className="points">
                  2. (10 Points): Enjoy short stories for moderately challenging
                  tasks.
                </p>
                <p className="points">
                  3. (20 Points): Finish tough tasks to play the snake game.
                </p>
              </div>
            </h5>
          </div>
          <div className="four">
            <h4 id="numberedList">4. Group Dynamics</h4>
            <h5 className="subHeader">
              Create or Join a Group:
              <p className="points">
                Collaborate by forming a group or joining with a code.
              </p>
            </h5>
            <h5 className="subHeader">
              Editing Lists:
              <p className="points">
                Group owners manage lists to ensure coordination.
              </p>
            </h5>
            <h5 className="subHeader">
              Group Pages:
              <p className="points">
                Strategize tasks with group members on dedicated pages.
              </p>
            </h5>
          </div>
          <div className="five">
            <h4 id="numberedList">5. Track Your Achievements</h4>
            <h5 className="subHeader">
              Completed Tasks:
              <p className="points">
                A dedicated list showcases your accomplishments.
              </p>
            </h5>
            <h5 className="subHeader">
              Scoreboard:
              <p className="points">
                Quantify your journey with points earned for each task.
              </p>
            </h5>
          </div>
        </div>
      </div>
      <footer className="contact">
        <a
          onClick={handleClick}
          className="contactLink"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            cursor: isHovered ? "pointer" : "default",
          }}
        >
          Contact us...
        </a>{" "}
        Or don't, we won't care either way.
      </footer>
    </>
  );
};

export default About;
