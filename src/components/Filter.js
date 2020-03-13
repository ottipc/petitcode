import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 25px;
`

const Container = styled.div`
  background-color: white;
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`

const Filter = () => {
  return (
    <Wrapper>
      <Container>
        <p>This is a fitler</p>
      </Container>
    </Wrapper>
  )
}

export default Filter
