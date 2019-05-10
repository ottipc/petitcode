import React, { useContext } from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import Image from 'gatsby-image'

import { GlobalContext } from '../../utils/Contexts'
import { Card, CardContent } from './Card'

const PersonWrapper = styled(Card)`
  text-align: center;

  & p {
    text-align: center;
  }
`

const PersonName = styled.h1`
  font-size: 1.2rem !important;
  margin-bottom: ${({ theme }) => theme.spacings.s1};
  opacity: 0.8;
`

const PersonImage = styled.div`
  width: 100%;
  max-width: 200px;
  overflow: hidden;
  margin: 0 auto ${({ theme }) => theme.spacings.s2};

  & img {
    width: 100%;
    margin: 0;
    border-radius: 100%;
  }
`

export default function Person({ image, name, children }) {
  const { persons } = useContext(GlobalContext)
  let renderedImage

  if (persons[image]) {
    const { childImageSharp } = persons[image]
    const imageProps = {
      ...childImageSharp,
      fluid: {
        ...childImageSharp.fluid
        // , base64: childImageSharp.sqip.dataURI
      },
      alt: name
    }
    renderedImage = <Image {...imageProps} />
  } else {
    renderedImage = <img src={'/social.png'} alt={name} />
  }

  return (
    <PersonWrapper>
      <PersonImage>{renderedImage}</PersonImage>
      <CardContent>
        <PersonName>{name}</PersonName>
        {children}
      </CardContent>
    </PersonWrapper>
  )
}

Person.propTypes = {
  name: propTypes.string.isRequired,
  image: propTypes.string.isRequired,
  children: propTypes.node.isRequired
}
