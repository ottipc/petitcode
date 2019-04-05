import React from 'react'
import styled, { css } from 'styled-components'

import ContactForm from './ContactForm'
import Social from './mdx/Social'
import GridWrapper from './GridWrapper'
import FooterNavigation from './FooterNavigation'
import MenuItem from './MenuItem'

import PetitcodeLogo from '../assets/petitcode-logo.svg'

const FooterTopWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacings.s4};

  background: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};

  & a:after {
    background: ${({ theme }) => theme.colors.white};
  }
`

const FooterTopGrid = styled(GridWrapper)`
  display: flex;
  justify-content: space-around;
  padding: ${({ theme }) => theme.spacings.s8}
    ${({ theme }) => theme.spacings.s1};
`

const Column = styled.div`
  flex: 0 0 30%;
`

const ContactWrapper = styled.div`
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacings.s1};
`

const FooterBottomWrapper = styled.div`
  ${({ theme: { spacings } }) => css`
    padding: ${spacings.s8} ${spacings.s1};
  `}

  text-align: center;
`
const LogoMenuItem = styled(MenuItem)`
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
  width: 100px;
`
const Copyright = styled.div`
  ${({ theme: { spacings } }) => css`
    padding-top: ${spacings.s2};
  `}
  font-size: 0.8em;
`

export default function Footer() {
  return (
    <>
      <FooterTopWrapper>
        <FooterTopGrid>
          <Column>
            <ContactWrapper>
              <a href="mailto:hi@petitcode.de">hi@petitcode.de</a>
              <br />
              <a href="tel:+493064080338">+49 (0) 30 640 803 38</a>
            </ContactWrapper>
            <address>
              petitcode GmbH
              <br />
              Friedrichstraße 11
              <br />
              10969 Berlin
            </address>
            <Social />
          </Column>
          <Column>
            <ContactForm />
          </Column>
        </FooterTopGrid>
      </FooterTopWrapper>
      <FooterBottomWrapper>
        <LogoMenuItem humanId="index">
          <Logo />
        </LogoMenuItem>
        <FooterNavigation />
        <Copyright>
          Copyright © {new Date().getFullYear()} petitcode GmbH
        </Copyright>
      </FooterBottomWrapper>
    </>
  )
}
