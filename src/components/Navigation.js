import React from 'react'
import propTypes from 'prop-types'
import styled, { css } from 'styled-components'

import GridWrapper from './GridWrapper'
import Link from './mdx/Link'
import { LocationContext } from '../utils/Contexts'
import PetitcodeTransparent from '../assets/petitcode-transparent.svg'

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
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
  justify-content: space-around;
`

const Logo = styled(PetitcodeTransparent)`
  display: none;
  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
    display: block;
  }
  margin-right: ${({ theme }) => theme.spacings.s4};
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
  text-align: right;
  text-transform: uppercase;

  ${({
    theme: {
      grid: { width }
    }
  }) => css`
    font-size: 26px;

    @media screen and (min-width: 320px) {
      font-size: calc(30px + 50 * ((100vw - 320px) / ${width - 320}));
    }

    @media screen and (min-width: ${width}px) {
      font-size: 80px;
    }
  `}
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
                  <MenuLink contentfulId="5Fx0TC8IlAt4eCLHeFVpop">
                    References
                  </MenuLink>
                </ListItem>
                <ListItem>
                  <MenuLink contentfulId="Ezme8PAhPlfrFV77vHXig">Jobs</MenuLink>
                </ListItem>
                <ListItem>
                  <MenuLink contentfulId="7AqmrDmqEpQyzCG8cmMY7p">
                    Blog
                  </MenuLink>
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
