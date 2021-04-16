import React from 'react'
import PropTypes from 'prop-types'

const ErrorForm = ({ errorMessage }) => {
    return (
      <h1 style={{ color: 'red' }}>{errorMessage}</h1>
    )
}

ErrorForm.propTypes = {
    errorMessage: PropTypes.string.isRequired
}

export default ErrorForm