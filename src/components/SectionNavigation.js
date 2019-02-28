import React, { useContext } from 'react'
import propTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { SectionContext } from '../utils/Contexts'

const Wrapper = styled.div`
  position: fixed;
  z-index: 10010;
  top: 50%;
  left: 1vw;
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
  opacity: 0.5;
  transition-property: opacity, color, height;
  transition-duration: 0.3s;
  background: ${({ colorScheme }) => colorScheme};

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
  const { sections, activeSection } = useContext(SectionContext)

  if (!sections.length) {
    return null
  }

  const buttons = sections.map((section, i) => (
    <Button
      colorScheme={colorScheme}
      key={`section-navigation-${i}`}
      active={i === activeSection}
    >
      {i}
    </Button>
  ))

  return <Wrapper>{buttons}</Wrapper>
}

SectionNavigation.propTypes = {
  colorScheme: propTypes.string.isRequired
}
