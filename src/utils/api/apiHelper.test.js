import { getCategoryData, getPeople, getPlanets, getVehicles } from './apiCalls'
import * as APIHelper from './apiHelper'

jest.mock('./apiCalls')

getCategoryData.mockImplementation(() => jest.fn())
getPeople.mockImplementation(() => jest.fn())
getPlanets.mockImplementation(() => jest.fn())
getVehicles.mockImplementation(() => jest.fn())

describe('buildCategoryObj', () => {

    beforeAll(() => {
      window.fetch = jest.fn().mockImplementation(
        () => Promise.resolve({
          ok: true,
          json: () => Promise.resolve({results: ['hi']})
        })
      )
    })

    it('should call getCategoryData', async () => {
      await APIHelper.buildCategoryObj('people')
      expect(getCategoryData).toHaveBeenCalled()
    })

    it('should call getPeople if category is people', async () => {
      await APIHelper.buildCategoryObj('people')
      expect(getPeople).toBeCalled()
    })

    it('should call getPlanets if category is planets', async () => {
      await APIHelper.buildCategoryObj('planets')
      expect(getPlanets).toBeCalled()
    })

    it('should call getVehicles if category is vehicles', async () => {
      await APIHelper.buildCategoryObj('vehicles')
      expect(getVehicles).toBeCalled()
    })

    it('should not call anything if there is no category', async () => {
      const result = await APIHelper.buildCategoryObj('poggle the lesser')
      expect(result).toEqual('')
    })

    it('should return the correct data', async () => {
      const mockData = [{name: 'Luke', species: 'Human'}]
      getPeople.mockImplementation(() => mockData)

      const result = await APIHelper.buildCategoryObj('people')
      expect(result).toEqual(mockData)
    })
  })