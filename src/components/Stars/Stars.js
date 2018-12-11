import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Stars extends Component {
  constructor() {
    super()
    this.state = {
      stars: []
    }
  }

  componentDidMount() {
    this.paint()
  }

  componentDidUpdate() {
    const { stars } = this.state
    if (stars.length > 0) {
      this.repaint()
    }
  }

  paint = () => {
    const { canvas } = this.refs
    const ctx = canvas.getContext('2d')
    const arr = []

    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < 2000; i += 1) {
      const randCoords = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1,
        mult: Math.random()
      }
      ctx.fillStyle = 'white'
      ctx.beginPath()
      ctx.ellipse(randCoords.x, randCoords.y, randCoords.size, 1, 4, 0, 4)
      ctx.fill()
      arr.push(randCoords)
    }

    this.setState({
      stars: arr
    })
  }

  repaint = () => {
    const { stars } = this.state
    const { deltaX } = this.props
    const { canvas } = this.refs
    const ctx = canvas.getContext('2d')

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < 500; i += 1) {
      if (i % 2 === 0) {
        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.ellipse(stars[i].x
          + (stars[i].mult * deltaX), stars[i].y, stars[i].size, 1, 4, 0, 4)
        ctx.fill()
      } else {
        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.ellipse(stars[i].x
          - (stars[i].mult * deltaX), stars[i].y, stars[i].size, 1, 4, 0, 4)
        ctx.fill()
      }
    }
  }


  render() {
    return (
      <canvas ref="canvas" width="2000px" height="1000px" />
    )
  }
}

Stars.propTypes = {
  deltaX: PropTypes.number.isRequired
}
