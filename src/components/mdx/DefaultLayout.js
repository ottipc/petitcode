import React from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'

import GridWrapper from '../../components/GridWrapper'
import SectionContent from '../../components/mdx/SectionContent'

const DefaultLayoutWrapper = styled.div`
  padding-top: ${({ theme }) =>
    theme.elements.headerHeight + parseInt(theme.spacings.s2)}px;
`

export default function DefaultLayout({ children }) {
  return (
    <DefaultLayoutWrapper>
      <SectionContent>
        <GridWrapper>{children}</GridWrapper>
      </SectionContent>
    </DefaultLayoutWrapper>
  )
}

DefaultLayout.propTypes = {
  children: propTypes.node.isRequired
}
