import React, { useContext } from 'react'

import styled from 'styled-components'

import Header from './Header'
import LanguageSelect from './LanguageSelect'
import Navigation from './Navigation'
import SectionNavigation from './SectionNavigation'
import Hamburger from './Hamburger'
import { NavigationContext } from '../utils/Contexts'

const HeaderWrapper = styled.div`
  position: fixed;
  z-index: 1200;
  top: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};

  @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    border-bottom: none;
    mix-blend-mode: difference;
    background: transparent;
    color: white;
    & a:after {
      background: white;
    }
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.huge}) {
  }
`

const LanguageSelectWrapper = styled.div`
  mix-blend-mode: difference;
  color: white;
  position: fixed;
  z-index: 1100;
  bottom: ${({ theme }) => theme.spacing.viewport.default};
  left: ${({ theme }) => theme.spacing.viewport.default};
  transform: translateX(-50%);

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    bottom: ${({ theme }) => theme.spacing.viewport.medium};
    left: ${({ theme }) => theme.spacing.viewport.medium};
  }

  & a:after {
    background: white;
  }
`

const HamburgerWrapper = styled.div`
  mix-blend-mode: difference;
  position: fixed;
  z-index: 10010;
  top: 0;
  right: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    top: 50%;
    transform: translateY(-50%);
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.huge}) {
  }
`

export default function Overlays() {
  const { navigationActive } = useContext(NavigationContext)

  return (
    <React.Fragment>
      <HeaderWrapper>
        <Header />
        <HamburgerWrapper style={{ display: 'none' }}>
          <Hamburger />
        </HamburgerWrapper>
        <SectionNavigation />
      </HeaderWrapper>
      <LanguageSelectWrapper>
        <LanguageSelect />
      </LanguageSelectWrapper>
      <Navigation navigationActive={navigationActive} />
    </React.Fragment>
  )
}
