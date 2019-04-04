import React, { useContext } from 'react'
import propTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'

import LogoText from '../assets/petitcode-logo-text.svg'
import Logo from '../assets/petitcode-logo.svg'
import { LocationContext } from '../utils/Contexts'

const Wrapper = styled.nav`
  position: relative;
  z-index: 200;
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
  justify-content: space-between;
  list-style-type: none;
  margin: 0;
  padding: ${({ theme }) => theme.spacings.s1};
`

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 40vw;

  & svg {
    display: none;
    width: 100%;
    height: auto;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.headerLogoText}) {
    & svg.text {
      display: block;
    }
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.headerLogo}) {
    & svg.notext {
      display: block;
      width: 20px;
    }
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
    & svg.notext {
      width: 35px;
    }
  }
`
const ContactWrapper = styled.div`
  font-size: calc(14px + 3 * ((100vw - 320px) / 600));
`

export default function Header({ colorScheme }) {
  const { activeLocale } = useContext(LocationContext)
  return (
    <Wrapper colorScheme={colorScheme}>
      <Grid>
        <LogoWrapper>
          <Link className="nohover" to={`${activeLocale}/`} aria-label="Home">
            <Logo className="notext" />
            <LogoText className="text" />
          </Link>
        </LogoWrapper>
        <ContactWrapper>
          <a href="mailto:hi@petitcode.de">hi@petitcode.de</a>
          <br />
          <a href="tel:+493064080338">+49 (0) 30 640 803 38</a>
        </ContactWrapper>
      </Grid>
    </Wrapper>
  )
}

Header.propTypes = {
  colorScheme: propTypes.string.isRequired
}
