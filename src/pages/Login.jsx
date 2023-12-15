import LoginForm from "../components/LoginForm.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import "../css/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogin = async (e, formData, errorText) => {
    e.preventDefault();
    await axios.post("/api/login", formData).then((res) => {
      switch (res.data.message) {
        case 'login successful':
          dispatch({
            type: "authenticated",
            payload: res.data.user,
          });
          window.location.href = '/'
          break;
        case 'no username found':
          errorText.innerText = "User does not exist";
          break;
        case 'password incorrect':
          errorText.innerText = "Password incorrect";
          break;
        default:
          errorText.innerText = "Something went wrong";
      }
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <div>
        Not registered yet?{" "}
        <a href="/registerNewUser" className="loginLink">
          Sign Up
        </a>
      </div>
      <LoginForm onLogin={onLogin} />
    </div>
  );
};

export default Login;
