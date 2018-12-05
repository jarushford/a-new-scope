import React, { Component } from 'react'

export default class Card extends Component {
  constructor() {
    super()
    this.state = {
      flipped: false,
      unflipped: false
    }
    this.cardObj = {}
  }

  componentDidMount() {
    this.cardObj = {
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
      case 'People':
        this.cardObj.main1Label = 'Height'
        this.cardObj.main2Label = 'Weight'
        this.cardObj.secHeader = 'Homeworld'
        break;
      case 'Vehicles':
        this.cardObj.main1Label = 'Model'
        this.cardObj.main2Label = 'Class'
        this.cardObj.secHeader = 'Passengers'
        break;
      case 'Planets':
        this.cardObj.main1Label = 'Popuplation'
        this.cardObj.main2Label = 'Climate'
        this.cardObj.secHeader = 'Residents' 
        break;
      default: break;
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

    return (
      <div
        className={`card ${flipped && 'flipped'} ${unflipped && 'unflipped'}`}
        onClick={() => this.flipCard()}
      >
        <div className='card-title'>
          <h1>{this.cardObj.name}</h1>
          <i className="fas fa-star"></i>
        </div>
        <h1 className='species'>{this.cardObj.type}</h1>
        <div className='stats-container'>
          <div className='stat'>
            <h1>{this.cardObj.main1Label}</h1>
            <p>{this.cardObj.main1}cm</p>
          </div>
          <div className='stat'>
            <h1>{this.cardObj.main2Label}</h1>
            <p>{this.cardObj.main2}kg</p>
          </div>
        </div>
        <div>
          <div className='homeworld-title'>
            <h1>{this.cardObj.secHeader}</h1>
          </div>
          <h1 className='homeworld'>{this.cardObj.secInfoMain}</h1>
          <h1 className='population'>{this.cardObj.secInfoOther}</h1>
        </div>
      </div>
    )
  }
}


/*********PRIVATE */

/**************** */

