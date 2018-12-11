import React from 'react'
import { Link } from 'react-router-dom'
 
export default function Menu() {
  return (
    <div className="menu">
      <h1 className="main-title">a new scope</h1>
      <div className="favorites-path">
        <Link to='./favorites'>
          <div
            role="presentation"
            className="favorites-planet"
          >
            <h3 className="planet-label">Favorites</h3>
          </div>
        </Link>
          <div className="vehicles-path">
          <Link to='/vehicles'>
            <div
              role="presentation"
              className="vehicles-planet"
              >
              <h3 className="planet-label">Vehicles</h3>
            </div>
          </Link>
          <div className="planets-path">
            <Link to='/planets'>
              <div
                role="presentation"
                className="planets-planet"
                >
                <h3 className="planet-label">Planets</h3>
              </div>
            </Link>
            <div className="people-path">
              <Link to='/people'>
                <div
                  role="presentation"
                  className="people-planet"
                  >
                  <h3 className="planet-label">People</h3>
              </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="alt-menu-container">
        <div
          role="presentation"
          className="alt-menu alt-menu-favorites"
        >
          <h3 className="planet-label">Favorites</h3>
        </div>
        <div
          role="presentation"
          className="alt-menu alt-menu-vehicles"
        >
          <h3 className="planet-label">Vehicles</h3>
        </div>
        <div
          role="presentation"
          className="alt-menu alt-menu-planets"
        >
          <h3 className="planet-label">Planets</h3>
        </div>
        <div
          role="presentation"
          className="alt-menu alt-menu-people"
        >
          <h3 className="planet-label">People</h3>
        </div>
      </div>
    </div>
  )
}
