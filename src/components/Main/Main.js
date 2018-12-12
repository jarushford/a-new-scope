import React, { Component } from 'react'
import { uid } from 'react-uid'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
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

  componentDidMount() {
    this.updateCards()
  }

  updateCards = async () => {
    const { category, handleStoreData, setError } = this.props
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
          new Promise((resolve, reject) => {
            setTimeout(() => reject(new Error()), 5000)
          })
        ])
        await this.setState({ categoryData })
        return handleStoreData(category, categoryData)
      } catch {
        return setError(true)
      }
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
    const { category, returnToLanding, handleStoreData } = this.props
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
      render = categoryData.map(current => (<Card
        handleStoreData={handleStoreData}
        cardData={current}
        key={uid(current)}
        cardType={current.category}
        updateFavorites={this.updateCards}
        favorite={category}
      />
      ))
    }
    return (
      <main className="main">
        <div className="header-container">
          <Link to="/menu">
            <div className="continue-to-site-btn back-rings" role="presentation">
              <img src="./images/outerring.svg" alt="ring" className="outerring ring" />
              <img src="./images/outerring.svg" alt="ring" className="middlering ring" />
              <img src="./images/outerring.svg" alt="ring" className="innerring ring" />
              <h3 className="planet-label back-to-menu">Menu</h3>
            </div>
          </Link>
          <h1 className="main-header">{category}</h1>
        </div>
        <section className="card-section">
          {render}
        </section>
        <Link to="/">
          <img
            className="return-to-landing-btn"
            alt="Landing Btn"
            src="./images/millenium_color.png"
            role="presentation"
            onClick={() => returnToLanding()}
          />
        </Link>
      </main>
    )
  }
}

Main.propTypes = {
  returnToLanding: PropTypes.func,
  category: PropTypes.string,
  handleStoreData: PropTypes.func,
  setError: PropTypes.func
}
