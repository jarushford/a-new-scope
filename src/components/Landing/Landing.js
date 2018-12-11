import React from 'react'
import PropTypes from 'prop-types'

export default function Landing({ continueToSite, episode }) {
  return (
    <div className="landing">
      <header className="landing-header">
        <div className="header-right">
          <h2 className="landing-title">{episode.title}</h2>
          <h2 className="landing-year">{episode.year.substring(0, 4)}</h2>
        </div>
        <div className="continue-to-site-btn">
          <h2 className="enter-btn" role="presentation" onClick={() => continueToSite('menu')}>ENTER</h2>
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
  continueToSite: PropTypes.func.isRequired,
  episode: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired
}
