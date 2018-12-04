import React, { Component } from 'react'
import Stars from '../Stars/Stars'

export default class StarHousingComponent extends Component {
  constructor() {
    super()
    this.state = {
      deltaX: 0,
      direction: true
    }
  }

  componentDidMount() {
    requestAnimationFrame(this.tick)
  }

  tick = () => {
    let newX
    this.state.direction ? 
      newX = this.state.deltaX + 0.04
        : newX = this.state.deltaX - 0.04
    if (newX > 180 || newX < 0) {
      this.setState({
        deltaX: newX,
        direction: !this.state.direction
      })
    } else {
      this.setState({
        deltaX: newX
      })
    }
    requestAnimationFrame(this.tick)
  }

  render() {
    return (
      <div className="star-housing">
        <Stars deltaX={this.state.deltaX}/>
      </div>
    )
  }
}