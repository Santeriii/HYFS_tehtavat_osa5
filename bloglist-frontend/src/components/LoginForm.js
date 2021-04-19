import React from 'react'
import ErrorForm from './ErrorForm'

const LoginForm = ({
  errorMessage,
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  return (
    <>
      <h2>log in to application</h2>
      {errorMessage && <ErrorForm errorMessage={errorMessage} />}
      <form onSubmit={handleLogin}>
        <div>
              username
          <input
            type="text"
            value={username}
            id='username'
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
              password
          <input
            type="password"
            value={password}
            id='password'
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button
          type="submit"
          id='login-button'
        >login</button>
      </form>
    </>
  )
}

export default LoginForm