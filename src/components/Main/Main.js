import React, { Component } from 'react'
import Card from '../Card/Card'
import { uid } from 'react-uid'
import Loading from '../Loading/Loading'
import * as APIHelper from '../../utils/api/apiHelper'
import propTypes from 'prop-types'


export default class Main extends Component {
  constructor() {
    super()
    this.state = {
      storedData: {},
      categoryData: [],
      error: false
    }
  }

  async componentDidMount() {
    const { category, handleStoreData } = this.props
    let categoryData
    const storage = JSON.parse(localStorage.getItem('storedData'))
    if (!storage || !storage[category]) {
      try {
        categoryData = await Promise.race([
          API.buildCategoryObj(category), 
          new Promise(reject => {
            setTimeout(()=> reject(new Error()), 8000)
          })
        ])
        this.setState({ categoryData })
      } catch {
        this.setState({ error: true }, this.props.changePage('error'))
      }
      handleStoreData(category, categoryData)
    } else {
      this.setState({ categoryData: storage[category] })
    }
  }

  render() {
    const { category, changePage, handleStoreData } = this.props
    const { categoryData } = this.state
    let render

    if (!categoryData.length) {
      render = <div className="App">
      <Loading />
    </div>
    } else {
      render = categoryData.map(current => {
        return ( <Card 
          handleStoreData={handleStoreData}
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
        <img 
          className='return-to-landing-btn' 
          alt='Landing Btn' 
          src='./images/millenium_color.png'
          onClick={() => changePage('landing')}
        />
      </main>
    )
  }
}

Main.propTypes = {
  changePage: propTypes.func,
  category: propTypes.string
}