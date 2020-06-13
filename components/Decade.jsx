import React from 'react'
import styled from 'styled-components'

const Decade = styled.li`color: #fbff07;`

export default ({ id, name }) => (
  <Decade key={id}>{name}</Decade>
)
