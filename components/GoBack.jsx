import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const GoBack = styled.a`
  font-family: cursive;
  font-size: 50px;
`

export default () => (
  <GoBack>
    <NavLink to="/">&lt;&lt; Go Back</NavLink>
  </GoBack>
)
