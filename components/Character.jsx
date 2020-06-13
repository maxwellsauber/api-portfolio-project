import React from 'react'
import styled from 'styled-components'

const Characters = styled.li`color: pink;`

export default ({ id, name }) => (
  <Characters key={id}>{name}</Characters>
)
