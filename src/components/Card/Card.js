import React, { Component } from 'react'
import propTypes from 'prop-types'

export default class Card extends Component {
  constructor() {
    super()
    this.state = {
      flipped: false,
      unflipped: false,
      cardObj: null
    }
  }

  componentDidMount() {
    const cardObj = {
      name: this.props.cardData.name,
      type: this.props.cardData.type,
      main1Label: '',
      main1: this.props.cardData.main1,
      main2Label: '',
      main2: this.props.cardData.main2,
      secHeader:'',
      secInfoMain: this.props.cardData.secInfoMain,
      secInfoOther: this.props.cardData.secInfoOther || '',
    }

    switch(this.props.cardType) {
      case 'people':
        cardObj.main1Label = 'Height'
        cardObj.main1 += ' cm'
        cardObj.main2Label = 'Weight'
        cardObj.main2 += ' kg'
        cardObj.secHeader = 'Homeworld'
        break;
      case 'vehicles':
        cardObj.main1Label = 'Model'
        cardObj.main2Label = 'Class'
        cardObj.secHeader = 'Passengers'
        break;
      case 'planets':
        cardObj.main1Label = 'Population'
        cardObj.main2Label = 'Climate'
        cardObj.secHeader = 'Residents' 
        break;
      default: break;
    }

    this.setState({ cardObj })
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
    const { flipped, unflipped, cardObj } = this.state 
    if (cardObj === null) {
      return (<div></div>)
    } else {
      return (
        <div
          className={`card ${flipped && 'flipped'} ${unflipped && 'unflipped'}`}
          onClick={() => this.flipCard()}
        >
          <div className='card-title'>
            <h1>{cardObj.name}</h1>
            <i className="fas fa-star"></i>
          </div>
          <h1 className='species'>{cardObj.type}</h1>
          <div className='stats-container'>
            <div className='stat'>
              <h1>{cardObj.main1Label}</h1>
              <p>{cardObj.main1}</p>
            </div>
            <div className='stat'>
              <h1>{cardObj.main2Label}</h1>
              <p>{cardObj.main2}</p>
            </div>
          </div>
          <div>
            <div className='homeworld-title'>
              <h1>{cardObj.secHeader}</h1>
            </div>
            <h1 className='homeworld'>{cardObj.secInfoMain}</h1>
            <h1 className='population'>{cardObj.secInfoOther}</h1>
          </div>
        </div>
      )
    }
  }
}

Card.propTypes = {
  cardType: propTypes.string,
  cardData: propTypes.object
}