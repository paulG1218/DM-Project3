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
        onLogin(e, { usernameOrEmail: usernameOrEmail, password: password })
      }
    >
      <input
        placeholder="Username or email"
        id="usernameOrEmail"
        value={usernameOrEmail}
        onChange={(e) => setUsernameOrEmail(e.target.value)}
      />
      <br />
      <input
        className="password"
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <span onClick={togglePasswordVisibility}>
        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
      </span>
      <br />
      <button type="submit" className="loginBtn">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
