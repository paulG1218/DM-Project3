import { useState, useEffect } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "../css/Register.css";

const RegisterForm = ({ onRegisterUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const focusUsername = () => {
    setTimeout(() => {
      document.getElementById("username").focus();
    }, 0);
  };

  useEffect(() => {
    focusUsername();
  }, []);

  return (
    <form
      onSubmit={(e) => {
        const errorText = document.getElementById("errorTxt");
        if (email === "" || username === "" || password === "") {
          e.preventDefault();
          errorText.innerText = "Please fill out all fields";
          return;
        } else if (password === confirmPassword) {
          onRegisterUser(
            e,
            {
              username: username,
              email: email,
              password: password,
            },
            document.getElementById("errorTxt")
          );
        } else {
          e.preventDefault();
          errorText.innerText = "Passwords must match";
        }
      }}
    >
      <input
        id="username"
        className="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value.trim())}
        maxLength={20}
      />
      <br />
      <input
        className="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value.trim())}
        maxLength={30}
      />
      <br />
      <input
        className="registerPassword"
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value.trim())}
        maxLength={20}
      />
      <span onClick={togglePasswordVisibility}>
        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
      </span>
      <br />
      <input
        className="confirmPassword"
        placeholder="Confirm password"
        type={showPassword ? "text" : "password"}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value.trim())}
        maxLength={20}
      />
      <br />
      <p id="errorTxt"></p>
      <button type="submit" id="submit" className="signUpBtn">
        Sign Up
      </button>
    </form>
  );
};

export default RegisterForm;
