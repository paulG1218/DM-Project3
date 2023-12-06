import RegisterForm from '../components/RegisterForm.jsx'
import { useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios'

const RegisterNewUser = () => {
    const navigate = useNavigate()

    const onRegisterUser = async (e, registerFormData) => {
        e.preventDefault()
        await axios
            .post("/api/registerUser", registerFormData)
            .then((res) => {
                navigate("/")
            })
    }
 
  return (
    <div>
        <h1>Register Today</h1>
        <div>
            Already registered? {" "}
                <NavLink to='/login'>
                    Sign In
                </NavLink>
        </div>
        <RegisterForm onRegisterUser={onRegisterUser}/>
    </div>
  )
}

export default RegisterNewUser