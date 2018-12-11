import React, { Component } from 'react'
import Stars from './Stars'
import '../App/app.scss'

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
    const { direction, deltaX } = this.state
    let newX
    direction
      ? newX = deltaX + 0.08
      : newX = deltaX - 0.08
    if (newX > 180 || newX < 0) {
      this.setState({
        deltaX: newX,
        direction: !direction
      })
    } else {
      this.setState({
        deltaX: newX
      })
    }
    requestAnimationFrame(this.tick)
  }

  render() {
    const { deltaX } = this.state
    return (
      <div className="star-housing">
        <Stars deltaX={deltaX} />
      </div>
    )
  }
}
