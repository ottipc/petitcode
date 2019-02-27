import React from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import { MDXProvider } from '@mdx-js/tag'

const ActualGrid = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 10vw 5vh !important; /* !important needed here due to overwrite from section child padding */
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

export default class Grid extends React.PureComponent {
  static propTypes = {
    children: propTypes.node.isRequired
  }
  render() {
    const { children } = this.props
    return (
      <ActualGrid>
        <MDXProvider>{children}</MDXProvider>
      </ActualGrid>
    )
  }
}
