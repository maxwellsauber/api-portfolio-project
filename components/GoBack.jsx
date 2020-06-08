import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const GoBack = styled.a`
  font-family: cursive !important;
  color: yellow ;  
  font-size: 50px;
  margin-bottom: 10px;
  list-style:none;
`

export default () => (
  <GoBack>
    <NavLink to="/">&lt;&lt; Go Back</NavLink>
  </GoBack>
)
