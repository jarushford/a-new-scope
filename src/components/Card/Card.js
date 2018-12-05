import React, { Component } from 'react'

export default class Card extends Component {
  constructor() {
    super()
    this.state = {
      flipped: false,
      unflipped: false
    }
    this.cardObj = {
      name: cardData.name,
      type: cardData.type,
      main1Label: '',
      main1: cardData.main1,
      main2Label: '',
      main2: cardData.main2,
      secHeader:'',
      secInfoMain: cardData.secInfoMain,
      secInfoOther: cardData.secInfoOther || '',
    }
  }


  secInfoJSX = () => {
    if(typeof cardData !== 'object') {
      return ( 
        <div className='secInfo'>
          <h2>{cardData.secInfoMain}</h2>
        </div>
      )
    }
    return (
      cardData.secInfoMain.map( person => {
        return <h3 className='person'>{person}</h3>
      })
    )
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


/*********PRIVATE */

/**************** */

// const formatCards = (cardType) => {
//   switch(cardType) {
//     case 'character':
//       cardObj.main1Label = 'Height'
//       cardObj.main2Label = 'Weight'
//       cardObj.secHeader = 'Homeworld'
//       break;
//     case 'vehicle':
//       cardObj.main1Label = 'Model'
//       cardObj.main2Label = 'Class'
//       cardObj.secHeader = 'Passengers'
//       break;
//     case 'planet':
//       cardObj.main1Label = 'Popuplation'
//       cardObj.main2Label = 'Climate'
//       cardObj.secHeader = 'Residents' 
//       break;
//   }
// }
