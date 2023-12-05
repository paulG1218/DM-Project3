import LoginForm from '../components/LoginForm.jsx'
import {NavLink, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onLogin = async (e, formData) => {
        e.preventDefault()
        await axios 
            .post("/api/login", formData)
            .then((res) => {
                if(res.data.status !== 200) {
                    console.log('login failed')
                } else {
                    dispatch({
                        type: 'authenticated',
                        payload: res.data.user
                    })
                    navigate("/")
                }
            })
    }

  return (
    <div>
        <div>
            Not registered yet?{" "}
                <NavLink to="/registerNewUser">
                    Sign Up
                </NavLink>
        </div>
        <LoginForm onLogin={onLogin}/>
    </div>
  )
}

export default Login