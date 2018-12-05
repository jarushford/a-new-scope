import React from 'react'
import propTypes from 'prop-types'

export default function Landing({ continueToSite, episode }) {
  return (
    <div className='landing'>
      <header className='landing-header'>
        <div className='header-right'>
          <h2 className='landing-title'>{episode.title}</h2>
          <h2 className='landing-year'>{episode.year.substring(0, 4)}</h2>
        </div>
        <div className='continue-to-site-btn' onClick={() => continueToSite('menu')}>
          <img src='./images/outerring.svg' alt='ring' className='outerring ring'></img>
          <img src='./images/outerring.svg' alt='ring' className='middlering ring'></img>
          <img src='./images/outerring.svg' alt='ring' className='innerring ring'></img>
          <h2 class='enter-btn'>ENTER</h2>
        </div>
        <img className='starwars-logo' alt='Star Wars Logo' src='./images/starwars_logo.svg'></img>
      </header>
      <section className="scroll-text">
        <div className='fade-overlay'></div>
        <div className="crawl">
          <div className="title">
            <h1 className='scroll-title'>{episode.title}</h1>
          </div>      
          <p>{episode.text}</p>     
        </div>
      </section>
      <img className='millenium-landing' alt='Millenium Falcon' src='./images/millenium_color.png'></img>
    </div>
  )
}

/***************Private

*****************/

Landing.propTypes = {
  continueToSite: propTypes.func.isRequired,

}