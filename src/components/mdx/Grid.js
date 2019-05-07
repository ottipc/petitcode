import React from 'react'
import propTypes from 'prop-types'
import styled, { css } from 'styled-components'

const ActualGrid = styled.div`
  display: flex;
  flex-wrap: wrap;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 30px;

  & > * {
    min-width: 250px;
    ${({ centered }) =>
      centered &&
      css`
        text-align: center;
      `}
  }

  /* @todo Whats that? */
  & .gatsby-resp-image-wrapper {
    width: 100vw;
  }
`

export default function Grid({ children, centered = false }) {
  return <ActualGrid centered={centered}>{children}</ActualGrid>
}
Grid.propTypes = {
  children: propTypes.node.isRequired,
  centered: propTypes.bool
}
