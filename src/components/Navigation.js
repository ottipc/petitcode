import React from 'react'
import propTypes from 'prop-types'
import styled, { css } from 'styled-components'

import GridWrapper from './GridWrapper'
import Link from './mdx/Link'
import { LocationContext } from '../utils/Contexts'
import PetitcodeTransparent from '../assets/petitcode-transparent.svg'

const Wrapper = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: fixed;
  z-index: 1000;
  top: 0;
  height: 100vh;
  left: 100vw;
  width: 100vw;
  background: #000;
  color: #fff;
  padding: 5rem;
  transition: left 0.15s ease-in;

  ${({ navigationActive }) =>
    navigationActive &&
    css`
      left: 0;
    `};
`

const ContentWrapper = styled(GridWrapper)`
  display: flex;
  align-items: center;
`

const Logo = styled(PetitcodeTransparent)`
  display: none;
  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
    display: block;
  }
`

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  font-family: ${({
    theme: {
      fonts: { header }
    }
  }) => header.join(', ')};
  font-weight: bold;
  font-size: 11vw;
  text-align: right;
  text-transform: uppercase;
`
const ListItem = styled.li`
  margin: 0;
  padding: 0;
  line-height: 1.3em;
`

const MenuBasicStyling = css`
  letter-spacing: 4px;

  &:hover {
    text-decoration: none;
    color: #000;
    text-shadow: -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff,
      1px 1px 0 #fff;
  }
`

const MenuLink = styled(Link)`
  ${MenuBasicStyling}
`

const ExternalLink = styled.a`
  ${MenuBasicStyling}
`

class Navigation extends React.PureComponent {
  static propTypes = {
    navigationActive: propTypes.bool.isRequired
  }
  render() {
    const { navigationActive } = this.props
    return (
      <LocationContext.Consumer>
        {({ activeLocale }) => (
          <Wrapper navigationActive={navigationActive}>
            <ContentWrapper>
              <Logo />
              <List>
                <ListItem>
                  <ExternalLink
                    href="https://petitcode.com/jobs/"
                    target="_blank"
                    rel="noopener"
                  >
                    Jobs
                  </ExternalLink>
                </ListItem>
                <ListItem>
                  <MenuLink humanId="contact" />
                </ListItem>
                <ListItem>
                  <ExternalLink
                    href="https://petitcode.com/blog/"
                    target="_blank"
                    rel="noopener"
                  >
                    Blog
                  </ExternalLink>
                </ListItem>
              </List>
            </ContentWrapper>
          </Wrapper>
        )}
      </LocationContext.Consumer>
    )
  }
}

export default Navigation
