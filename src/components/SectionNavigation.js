import React, { useContext } from 'react'
// import propTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { SectionContext } from '../utils/Contexts'

const Wrapper = styled.div`
  display: none;

  @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    display: flex;
    mix-blend-mode: difference;
    position: fixed;
    z-index: 900;
    transform: translateY(-50%);
    top: 50%;
    left: 0;
    right: auto;
    flex-direction: column;
    height: 25vh;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.huge}) {
  }
`

const Button = styled.button`
  position: relative;
  display: block;
  height: 8px;
  flex: 1 1 auto;
  border: 0;
  overflow: hidden;
  color: transparent;
  transition: 0.3s opacity linear;
  background: transparent;
  cursor: pointer;

  @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    padding: 0 ${({ theme }) => theme.spacings.s1};
    width: ${({ theme }) => theme.spacings.s4};
    height: auto;
    margin-bottom: ${({ theme }) => theme.spacings.s1};

    &:last-child {
      margin-bottom: 0;
    }
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.huge}) {
  }

  opacity: 0;
  ${({ show }) =>
    show &&
    css`
      opacity: 0.5;
    `}

  ${({ active }) =>
    active &&
    css`
      flex: 2 1 auto;
      opacity: 1;
    `}

  &:focus {
    outline: none;
  }
`

const VisibleArea = styled.div`
  background: ${({ theme }) => theme.colors.white};
  position: absolute;
  top: 0;
  left: ${({ theme }) => theme.spacings.s1};
  right: ${({ theme }) => theme.spacings.s1};
  bottom: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    width: 6px;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
  }
`

export default function SectionNavigation() {
  const { sections, activeSection, setScrollToSection } = useContext(
    SectionContext
  )

  if (!sections.length) {
    return null
  }

  const buttons = sections.map((section, i) => (
    <Button
      key={`section-navigation-${i}`}
      active={i === activeSection}
      onClick={() => setScrollToSection(i)}
      show={activeSection !== null}
    >
      <VisibleArea />
    </Button>
  ))

  return <Wrapper>{buttons}</Wrapper>
}

// SectionNavigation.propTypes = {
//   colorScheme: propTypes.string.isRequired
// }
