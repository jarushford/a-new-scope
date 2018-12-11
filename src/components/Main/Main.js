import React, { Component } from 'react'
import { uid } from 'react-uid'
import PropTypes from 'prop-types'
import Card from '../Card/Card'
import Loading from '../Loading/Loading'
import * as APIHelper from '../../utils/api/apiHelper'


export default class Main extends Component {
  constructor() {
    super()
    this.state = {
      categoryData: []
    }
  }

  async componentDidMount() {
    const { category, handleStoreData, changePage } = this.props
    if (category === 'favorites') {
      const favorites = JSON.parse(localStorage.getItem('favorites'))
      return this.getFavorites(favorites)
    }
    let categoryData
    const storage = JSON.parse(localStorage.getItem('storedData'))
    if (!storage || !storage[category]) {
      try {
        categoryData = await Promise.race([
          APIHelper.buildCategoryObj(category),
          new Promise((reject) => {
            setTimeout(() => reject(new Error()), 8000)
          })
        ])
        this.setState({ categoryData })
      } catch {
        return changePage('error')
      }
      return handleStoreData(category, categoryData)
    }
    return this.setState({ categoryData: storage[category] })
  }

  getFavorites(favorites) {
    if (!favorites || favorites.length === 0) {
      this.setState({
        categoryData: 'none'
      })
    } else {
      this.setState({
        categoryData: favorites
      })
    }
  }

  render() {
    const { category, changePage, handleStoreData } = this.props
    const { categoryData } = this.state
    let render

    if (!categoryData.length) {
      render = (
        <div className="App">
          <Loading />
        </div>
      )
    } else if (categoryData === 'none' || categoryData === []) {
      render = (
        <div className="no-favorite-message">You have no saved favorites</div>
      )
    } else {
      render = categoryData.map((current) => {
        return (
          <Card
            handleStoreData={handleStoreData}
            cardData={current}
            key={uid(current)}
            cardType={current.category}
          />
        )
      })
    }
    return (
      <main className="main">
        <div className="header-container">
          <div className="continue-to-site-btn back-rings" role="presentation" onClick={() => changePage('menu')}>
            <img src="./images/outerring.svg" alt="ring" className="outerring ring" />
            <img src="./images/outerring.svg" alt="ring" className="middlering ring" />
            <img src="./images/outerring.svg" alt="ring" className="innerring ring" />
          </div>
          <h1 className="main-header">{category}</h1>
        </div>
        <section className="card-section">
          {render}
        </section>
        <img
          className="return-to-landing-btn"
          alt="Landing Btn"
          src="./images/millenium_color.png"
          role="presentation"
          onClick={() => changePage('landing')}
        />
      </main>
    )
  }
}

Main.propTypes = {
  changePage: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  handleStoreData: PropTypes.func.isRequired
}
