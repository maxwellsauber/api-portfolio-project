import React, { useState, useEffect } from 'react'
import Page from '../components/Page'
import Nostalgia from '../components/Nostalgia'
import Search from '../components/Search'
import Title from '../components/Title'
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
    <Page>
      <Title />
      <Search term={searchTerm} setter={setSearchTerm} />
      <ul>
        {
          filterItemList.map(item => (
            <Nostalgia
              key={item.id}
              id={item.id}
              name={item.name}
              slug={item.slug}
            />
          ))
        }
      </ul>
    </Page>
  )
}
