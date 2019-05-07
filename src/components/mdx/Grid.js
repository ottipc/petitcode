import React from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'

const ActualGrid = styled.div`
  display: flex;
  justify-content: ${({ spacing }) => spacing};
  flex-wrap: wrap;

  & > * {
    padding: 1rem;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  & .gatsby-resp-image-wrapper {
    width: 100vw;
  }
`

export default function Grid({ children, spacing = 'space-between' }) {
  return <ActualGrid spacing={spacing}>{children}</ActualGrid>
}
Grid.propTypes = {
  children: propTypes.node.isRequired,
  spacing: propTypes.string
}
