import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const GoBack = styled(NavLink)`
  font-family: cursive;
  font-size: 50px;
  color: white;
`

export default () => (
  <GoBack to="/">&lt;&lt; Go Back</GoBack>
)
