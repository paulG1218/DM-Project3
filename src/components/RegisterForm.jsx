import { useState } from "react";
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

  return (
    <form
      onSubmit={(e) => {
        if (email === "" || username === "" || password === "") {
          alert("Please fill in all fields");
          return;
        } else if (password === confirmPassword) {
          onRegisterUser(e, {
            username: username,
            email: email,
            password: password,
          });
        } else {
          e.preventDefault();
          alert("Passwords do not match");
        }
      }}
    >
      <input
        className="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value.trim())}
      />
      <br />
      <input
        className="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value.trim())}
      />
      <br />
      <input
        className="password"
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value.trim())}
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
      />
      <br />
      <button type="submit" id="submit" className="signUpBtn">
        Sign Up
      </button>
    </form>
  );
};

export default RegisterForm;
