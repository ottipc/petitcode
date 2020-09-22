import React from 'react'
import styled, { css } from 'styled-components'
import { Location } from '@reach/router'
import Social from './mdx/Social'
import GridWrapper from './GridWrapper'
import Link from './mdx/Link'
import LanguageSelect from './LanguageSelect'

// import PetitcodeLogo from '../assets/petitcode-logo-text.svg'

const LanguageSelectWrapper = styled.div`
  mix-blend-mode: difference;
  color: white;
  position: fixed;
  z-index: 11000;
  bottom: ${({ theme }) => theme.spacing.viewport.default};
  left: ${({ theme }) => theme.spacing.viewport.default};
  transform: translateX(-50%);

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    bottom: ${({ theme }) => theme.spacing.viewport.medium};
    left: ${({ theme }) =>
      (parseInt(theme.spacing.viewport.medium) * 2).toString() + 'px'};
  }

  & a:after {
    background: white;
  }
`

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
    z-index: 199;
    align-items: center;
    height: 95px;
    color: white;
    mix-blend-mode: difference;
  `}
  @media (max-width: 767px) {
    flex-direction: column;
    justify-content: center;
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
  @media (max-width: 767px) {
    color: black;
    justify-content: center;
    margin-top: 0px;
    display: none;
  }
`

const Column = styled.div`
  flex: 0 0 30%;
  min-width: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 767px) {
    margin-bottom: 10px;
  }
`

const ContactWrapper = styled.div`
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacings.s1};

  & a {
    padding: 0.2em 0;
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

    @media (max-width: 767px) {
      padding-left: 0;
      padding-top: 0;
      flex: unset;
      justify-content: center;
      width: 60%;
    }
    @media (max-width: 340px) {
      width: 54%;
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

const BottomGridSeparator = styled.div`
  padding: 0 0.5rem;
  color: white;

  & a {
    color: #6e6e6e;
  }

  & a:hover {
    color: black;
  }

  @media (max-width: 590px) {
    display: none;
  }
`

const LinkStyle = styled(Link)`
  color: white !important;
  font-size: 13.5px;
  @media (max-width: 767px) {
    font-size: 11px;
  }
`

export default function Footer() {
  return (
    <Location>
      {({ location }) => (
        <FooterWrapper
          style={{
            position:
              typeof location.pathname
                .split('/')
                .filter((path) => path !== '')[1] !== 'undefined'
                ? 'relative'
                : 'fixed'
          }}
        >
          {/* <LanguageSelectWrapper>
        <LanguageSelect />
      </LanguageSelectWrapper> */}
          <BottomGrid>
            <BottomGridElement>
              <LinkStyle contentfulId="1CSUzUvU84YrJ6JrhKW1Pn" />
            </BottomGridElement>
            <BottomGridSeparator>/</BottomGridSeparator>
            {/* <BottomGridElement>
          <Link contentfulId="p7lyUYtWHxeVV6Qyalcyh" />
        </BottomGridElement> */}
            <BottomGridElement>
              <LinkStyle contentfulId="48IUmDegZRVtDgbQTmATA6" />
            </BottomGridElement>
            <BottomGridSeparator>/</BottomGridSeparator>
            <BottomGridElement>
              <LinkStyle contentfulId="5Fx0TC8IlAt4eCLHeFVpop" />
            </BottomGridElement>
            <BottomGridSeparator>/</BottomGridSeparator>
            {/* <BottomGridElement>
          <Link contentfulId="7AqmrDmqEpQyzCG8cmMY7p" />
        </BottomGridElement> */}
            <BottomGridElement>
              <LinkStyle contentfulId="Ezme8PAhPlfrFV77vHXig" />
            </BottomGridElement>
            <BottomGridSeparator>/</BottomGridSeparator>
            <BottomGridElement>
              <LinkStyle contentfulId="2dUcR1WFWhI5Ns3anZksDf" />
            </BottomGridElement>
            <BottomGridSeparator>/</BottomGridSeparator>
            <BottomGridElement>
              <LinkStyle contentfulId="7AqmrDmqEpQyzCG8cmMY7p" />
            </BottomGridElement>
            <BottomGridSeparator>/</BottomGridSeparator>
            <BottomGridElement>
              <LinkStyle contentfulId="5OYuXaPuspYS8Z2GiwMRjd" />
            </BottomGridElement>
          </BottomGrid>
          <FooterGrid>
            <Column>{/* <Social /> */}</Column>
          </FooterGrid>
        </FooterWrapper>
      )}
    </Location>
  )
}
