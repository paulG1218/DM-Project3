import { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"

const LoginForm = ({onLogin}) => {
    const [usernameOrEmail, setUsernameOrEmail] = useState("")
    const [password, setPassword] = useState("")

    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

  return (
    <form onSubmit={(e) => onLogin(e, {usernameOrEmail: usernameOrEmail, password: password})}>
        <label>Username or email:</label>
            <input 
                placeholder="Username or email"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
            />
            <div>
                <label>Password:</label>
                <input 
                    placeholder="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}

                />
                <button onClick={togglePasswordVisibility}>
                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
            </div>
        <button type='submit'>Login</button>
    </form>
  )
}

export default LoginForm