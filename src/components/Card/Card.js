import React from 'react'

export default function Card({ cardData }) {
  return (
    <div className='card'>
      <button>Favorite</button>
      <h1>{cardData.name}</h1>
      <h1>{cardData.species}</h1>
      <h1>{cardData.homeworld}</h1>
      <h1>{cardData.population}</h1>
    </div>
  )
}