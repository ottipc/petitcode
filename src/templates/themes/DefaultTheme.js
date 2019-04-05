import React from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'

import GridWrapper from '../../components/GridWrapper'

const DefaultThemeWrapper = styled.div`
  padding: 0 ${({ theme }) => theme.spacings.s2};

  margin-top: ${({ theme }) =>
    theme.elements.headerHeight + parseInt(theme.spacings.s4)}px;

  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
    padding: 0 ${({ theme }) => theme.spacings.s1};
  }
`

export default function DarkTheme({ children }) {
  return (
    <DefaultThemeWrapper>
      <GridWrapper>{children}</GridWrapper>
    </DefaultThemeWrapper>
  )
}

DarkTheme.propTypes = {
  children: propTypes.node.isRequired
}
