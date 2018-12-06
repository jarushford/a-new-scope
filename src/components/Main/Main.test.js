import Main from './Main'
import { shallow } from 'enzyme'
import React from 'react';
import { buildCategoryObj } from '../../utils/api/apiCalls'

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

jest.mock('../../utils/api/apiCalls')

beforeAll(() => {
  buildCategoryObj.mockImplementation(() => mockCategoryData)
})

describe('Main', () => {
  let wrapper
  let mockChangePage

  beforeEach(() => {
    mockChangePage = jest.fn()
    wrapper = shallow(<Main changePage={mockChangePage} category={'vehicles'}/>)
  })

  it('should default state to no error', () => {
    const expected = false

    expect(wrapper.state().error).toEqual(expected)
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

    it('Should set state to error when everything is not ok', async () => {

      buildCategoryObj.mockImplementation(() => {
        throw new Error('Could not fetch')
      })

      const expected = true

      await wrapper.instance().componentDidMount()
      expect(wrapper.state().error).toEqual(expected)
    })
  })

})
