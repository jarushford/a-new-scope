import React, { Component } from 'react'
import propTypes from 'prop-types'

export default class ResidentsScroller extends Component {
  constructor() {
    super()
    this.state = {
      residents: [],
      content1: '',
      content2: '',
      currentIndex: 0
    }
  }

  componentDidMount() {
    if (typeof this.props.content1 !== 'string') {
      this.setState({
        residents: this.props.content1.map( (resident, i) => {
          let formattedResident
          i === 0 ? 
            formattedResident = {name: resident, display: ''} 
            : formattedResident = {name: resident, display: 'none'}
          return formattedResident
        })
      })
    } else {
      this.setState({
        content1: this.props.content1,
        content2: this.props.content2
      })
    }
  }

  clickArrow = (direction) => {
    const { residents, currentIndex } = this.state
    let newIndex = direction += currentIndex
    if (newIndex < 0) {newIndex = residents.length - 1}
    if (newIndex >= residents.length) {newIndex = 0}

    const newResidents = residents.map( (resident, i) => {
      let formattedResident
      i === newIndex ? 
        formattedResident = {name: resident.name, display: ''} 
        : formattedResident = {name: resident.name, display: 'none'}
      return formattedResident
    })
    
    this.setState({
      currentIndex: newIndex,
      residents: newResidents
    })
  }
  
  render() {
    const { residents, content1, content2 } = this.state

    if(!residents && !content1) {
      return <div></div>
    }

    if(content1) {
      return (
        <div className='secInfo'>
          <h1 className='homeworld'>{content1}</h1>
          <h1 className='population'>{content2}</h1>
        </div>
      )
    }

    return (
      <div className='residents-scroller'>
        <i className="fas fa-caret-left resident-arrow" onClick={() => this.clickArrow(1)}></i>
        <i className="fas fa-caret-right resident-arrow" onClick={() => this.clickArrow(-1)}></i>
        {
          residents.map( resident => {
            return (
              <h4 className={`resident ${resident.display}`}>{resident.name}</h4>
            )
          })
        }
      </div>
    )
  }
} 

ResidentsScroller.protoTypes = {
  content1: propTypes.oneOfType([propTypes.string, propTypes.array]).isRequired,
  content2: propTypes.string
}