import React, { useContext } from 'react'

import styled from 'styled-components'

import Header from './Header'
import Footer from './Footer'
import Navigation from './Navigation'
import SectionNavigation from './SectionNavigation'
import Hamburger from './Hamburger'
import { NavigationContext, SectionContext } from '../utils/Contexts'

const HeaderWrapper = styled.div`
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  right: 0;
`
const FooterWrapper = styled.div`
  position: fixed;
  z-index: 1100;
  bottom: 0;
  left: 0;
  right: 0;
`

export default function Overlays() {
  const { navigationActive } = useContext(NavigationContext)
  const { sections, activeSection } = useContext(SectionContext)
  const section = sections[activeSection]
  const colorScheme = (section && section.video ? 'white' : 'black') || 'black'

  return (
    <React.Fragment>
      <HeaderWrapper>
        <Header colorScheme={colorScheme} />
      </HeaderWrapper>
      <Navigation navigationActive={navigationActive} />
      <Hamburger colorScheme={colorScheme} />
      <SectionNavigation colorScheme={colorScheme} />
      <FooterWrapper>
        <Footer colorScheme={colorScheme} navigationActive={navigationActive} />
      </FooterWrapper>
    </React.Fragment>
  )
}
