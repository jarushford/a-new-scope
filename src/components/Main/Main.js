import React, { Component } from 'react'
import Card from '../Card/Card'
import { uid } from 'react-uid'
import Loading from '../Loading/Loading'
import * as API from '../../utils/api/apiCalls'
import propTypes from 'prop-types'


export default class Main extends Component {
  constructor() {
    super()
    this.state = {
      categoryData: [],
      error: false
    }
  }

  async componentDidMount() {
    const { category } = this.props
    try {
      const categoryData = await Promise.race([
        API.buildCategoryObj(category), 
        new Promise(reject => {
          setTimeout(()=> reject(new Error()), 8000)
        })
      ])
      this.setState({ categoryData })
    } catch {
      this.setState({ error: true })
    }
  }

  render() {
    const { category, changePage } = this.props
    const { categoryData } = this.state
    let render

    if (!categoryData.length) {
      render =  <div className="App">
      <Loading />
    </div>
    } else {
      render = categoryData.map(current => {
        return ( <Card 
          cardData={current} 
          key={uid(current)}
          cardType={category}/>
      )
    })
  }
    return (
      <main className='main'>
        <div className='header-container'>
          <div className='continue-to-site-btn back-rings' onClick={() => changePage('menu')}>
            <img src='./images/outerring.svg' alt='ring' className='outerring ring'></img>
            <img src='./images/outerring.svg' alt='ring' className='middlering ring'></img>
            <img src='./images/outerring.svg' alt='ring' className='innerring ring'></img>
          </div>
          <h1 className='main-header'>{category}</h1>
        </div>
        <section className='card-section'>
          {render}
        </section>
      </main>
    )
  }
}

Main.propTypes = {
  category: propTypes.string
}