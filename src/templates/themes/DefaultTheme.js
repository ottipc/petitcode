import React from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'

import GridWrapper from '../../components/GridWrapper'
import SectionContent from '../../components/mdx/SectionContent'

const DefaultThemeWrapper = styled.div`
  padding-top: ${({ theme }) =>
    theme.elements.headerHeight + parseInt(theme.spacings.s2)}px;
`

export default function DefaultTheme({ children }) {
  return (
    <DefaultThemeWrapper>
      <SectionContent>
        <GridWrapper>{children}</GridWrapper>
      </SectionContent>
    </DefaultThemeWrapper>
  )
}

DefaultTheme.propTypes = {
  children: propTypes.node.isRequired
}
