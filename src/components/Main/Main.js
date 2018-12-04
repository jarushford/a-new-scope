import React, { Component } from 'react'
import Card from '../Card/Card'

export default class Main extends Component {
  constructor() {
    super()
    this.state = {
      categoryData: []
    }
  }

  async componentDidMount() {
    const { category } = this.props
    const url = `https://swapi.co/api/${category.toLowerCase()}`
    const response = await fetch(url)
    const data = await response.json()
    const categoryData = await this.getPeople(data.results)
    this.setState({ categoryData })
  }

  getPeople = (people) => {
    const unresolvedPromises = people.map(async person => {
      const homeworld = await fetch(person.homeworld)
      const homeData = await homeworld.json()
      const species = await fetch(person.species)
      const speciesData = await species.json()
      return {
        name: person.name,
        height: person.height,
        weight: person.mass,
        species: speciesData.name,
        homeworld: homeData.name,
        population: homeData.population
      }
    })
    return Promise.all(unresolvedPromises)
  }

  getPlanets = (data) => {

  }

  getVehicles = (data) => {

  }
  
  getFavorites = (data) => {

  }


  render() {
    const { category, changePage } = this.props
    const { categoryData } = this.state
    let render
    if (!categoryData.length) {
      render = <h1 className='loading'>Loading...</h1>
    } else {
      render = categoryData.map(current => {
        return <Card cardData={current}/>
      })
    }
    return (
      <main className='main'>
        <div className='header-container'>
          <button onClick={() => changePage('menu')}>BACK</button>
          <h1 className='main-header'>{category}</h1>
        </div>
        <section className='card-section'>
          {render}
        </section>
      </main>
    )
  }
}