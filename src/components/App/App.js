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
      currentPage: 'landing',
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
        category='people'
        changePage={this.changePage}
      />,
      planets: <Main
        category='planets'
        changePage={this.changePage}
      />,
      vehicles: <Main
        category='vehicles'
        changePage={this.changePage}
      />,
      favorites: <Main
        category='favorites'
        changePage={this.changePage}
      />,
      landing: <Landing 
        continueToSite={this.changePage} 
        episode={landingScroll}/>,
      error: <Error />
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
