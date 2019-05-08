import React from 'react'
import styled, { css } from 'styled-components'

import Social from './mdx/Social'
import GridWrapper from './GridWrapper'
import FooterNavigation from './FooterNavigation'
import Link from './mdx/Link'

import PetitcodeLogo from '../assets/petitcode-logo-text.svg'

const FooterWrapper = styled.div`
  padding-top: ${({ theme }) => theme.spacings.s4};
  background: ${({ theme }) => theme.colors.white};
`

const FooterGrid = styled(GridWrapper)`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  text-align: center;
  margin-top: ${({ theme }) => theme.spacings.s2};
`

const Column = styled.div`
  flex: 0 0 30%;
  min-width: 300px;
  margin-bottom: ${({ theme }) => theme.spacings.s2};
`

const ContactWrapper = styled.div`
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacings.s1};
`

const LogoMenuItem = styled(Link)`
  transition: opacity 0.15s linear;
  &:after {
    display: none;
  }
  &:hover {
    opacity: 0.8;
  }
`
const Logo = styled(PetitcodeLogo)`
  ${({ theme: { spacings } }) => css`
    padding-bottom: ${spacings.s2};
  `}
  width: 100%;
  max-width: 200px;
`
const Copyright = styled.div`
  ${({ theme: { spacings } }) => css`
    padding-bottom: ${spacings.s2};
  `}
  font-size: 0.8em;
  text-align: center;
`

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterGrid>
        <Column>
          <LogoMenuItem humanId="index" aria-label="Home">
            <Logo />
          </LogoMenuItem>
          <ContactWrapper>
            <a href="mailto:hi@petitcode.de">hi@petitcode.de</a>
            <br />
            <a href="tel:+493064080338">+49 (0) 30 640 803 38</a>
          </ContactWrapper>
          <Social />
        </Column>
        <Column>
          <address>
            petitcode GmbH
            <br />
            Friedrichstraße 11
            <br />
            10969 Berlin
          </address>
        </Column>
        <Column>
          <FooterNavigation />
        </Column>
      </FooterGrid>
      <Copyright>
        Copyright © {new Date().getFullYear()} petitcode GmbH
      </Copyright>
    </FooterWrapper>
  )
}
