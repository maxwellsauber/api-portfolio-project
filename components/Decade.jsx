import React from 'react'
import styled from 'styled-components'

const Decade = styled.li`
  color: blue;
  font-size: 20px;
  margin-bottom: 10px;
  list-style:none;
`
export default ({ id, name }) => (
  <Decade key={id}>{name}</Decade>
)
