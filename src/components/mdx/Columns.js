import React from 'react'
import propTypes from 'prop-types'
import styled, { css } from 'styled-components'

const ColumnsWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  min-height: 50vh;
`

export function Columns({ children, reverse = false }) {
  // Automagically append numbering to sections
  children = React.Children.map(children, (child, nr) => {
    return React.cloneElement(child, {
      reverse
    })
  })

  return <ColumnsWrapper>{children}</ColumnsWrapper>
}

Columns.propTypes = {
  children: propTypes.node.isRequired,
  reverse: propTypes.bool
}

export const ColumnContentWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.grid.width}px;

  ${({ reverse }) =>
    reverse &&
    css`
      flex-direction: row-reverse;
    `}
`

export const ColumnContentText = styled.div`
  box-sizing: content-box;
  padding: 0 ${({ theme }) => theme.grid.gutter}px;
  ${({ width }) =>
    css`
      flex: ${width};
    `}
`

const ColumnFiller = styled.div`
  padding: 0 ${({ theme }) => theme.grid.gutter}px;
  ${({
    width,
    theme: {
      grid: { columns }
    }
  }) =>
    css`
      flex: ${columns - width};
    `}
`

export function ColumnContent({ reverse, width = 8, children }) {
  return (
    <ColumnContentWrapper reverse={reverse}>
      <ColumnContentText width={width}>{children}</ColumnContentText>
      <ColumnFiller width={width} />
    </ColumnContentWrapper>
  )
}

ColumnContent.propTypes = {
  children: propTypes.node.isRequired,
  width: propTypes.string,
  reverse: propTypes.bool
}

export const ColumnImage = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 33vw;
  overflow: hidden;

  ${({ reverse }) =>
    reverse
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `}

  & img {
    object-fit: cover;
  }

  & span.gatsby-resp-image-wrapper {
    position: absolute !important;
    width: 100%;
    height: 100%;
    ${({ reverse }) =>
      reverse
        ? css`
            left: 0;
          `
        : css`
            right: 0;
          `}
  }
`
