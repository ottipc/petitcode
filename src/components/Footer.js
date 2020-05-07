import React from 'react'
import styled, { css } from 'styled-components'

import Social from './mdx/Social'
import GridWrapper from './GridWrapper'
import Link from './mdx/Link'

// import PetitcodeLogo from '../assets/petitcode-logo-text.svg'

const FooterWrapper = styled.div`
  ${({
    theme: {
      spacings,
      breakpoints,
      spacing: { viewport }
    }
  }) => css`
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 999;
    background-color: white;
    align-items: center;
    height: 95px;
  `}
  @media (max-width: 767px) {
    flex-direction: column;
  }
`

const FooterGrid = styled(GridWrapper)`
  display: flex;
  flex: 1;
  justify-content: space-evenly;
  flex-wrap: wrap;
  text-align: center;
  align-items: center;
  margin-top: 9px;
`

const Column = styled.div`
  flex: 0 0 30%;
  min-width: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ContactWrapper = styled.div`
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacings.s1};

  & a {
    padding: 0.2em 0;
    color: #6e6e6e;
  }

  & a:hover {
    color: black;
  }
`

// const LogoMenuItem = styled(Link)`
//   transition: opacity 0.15s linear;
//   &:after {
//     display: none;
//   }
//   &:hover {
//     opacity: 0.8;
//   }
// `
// const Logo = styled(PetitcodeLogo)`
//   width: 100%;
//   max-width: 200px;
// `
const BottomGrid = styled.div`
  ${({
    theme: {
      breakpoints,
      spacing: { viewport }
    }
  }) => css`
    flex: 6;
    justify-content: space-around;
    align-items: center;
  `}

  font-size: 0.8em;
  text-align: center;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.grey400};
  font-family: ${({ theme }) => theme.fonts.header.join(', ')};
  display: flex;
  flex-wrap: wrap;
`

const BottomGridElement = styled.div`
  padding: 0 1rem;

  & a {
    color: #6e6e6e;
  }

  & a:hover {
    color: black;
  }
`

export default function Footer() {
  return (
    <FooterWrapper>
      <BottomGrid>
        <BottomGridElement>
          <Link contentfulId="1CSUzUvU84YrJ6JrhKW1Pn" />
        </BottomGridElement>
        {/* <BottomGridElement>
          <Link contentfulId="p7lyUYtWHxeVV6Qyalcyh" />
        </BottomGridElement> */}
        <BottomGridElement>
          <Link contentfulId="48IUmDegZRVtDgbQTmATA6" />
        </BottomGridElement>
        <BottomGridElement>
          <Link contentfulId="5Fx0TC8IlAt4eCLHeFVpop" />
        </BottomGridElement>
        {/* <BottomGridElement>
          <Link contentfulId="7AqmrDmqEpQyzCG8cmMY7p" />
        </BottomGridElement> */}
        <BottomGridElement>
          <Link contentfulId="Ezme8PAhPlfrFV77vHXig" />
        </BottomGridElement>
        <BottomGridElement>
          Copyright © {new Date().getFullYear()} petitcode GmbH
        </BottomGridElement>
      </BottomGrid>
      <FooterGrid>
        <Column>
          <Social />
        </Column>
      </FooterGrid>
    </FooterWrapper>
  )
}
