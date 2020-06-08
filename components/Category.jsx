import React from 'react'
import styled from 'styled-components'

const Categories = styled.li`
  color: red;
  font-size: 20px;
  margin-bottom: 10px;
  list-style:none;
`
export default ({ id, name }) => (
  <Categories key={id}>{name}</Categories>
)
