import React from 'react'
import styled, { css } from 'styled-components'

const H1OutterWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacings.s2};
  background: url('/knockout-image.jpg');
  background-repeat: no-repeat;
  background-size: cover;

  animation: knockout 8s infinite alternate;

  @keyframes knockout {
    from {
      background-position: top right;
    }
    to {
      background-position: bottom left;
    }
  }
`

const H1Wrapper = styled.div`
  position: relative;
  overflow: hidden;
`

const KnockoutH1 = styled.h1`
  position: relative;
  margin: 0;
  padding: 0;
  color: black;
  font-weight: bold !important;
  z-index: 100;
  background-color: white;
  mix-blend-mode: screen;

  font-size: 32px !important;
  @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
    font-size: 7vw !important;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.huge}) {
    font-size: 130px !important;
  }

  ${({ centered }) =>
    centered &&
    css`
      text-align: center;
    `}
`

export default function KnockoutText(props) {
  return (
    <H1OutterWrapper>
      <H1Wrapper>
        <KnockoutH1 {...props} />
      </H1Wrapper>
    </H1OutterWrapper>
  )
}
