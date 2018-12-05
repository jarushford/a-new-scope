import React, { Component } from 'react'
import StarHousingComponent from '../Stars/StarHousingComponent'
import Landing from '../Landing/Landing'
import Menu from '../Menu/Menu'
import Main from '../Main/Main'
import Loading from '../Loading/Loading'
import './app.scss'

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentPage: 'menu',
      landingScroll: '',
    }
  }

  componentDidMount() {
    const fetchtitleScroll = async() => {
      const response = await fetch('https://swapi.co/api/films/')
      const films = await response.json();
      const randomNumber = Math.round(Math.random() * 7)
      const film = films.results[randomNumber]
      this.setState({ 
        landingScroll: {
          title: film.title,
          year: film.release_date,
          text: film.opening_crawl
        }
      })
    }
    fetchtitleScroll()
    
    setTimeout(() => {
      if (!this.state.landingScroll) {
        this.setState({
          landingScroll: 'error'
        })
      }
    }, 6000)
  }

  changePage = (page) => {
    this.setState({ currentPage: page })
  }

  render() {
    const { currentPage, landingScroll } = this.state
    const renderHelper = {
      menu: <Menu changePage={this.changePage}/>,
      people: <Main category='People' changePage={this.changePage}/>,
      planets: <Main category='Planets' changePage={this.changePage}/>,
      vehicles: <Main category='Vehicles' changePage={this.changePage}/>,
      favorites: <Main category='Favorites' changePage={this.changePage}/>,
      landing: <Landing 
        continueToSite={this.changePage} 
        episode={landingScroll}/>,
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
      {renderHelper[currentPage]}
      </div>
    )
  }
}

export default App;
