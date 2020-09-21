import React from 'react'
import styled from 'styled-components'
import Page from '../components/Page'

const ErrorHeading = styled.div`
  font-size: 100px;
  margin-bottom: 20px;
`
const Error = styled.div`
  font-size: 50px;
  color:#ffff00
`

export default () => (
  <Page>
    <ErrorHeading>Sorry!</ErrorHeading>
    <Error>
      Unable to find the page you are looking for.
    </Error>
  </Page>
)
