import React, { useContext } from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import Image from 'gatsby-image'

import { GlobalContext } from '../../utils/Contexts'
import { Card, CardImage, CardContent } from './Card'

const PersonName = styled.h1`
  font-size: 1.2rem !important;
  margin-bottom: ${({ theme }) => theme.spacings.s1};
  opacity: 0.8;
`

export default function Person({ image, name, children }) {
  const { persons } = useContext(GlobalContext)
  let renderedImage

  if (persons[image]) {
    const { childImageSharp } = persons[image]
    const imageProps = {
      ...childImageSharp,
      fluid: { ...childImageSharp.fluid, base64: childImageSharp.sqip.dataURI },
      alt: name
    }
    renderedImage = <Image {...imageProps} />
  } else {
    renderedImage = <img src={'/social.png'} alt={name} />
  }

  return (
    <Card>
      <CardImage>{renderedImage}</CardImage>
      <CardContent>
        <PersonName>{name}</PersonName>
        {children}
      </CardContent>
    </Card>
  )
}

Person.propTypes = {
  name: propTypes.string.isRequired,
  image: propTypes.string.isRequired,
  children: propTypes.node.isRequired
}
