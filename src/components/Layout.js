import React, { useState } from 'react'
import propTypes from 'prop-types'

import styled, { css } from 'styled-components'
import Observer from '@researchgate/react-intersection-observer'

import Overlays from './Overlays'
import Footer from './Footer'
import Metatags from './Metatags'

import { NavigationContext, SectionContext } from '../utils/Contexts'

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.bg};
  ${({ hasAcceptedCookies }) =>
    !hasAcceptedCookies &&
    css`
      padding-bottom: 0em;
    `}
`

export default function Layout({ children }) {
  const [navigationActive, setNavigationActive] = useState(false)
  const [activeSection, setActiveSection] = useState(null)
  const [scrollToSection, setScrollToSection] = useState(null)
  const [sections, setSections] = useState([])
  const [isScrolling, setIsScrolling] = useState(false)
  const [content, setContent] = useState('HAMBURGER');

  const handleIsScrollingIntersection = ({ isIntersecting }) => {
    setIsScrolling(!isIntersecting)
  }

  const toggleNavigation = (value) => {
    setNavigationActive(!navigationActive)
    if (navigationActive === true) {
      typeof localStorage !== 'undefined' && localStorage.setItem('showOverlay', 'true')
      setTimeout(() => {
        setContent(value);
      }, 3000);
    }
    if (navigationActive === false) {
      setContent(value);
    }
  }

  return (
    <NavigationContext.Provider
      value={{
        toggleNavigation,
        navigationActive,
        content
      }}
    >
      <SectionContext.Provider
        value={{
          sections,
          activeSection,
          setActiveSection,
          setSections,
          scrollToSection,
          setScrollToSection,
          isScrolling,
          setIsScrolling
        }}
      >
        <Metatags />
        <Wrapper>
          <Overlays />
          <main>
            <Observer onChange={handleIsScrollingIntersection}>
              <div />
            </Observer>
            {children}
            <Footer />
          </main>
        </Wrapper>
      </SectionContext.Provider>
    </NavigationContext.Provider>
  )
}
Layout.propTypes = {
  children: propTypes.node.isRequired
}
