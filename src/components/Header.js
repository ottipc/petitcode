import React, { useContext } from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'

import LogoText from '../assets/petitcode-logo-text.svg'
import Logo from '../assets/petitcode-logo.svg'

import { GlobalContext, SectionContext } from '../utils/Contexts'

const Wrapper = styled.nav`
  position: relative;
  z-index: 200;
  transition: color 0.3s linear;
  pointer-events: none;
`

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
  margin: 0;
`

const LogoWrapper = styled.div`
  pointer-events: auto;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 120px;
  padding: ${({ theme }) => theme.spacing.viewport.default};
  margin-top: 1.5%;
  margin-left: 1.5%;

  & svg {
    display: block;
    width: 100%;
    height: auto;
    color: white;

    @media (max-width: ${({ theme }) => theme.breakpoints.medium}) {
      color: black;
    }
  }

  &:hover {
    opacity: 0.5;
  }

  & svg.notext {
    display: none;
  }

  /* keep order of this section below to ensure correct overwrites */
  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    padding: ${({ theme }) => parseInt(theme.spacing.viewport.medium) / 2}px;
    max-width: 180px;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
  }

  ${({ isScrolling }) =>
    isScrolling &&
    css`
      @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
        padding: ${({ theme }) => parseInt(theme.spacing.content.medium) / 4}px;
        max-width: ${({ theme }) => theme.spacing.content.medium};
      }
      @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
        padding: ${({ theme }) => parseInt(theme.spacing.content.large) / 4}px;
        max-width: ${({ theme }) => theme.spacing.content.large};
      }
      @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
        & svg.notext {
          display: block;
          transform: translateX(-7%); /* visually blend logo on 13" screens */
        }
        & svg.text {
          display: none;
        }
      }
      @media (min-width: ${({ theme }) => theme.breakpoints.huge}) {
        max-width: 180px;
        padding: ${({ theme }) =>
          parseInt(theme.spacing.viewport.medium) / 2}px;
        & svg.notext {
          display: none;
        }
        & svg.text {
          display: block;
        }
      }
    `}

  /* Keep this at last rule to ensure correct overwrites */
  @media (min-width: ${({ theme }) => theme.breakpoints.huge}) {
    /* padding: ${({ theme }) => parseInt(theme.spacing.content.huge) / 4}px; */
    /* fit in text logo between left border and left content border */
    /* max-width: calc(
      (100vw - ${({ theme }) => theme.grid.width}px) / 2 +
        ${({ theme }) => theme.spacing.content.huge}
    ); */
  }
`
const ContactWrapper = styled.div`
  pointer-events: auto;
  font-size: calc(14px + 3 * ((100vw - 320px) / 600));
  display: none;

  ${({ show }) =>
    show &&
    css`
      @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
      }
      @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
        display: flex;
        flex-direction: column;
        padding: ${({ theme }) => theme.spacings.s1};
        align-items: flex-end;
      }
      @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
      }
      @media (min-width: ${({ theme }) => theme.breakpoints.huge}) {
      }
    `}

  & a {
    display: block;
    opacity: 1;
    transition: 0.15s opacity linear;
    color: white;

    &:last-child {
      margin-right: none;
    }

    &:hover {
      color: white;
      opacity: 0.5;
    }
  }

  & svg {
    width: 24px;
  }
`

export default function Header() {
  const { activeLocale } = useContext(GlobalContext)
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
          <a className="nohover" href="tel:+4930549065690">
            +49 30 549 065 690
          </a>
          <a className="nohover" href="mailto:info@petitcode.com">
            info@petitcode.com
          </a>
        </ContactWrapper>
      </Grid>
    </Wrapper>
  )
}
