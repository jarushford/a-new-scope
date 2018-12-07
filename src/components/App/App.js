import React, { Component } from 'react'
import * as API from '../../utils/api/apiCalls'
import StarHousingComponent from '../Stars/StarHousingComponent'
import Landing from '../Landing/Landing'
import Menu from '../Menu/Menu'
import Main from '../Main/Main'
import Loading from '../Loading/Loading'
import Error from '../Error/Error'
import './app.scss'

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentPage: 'menu',
      landingScroll: '',
    }
  }

  async componentDidMount() {
    try {
      const films = await Promise.race([
        API.fetchTitleScroll(), 
        new Promise(reject => {
          setTimeout(()=> reject(new Error()), 8000)
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
    } catch(error) {
      this.setState({
        currentPage: 'error'
      })
    }
  }

  handleStoreData = (category, categoryData) => {
    if (category === 'favorites') { 
      this.storeFavorite(categoryData)
    } else {
      this.storeData(category, categoryData)
    }
  }

  storeData = (category, categoryData) => {
    const storage = JSON.parse(localStorage.getItem('storedData'))
    let newStorage
    if (storage) {
      newStorage = Object.assign({[category]: categoryData, ...storage})
    } else {
      newStorage = { [category]: categoryData }
    }
    localStorage.setItem('storedData', JSON.stringify(newStorage))
  }

  storeFavorite = (data) => {
    let favorites = JSON.parse(localStorage.getItem('favorites'))
    if (favorites) {
      const matches = favorites.find(favorite => favorite.name === data.name)
      if (matches) {
        favorites = favorites.filter(favorite => {
          return favorite.name !== data.name
        })
      } else {
        favorites.push(data)
      }
    } else {
      favorites = [data]
    }
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }

  changePage = (page) => {
    this.setState({ currentPage: page })
  }

  render() {
    const { currentPage, landingScroll } = this.state
    const renderHelper = {
      menu: <Menu
        changePage={this.changePage}
      />,
      people: <Main
        handleStoreData={this.handleStoreData}
        category='people'
        changePage={this.changePage}
      />,
      planets: <Main
        handleStoreData={this.handleStoreData}
        category='planets'
        changePage={this.changePage}
      />,
      vehicles: <Main
        handleStoreData={this.handleStoreData}
        category='vehicles'
        changePage={this.changePage}
      />,
      favorites: <Main
        handleStoreData={this.handleStoreData}
        category='favorites'
        changePage={this.changePage}
      />,
      landing: <Landing 
        continueToSite={this.changePage} 
        episode={landingScroll}/>,
      error: <Error changePage={this.changePage}/>
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

export default App;
