import React from 'react'
import styled from 'styled-components'

const Categories = styled.li`color: red;`

export default ({ id, name }) => (
  <Categories key={id}>{name}</Categories>
)
