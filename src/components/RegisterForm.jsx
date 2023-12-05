import { useState } from 'react'

const RegisterForm = ({onRegisterUser}) => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  return (
    <form onSubmit={(e) => onRegisterUser(e, {username: username, email: email, password: password})}>
      <label>Username:</label>
        <input 
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      <label>Email:</label>
        <input 
          placeholder='Email:'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      <label>Password:</label>
        <input 
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      <label>Confirm Password:</label>
        <input 
          placeholder='Confirm password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        /> 
      <button type='submit'>Sign Up</button>
    </form>
  )
}

export default RegisterForm