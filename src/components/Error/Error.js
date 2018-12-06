import React from 'react'

export default function Error() {
  return (
    <div className='error-box'>
      <img className='error-darth' src='./images/darth.svg' alt='Darth Vader Error'></img>
      <h1 className='sith-happens'>Sith Happens...</h1>
      <h4 className='error-sub'>Oops, something seems to have gone wrong.</h4>
      <h4 className='error-sub'>Try going back to the previous page.</h4>
    </div>
  )
}