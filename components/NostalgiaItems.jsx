import React, { useState, useEffect } from 'react'
import NostalgiaItem from './NostalgiaItem'
import Search from './Search'
import { filterItems, retrieveItems } from '../utils/items'

export default () => {
  const [itemList, setItemList] = useState([])
  const [filterItemList, setFilterItemList] = useState([])
  const [searchTerm, setSearchTerm] = useState([])

  useEffect(() => {
    async function pullData() {
      const items = await retrieveItems()

      setItemList(items)
      setFilterItemList(items)
    }
    pullData()
  }, [])

  useEffect(() => {
    const filtered = filterItems(itemList, searchTerm)

    setFilterItemList(filtered)
  }, [searchTerm])

  return (
    <div>
      <h1>Nostalgia Items</h1>
      <Search term={searchTerm} setter={setSearchTerm} />
      <ul>
        {
          filterItemList.map(item => (
            <NostalgiaItem
              key={item.id}
              name={item.name}
              slug={item.slug}
            />
          ))
        }
      </ul>
    </div>
  )
}
