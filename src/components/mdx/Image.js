import React, { useContext } from 'react'
import propTypes from 'prop-types'
import Img from 'gatsby-image'
import styled, { css } from 'styled-components'

import { GlobalContext } from '../../utils/Contexts'

const ImgWrapper = styled.div`
  display: inline-block;
  width: 100%;
  ${({ maxWidth }) =>
    !!maxWidth &&
    css`
      max-width: ${maxWidth}px;
    `}
  vertical-align: middle;

  & img,
  & svg {
    display: block;
    margin: 0;
    width: 100%;
    height: auto;
  }
`

export default function Image({ contentfulId, maxWidth }) {
  const { largeImages, mediumImages, activeLocale } = useContext(GlobalContext)
  let assets = largeImages

  if (maxWidth > 0 && maxWidth <= 500) {
    assets = mediumImages
  }

  const image = assets.find(
    ({ contentful_id: cid, node_locale: locale }) =>
      cid === contentfulId && locale === activeLocale
  )

  if (!image) {
    console.warn('Unable to locate image ' + contentfulId)
    return null
  }

  const {
    file: {
      details: {
        image: { width }
      }
    }
  } = image

  if (maxWidth === null || maxWidth === undefined) {
    maxWidth = Math.floor(width / 2)
  }

  if (maxWidth) {
    maxWidth = parseInt(maxWidth)
  }

  if (image.file.contentType === 'image/svg+xml') {
    if (image.svgContent) {
      return (
        <ImgWrapper
          maxWidth={maxWidth}
          dangerouslySetInnerHTML={{ __html: image.svgContent }}
        />
      )
    }
    return (
      <ImgWrapper maxWidth={maxWidth}>
        <img src={image.file.url} alt={image.description || image.title} />
      </ImgWrapper>
    )
  }

  return (
    <ImgWrapper maxWidth={maxWidth}>
      <Img fluid={image.fluid} alt={image.description || image.title} />
    </ImgWrapper>
  )
}

Image.propTypes = {
  contentfulId: propTypes.string.isRequired,
  maxWidth: propTypes.number
}
