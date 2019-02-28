import React, { useContext, useEffect } from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'

import { SectionContext } from '../../utils/Contexts'

const Article = styled.article`
  scroll-snap-type: y proximity;
  overflow-y: -moz-scrollbars-none;
  -ms-overflow-style: none;
  overflow-y: scroll;
  height: 100vh;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
`

function Sections({ children }) {
  const { setSections } = useContext(SectionContext)

  // Automagically append numbering to sections
  children = React.Children.map(children, (child, nr) => {
    return React.cloneElement(child, {
      nr
    })
  })

  // Store sections array to context

  const sections = React.Children.toArray(children).map((section) => ({
    nr: section.props.nr,
    video: !!section.props.video
  }))

  useEffect(() => {
    setSections(sections)
    return () => {
      setSections([])
    }
  })

  return <Article>{children}</Article>
}

Sections.propTypes = {
  children: propTypes.node.isRequired
}

export default React.memo(Sections)
