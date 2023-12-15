import { useState, useEffect } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "../css/Login.css";

const LoginForm = ({ onLogin }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleUsernameChange = (e) => {
    const removeSpace = e.target.value.replace(/\s/g, "").slice(0, 20);
    setUsernameOrEmail(removeSpace);
  };

  const handlePasswordChange = (e) => {
    const removeSpace = e.target.value.replace(/\s/g, "").slice(0, 20);
    setPassword(removeSpace);
  };

  const focusUsername = () => {
    setTimeout(() => {
      document.getElementById("usernameOrEmail").focus();
    }, 0);
  };

  useEffect(() => {
    focusUsername();
  }, []);

  return (
    <form
      onSubmit={(e) =>
        onLogin(e, { usernameOrEmail: usernameOrEmail, password: password }, document.getElementById('errorTxt'))
      }
    >
      <input
        placeholder="Username or email"
        id="usernameOrEmail"
        value={usernameOrEmail}
        onChange={handleUsernameChange}
        maxLength={20}
      />
      <br />
      <input
        className="password"
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={handlePasswordChange}
        maxLength={20}
      />
      <span onClick={togglePasswordVisibility}>
        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
      </span>
      <p id="errorTxt"></p>
      <br />
      <button type="submit" className="loginBtn">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
