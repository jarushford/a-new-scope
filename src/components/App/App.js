import React, { Component } from 'react'
import * as API from '../../utils/api/apiCalls'
import StarHousingComponent from '../Stars/StarHousingComponent'
import Landing from '../Landing/Landing'
import Menu from '../Menu/Menu'
import Main from '../Main/Main'
import Loading from '../Loading/Loading'
import Error from '../Error/Error'
import './app.scss'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      currentPage: 'landing',
      landingScroll: ''
    }
  }

  componentDidMount() {
    this.handleTitleScroll()
  }

  handleTitleScroll = async () => {
    try {
      const films = await Promise.race([
        API.fetchTitleScroll(),
        new Promise((resolve, reject) => {
          setTimeout(() => reject(new Error()), 5000)
        })
      ])
      const randomNumber = Math.round(Math.random() * 8)
      const film = films.results[randomNumber]
      this.setState({
        landingScroll: {
          title: film.title,
          year: film.release_date,
          text: film.opening_crawl
        }
      })
    } catch (error) {
      this.setState({
        currentPage: 'error'
      })
    }
  }

  handleStoreData = (category, categoryData, favorite, favoriteCategory) => {
    if (category === 'favorites') {
      this.storeFavorite(categoryData, favorite)
      this.updateStoredData(favoriteCategory, categoryData)
    } else {
      this.storeData(category, categoryData)
    }
  }

  storeData = (category, categoryData) => {
    const storage = JSON.parse(localStorage.getItem('storedData'))
    const newStorage = Object.assign({ [category]: categoryData, ...storage })
    localStorage.setItem('storedData', JSON.stringify(newStorage))
  }

  updateStoredData = (category, updatedCard) => {
    const storage = (JSON.parse(localStorage.getItem('storedData')))
    let cardToUpdateIndex = 0
    if (storage) {
      storage[category].find((card, i) => {
        if (card.name === updatedCard.name) {
          cardToUpdateIndex = i
        }
      })
      storage[category][cardToUpdateIndex] = updatedCard
      localStorage.setItem('storedData', JSON.stringify(storage))
    }
  }

  storeFavorite = (data, currentFavorite) => {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []
    if (!currentFavorite) {
      const match = favorites.find(favorite => favorite.name === data.name)
      favorites = favorites.filter(favorite => favorite.name !== match.name)
    } else {
      favorites.push(data)
    }
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }

  changePage = (page) => {
    if (page === 'landing') {
      this.setState({ currentPage: page }, this.handleTitleScroll)
    } else {
      this.setState({ currentPage: page })
    }
  }

  render() {
    const { currentPage, landingScroll } = this.state
    const mainHelper = (
      <Main
        handleStoreData={this.handleStoreData}
        category={currentPage}
        changePage={this.changePage}
      />
    )
    const renderHelper = {
      menu: <Menu
        changePage={this.changePage}
      />,
      people: mainHelper,
      planets: mainHelper,
      vehicles: mainHelper,
      favorites: mainHelper,
      landing: <Landing
        continueToSite={this.changePage}
        episode={landingScroll}
      />,
      error: <Error changePage={this.changePage} />
    }

    if (!landingScroll && currentPage !== 'error') {
      return (
        <div className="App">
          <StarHousingComponent />
          <Loading />
        </div>
      )
    }
    return (
      <div className="App">
        <StarHousingComponent />
        {renderHelper[currentPage]}
      </div>
    )
  }
}
