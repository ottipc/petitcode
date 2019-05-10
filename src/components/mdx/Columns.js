import React, { useContext } from 'react'
import propTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Image from 'gatsby-image'

import { GlobalContext } from '../../utils/Contexts'

const ColumnsWrapper = styled.div`
  position: relative;
  min-height: 50vh;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    display: flex;
    align-items: center;

    /* @todo check this, maybe vh or padding just in text area to let images touch each other */
    & + & {
      padding-top: ${({ theme }) => theme.spacings.s8};
    }
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

const ColumnContentText = styled.div`
  padding: 10vh ${({ theme }) => theme.spacing.content.default};

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    padding: 10vh 0;
    ${({ reverse, theme }) =>
      `padding-${reverse ? 'right' : 'left'}: ${theme.spacing.content.medium};`}
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
    ${({ reverse, theme }) =>
      `padding-${reverse ? 'right' : 'left'}: ${theme.spacing.content.large};`}
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.huge}) {
    ${({ reverse, theme }) =>
      `padding-${reverse ? 'right' : 'left'}: ${theme.spacing.content.huge};`}
  }

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

const ColumnImageWrapper = styled.div`
  margin: ${({ theme }) => theme.spacings.s4} 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.medium}) {
    position: absolute;
    top: 0;
    bottom: 0;
    overflow: hidden;
    margin: 0;

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
            left: 0;
          `
        : css`
            right: 0;
          `}

    & img {
      object-fit: cover;
      margin-bottom: 0;
    }

    & .gatsby-image-wrapper {
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
      <ColumnContentText contentWidth={contentWidth} reverse={reverse}>
        {children}
      </ColumnContentText>
    </ColumnContentWrapper>
  )
}

ColumnContent.propTypes = {
  children: propTypes.node.isRequired,
  contentWidth: propTypes.number,
  reverse: propTypes.bool
}

export const ColumnImage = function({ reverse, contentWidth, file, alt }) {
  const { columns } = useContext(GlobalContext)
  const imageData = columns[file].childImageSharp
  const image = {
    ...imageData,
    fluid: {
      ...imageData.fluid
      // , base64: imageData.sqip.dataURI
    },
    alt
  }

  return (
    <ColumnImageWrapper reverse={reverse} contentWidth={contentWidth}>
      <Image {...image} />
    </ColumnImageWrapper>
  )
}

ColumnImage.propTypes = {
  file: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
  reverse: propTypes.bool,
  contentWidth: propTypes.number
}
