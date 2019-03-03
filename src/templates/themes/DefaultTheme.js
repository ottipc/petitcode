import React from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'

import GridWrapper from '../../components/GridWrapper'

const DefaultThemeWrapper = styled.div`
  padding: 20vh 0;
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
