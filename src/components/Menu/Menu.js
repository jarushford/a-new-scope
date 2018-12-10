import React from 'react'

export default function Menu({ changePage }) {
  return (
    <div className='menu'>
      <h1 className='main-title'>a new scope</h1>
      <div className='favorites-path'>
        <div 
          onClick={() => changePage('favorites')}
          className='favorites-planet'
        >
        <h3 className='planet-label'>Favorites</h3>
        </div>
        <div className='vehicles-path'>
          <div
            onClick={() => changePage('vehicles')}
            className='vehicles-planet'
          >
          <h3 className='planet-label'>Vehicles</h3>
          </div>
          <div className='planets-path'>
            <div
              onClick={() => changePage('planets')}
              className='planets-planet'
            >
            <h3 className='planet-label'>Planets</h3>
            </div>
            <div className='people-path'>
              <div
                onClick={() => changePage('people')}
                className='people-planet'
              >
              <h3 className='planet-label'>People</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='alt-menu-container'>
        <div 
          onClick={() => changePage('favorites')}
          className='alt-menu alt-menu-favorites'
        >
          <h3>Favorites</h3>
        </div>
        <div
          onClick={() => changePage('vehicles')}
          className='alt-menu alt-menu-vehicles'
        >
          <h3>Vehicles</h3>
        </div>
        <div
            onClick={() => changePage('planets')}
            className='alt-menu alt-menu-planets'
          >
          <h3>Planets</h3>
        </div>
        <div
          onClick={() => changePage('people')}
          className='alt-menu alt-menu-people'
        >
          <h3>People</h3>
        </div>
      </div>
    </div>
  )
}