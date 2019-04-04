import React from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'

import GridWrapper from '../../components/GridWrapper'
import Footer from '../../components/Footer'

const DefaultThemeWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacings.s8};
`

export default function DarkTheme({ children }) {
  return (
    <DefaultThemeWrapper>
      <GridWrapper>{children}</GridWrapper>
      <Footer />
    </DefaultThemeWrapper>
  )
}

DarkTheme.propTypes = {
  children: propTypes.node.isRequired
}
