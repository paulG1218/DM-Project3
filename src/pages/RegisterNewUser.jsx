import RegisterForm from "../components/RegisterForm.jsx";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

const RegisterNewUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegisterUser = async (e, registerFormData) => {
    e.preventDefault();
    await axios.post("/api/registerUser", registerFormData).then((res) => {
      navigate("/login");
    });
  };

  return (
    <div>
      <h1>Register Today</h1>
      <div>
        Already registered?{" "}
        <a href="/login" className="loginLink">
          Sign In
        </a>
      </div>
      <RegisterForm onRegisterUser={onRegisterUser} />
    </div>
  );
};

export default RegisterNewUser;
