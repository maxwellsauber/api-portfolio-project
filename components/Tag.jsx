import React from 'react'
import styled from 'styled-components'

const Tags = styled.li`color: orange;`

export default ({ id, name }) => (
  <Tags key={id}>{name}</Tags>
)
