import React, { useContext } from 'react'

import styled, { css } from 'styled-components'

import Header from './Header'
import Footer from './Footer'
import Navigation from './Navigation'
import { NavigationContext, SectionContext } from '../utils/Contexts'

const Hamburger = styled.button`
  position: fixed;
  z-index: 10010;
  top: 50%;
  right: 0;
  transform: translateY(-50%);

  padding: 15px 15px;
  display: block;
  cursor: pointer;
  transition-property: opacity, filter, color;
  transition-duration: 0.3s;
  transition-timing-function: linear;
  font: inherit;
  color: ${({ colorScheme }) => colorScheme};
  text-transform: none;
  background-color: transparent;
  border: 0;
  margin: 0;
  overflow: visible;
  transform: scale(0.8);

  &:focus {
    outline: none;
  }

  ${({ navigationActive }) =>
    navigationActive &&
    css`
      &:hover {
        opacity: 0.7;
      }
      & > span > span,
      & > span > span::before,
      & > span > span::after {
        background-color: #fff;
      }
      & > span > span::before {
        transform: translate3d(8px, 0, 0) rotate(45deg) scale(0.7, 1);
      }

      & > span > span::after {
        transform: translate3d(8px, 0, 0) rotate(-45deg) scale(0.7, 1);
      }
    `};
`

const HamburgerBox = styled.span`
  width: 40px;
  height: 24px;
  display: block;
  position: relative;
`

const HamburgerInner = styled.span`
  display: block;
  top: 50%;
  margin-top: -2px;
  &,
  &::before,
  &::after {
    width: 40px;
    height: 4px;
    background-color: ${({ colorScheme }) => colorScheme};
    transition: background-color 0.3s linear;
    border-radius: 4px;
    position: absolute;
    transition-property: transform;
    transition-duration: 0.15s;
    transition-timing-function: ease;
  }
  &::before,
  &::after {
    content: '';
    display: block;
  }
  &::before {
    top: -10px;
  }
  &::after {
    bottom: -10px;
  }
`

const HeaderWrapper = styled.div`
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  right: 0;
`
const FooterWrapper = styled.div`
  position: fixed;
  z-index: 200;
  bottom: 0;
  left: 0;
  right: 0;
`

export default function Overlays() {
  const { toggleNavigation, navigationActive } = useContext(NavigationContext)
  const { sections, activeSection } = useContext(SectionContext)
  const section = sections[activeSection]
  const colorScheme = (section && section.video ? 'white' : 'black') || 'black'

  return (
    <React.Fragment>
      <HeaderWrapper>
        <Header colorScheme={colorScheme} />
      </HeaderWrapper>
      <Navigation navigationActive={navigationActive} />
      <Hamburger
        onClick={toggleNavigation}
        navigationActive={navigationActive}
        titleAccess="Open menu"
        colorScheme={colorScheme}
      >
        <HamburgerBox>
          <HamburgerInner colorScheme={colorScheme} />
        </HamburgerBox>
      </Hamburger>
      <FooterWrapper>
        <Footer colorScheme={colorScheme} />
      </FooterWrapper>
    </React.Fragment>
  )
}
