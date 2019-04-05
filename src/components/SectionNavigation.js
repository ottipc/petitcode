import React, { useContext } from 'react'
import propTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { SectionContext } from '../utils/Contexts'

const Wrapper = styled.div`
  position: fixed;
  z-index: 900;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  mix-blend-mode: difference;
`

const Button = styled.button`
  box-sizing: content-box;
  position: relative;
  display: block;
  width: 4px;
  height: 21px;
  margin-bottom: 6px;
  padding: 0 ${({ theme }) => theme.spacings.s1};
  border: 0;
  overflow: hidden;
  color: transparent;
  transition: 0.3s opacity linear;
  background: transparent;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }

  &:after {
    content: '';
    display: block;
    background: ${({ theme }) => theme.colors.white};
    width: 4px;
    position: absolute;
    left: ${({ theme }) => theme.spacings.s1};
    top: 0;
    bottom: 0;
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
      show={activeSection !== null}
    >
      {i}
    </Button>
  ))

  return <Wrapper>{buttons}</Wrapper>
}

SectionNavigation.propTypes = {
  colorScheme: propTypes.string.isRequired
}
