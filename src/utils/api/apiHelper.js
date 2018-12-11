import * as API from './apiCalls'

export const buildCategoryObj = async (category) => {
  const data = await API.getCategoryData(category)
  let categoryData = ''

  switch (category) {
    case 'people':
      categoryData = await API.getPeople(data.results)
      break
    case 'vehicles':
      categoryData = await API.getVehicles(data.results)
      break
    case 'planets':
      categoryData = await API.getPlanets(data.results)
      break
    default:
      break
  }

  return categoryData
}
