import React from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types'
import { Link } from 'gatsby'

import GridWrapper from '../../components/GridWrapper'
import CloseIcon from '../../assets/close.svg'

const DarkThemeWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background: #000;
  color: #fff;
  padding: 20vh 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const CloseLink = styled(Link)`
  position: fixed;
  z-index: 10010;
  padding: 0.5rem;
  top: 1rem;
  right: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
    transform: translateY(-50%);
    top: 50%;
    right: 2rem;
  }
`

export default function DarkTheme({ children }) {
  return (
    <DarkThemeWrapper>
      <GridWrapper>{children}</GridWrapper>
      <CloseLink to="/">
        <CloseIcon />
      </CloseLink>
    </DarkThemeWrapper>
  )
}

DarkTheme.propTypes = {
  children: propTypes.node.isRequired
}
