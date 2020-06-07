import React, { useEffect, useState } from 'react'
import Page from '../components/Page'
import Title from '../components/Title'
import NostalgiaItem from '../components/NostalgiaItem'
import { retrieveItems } from '../utils/itemsBySlug'

export default ({ location }) => {
  const [itemSlug, setItemSlug] = useState('')
  const [item, setItem] = useState({})
  const [itemList, setItemList] = useState([])

  useEffect(() => {
    async function pullData() {
      const { details, items } = await retrieveItems(location)

      setItemSlug(details.slug)
      setItem(details)
      setItemList(items)
    }

    pullData()
  }, [])

  // Slide 41
  return (
    <Page>
      <Title />
      {
        itemSlug
          ? (
            <>
              <div>{item.name}</div>
              {itemList.map(currentItem => (
                <NostalgiaItem
                  key={currentItem.id}
                  id={currentItem.id}
                  name={currentItem.name}
                />
              ))}
            </>
          )
          : (<div>Sorry, I do not know that</div>)
      }
    </Page>

  )
}
