import RegisterForm from "../components/RegisterForm.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const RegisterNewUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegisterUser = async (e, registerFormData) => {
    e.preventDefault();
    await axios.post("/api/registerUser", registerFormData).then((res) => {
      dispatch({
        type: "authenticated",
        payload: res.data.user,
      });
      console.log("newUser created");
      navigate("/");
    });
  };

  return (
    <div>
      <h1>Register Here</h1>
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
