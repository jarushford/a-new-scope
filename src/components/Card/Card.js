import React, { Component } from 'react'

export default class Card extends Component {
  constructor() {
    super()
    this.state = {
      flipped: false,
      unflipped: false
    }
  }

  flipCard = () => {
    if (this.state.flipped === true) {
      this.setState({
        flipped: false,
        unflipped: true
      })
    } else {
      this.setState({
        flipped: true,
        unflipped: false
      })
    }
  }

  render() {
    const { flipped, unflipped } = this.state 
    const { cardData } = this.props
    return (
      <div
        className={`card ${flipped && 'flipped'} ${unflipped && 'unflipped'}`}
        onClick={() => this.flipCard()}
      >
        <div className='card-title'>
          <h1>{cardData.name}</h1>
          <i className="fas fa-star"></i>
        </div>
        <h1 className='species'>{cardData.species}</h1>
        <div className='stats-container'>
          <div className='stat'>
            <h1>Height</h1>
            <p>{cardData.height}cm</p>
          </div>
          <div className='stat'>
            <h1>Weight</h1>
            <p>{cardData.weight}kg</p>
          </div>
        </div>
        <div>
          <div className='homeworld-title'>
            <h1>Homeworld</h1>
          </div>
          <h1 className='homeworld'>{cardData.homeworld}</h1>
          <h1 className='population'>{cardData.population}</h1>
        </div>
      </div>
    )
  }
}