import React from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'

import Image from './Image'

export const Card = styled.section`
  /* padding: ${({ theme }) => theme.spacings.s2}; */
  /* background-color: ${({ theme }) => theme.colors.grey900};
  box-shadow: 10px 10px 0px ${({ theme }) => theme.colors.grey700}; */
  text-align: center;

  & p {
    text-align: justify;
    text-align-last: center;
  }
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

export function CardImage({ maxWidth = '100%', image, ...props }) {
  return (
    <CardImageWrapper maxWidth={maxWidth}>
      <Image contentfulId={image} {...props} />
    </CardImageWrapper>
  )
}

CardImage.propTypes = {
  image: propTypes.string.isRequired,
  alt: propTypes.string,
  maxWidth: propTypes.string
}
export const CardContent = styled.div``
