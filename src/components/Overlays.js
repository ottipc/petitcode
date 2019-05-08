import React, { useContext } from 'react'

import styled from 'styled-components'

import Header from './Header'
import LanguageSelect from './LanguageSelect'
import Navigation from './Navigation'
import SectionNavigation from './SectionNavigation'
import Hamburger from './Hamburger'
import { NavigationContext } from '../utils/Contexts'

const HeaderWrapper = styled.div`
  mix-blend-mode: difference;
  color: white;
  position: fixed;
  z-index: 1200;
  top: 0;
  left: 0;
  right: 0;
`

const LanguageSelectWrapper = styled.div`
  mix-blend-mode: difference;
  color: white;
  position: fixed;
  z-index: 1100;
  bottom: ${({ theme }) => theme.spacings.s1};
  left: ${({ theme }) => theme.spacings.s1};
`

const HamburgerWrapper = styled.div`
  mix-blend-mode: difference;
  position: fixed;
  z-index: 10010;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
`

export default function Overlays() {
  const { navigationActive } = useContext(NavigationContext)

  return (
    <React.Fragment>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <Navigation navigationActive={navigationActive} />
      <HamburgerWrapper>
        <Hamburger />
      </HamburgerWrapper>
      <SectionNavigation />
      <LanguageSelectWrapper>
        <LanguageSelect />
      </LanguageSelectWrapper>
    </React.Fragment>
  )
}
