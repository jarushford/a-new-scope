import React from 'react'

export default function Menu({ changePage }) {
  return (
    <div className='menu'>
      <div className='favorites-path'>
        <div 
          onClick={() => changePage('favorites')}
          className='favorites-planet'
        >
        <h3>Favorites</h3>
        </div>
        <div className='vehicles-path'>
          <div
            onClick={() => changePage('vehicles')}
            className='vehicles-planet'
          >
          <h3>Vehicles</h3>
          </div>
          <div className='planets-path'>
            <div
              onClick={() => changePage('planets')}
              className='planets-planet'
            >
            <h3>Planets</h3>
            </div>
            <div className='people-path'>
              <div
                onClick={() => changePage('people')}
                className='people-planet'
              >
              <h3>People</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}