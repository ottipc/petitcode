import React from 'react'
// import propTypes from 'prop-types'
import styled from 'styled-components'

import GridWrapper from './GridWrapper'
import LanguageSelect from './LanguageSelect'

const FooterWrapper = styled.footer`
  padding: ${({ theme }) => theme.spacingUnit * 4}px 0
    ${({ theme }) => theme.spacingUnit * 2}px;
`

const Grid = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.spacingUnit}px 0;
  justify-content: space-between;
`

export default class Footer extends React.PureComponent {
  static propTypes = {
    // pages: propTypes.array.isRequired,
    // locale: propTypes.string.isRequired
  }
  render() {
    return (
      <FooterWrapper>
        <GridWrapper>
          <Grid>
            <div>
              <LanguageSelect />
            </div>
            <div>
              <a
                target="_blank"
                href="https://web.facebook.com/thecodetosuccess/"
              >
                FB
              </a>
              &nbsp;
              <a
                target="_blank"
                href="https://www.instagram.com/thecodetosuccess/"
              >
                IN
              </a>
              &nbsp;
              <a target="_blank" href="https://twitter.com/the_petitcode">
                TW
              </a>
            </div>
          </Grid>
        </GridWrapper>
      </FooterWrapper>
    )
  }
}
