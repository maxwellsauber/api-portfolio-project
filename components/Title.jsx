import React from 'react'
import styled from 'styled-components'

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
`

const Subtitle = styled.div`
  font-size: 20px;
`

export default () => (
  <>
    <Title>Nostalgia Items</Title>
    <Subtitle>A searchable list of all your favorite things</Subtitle>
  </>
)
