import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function Landing({ episode }) {
  return (
    <div className="landing">
      <header className="landing-header">
        <div className="header-right">
          <h2 className="landing-title">{episode.title}</h2>
          <h2 className="landing-year">{episode.year.substring(0, 4)}</h2>
        </div>
        <div className="continue-to-site-btn">
          <Link className="enter-btn-link" to='/menu'>
            <h2 className="enter-btn" role="presentation">ENTER</h2>
          </Link>
          <img src="./images/outerring.svg" alt="ring" className="outerring ring" />
          <img src="./images/outerring.svg" alt="ring" className="middlering ring" />
          <img src="./images/outerring.svg" alt="ring" className="innerring ring" />
        </div>
        <h1 className="main-title2">a new scope</h1>
      </header>
      <section className="scroll-text">
        <div className="fade-overlay" />
        <div className="crawl">
          <div className="title">
            <h1 className="scroll-title">{episode.title}</h1>
          </div>
          <p>{episode.text}</p>
        </div>
      </section>
      <img className="millenium-landing" alt="Millenium Falcon" src="./images/millenium_color.png" />
    </div>
  )
}

Landing.propTypes = {
  episode: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired
}
