import React, { Component } from 'react'
import propTypes from 'prop-types'
import { uid } from 'react-uid'

export default class ResidentsScroller extends Component {
  constructor(props) {
    super(props)
    this.state = {
      residents: [],
      content1: '',
      content2: '',
      currentIndex: 0
    }
  }

  componentDidMount() {
    const { content1, content2 } = this.props
    if (content1.length === 0) {
      this.setState({
        residents: [{ name: 'none', display: '' }]
      })
    } else if (typeof content1 !== 'string') {
      this.setState({
        residents: content1.map((resident, i) => {
          let formattedResident = { name: resident, display: 'none' }
          if (i === 0) {
            formattedResident = { name: resident, display: '' }
          }
          return formattedResident
        })
      })
    } else {
      this.setState({
        content1,
        content2
      })
    }
  }

  clickArrow = (direction) => {
    const { residents, currentIndex } = this.state
    let newIndex = direction + currentIndex
    if (newIndex < 0) { newIndex = residents.length - 1 }
    if (newIndex >= residents.length) { newIndex = 0 }

    const newResidents = residents.map((resident, i) => {
      let formattedResident
      if (i === newIndex) {
        formattedResident = { name: resident.name, display: '' }
      } else {
        formattedResident = { name: resident.name, display: 'none' }
      }
      return formattedResident
    })

    this.setState({
      currentIndex: newIndex,
      residents: newResidents
    })
  }

  render() {
    const { residents, content1, content2 } = this.state

    if (content1) {
      return (
        <div className="secInfo">
          <h1 className="homeworld">{content1}</h1>
          <h1 className="population">{content2}</h1>
        </div>
      )
    }

    return (
      <div className="residents-scroller">
        <i className="fas fa-caret-left resident-arrow" role="presentation" onClick={() => this.clickArrow(-1)} />
        <i className="fas fa-caret-right resident-arrow" role="presentation" onClick={() => this.clickArrow(1)} />
        {
          residents.map(resident => (<h4
            className={`resident ${resident.display}`}
            key={uid(resident)}
          >
            {resident.name}
          </h4>
          ))
        }
      </div>
    )
  }
}

ResidentsScroller.propTypes = {
  content1: propTypes.oneOfType([propTypes.string, propTypes.array]).isRequired,
  content2: propTypes.string
}

ResidentsScroller.defaultProps = {
  content2: ''
}
