import React from 'react'
import propTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Image from './Image'

const ActualGrid = styled.div`
  display: flex;
  flex-wrap: wrap;

  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(
      ${({ minWidth = '250px' }) => minWidth},
      ${({ maxWidth = '1fr' }) => maxWidth}
    )
  );
  grid-gap: ${({ theme }) => theme.grid.gutter};

  ${({ centered }) =>
    centered &&
    css`
      align-items: center;
      justify-items: center;
      text-align: center;
    `}
`

const GridImageWrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: ${({ maxWidth = '100%' }) => maxWidth};
  width: 100%;
  // margin: 0 auto ${({ theme }) => theme.spacings.s2};
  height: 100%;
  justify-content: center;

  & img {
    margin: 0;
  }
`

export function Grid({
  children,
  minWidth = '250px',
  maxWidth = '1fr',
  centered = false,
  ...props
}) {
  return (
    <ActualGrid
      minWidth={minWidth}
      maxWidth={maxWidth}
      centered={centered}
      {...props}
    >
      {children}
    </ActualGrid>
  )
}
Grid.propTypes = {
  children: propTypes.node.isRequired,
  centered: propTypes.bool,
  minWidth: propTypes.string,
  maxWidth: propTypes.string
}

export function GridImage({ maxWidth = '100%', image, ...props }) {
  return (
    <GridImageWrapper maxWidth={maxWidth}>
      <Image contentfulId={image} {...props} />
    </GridImageWrapper>
  )
}
GridImage.propTypes = {
  image: propTypes.string.isRequired,
  alt: propTypes.string,
  maxWidth: propTypes.string
}
