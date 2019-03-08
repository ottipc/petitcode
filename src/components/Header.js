import React, { useContext } from 'react'
import propTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'

import Logo from '../assets/petitcode-logo-text.svg'
import { LocationContext } from '../utils/Contexts'

const Wrapper = styled.nav`
  position: relative;
  z-index: 200;
  transition: color 0.3s linear;
  ${({ colorScheme }) => css`
    color: ${colorScheme};
  `}
`

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  margin: 0;
  padding: ${({ theme }) => theme.outerSpacing};
`

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 40vw;

  & svg {
    width: 100%;
    height: auto;
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
          <Link to={`${activeLocale}/`} aria-label="Home">
            <Logo />
          </Link>
        </LogoWrapper>
        <ContactWrapper>
          <a className="hover" href="mailto:hi@petitcode.de">
            hi@petitcode.de
          </a>
          <br />
          <a className="hover" href="tel:+493064080338">
            +49 (0) 30 640 803 38
          </a>
        </ContactWrapper>
      </Grid>
    </Wrapper>
  )
}

Header.propTypes = {
  colorScheme: propTypes.string.isRequired
}
