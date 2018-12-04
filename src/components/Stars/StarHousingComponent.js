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
      newX = this.state.deltaX + 0.025
        : newX = this.state.deltaX - 0.025
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
      <Stars deltaX={this.state.deltaX}/>
    )
  }
}