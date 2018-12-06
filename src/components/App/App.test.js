import React from 'react';
import App from './App';
import { fetchTitleScroll } from '../../utils/api/apiCalls'
import { shallow } from 'enzyme'

const mockFilm = {
  title: 'ep1', 
  release_date: '1995', 
  opening_crawl: 'starwars'
}

const mockFilms = {results: [mockFilm, mockFilm, mockFilm, mockFilm, mockFilm, mockFilm, mockFilm, mockFilm]}

jest.mock('../../utils/api/apiCalls', () => ({
  fetchTitleScroll: (url) => {
    if (url === 'https://swapi.co/api/films/') {
      return mockFilms
    }
    return new Error()
  },
}))

describe('App', () => {
  let wrapper
  
  beforeEach(() => {
    wrapper = shallow(<App />)
  })
  
  it('on page load the current page should be landing', () => {
    wrapper = shallow(<App />, { disableLifecycleMethods: true})
    expect(wrapper.state().currentPage).toEqual('landing')
  })

  it('should change current page to the value passed into changePage', () => {
    wrapper.instance().changePage('menu')
    expect(wrapper.instance().state.currentPage).toEqual('menu')
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('ComponentDidMount', () => {

    describe('Success', () => {

      it('should update landingScroll in state if fetch is successful', async () => {
      
        const expectedState = {
          currentPage: 'landing',
          landingScroll: {
            title: 'ep1', 
            year: '1995', 
            text: 'starwars'
          }
        }

        await fetchTitleScroll('https://swapi.co/api/films/')
        expect(wrapper.state()).toEqual(expectedState)
      })
    })
    
    describe('Error', () => {
      
      it('should update currentPage to error in state if fetch rejects', async () => {      
        const wrapper1 = shallow(<App />)

        const expectedState = {
          currentPage: 'error',
          landingScroll: ''
        }

        await fetchTitleScroll('stuff that doesnt work')
        expect(wrapper1.state()).toEqual(expectedState)
      })
    })
  })
})
