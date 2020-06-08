import React from 'react'
import styled from 'styled-components'

const Tags = styled.li`
  color: orange;
  font-size: 20px;
  margin-bottom: 10px;
  list-style:none;
`
export default ({ id, name }) => (
  <Tags key={id}>{name}</Tags>
)
