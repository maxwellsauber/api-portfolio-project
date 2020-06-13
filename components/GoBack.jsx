import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const GoBack = styled.a`
  font-family: cursive !important;
  color: #ffff00;  
  font-size: 50px;
  margin-bottom: 10px;
`

export default () => (
  <GoBack>
    <NavLink to="/">&lt;&lt; Go Back</NavLink>
  </GoBack>
)
