import React, { useContext, useState } from 'react'
// import propTypes from 'prop-types'
import styled, { css } from 'styled-components'
import propTypes from 'prop-types'
import './Custom.css'
import theme from '../utils/styling/theme'
import { NavigationContext } from '../utils/Contexts'

const Wrapper = styled.button`
  width: 70px;
  height: 70px;
  background-color: black;
  border-radius: 50%;
  position: fixed;
  right: 90px;
  bottom: 120px;
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: center;
`
const hamburgerLayerWidth = '34px'
const hamburgerLayerHeight = '1px'
const hamburgerLayerSpacing = '8px'
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
  display: flex;
  position: relative;
  vertical-align: middle;
  /* 3dx */
  perspective: calc(${hamburgerLayerWidth} * 2);
  justify-content: center;
  align-items: center;
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

const FABContent = styled.p `
  font-size: 35px;
  color: white;
  font-weight: bold;
  font-family: Noto Sans,Helvetica Neue,Segoe UI,Helvetica,Arial,sans-serif;
`

const FloatingActionButton = (props) => {

  const { toggleNavigation, navigationActive } = useContext(NavigationContext)
  // const {onClick} = props;
  const {getRef} = props;

  return (
    <div>
      <Wrapper
      //  onClick={() => onClick()}
      >
        <HamburgerWrapper ref={ref => getRef(ref)} onClick={() => toggleNavigation('FAB')} aria-label="toggle menu">
        <HamburgerBox>
          <FABContent>?</FABContent>
        </HamburgerBox>
      </HamburgerWrapper>
      </Wrapper>
    </div>
  )
}

FloatingActionButton.propTypes = {}

export default FloatingActionButton
