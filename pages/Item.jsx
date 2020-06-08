import React, { useEffect, useState } from 'react'
import Page from '../components/Page'
import Title from '../components/Title'
import NostalgiaItem from '../components/NostalgiaItem'
import { retrieveItems } from '../utils/itemsBySlug'

export default ({ location }) => {
  const [itemSlug, setItemSlug] = useState('')
  const [descriptionText, setDescriptionText] = useState('')
  const [itemName, setItemName] = useState('')
  const [itemId, setItemId] = useState(0)
  const [decadeList, setDecadeList] = useState([])
  const [charcterList, setCharacterList] = useState([])
  const [categoryList, setCategoryList] = useState([])
  const [tagList, setTagList] = useState([])

  useEffect(() => {
    async function pullData() {
      const {
        id,
        name,
        slug,
        categories,
        characters,
        decades,
        description,
        tags,
      } = await retrieveItems(location)

      setCategoryList(categories)
      setItemSlug(slug)
      setDescriptionText(description)
      setDecadeList(decades)
      setItemName(name)
      setItemId(id)
      setCharacterList(characters)
      setTagList(tags)
    }

    pullData()
  }, [])

  return (
    <Page>
      <Title />
      {
        itemSlug
          ? (
            <>
              <div key={itemId}>{itemName}</div>
              <NostalgiaItem
                id={itemId}
                decades={decadeList}
                description={descriptionText}
                categories={categoryList}
                key={itemSlug}
                characters={charcterList}
                tags={tagList}
              />

            </>
          )
          : (<div>Sorry, I do not know that</div>)
      }
    </Page>

  )
}
