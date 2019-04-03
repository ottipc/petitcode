import React from 'react'
import propTypes from 'prop-types'
import styled, { css } from 'styled-components'

const ColumnsWrapper = styled.div`
  position: relative;
  min-height: 50vh;

  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.grey800};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    display: flex;
    align-items: center;
  }
`

export const ColumnContentWrapper = styled.div`
  margin: 0 auto;
  max-width: ${({ theme }) => theme.grid.width}px;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    display: flex;
    ${({ reverse }) =>
      reverse &&
      css`
        flex-direction: row-reverse;
      `}
  }
`

export const ColumnContentText = styled.div`
  box-sizing: content-box;
  padding: 10vh ${({ theme }) => theme.grid.gutter}px;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    ${({
      contentWidth,
      theme: {
        grid: { columns }
      }
    }) =>
      css`
        flex: 0 0 ${(contentWidth / columns) * 100}%;
        overflow: hidden;
      `}
  }
`

const ColumnFiller = styled.div`
  display: none;
  padding: 0 ${({ theme }) => theme.grid.gutter}px;
  ${({
    contentWidth,
    theme: {
      grid: { columns }
    }
  }) =>
    css`
      flex: 0 0 ${((columns - contentWidth) / columns) * 100}%;
      overflow: hidden;
    `}

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    display: block;
  }
`

export function Columns({ children, contentWidth = 8, reverse = false }) {
  // Automagically append numbering to sections
  children = React.Children.map(children, (child, nr) => {
    return React.cloneElement(child, {
      reverse,
      contentWidth: parseInt(contentWidth)
    })
  })

  return <ColumnsWrapper>{children}</ColumnsWrapper>
}

Columns.propTypes = {
  children: propTypes.node.isRequired,
  reverse: propTypes.bool,
  contentWidth: propTypes.string
}

export function ColumnContent({ reverse, contentWidth = 8, children }) {
  return (
    <ColumnContentWrapper reverse={reverse}>
      <ColumnContentText contentWidth={contentWidth}>
        {children}
      </ColumnContentText>
      <ColumnFiller contentWidth={contentWidth} />
    </ColumnContentWrapper>
  )
}

ColumnContent.propTypes = {
  children: propTypes.node.isRequired,
  contentWidth: propTypes.number,
  reverse: propTypes.bool
}

export const ColumnImage = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    position: absolute;
    top: 0;
    bottom: 0;
    overflow: hidden;

    ${({
      contentWidth,
      theme: {
        grid: { columns }
      }
    }) => css`
      width: ${((columns - (contentWidth + 1)) / columns) * 100}vw;
    `}

    ${({ reverse }) =>
      reverse
        ? css`
            left: -${({ theme }) => theme.spacingUnit}px;
          `
        : css`
            right: -${({ theme }) => theme.spacingUnit}px;
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
  }
`
