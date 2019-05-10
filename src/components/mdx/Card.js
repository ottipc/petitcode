import React, { useContext } from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import Image from 'gatsby-image'

import { GlobalContext } from '../../utils/Contexts'

export const Card = styled.section`
  padding: ${({ theme }) => theme.spacings.s3};
  background-color: ${({ theme }) => theme.colors.grey900};
  box-shadow: 10px 10px 0px ${({ theme }) => theme.colors.grey700};
  text-align: center;
`

const CardImageWrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: ${({ maxWidth = '100%' }) => maxWidth};
  width: 100%;
  margin: 0 auto ${({ theme }) => theme.spacings.s2};

  & img {
    width: 100%;
    margin: 0;
  }
`

export function CardImage({ image, alt = '', maxWidth = '100%' }) {
  const { card } = useContext(GlobalContext)

  if (card[image]) {
    const { childImageSharp, extension, publicURL } = card[image]
    if (extension === 'svg') {
      return (
        <CardImageWrapper maxWidth={maxWidth}>
          <img src={publicURL} alt={alt} />
        </CardImageWrapper>
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
      <CardImageWrapper maxWidth={maxWidth}>
        <Image {...imageProps} />
      </CardImageWrapper>
    )
  }

  console.error('Unable to render card image', image)
  return null
}
CardImage.propTypes = {
  image: propTypes.string.isRequired,
  alt: propTypes.string,
  maxWidth: propTypes.string
}
export const CardContent = styled.div``
