import React from 'react'
import styled from 'styled-components'

const Page = styled.div`
  margin: 60px auto 0;
  text-align: center;
  color: #00ff00;
  background-color:#000;
`

export default ({ children }) => (
  <Page>{children}</Page>
)
