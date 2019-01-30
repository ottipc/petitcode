import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import GridWrapper from './GridWrapper'
import Logo from '../assets/petitcode-logo-text.svg'

const Wrapper = styled.nav`
  padding: 1rem;
`

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  margin: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.large}) {
    flex-direction: column;
    align-items: center;
    padding: ${({ theme }) => theme.spacingUnit}px;
    > * {
      margin-bottom: ${({ theme }) => theme.spacingUnit}px !important;
    }
  }
`

const LogoWrapper = styled.div``
const ContactWrapper = styled.div``

export default class Header extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <GridWrapper>
          <Grid>
            <LogoWrapper>
              <Link to="/">
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
}
