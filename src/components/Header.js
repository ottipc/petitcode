import React, { useContext } from 'react'
// import propTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'

import LogoText from '../assets/petitcode-logo-text.svg'
import Logo from '../assets/petitcode-logo.svg'
import { LocationContext, SectionContext } from '../utils/Contexts'

const Wrapper = styled.nav`
  position: relative;
  z-index: 200;
  transition: color 0.3s linear;
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
  width: 100%;
  max-width: 30vw;

  & svg {
    width: 100%;
    height: auto;
  }

  & svg.notext {
    display: none;
    transform: translateX(-50%);
    width: ${({ theme }) => theme.spacings.s1};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    & svg.notext {
      transform: translateX(-25%);
      width: ${({ theme }) => theme.spacings.s2};
    }
  }
  ${({ isScrolling }) => css`
    @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
      & svg.notext {
        display: block;
      }
      & svg.text {
        display: none;
      }
    }
  `}
`
const ContactWrapper = styled.div`
  font-size: calc(14px + 3 * ((100vw - 320px) / 600));
  display: none;

  ${({ show }) =>
    show &&
    css`
      @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
      }
      @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
        display: block;
      }
      @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
      }
      @media (min-width: ${({ theme }) => theme.breakpoints.huge}) {
      }
    `}
`

export default function Header() {
  const { activeLocale } = useContext(LocationContext)
  const { isScrolling } = useContext(SectionContext)
  return (
    <Wrapper>
      <Grid>
        <LogoWrapper isScrolling={isScrolling}>
          <Link className="nohover" to={`/${activeLocale}/`} aria-label="Home">
            <Logo className="notext" />
            <LogoText className="text" />
          </Link>
        </LogoWrapper>
        <ContactWrapper show={!isScrolling}>
          <a href="mailto:hi@petitcode.de">hi@petitcode.de</a>
          <br />
          <a href="tel:+493064080338">+49 (0) 30 640 803 38</a>
        </ContactWrapper>
      </Grid>
    </Wrapper>
  )
}

// Header.propTypes = {
//   colorScheme: propTypes.string.isRequired
// }
