export const fetchTitleScroll = async () => {
  const response = await fetch('https://swapi.co/api/films/')
  if (response.ok) {
    return await response.json()
  } else {
    throw new Error('Internal Server Error')
  }
}