import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Nostalgia = styled.li`
  color: yellow;
  font-size: 20px;
  margin: 10px;
  text-align: center;
`

const Link = styled(NavLink)`
  color: yellow;
  text-decoration: none;
`

export default (({ id, name, slug }) => (
  <Nostalgia key={id}>
    <Link to={`/item/${slug}`}>{`${name} (${slug})`}</Link>
  </Nostalgia>
))
