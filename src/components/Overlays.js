import React, { useContext } from 'react'

import styled, { css } from 'styled-components'

import Header from './Header'
import Footer from './Footer'
import Navigation from './Navigation'
import SectionNavigation from './SectionNavigation'
import { NavigationContext, SectionContext } from '../utils/Contexts'

const hamburgerLayerWidth = '35px'
const hamburgerLayerHeight = '4px'
const hamburgerLayerSpacing = '6px'
const hamburgerPaddingX = '15px'
const hamburgerPaddingY = '15px'
const hamburgerActiveLayerColor = '#000000'
const hamburgerLayerColor = '#ffffff'
const hamburgerLayerBorderRadius = '3px'

const hamburgerHoverOpacity = 0.7

const Hamburger = styled.button`
  position: fixed;
  z-index: 10010;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  padding: ${hamburgerPaddingY} ${hamburgerPaddingX};
  display: block;
  cursor: pointer;

  transition-property: opacity, filter;
  transition-duration: 0.15s;
  transition-timing-function: linear;

  &:hover {
    opacity: ${hamburgerHoverOpacity};
  }

  /* Normalize (<button>) */
  font: inherit;
  color: inherit;
  text-transform: none;
  background-color: transparent;
  border: 0;
  margin: 0;
  overflow: visible;

  &:focus {
    outline: none;
  }
`

const HamburgerBox = styled.span`
  width: ${hamburgerLayerWidth};
  height: calc(${hamburgerLayerHeight} * 3 + ${hamburgerLayerSpacing} * 2);
  display: inline-block;
  position: relative;
  /* 3dx */
  perspective: calc(${hamburgerLayerWidth} * 2);
`

const HamburgerInner = styled.span`
  display: block;
  top: 50%;
  margin-top: calc(${hamburgerLayerHeight} / -2);

  &,
  &::before,
  &::after {
    width: ${hamburgerLayerWidth};
    height: ${hamburgerLayerHeight};
    background-color: ${hamburgerLayerColor};
    border-radius: ${hamburgerLayerBorderRadius};
    position: absolute;
    transition-property: transform;
    transition-duration: 0.15s;
    transition-timing-function: ease;
    box-sizing: content-box;
  }

  &::before,
  &::after {
    content: '';
    display: block;
  }

  &::before {
    top: calc(
      (
          ${hamburgerLayerSpacing} + ${hamburgerLayerHeight} + 2px
            /* border size */
        ) * -1
    );
  }

  &::after {
    bottom: calc(
      (
          ${hamburgerLayerSpacing} + ${hamburgerLayerHeight} + 2px
            /* border size */
        ) * -1
    );
  }

  ${({ navigationActive }) =>
    navigationActive &&
    css`
      background-color: ${hamburgerActiveLayerColor};
    `}

  /* 3dx */
  transition: transform .15s cubic-bezier(.645,.045,.355,1),
              background-color 0s cubic-bezier(.645,.045,.355,1) .1s;
  &::before,
  &::after {
    transition: transform 0s cubic-bezier(0.645, 0.045, 0.355, 1) 0.1s;
  }

  ${({ navigationActive }) =>
    navigationActive &&
    css`
      background-color: transparent !important;
      transform: rotateY(180deg);

      &::before,
      &::after {
        background: black !important;
        border: 2px solid white;
      }

      &::before {
        transform: translate3d(
            0,
            calc(${hamburgerLayerHeight} + ${hamburgerLayerSpacing}),
            0
          )
          rotate(45deg);
      }

      &::after {
        transform: translate3d(
            0,
            calc((${hamburgerLayerHeight} + ${hamburgerLayerSpacing}) * -1),
            0
          )
          rotate(-45deg);
      }
    `}
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
        aria-label="toggle menu"
        colorScheme={colorScheme}
      >
        <HamburgerBox>
          <HamburgerInner
            colorScheme={colorScheme}
            navigationActive={navigationActive}
          />
        </HamburgerBox>
      </Hamburger>
      <SectionNavigation colorScheme={colorScheme} />
      <FooterWrapper>
        <Footer colorScheme={colorScheme} />
      </FooterWrapper>
    </React.Fragment>
  )
}
