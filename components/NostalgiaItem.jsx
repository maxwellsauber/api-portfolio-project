import React from 'react'
import styled from 'styled-components'
import Category from './Category'
import Decade from './Decade'
import Character from './Character'
import Tag from './Tag'
import GoBack from './GoBack'

const NostalgiaItem = styled.div`
  color: indigo;  
  font-size: 20px;
  margin-bottom: 10px;
  list-style:none;
`

// A combat between VSCode and lint
// eslint-disable-next-line object-curly-newline
export default ({ id, decades, description, categories, characters, tags }) => (
  <>
    <NostalgiaItem key={id}>{description}</NostalgiaItem>
    <div> Categories: </div>
    <ul>
      {
        categories.map(category => (
          <Category key={category.id} name={category.category} id={category.id} />
        ))
      }
    </ul>

    <div> Decades: </div>
    <ul>
      {
        decades.map(decade => (
          <Decade key={decade.id} name={decade.decade} id={decade.id} />
        ))
      }
    </ul>

    <div> Characters: </div>
    <ul>
      {
        characters.map(character => (
          <Character key={character.id} name={character.character} id={character.id} />
        ))
      }
    </ul>

    <div> Tags: </div>
    <ul>
      {
        tags.map(tag => (
          <Tag key={tag.id} name={tag.tag} id={tag.id} />
        ))
      }
    </ul>
    <GoBack />
  </>
)
