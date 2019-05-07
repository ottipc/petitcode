import React from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.section`
  width: 100%;
  max-width: ${({ theme }) => theme.grid.width}px;
  margin: 0 auto;
  padding: 10vh ${({ theme }) => theme.spacings.s2};

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    padding: 10vh ${({ theme }) => theme.spacings.s4};
  }
`

function Section({ children }) {
  return <Wrapper>{children}</Wrapper>
}

Section.prototype.propTypes = {
  children: propTypes.node.isRequired
}

export default Section
