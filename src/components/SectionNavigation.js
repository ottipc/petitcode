import React, { useContext } from 'react'
import propTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { SectionContext } from '../utils/Contexts'

const Wrapper = styled.div`
  position: fixed;
  z-index: 900;
  top: 50%;
  left: ${({ theme }) => theme.spacings.s1};
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
`

const Button = styled.button`
  display: block;
  width: 4px;
  height: 21px;
  margin-bottom: 6px;
  padding: 0;
  border: 0;
  overflow: hidden;
  color: transparent;
  opacity: ${({ colorScheme }) => (colorScheme === 'white' ? 0.5 : 0.3)};
  transition-property: opacity, color, height;
  transition-duration: 0.3s;
  background: ${({ colorScheme }) => colorScheme};
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }

  ${({ active }) =>
    active &&
    css`
      height: 42px;
      opacity: 1;
    `}

  &:focus {
    outline: none;
  }
`

export default function SectionNavigation({ colorScheme }) {
  const { sections, activeSection, setScrollToSection } = useContext(
    SectionContext
  )

  if (!sections.length) {
    return null
  }

  const buttons = sections.map((section, i) => (
    <Button
      colorScheme={colorScheme}
      key={`section-navigation-${i}`}
      active={i === activeSection}
      onClick={() => setScrollToSection(i)}
    >
      {i}
    </Button>
  ))

  return <Wrapper>{buttons}</Wrapper>
}

SectionNavigation.propTypes = {
  colorScheme: propTypes.string.isRequired
}
