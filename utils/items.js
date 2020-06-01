import axios from 'axios'

export const filterItems = (itemList, searchTerm) => itemList.filter(item => (
  item.name.toLowerCase().includes(searchTerm.toLowerCase())
))

export const retrieveItems = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/all`) // eslint-disable-line no-undef

  return data
}
