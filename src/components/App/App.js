import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
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
      error: false,
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
          setTimeout(() => reject(new Error()), 8000)
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
      this.setState({error: true})
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

  setError = (error) => {
    this.setState({error})
  }

  render() {
    const { error, landingScroll } = this.state

    if (error) {
      return (
        <div className="App">
          <StarHousingComponent />
          <Error 
              returnToLanding={this.handleTitleScroll}
              setError={this.setError}  
          />
        </div>
      )
    }
     
    if (!landingScroll) {
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
        <Switch>
          <Route exact path={`${process.env.PUBLIC_URL}/`} render={() => {
            return <Landing episode={landingScroll} />}
          } />
          <Route path={`${process.env.PUBLIC_URL}/menu`} component={Menu}/>
          <Route path={`${process.env.PUBLIC_URL}/people`} render={() => {
            return (
              <Main
                handleStoreData={this.handleStoreData}
                category='people'
                returnToLanding={this.handleTitleScroll}
                setError={this.setError}
              />
            )
          }} />
          <Route path={`${process.env.PUBLIC_URL}/vehicles`} render={() => {
            return (
              <Main
                handleStoreData={this.handleStoreData}
                category='vehicles'
                returnToLanding={this.handleTitleScroll}
                setError={this.setError}
              />
            )
          }} />
          <Route path={`${process.env.PUBLIC_URL}/planets`} render={() => {
            return (
              <Main
                handleStoreData={this.handleStoreData}
                category='planets'
                returnToLanding={this.handleTitleScroll}
                setError={this.setError}
              />
            )
          }} />
          <Route path={`${process.env.PUBLIC_URL}/favorites`} render={() => {
            return (
              <Main
                handleStoreData={this.handleStoreData}
                category='favorites'
                returnToLanding={this.handleTitleScroll}
                setError={this.setError}
              />
            )
          }} />
        </Switch> 
      </div>
    )
  }
}
