import React from 'react'

export default function Loading() {
  return (
    <div className='loading-container'>
      <div className='loading-animation'>
        <div className='millenium-div'>
          <img className='loading-millenium' src='./images/load_millenium.svg' alt='millenium falcon'></img>
          <div className='blaster1 blaster'></div>
          <div className='blaster2 blaster'></div>
        </div>
        <div className='tie-div'>
          <img className='loading-tiefighter' src='./images/load_tiefighter.svg' alt='millenium falcon'></img>
        </div>
      </div>
      <h2 className='loading-text'>Loading...</h2>
    </div>
  )
}