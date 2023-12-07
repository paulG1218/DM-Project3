import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

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
        if (password === confirmPassword) {
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
      <label>Username:</label>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label>Email:</label>
      <input
        placeholder="Email:"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password:</label>
      <input
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <span onClick={togglePasswordVisibility}>
        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
      </span>
      <label>Confirm Password:</label>
      <input
        placeholder="Confirm password"
        type={showPassword ? "text" : "password"}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default RegisterForm;
