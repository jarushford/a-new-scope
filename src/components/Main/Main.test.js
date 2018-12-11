import React from 'react'
import { shallow } from 'enzyme'
import Main from './Main'
import { buildCategoryObj } from '../../utils/api/apiHelper'

const mockCategoryData = [
  {
    name: 'Luke',
    species: 'Human',
    homeworld: 'Tatooine'
  },
  {
    name: 'R2-D2',
    species: 'droid',
    homeworld: 'Tatooine'
  }
]

jest.mock('../../utils/api/apiHelper')

beforeAll(() => {
  buildCategoryObj.mockImplementation(() => mockCategoryData)
})

describe('Main', () => {
  let wrapper
  let mockChangePage
  let handleStoreData

  beforeEach(() => {
    mockChangePage = jest.fn()
    handleStoreData = jest.fn()
    wrapper = shallow(
      <Main
        changePage={mockChangePage}
        category="vehicles"
        handleStoreData={handleStoreData}
      />
    )
  })

  it('should redirect to Landing when the millenium falcon btn is clicked', () => {
    wrapper.find('.return-to-landing-btn').simulate('click')
    expect(mockChangePage).toBeCalledWith('landing')
  })

  it('should redirect to the menu page when the menu btn is clicked', () => {
    wrapper.find('.continue-to-site-btn').simulate('click')
    expect(mockChangePage).toBeCalledWith('menu')
  })

  it('Should match the snapshot when loading', () => {
    wrapper.setState({
      landingScroll: []
    })
    expect(wrapper).toMatchSnapshot()
  })

  it('Should match the snapshot when finished loading', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('ComponentDidMount', () => {
    it('Should return category data when everything is ok', async () => {
      const expected = [
        {
          name: 'Luke',
          species: 'Human',
          homeworld: 'Tatooine'
        },
        {
          name: 'R2-D2',
          species: 'droid',
          homeworld: 'Tatooine'
        }
      ]

      await wrapper.instance().componentDidMount()
      expect(wrapper.state().categoryData).toEqual(expected)
    })

    it('Should load favorites from local storage if the category is favorites', () => {
      const expected = [{
        name: 'Luke',
        species: 'human',
        favorite: true
      }]

      localStorage.setItem('favorites', JSON.stringify(expected))

      wrapper = shallow(<Main
        changePage={mockChangePage}
        category="favorites"
        handleStoreData={handleStoreData}
      />)

      expect(wrapper.state().categoryData).toEqual(expected)

      localStorage.removeItem('favorites')
    })

    it('Should load category data from local storage if it exists', () => {
      localStorage.setItem('storedData', JSON.stringify({ people: mockCategoryData }))

      wrapper = shallow(<Main
        changePage={mockChangePage}
        category="people"
        handleStoreData={handleStoreData}
      />)

      wrapper.instance().componentDidMount()

      expect(wrapper.state().categoryData).toEqual(mockCategoryData)
    })
  })

  describe('getFavorites', () => {
    it('Should set category data to none if there are no current favorites', () => {
      const expectedCategoryData = 'none'
      wrapper.instance().getFavorites([])

      expect(wrapper.state().categoryData).toEqual(expectedCategoryData)
    })

    it('Should set category data an array of favorites if there are favorites', () => {
      const favorites = [{ name: 'fav1' }, { name: 'fav2' }]
      wrapper.instance().getFavorites(favorites)

      expect(wrapper.state().categoryData).toEqual(favorites)
    })
  })
})
