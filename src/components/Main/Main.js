import React, { Component } from 'react'
import Card from '../Card/Card'
import { uid } from 'react-uid'
import Loading from '../Loading/Loading'


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
    let categoryData = ''
    switch(category) {
      case 'People':
        categoryData = await this.getPeople(data.results)
        break;
      case 'Vehicles':
        categoryData = await this.getVehicles(data.results)
        break;
      case 'Planets':
        categoryData = await this.getPlanets(data.results)
        break;
      default: 
        break;
    }

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
        type: speciesData.name,
        main1: person.height,
        main2: person.mass,
        secInfoMain: homeData.name,
        secInfoOther: homeData.population
      }
    })
    return Promise.all(unresolvedPromises)
  }

  getPlanets = (planets) => {
    const unresolvedPromises = planets.map(async planet => {
      const residents = await this.getResidents(planet.residents)
      return {
        name: planet.name,
        type: planet.terrain,
        main1: planet.population,
        main2: planet.climate,
        secInfoMain: residents,
        secInfoOther: ''
      }
    })
    return Promise.all(unresolvedPromises) 
  }

  getResidents = (residents) => {
    return residents.map(async residentLink => {
      const resident = await fetch(residentLink)
      const residentData = await resident.json()
      return residentData.name
    })
  }

  getVehicles = (vehicles) => {
    return vehicles.map(vehicle => {
      return {
        name: vehicle.name,
        type: 'vehicle',
        main1: vehicle.vehicle_class,
        secInfoMain: vehicle.passengers,
        secInfoOther: ''
      }
    })
  }

  convertPopulation = (population) => {
    let returnPop = population
    if (population > 1000) {
      returnPop =  `${population / 1000}K`
    }
    if (population > 1000000) {
      returnPop = `${population / 1000000} million`
    }
    if (population > 1000000000) {
      returnPop = `${population / 1000000000} billion`
    }
    return returnPop  
  }


  render() {
    const { category, changePage } = this.props
    const { categoryData } = this.state
    let render

    if (!categoryData.length) {
      render =  <div className="App">
      <Loading />
    </div>
    } else {
      // render = categoryData.map(current => {
      //   return <Card 
      //     cardData={current} 
      //     key={uid(current)}/>
      render = (<div></div>)
      
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