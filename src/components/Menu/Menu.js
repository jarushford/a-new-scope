import React from 'react'

export default function Menu() {
  return (
    <div className='menu'>
      <div className='favorites-path'>
        <div className='favorites-planet'></div>
        <div className='vehicles-path'>
          <div className='vehicle-planet'></div>
          <div className='planets-path'>
            <div className='planet-planet'></div>
            <div className='people-path'>
              <div className='people-planet'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}