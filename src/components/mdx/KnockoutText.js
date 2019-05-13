import React from 'react'
import styled, { css } from 'styled-components'

const H1OutterWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacings.s2};
  /* background: url('/knockout-image.jpg');
  background-repeat: no-repeat;
  background-size: cover; */

  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
    margin-bottom: ${({ theme }) => theme.spacings.s6};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    margin-bottom: ${({ theme }) => theme.spacings.s4};
  }

  /* animation: knockout 8s infinite alternate;

  @keyframes knockout {
    from {
      background-position: top right;
    }
    to {
      background-position: bottom left;
    }
  } */
`

const H1Wrapper = styled.div`
  position: relative;
  overflow: hidden;
`

const KnockoutH1 = styled.h1`
  position: relative;
  margin: 0;
  padding: 0;
  color: inherit;
  font-weight: bold !important;
  z-index: 100;
  /* background-color: white; */
  /* mix-blend-mode: screen; */

  line-height: 1.6em;

  ${({
    theme: {
      grid: { width }
    }
  }) => css`
    font-size: 26px;

    @media screen and (min-width: 320px) {
      font-size: calc(30px + 50 * ((100vw - 320px) / ${width - 320}));
    }

    @media screen and (min-width: ${width}px) {
      font-size: 80px;
    }
  `}

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
