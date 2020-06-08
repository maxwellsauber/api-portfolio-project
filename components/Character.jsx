import React from 'react'
import styled from 'styled-components'

const Characters = styled.li`
  color: pink;
  font-size: 20px;
  margin-bottom: 10px;
  list-style:none;
`
export default ({ id, name }) => (
  <Characters key={id}>{name}</Characters>
)
