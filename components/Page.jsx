import React from 'react'
import styled from 'styled-components'

const Page = styled.div`
  margin: 60px auto;
  text-align: center;
  color: #00ff00;
`

export default ({ children }) => (
  <Page>{children}</Page>
)
