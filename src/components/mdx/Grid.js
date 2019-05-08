import React, { useContext } from 'react'
import propTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Image from 'gatsby-image'

import { GlobalContext } from '../../utils/Contexts'

const ActualGrid = styled.div`
  display: flex;
  flex-wrap: wrap;

  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${({ minWidth = '250px' }) => minWidth}, 1fr)
  );
  grid-gap: 30px;

  & > * {
    ${({ centered }) =>
      centered &&
      css`
        text-align: center;
      `}
  }
`

const GridImageWrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: ${({ maxWidth = '100%' }) => maxWidth};
  width: 100%;
  margin: 0 auto ${({ theme }) => theme.spacings.s2};

  & img {
    margin: 0;
  }
`

export function Grid({ children, minWidth = '250px', centered = false }) {
  return (
    <ActualGrid minWidth={minWidth} centered={centered}>
      {children}
    </ActualGrid>
  )
}
Grid.propTypes = {
  children: propTypes.node.isRequired,
  centered: propTypes.bool,
  minWidth: propTypes.string
}

export function GridImage({ image, alt = '', maxWidth = '100%' }) {
  const { grid } = useContext(GlobalContext)

  if (grid[image]) {
    const { childImageSharp, extension, publicURL } = grid[image]
    if (extension === 'svg') {
      return (
        <GridImageWrapper maxWidth={maxWidth}>
          <img src={publicURL} alt={alt} />
        </GridImageWrapper>
      )
    }
    const imageProps = {
      ...childImageSharp,
      fluid: {
        ...childImageSharp.fluid
        // , base64: childImageSharp.sqip.dataURI
      },
      alt
    }
    return (
      <GridImageWrapper maxWidth={maxWidth}>
        <Image {...imageProps} />
      </GridImageWrapper>
    )
  }

  console.error('Unable to render grid image', image)
  return null
}
GridImage.propTypes = {
  image: propTypes.string.isRequired,
  alt: propTypes.string,
  maxWidth: propTypes.string
}
