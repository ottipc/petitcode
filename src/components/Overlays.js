import React, { useContext } from 'react'

import styled from 'styled-components'

import Header from './Header'
import LanguageSelect from './LanguageSelect'
// import Navigation from './Navigation'
import SectionNavigation from './SectionNavigation'
// import Hamburger from './Hamburger'
import { NavigationContext, SectionContext } from '../utils/Contexts'

const HeaderWrapper = styled.div`
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  right: 0;
`
const LanguageSelectWrapper = styled.div`
  position: fixed;
  z-index: 1100;
  bottom: ${({ theme }) => theme.spacings.s1};
  left: ${({ theme }) => theme.spacings.s1};
`

export default function Overlays() {
  const { navigationActive } = useContext(NavigationContext)
  const { sections, activeSection } = useContext(SectionContext)
  const section = sections[activeSection]
  // White overlays when navigation is active
  // White or black depending on section
  // Fallback to black
  const colorScheme = navigationActive
    ? 'white'
    : (section && section.video ? 'white' : 'black') || 'black'

  return (
    <React.Fragment>
      <HeaderWrapper>
        <Header colorScheme={colorScheme} />
      </HeaderWrapper>
      {/* <Navigation navigationActive={navigationActive} />
      <Hamburger colorScheme={colorScheme} /> */}
      <SectionNavigation colorScheme={colorScheme} />
      <LanguageSelectWrapper>
        <LanguageSelect />
      </LanguageSelectWrapper>
    </React.Fragment>
  )
}
