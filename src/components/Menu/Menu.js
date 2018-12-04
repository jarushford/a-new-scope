import React from 'react'

export default function Menu({ changePage }) {
  return (
    <div className='menu'>
      <div className='favorites-path'>
        <div 
          onClick={() => changePage('favorites')}
          className='favorites-planet'
        >
        </div>
        <div className='vehicles-path'>
          <div
            onClick={() => changePage('vehicles')}
            className='vehicles-planet'
          >
          </div>
          <div className='planets-path'>
            <div
              onClick={() => changePage('planets')}
              className='planets-planet'
            >
            </div>
            <div className='people-path'>
              <div
                onClick={() => changePage('people')}
                className='people-planet'
              >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}