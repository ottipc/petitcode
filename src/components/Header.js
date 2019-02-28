import React from 'react'
import propTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'

import GridWrapper from './GridWrapper'
import Logo from '../assets/petitcode-logo-text.svg'

const Wrapper = styled.nav`
  position: relative;
  z-index: 200;
  padding: 1rem;
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
  font-size: calc(14px + 4 * ((100vw - 320px) / 600));
`

export default function Header({ colorScheme }) {
  return (
    <Wrapper colorScheme={colorScheme}>
      <GridWrapper>
        <Grid>
          <LogoWrapper>
            <Link to="/" aria-label="Home">
              <Logo />
            </Link>
          </LogoWrapper>
          <ContactWrapper>
            <a href="mailto:hi@petitcode.de">hi@petitcode.de</a>
            <br />
            <a href="tel:+493064080338">+49 (0) 30 640 803 38</a>
          </ContactWrapper>
        </Grid>
      </GridWrapper>
    </Wrapper>
  )
}

Header.propTypes = {
  colorScheme: propTypes.string.isRequired
}
