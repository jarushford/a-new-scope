import * as API from './apiCalls'

describe('API', () => {

  describe('fetchTitleScroll', () => {
    let mockFilm
    let mockFilms
   
    beforeEach(() => {
      mockFilm = {
        title: 'ep1', 
        release_date: '1995', 
        opening_crawl: 'starwars'
      }
      mockFilms = [mockFilm, mockFilm]
      window.fetch = jest.fn().mockImplementation(
        () => Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockFilms)
        })
      )
    })

    it('Should call fetch with correct params', () => {
      const expected = 'https://swapi.co/api/films/'
      API.fetchTitleScroll()
      expect(window.fetch).toHaveBeenCalledWith(expected)
    })

    it('Should return films if everything is ok', async () => {
      const expected = mockFilms
      const result = await API.fetchTitleScroll()

      expect(result).toEqual(expected)
    })

    it('Should throw error if everything is not ok', async () => {
      const expectedError = Error('Internal Server Error')
      window.fetch = jest.fn().mockImplementation(
        () => Promise.resolve({
          ok: false,
          json: () => Promise.resolve(mockFilms)
        })
      )

      await expect(API.fetchTitleScroll()).rejects.toEqual(expectedError)
    })

  })
})