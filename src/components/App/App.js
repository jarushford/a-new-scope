import React, { Component } from 'react'
import StarHousingComponent from '../Stars/StarHousingComponent'
// import Landing from '../Landing/Landing'
import Menu from '../Menu/Menu'
// import Main from '../Main/Main'
import './app.scss'

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentPage: 'landing'
    }
  }

  changePage = (page) => {
    this.setState({ currentPage: page })
  }

  render() {
    const renderHelper = {
      // landing: <Landing />,
      menu: <Menu changePage={this.changePage}/>,
      // people: <Main category='people'/>,
      // planets: <Main category='planets'/>,
      // vehicles: <Main category='vehicles'/>,
    }
    const { currentPage } = this.state
    return (
      <div className="App">
      <StarHousingComponent />
        {renderHelper[currentPage]}
      </div>
    )
  }
}



export default App;
