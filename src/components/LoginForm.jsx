import { useState } from 'react'

const LoginForm = ({onLogin}) => {
    const [usernameOrEmail, setUsernameOrEmail] = useState("")
    const [password, setPassword] = useState("")

  return (
    <form onSubmit={(e) => onLogin(e, {usernameOrEmail: usernameOrEmail, password: password})}>
        <label>Username or email:</label>
            <input 
                placeholder="Username or email"
                value={usernameOrEmail}
                onChange={setUsernameOrEmail(e.target.value)}
            />
        <label>Password:</label>
            <input 
                placeholder="Password"
                value={password}
                onChange={setPassword(e.target.value)}
            />
        <button type='submit'>Login</button>
    </form>
  )
}

export default LoginForm