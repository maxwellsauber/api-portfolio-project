import React from 'react'
import styled from 'styled-components'
import Category from './Category'
import Decade from './Decade'
import Character from './Character'
import Tag from './Tag'
import GoBack from './GoBack'

const NostalgiaItem = styled.div`color: #00f3ff; font-size:30px;`

export default ({
  id, decades, description, categories, characters, tags,
}) => (
  <>
    <NostalgiaItem key={id}>{description}</NostalgiaItem>
    <h3> Categories: </h3>
    <ul>
      {
        categories.map(category => (
          <Category key={category.id} name={category.category} id={category.id} />
        ))
      }
    </ul>

    <h3> Decades: </h3>
    <ul>
      {
        decades.map(decade => (
          <Decade key={decade.id} name={decade.decade} id={decade.id} />
        ))
      }
    </ul>

    <h3> Characters: </h3>
    <ul>
      {
        characters.map(character => (
          <Character key={character.id} name={character.character} id={character.id} />
        ))
      }
    </ul>

    <h3> Tags: </h3>
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
