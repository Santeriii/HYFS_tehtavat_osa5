import React from 'react'

const ErrorForm = ({ errorMessage }) => {
    return (
      <h1 style={{ color: 'red' }}>{errorMessage}</h1>
    )
}

export default ErrorForm