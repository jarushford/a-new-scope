import React from 'react'

export default function Error(props) {
  return (
    <div className='error-box'>
      <img className='error-darth' src='./images/darth.svg' alt='Darth Vader Error'></img>
      <h1 className='sith-happens'>Sith Happens...</h1>
      <h4 className='error-sub'>Oops, something seems to have gone wrong.</h4>
      <button className='error-sub error-button' onClick={() => props.changePage('landing')}>Click here to return to site.</button>
    </div>
  )
}