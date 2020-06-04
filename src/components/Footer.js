import React from 'react'
import styled, { css } from 'styled-components'
import { Location } from "@reach/router"
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
    position: relative;
    bottom: 0;
    width: 100%;
    z-index: 9999;
    align-items: center;
    height: 95px;
    color: white;
    mix-blend-mode: difference;
  `}
  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    flex-direction: column;
  }
`

const FooterGrid = styled(GridWrapper)`
  display: flex;
  flex: 1;
  justify-content: end;
  flex-wrap: wrap;
  text-align: center;
  align-items: center;
  margin-top: 9px;
  margin-right: 2%;
  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    color: black;
    justify-content: center;
    margin-top: 0px;
  }
`

const Column = styled.div`
  flex: 0 0 30%;
  min-width: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    margin-bottom: 10px;
  }
`

const ContactWrapper = styled.div`
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacings.s1};

  & a {
    padding: 0.2em 0;;
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
    justify-content: end;
    align-items: center;
    padding-left: 15%;
    padding-top: 11px;

  @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
    padding-left: 0;
    flex: 1;
  }
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
  padding: 0 0.5rem;
  color: white;

  & a {
    color: #6e6e6e;
  }

  & a:hover {
    color: black;
  }
`

export default function Footer() {

  return (
    <Location>
      {({location}) => (
    <FooterWrapper style={{position: typeof location.pathname.split('/').filter(path => path !== '')[1] !== 'undefined'  ? 'relative' : 'fixed'}}>
      <BottomGrid>
        <BottomGridElement>
          <Link style={{color: 'white', fontSize: 13.5}} contentfulId="1CSUzUvU84YrJ6JrhKW1Pn" />
        </BottomGridElement>
        <BottomGridElement>
          /
        </BottomGridElement>
        {/* <BottomGridElement>
          <Link contentfulId="p7lyUYtWHxeVV6Qyalcyh" />
        </BottomGridElement> */}
        <BottomGridElement>
          <Link style={{color: 'white', fontSize: 13.5}} contentfulId="48IUmDegZRVtDgbQTmATA6" />
        </BottomGridElement>
        <BottomGridElement>
          /
        </BottomGridElement>
        <BottomGridElement>
          <Link style={{color: 'white', fontSize: 13.5}} contentfulId="5Fx0TC8IlAt4eCLHeFVpop" />
        </BottomGridElement>
        <BottomGridElement>
          /
        </BottomGridElement>
        {/* <BottomGridElement>
          <Link contentfulId="7AqmrDmqEpQyzCG8cmMY7p" />
        </BottomGridElement> */}
        <BottomGridElement>
          <Link style={{color: 'white', fontSize: 13.5}} contentfulId="Ezme8PAhPlfrFV77vHXig" />
        </BottomGridElement>
        <BottomGridElement>
          /
        </BottomGridElement>
        <BottomGridElement>
          <Link style={{color: 'white', fontSize: 13.5}} contentfulId="2dUcR1WFWhI5Ns3anZksDf" />
        </BottomGridElement>  
      </BottomGrid>
      <FooterGrid>
        <Column>
          <Social />
        </Column>
      </FooterGrid>
    </FooterWrapper>
      )}
    </Location>
  )
}
