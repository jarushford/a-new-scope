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

jest.mock('../../utils/api/apiCalls')

beforeAll(() => {
  fetchTitleScroll.mockImplementation(() => mockFilms)
})

describe('App', () => {
  let wrapper
  
  beforeEach(() => {
    wrapper = shallow(<App />)
  })
  
  it('on page load the current page should be landing', () => {
    wrapper = shallow(<App />, { disableLifecycleMethods: true})
    expect(wrapper.state().currentPage).toEqual('landing')
  })
  
  it('should match the snapshot when loading', () => {
    wrapper.setState({
      landingScroll: mockFilm
    })
    expect(wrapper).toMatchSnapshot()
  })

  it('should match the snapshot when page is loaded', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('Changepage', () => {
    
    it('should change current page to the value passed into changePage', () => {
      wrapper.instance().changePage('menu')
      expect(wrapper.instance().state.currentPage).toEqual('menu')
    })
  })

  describe('ComponentDidMount', () => {
    it('Should call handleTitleScroll', () => {

    })
  })

  describe('HandleTitleScroll', () => {
    describe('Success', () => {

      it('should update landingScroll in state if fetch is successful', async () => {

        const expectedState = {
            title: 'ep1', 
            year: '1995', 
            text: 'starwars'
        }

        await wrapper.instance().handleTitleScroll()
        expect(wrapper.state().landingScroll).toEqual(expectedState)
      })
    })
    
    describe('Error', () => {

      it('should update currentPage to error in state if fetch rejects', async () => {      
        
        fetchTitleScroll.mockImplementation(() => {
          throw new Error('Could not fetch')
        })

        const expectedState = 'error'

        await wrapper.instance().handleTitleScroll()
        expect(wrapper.state().currentPage).toEqual(expectedState)
      })

      it('should update current page to error if the fetch takes longer than 8 seconds', () => {

      })
    })
  })

  describe('handleStoreData', () => {

    it('Should call storeFavorite and updateStoredData functions if category is favorites', () => {

    })

    it('Should call storeData if category isnt favorites', () => {

    })
  })

  describe('storeData', () => {
    
    it('Should set reassign storedData in local storage to a new object with the new category data included', () => {

    })
  })

  describe('updateStoreData', () => {
    
    it('Should find the card to be updated in localstorage and replace it with the changed card', () => {

    })
  })

  describe('storeFavorite', () => {
    
    it('Should push in the new favorited card to local storage if it is a new favorite', () => {

    })

    it('Should remove the favorite from local storage if the favorite was removed', () => {

    })
  })

})
