import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
  border-radius: 8px;
  border-color:red;
  font-size: 16px;
  padding: 5px;
  margin: 20px 0;
  outline: none;
`

export default ({ term, setter }) => (
  <Input type="text" name="search" value={term} onChange={event => setter(event.target.value)} />
)
