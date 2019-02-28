import React from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'

import GridWrapper from './GridWrapper'
import LanguageSelect from './LanguageSelect'

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
    colorScheme: propTypes.string.isRequired
  }
  render() {
    const { colorScheme } = this.props
    return (
      <FooterWrapper colorScheme={colorScheme}>
        <GridWrapper>
          <Grid>
            <div>
              <LanguageSelect />
            </div>
            <div>
              <a
                target="_blank"
                href="https://web.facebook.com/thecodetosuccess/"
                rel="noopener"
              >
                FB
              </a>
              &nbsp;
              <a
                target="_blank"
                href="https://www.instagram.com/thecodetosuccess/"
                rel="noopener"
              >
                IN
              </a>
              &nbsp;
              <a
                target="_blank"
                href="https://twitter.com/the_petitcode"
                rel="noopener"
              >
                TW
              </a>
            </div>
          </Grid>
        </GridWrapper>
      </FooterWrapper>
    )
  }
}
