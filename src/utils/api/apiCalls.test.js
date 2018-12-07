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

  describe('getCategoryData', () => {
    let mockPeople

    beforeEach(() => {
      mockPeople = [
        {name: 'Luke', species: 'human'},
        {name: 'C3PO', species: 'droid'},
        {name: 'Obi-Wan', species: 'human'}
      ]
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPeople)
        })
      })
    })

    it('should call fetch with the correct params', async () => {
      const expected = 'https://swapi.co/api/people'

      await API.getCategoryData('people')

      expect(window.fetch).toHaveBeenCalledWith(expected)
    })

    it('should return a JSON object if successful', async () => {
      const expected = [
        {name: 'Luke', species: 'human'},
        {name: 'C3PO', species: 'droid'},
        {name: 'Obi-Wan', species: 'human'}
      ]

      const result = await API.getCategoryData('people')

      expect(result).toEqual(expected)
    })

    it('should throw and error if unsuccessful', async () => {
      const expectedError = Error('Internal Server Error')
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: false,
          json: () => Promise.resolve(mockPeople)
        })
      })

      expect(API.getCategoryData('people')).rejects.toEqual(expectedError)
    })
  })

  describe('getPeople', () => {
    let mockPeople

    beforeEach(() => {
      mockPeople = [{
        name: 'Luke',
        species: 'https://swapi.co/api/species/1',
        homeworld: 'https://swapi.co/api/planets/1',
        height: 30,
        mass: 100
      }]
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockPeople)
        })
      })
    })

    it('should call fetch with the correct params', async () => {
      const expected1 = 'https://swapi.co/api/planets/1'
      const expected2 = 'https://swapi.co/api/species/1'

      await API.getPeople(mockPeople)

      expect(window.fetch).toHaveBeenNthCalledWith(1, expected1)
      expect(window.fetch).toHaveBeenNthCalledWith(2, expected2)
    })

    it('should return the correct data if successful', async () => {
      mockPeople = [{
        name: 'Luke',
        species: 'species',
        homeworld: 'home',
        height: 30,
        mass: 100
      }]

      window.fetch = jest.fn().mockImplementation((url) => {
        if (url === 'home') {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ name: 'Tatooine', population: 200000 })
          })
        } else {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ name: 'human'})
          })
        }
      })

      const expected = [{
        name: 'Luke',
        type: 'human',
        main1: 30,
        main2: 100,
        secInfoMain: 'Tatooine',
        secInfoOther: '200K'
      }]

      const result = await API.getPeople(mockPeople)

      expect(result).toEqual(expected)
    })
  })

  describe('getPlanets', () => {
    let mockPlanets

    beforeEach(() => {
      mockPlanets = [{
        name: 'Alderaan',
        terrain: 'grassland, mountains',
        climate: 'temperate',
        population: 2000000000,
        residents: ['https://swapi.co/api/people/5/']
      }]
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ name: 'Leia Organa'})
        })
      })
    }) 

    it('should call getResidents with the correct params', async () => {
      const expected = [{
        name: 'Alderaan',
        type: 'grassland, mountains',
        main1: '2 billion',
        main2: 'temperate',
        secInfoMain: ['Leia Organa'],
        secInfoOther: ''
      }]

      const result = await API.getPlanets(mockPlanets)
      
      expect(result).toEqual(expected)
    })
  })

  describe('getResidents', () => {
    let mockResidents

    beforeEach(() => {
      mockResidents = [
        'https://swapi.co/api/people/5/',
        'https://swapi.co/api/people/8/'
      ]
      window.fetch = jest.fn().mockImplementation((url) => {
        if (url === mockResidents[0]) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ name: 'Leia Organa' })
          })
        } else {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ name: 'R5-D4' })
          })
        }
      })
    }) 

    it('should call fetch with the correct params', async () => {
      await API.getResidents(mockResidents)

      expect(window.fetch).toHaveBeenNthCalledWith(1,mockResidents[0])
      expect(window.fetch).toHaveBeenNthCalledWith(2,mockResidents[1])
    })

    it('should return the correct data when successful', async () => {
      const expected = ['Leia Organa', 'R5-D4']

      const result = await API.getResidents(mockResidents)

      expect(result).toEqual(expected)
    })
  })

  describe('getVehicles', () => {
    let mockVehicles

    beforeEach(() => {
      mockVehicles = [
        {
          name: 'Sand Crawler',
          model: 'Digger Crawler',
          vehicle_class: 'wheeled',
          passengers: '30'
        },
        {
          name: 'Snowspeeder',
          model: 't-47 airspeeder',
          vehicle_class: 'airspeeder',
          passengers: '0'
        }
      ]
    })

    it('should return an array of data objects', () => {
      const expected = [
        {
          name: 'Sand Crawler',
          type: 'vehicle',
          main1: 'Digger Crawler',
          main2: 'wheeled',
          secInfoMain: '30',
          secInfoOther: ''
        },
        {
          name: 'Snowspeeder',
          type: 'vehicle',
          main1: 't-47 airspeeder',
          main2: 'airspeeder',
          secInfoMain: '0',
          secInfoOther: ''
        }
      ]

      const result = API.getVehicles(mockVehicles)

      expect(result).toEqual(expected)
    })

  })
})