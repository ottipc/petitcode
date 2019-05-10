import React, { useContext, useEffect } from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'

import { SectionContext } from '../../utils/Contexts'

const Article = styled.article``

const scrollTo = (selector) => {
  const el = document.querySelector(selector)

  if (el) {
    const box = el.getBoundingClientRect()

    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop

    const clientTop =
      document.documentElement.clientTop || document.body.clientTop || 0

    const top = box.top + scrollTop - clientTop - 100

    return window.scrollTo({
      top,
      behavior: 'smooth'
    })
  }
  return false
}

function Sections({ children }) {
  const { setSections, scrollToSection, setScrollToSection } = useContext(
    SectionContext
  )

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
    if (scrollToSection !== null) {
      scrollTo(`#section-${scrollToSection}`)
      setScrollToSection(null)
    }
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
