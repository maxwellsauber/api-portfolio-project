import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const NostalgiaItem = styled.li`
  font-size: 20px;
  margin-bottom: 10px;
  list-style:none;
`
const Link = styled(NavLink)`
  text-decoration: none;
  color: orange;
`
export default ({ id, name, slug }) => (
  <NostalgiaItem key={id}>
    <Link to={`/${slug}`}>{`${name} (${slug})`}</Link>
  </NostalgiaItem>
)
