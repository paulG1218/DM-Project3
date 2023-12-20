import RegisterForm from "../components/RegisterForm.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const RegisterNewUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegisterUser = async (e, registerFormData, errorText) => {
    e.preventDefault();
    await axios.post("/api/registerUser", registerFormData).then((res) => {
      if (res.data.user) {
        dispatch({
          type: "authenticated",
          payload: res.data.user,
        });
        console.log("newUser created");
        window.location.href = '/'
      } else if (res.data.message === 'username taken') {
        errorText.innerText = 'Username taken'
        return
      } else {
        errorText.innerText = 'Something went wrong'
      }
    });
  };

  return (
    <div className="registerPageContent">
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
