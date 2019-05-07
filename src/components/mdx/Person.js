import React, { useContext } from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import Image from 'gatsby-image'

import { GlobalContext } from '../../utils/Contexts'

const PersonCard = styled.section`
  padding: ${({ theme }) => theme.spacings.s3};
  background-color: ${({ theme }) => theme.colors.grey900};
  box-shadow: 5px 5px 0px hsla(0, 0%, 0%, 0.2);
  text-align: center;
`
const PersonImage = styled.div`
  width: 100%;
  max-width: 250px;
  overflow: hidden;
  margin: 0 auto ${({ theme }) => theme.spacings.s2};

  & img {
    border-radius: 100%;
  }
`
const PersonContent = styled.div``
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
    <PersonCard>
      <PersonImage>{renderedImage}</PersonImage>
      <PersonContent>
        <PersonName>{name}</PersonName>
        {children}
      </PersonContent>
    </PersonCard>
  )
}

Person.propTypes = {
  name: propTypes.string.isRequired,
  image: propTypes.string.isRequired,
  children: propTypes.node.isRequired
}
