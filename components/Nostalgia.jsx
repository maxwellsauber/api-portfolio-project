import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Nostalgia = styled.li`color: pink;`

const Link = styled(NavLink)`color: #ffff00;`

export default (({ id, name, slug }) => (
  <Nostalgia key={id}>
    <Link to={`/item/${slug}`}>{name}</Link>
  </Nostalgia>
))
