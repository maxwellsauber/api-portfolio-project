import React from 'react'
import styled from 'styled-components'

const Decade = styled.li`
  color: #fbff07;
  font-size: 20px;
  margin-bottom: 10px;
  list-style-position: inside;
`
export default ({ id, name }) => (
  <Decade key={id}>{name}</Decade>
)
