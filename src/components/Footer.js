import React from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'

import Social from './mdx/Social'
import GridWrapper from './GridWrapper'
import LanguageSelect from './LanguageSelect'
import FooterNavigation from './FooterNavigation'

const FooterWrapper = styled.footer`
  position: relative;
  z-index: 200;
  padding: ${({ theme }) => theme.spacingUnit * 4}px 0
    ${({ theme }) => theme.spacingUnit * 2}px;
  color: ${({ colorScheme }) => colorScheme};
  transition: color 0.3s linear;
`

const Grid = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.spacingUnit}px 0;
  justify-content: space-between;
`

export default class Footer extends React.PureComponent {
  static propTypes = {
    colorScheme: propTypes.string.isRequired,
    navigationActive: propTypes.bool.isRequired
  }
  render() {
    const { colorScheme, navigationActive } = this.props
    return (
      <FooterWrapper colorScheme={colorScheme}>
        <GridWrapper>
          <Grid>
            {navigationActive ? <FooterNavigation /> : <LanguageSelect />}
            <Social />
          </Grid>
        </GridWrapper>
      </FooterWrapper>
    )
  }
}
