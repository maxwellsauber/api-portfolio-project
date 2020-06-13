import React from 'react'
import styled from 'styled-components'

const Categories = styled.li`
  color: red;
  font-size: 20px;
  margin-bottom: 10px;
  list-style-position: inside;

`
export default ({ id, name }) => (
  <Categories key={id}>{name}</Categories>
)
