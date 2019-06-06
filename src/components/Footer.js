import React from 'react'
import styled, { css } from 'styled-components'

import Social from './mdx/Social'
import GridWrapper from './GridWrapper'
import Link from './mdx/Link'

import PetitcodeLogo from '../assets/petitcode-logo-text.svg'

const FooterWrapper = styled.div`
  ${({
    theme: {
      spacings,
      breakpoints,
      spacing: { viewport }
    }
  }) => css`
    padding: ${spacings.s4} ${viewport.default} 0;

    @media (min-width: ${breakpoints.medium}) {
      padding: ${spacings.s4} ${viewport.medium} 0;
    }
  `}
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
  display: flex;
  justify-content: center;
  align-items: center;
`

const ContactWrapper = styled.div`
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacings.s1};

  & a {
    padding: 0.2em 0;
  }
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
  width: 100%;
  max-width: 200px;
`
const BottomGrid = styled.div`
  ${({
    theme: {
      breakpoints,
      spacing: { viewport }
    }
  }) => css`
    padding: 0 0 ${viewport.default};

    @media (min-width: ${breakpoints.medium}) {
      padding: 0 0 ${viewport.medium};
    }
  `}

  font-size: 0.8em;
  text-align: center;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.grey400};
  font-family: ${({ theme }) => theme.fonts.header.join(', ')};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const BottomGridElement = styled.div`
  padding: 0 1rem;
`

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterGrid>
        <Column>
          <LogoMenuItem humanId="index" aria-label="Home">
            <Logo />
          </LogoMenuItem>
        </Column>
        <Column>
          <ContactWrapper>
            <a href="mailto:info@petitcode.de">info@petitcode.de</a>
            <br />
            <a href="tel:+493064080338">+49 (0) 30 640 803 38</a>
          </ContactWrapper>
        </Column>
        <Column>
          <Social />
        </Column>
      </FooterGrid>
      <BottomGrid>
        <BottomGridElement>
          <Link humanId="imprint" />
        </BottomGridElement>
        <BottomGridElement>
          <Link humanId="press" />
        </BottomGridElement>
        <BottomGridElement>
          <Link humanId="data-protection" />
        </BottomGridElement>
        <BottomGridElement>
          Copyright © {new Date().getFullYear()} petitcode GmbH
        </BottomGridElement>
      </BottomGrid>
    </FooterWrapper>
  )
}
