import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default function Error(props) {
  return (
    <div className="error-box">
      <img className="error-darth" src="./images/darth.svg" alt="Darth Vader Error" />
      <h1 className="sith-happens">Sith Happens...</h1>
      <h4 className="error-sub">Oops, something seems to have gone wrong.</h4>
      <Link to='/'>
        <button 
          className="error-sub error-button" 
          type="submit" 
          onClick={() => {
            props.returnToLanding()
            props.setError(false)
          }}
          >Click here to return to site.
        </button>
      </Link>
    </div>
  )
}

Error.propTypes = {
  retrunToLanding: PropTypes.func,
  setError: PropTypes.func
}

Error.defaultProps = {
  returnToLanding: null
}
