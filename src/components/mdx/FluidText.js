/**
 * Based on:
 * * https://css-tricks.com/books/volume-i/scale-typography-screen-size/
 * * https://www.madebymike.com.au/writing/fluid-type-calc-examples/
 */
import styled, { css } from 'styled-components'

const FluidText = styled.p`
  margin: ${({ theme }) => theme.spacings.s2} 0;
  padding: 0;
  color: inherit;
  font-weight: ${({ fontWeight }) => fontWeight || 'bold'};

  ${({
    theme: {
      grid: { width }
    },
    fontSizeMin = '26px',
    fontSizeMax = '50px',
    lineHeightMin = '1.3em',
    lineHeightMax = '1.6em'
  }) => css`
    font-size: ${fontSizeMin};
    line-height: ${lineHeightMin};

    @media screen and (min-width: 300px) {
      font-size: calc(
        ${fontSizeMin} + (${parseInt(fontSizeMax) - parseInt(fontSizeMin)}) *
          ((100vw - 300px) / ${width - 300})
      );
      line-height: calc(
        ${lineHeightMin} +
          (${parseInt(lineHeightMax) - parseInt(lineHeightMin)}) *
          ((100vw - 300px) / ${width - 300})
      );
    }

    @media screen and (min-width: ${width}px) {
      font-size: ${fontSizeMax};
      line-height: ${lineHeightMax};
    }
  `}

  ${({ centered }) =>
    centered &&
    css`
      text-align: center;
    `}
`

export default FluidText
