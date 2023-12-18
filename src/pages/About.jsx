import React from "react";
import "../css/About.css";

const About = () => {
  return (
    <div className="aboutPage">
      <h1 className="aboutTitle">
        Welcome to <div className="checkr">Checkr</div>!
      </h1>
      <br />
      <h3>
        We believe in seamlessly blending your personal and professional life
        with an intuitive task management experience.
      </h3>
      <br />
      <div className="instructions">
        <h4>Getting Started Create Your Account:</h4>
        <h5>
          Begin your journey by registering on our user-friendly platform. Your
          gateway to organized living awaits!
        </h5>
        <h6>
          Home: The heart of Checkr is your home page, where you can view both
          your personal, and group Lists that are filtered by the Due date. Stay
          on top of both your individual goals and collaborative projects
          effortlessly.
        </h6>
      </div>
      <br />
      <p className="rewards">
        <div>
          Task Rewards: A Dash of Motivation Complete tasks with varying
          difficulties, and watch the magic unfold:
        </div>
        <div>
          Difficulty 1 (5 Points): Enjoy a nice cat photo as a reward for
          conquering the task.
        </div>
        <div>
          Difficulty 2 (10 Points): Immerse yourself in a captivating short
          story.
        </div>
        <div>
          Difficulty 3 (20 Points): Play the snake game and see how far you can
          get.
        </div>
      </p>
      <br />
      <div className="features">
        <div>
          Group Lists: Owners have the power to edit group lists, ensuring
          seamless coordination and project management.
        </div>
        <div>
          Group Pages: Dive into dedicated group pages where you can see your
          group members and strategize tasks together.
        </div>
        <div>
          Scoreboard: Your journey is quantified! Earn points based on task
          difficulty and watch your worth rise.
        </div>
      </div>
      <div className="contact">
        Contact us... Or don't, we won't care either way.
      </div>
    </div>
  );
};

export default About;
