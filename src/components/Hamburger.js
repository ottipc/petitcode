import React, { useContext } from 'react'
// import propTypes from 'prop-types'
import styled, { css } from 'styled-components'

import theme from '../utils/styling/theme'
import { NavigationContext } from '../utils/Contexts'

const hamburgerLayerWidth = '34px'
const hamburgerLayerHeight = '4px'
const hamburgerLayerSpacing = '4px'
const hamburgerPaddingX = theme.spacings.s1
const hamburgerPaddingY = theme.spacings.s1
const hamburgerActiveLayerColor = '#000000'
const hamburgerLayerBorderRadius = 'none'

const hamburgerHoverOpacity = 0.7

const HamburgerWrapper = styled.button`
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
  vertical-align: middle;
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
    background-color: ${({ theme }) => theme.colors.white};
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

export default function Hamburger() {
  const { toggleNavigation, navigationActive } = useContext(NavigationContext)

  return (
    <HamburgerWrapper onClick={() => toggleNavigation('HAMBURGER')} aria-label="toggle menu">
      <HamburgerBox>
        <HamburgerInner navigationActive={navigationActive} />
      </HamburgerBox>
    </HamburgerWrapper>
  )
}

// Hamburger.propTypes = {
//   colorScheme: propTypes.string.isRequired
// }
