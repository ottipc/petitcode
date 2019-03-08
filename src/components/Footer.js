import React from 'react'
import propTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Social from './mdx/Social'
import LanguageSelect from './LanguageSelect'
import FooterNavigation from './FooterNavigation'
import { SectionContext, NavigationContext } from '../utils/Contexts'

const FooterWrapper = styled.footer`
  position: relative;
  z-index: 200;
  padding: ${({ theme }) => theme.outerSpacing};
  transition: color 0.3s linear;
  ${({ colorScheme }) => css`
    color: ${colorScheme};

    & a:after {
      background-color: ${colorScheme};
    }
  `}
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
      <SectionContext.Consumer>
        {({ sections, activeSection }) => (
          <NavigationContext.Consumer>
            {({ scrolledDown }) => (
              <FooterWrapper colorScheme={colorScheme}>
                <Grid>
                  <LanguageSelect />
                  {// Show Navigation when menu is visible
                  (navigationActive ||
                    // Or scrolled down on non-section page
                    (activeSection === null && scrolledDown) ||
                    // Or on last section on section page
                    activeSection === sections.length - 1) && (
                    <FooterNavigation />
                  )}
                  <Social />
                </Grid>
              </FooterWrapper>
            )}
          </NavigationContext.Consumer>
        )}
      </SectionContext.Consumer>
    )
  }
}
