import fetchItems from '../actions/nostalgiaItems'

export const filterItems = (itemList, searchTerm) => itemList.filter(item => (
  item.name.toLowerCase().includes(searchTerm.toLowerCase())
))

export const retrieveItems = async () => {
  const data = await fetchItems()

  return data
}
