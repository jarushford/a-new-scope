import React, { Component } from 'react'
import propTypes from 'prop-types'
import ResidentsScroller from '../ResidentsScroller/ResidentsScroller'

export default class Card extends Component {
  constructor() {
    super()
    this.state = {
      flipped: false,
      unflipped: false,
      cardObj: null,
      favorite: false
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


  flipCard = (e) => {
    if(e.target.classList.contains('resident-arrow')) {return}

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

  toggleFavorite = (cardObj) => {
    this.setState({ favorite: !this.state.favorite })
    this.props.handleStoreData('favorites', cardObj)
  }

  render() {
    const { flipped, unflipped, cardObj, favorite } = this.state 
    const { cardType } = this.props
    if (cardObj === null) {
      return (<div></div>)
    } else {
      return (
        <div
          className={`card ${flipped && 'flipped'} ${unflipped && 'unflipped'}`}
          onClick={(e) => this.flipCard(e)}
        >
          <div className='card-front'>
            <img className='front-image' src={`./images/${cardObj.name.replace('\/', '-')}.jpg`} alt='card-image'></img>
          </div>
          <div className={` card-title card-header-${cardType}`}>
            <h1>{cardObj.name}</h1>
            <i
              className={`fas fa-star ${favorite && 'favorite'}`}
              onClick={() => this.toggleFavorite(cardObj)}
            >
            </i>
          </div>
          <h1 className='card-type'>{cardObj.type}</h1>
          <div className='stats-container'>
            <div className='stat'>
              <h1>{cardObj.main1Label}</h1>
              <p>{cardObj.main1}</p>
            </div>
            <div className='div-line'></div>
            <div className='stat'>
              <h1>{cardObj.main2Label}</h1>
              <p>{cardObj.main2}</p>
            </div>
          </div>
          <div>
            <div className={`homeworld-title card-header-${cardType}`}>
              <h1 className={`card-header-${cardType}`}>{cardObj.secHeader}</h1>
            </div>
            <ResidentsScroller 
              content1={cardObj.secInfoMain} 
              content2={cardObj.secInfoOther} 
            />
          </div>
          <img className='card-icon' alt='card icon' src={`./images/${cardType}_icon.svg`}></img>
        </div>
      )
    }
  }
}

Card.propTypes = {
  cardType: propTypes.string,
  cardData: propTypes.object
}