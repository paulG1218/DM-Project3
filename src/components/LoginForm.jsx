
const LoginForm = ({onLogin}) => {
  return (
    <form onSubmit={(e) => onLogin(e, {usernameOrEmail: usernameOrEmail, password: password})}>
        
    </form>
  )
}

export default LoginForm