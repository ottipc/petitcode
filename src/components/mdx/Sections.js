import React, { useContext, useEffect } from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import Observer from '@researchgate/react-intersection-observer'

import { SectionContext } from '../../utils/Contexts'
import Footer from '../Footer'

const Article = styled.article`
  /* scroll-snap-type: y proximity;
  overflow-y: -moz-scrollbars-none;
  -ms-overflow-style: none;
  overflow-y: scroll;
  height: 100vh;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 0 !important;
  } */
`

function Sections({ children }) {
  const {
    setSections,
    scrollToSection,
    setScrollToSection,
    setActiveSection,
    setIsScrolling
  } = useContext(SectionContext)

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
      const section = document.getElementById(`section-${scrollToSection}`)
      section.scrollIntoView()
      setScrollToSection(null)
    }
    return () => {
      setSections([])
    }
  })

  const handleFooterIntersection = ({ isIntersecting }) => {
    if (isIntersecting) {
      setActiveSection(null)
    }
  }

  const handleIsScrollingIntersection = ({ isIntersecting }) => {
    setIsScrolling(!isIntersecting)
  }

  return (
    <Article>
      <Observer onChange={handleIsScrollingIntersection}>
        <div />
      </Observer>
      {children}
      <Observer onChange={handleFooterIntersection} threshold={0.05}>
        <div>
          <Footer />
        </div>
      </Observer>
    </Article>
  )
}

Sections.propTypes = {
  children: propTypes.node.isRequired
}

export default React.memo(Sections)
