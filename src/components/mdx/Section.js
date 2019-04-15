import React, { useContext } from 'react'
import propTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Observer from '@researchgate/react-intersection-observer'

import { SectionContext } from '../../utils/Contexts'

const Wrapper = styled.section`
  position: relative;
  min-height: 60vh;
  padding: 0 ${({ theme }) => theme.spacings.s2};
  background: #fff;

  /* scroll-snap-align: start; */

  ${({ video }) =>
    !video &&
    css`
      &:first-of-type {
        margin-top: ${({ theme }) =>
          theme.elements.headerHeight - parseInt(theme.spacings.s4)}px;
      }
    `}

  @media (min-width: ${({ theme }) => theme.breakpoints.large}) {
    padding: 0 ${({ theme }) => theme.spacings.s1};
  }
`

const VideoWrapper = styled.div`
  position: absolute;
  z-index: 50;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #000;
`

const ContentWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-direction: column;

  background-color: #fff;
  color: #000;

  padding: ${({ theme }) => theme.spacings.s4}
    ${({ theme }) => theme.spacings.s1};

  ${({ video }) =>
    video &&
    css`
      background: transparent;
      color: #fff;
    `}

  & h1,
  & h2,
  & h3,
  & h4,
  & h5,
  & h6 {
    font-weight: normal;
  }

  & h1 {
    font-size: 19px;
    @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
      font-size: 3.5vw;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.huge}) {
      font-size: 70px;
    }
  }
`

function Section({ video, children, nr }) {
  const { setActiveSection } = useContext(SectionContext)

  const handleIntersection = ({ isIntersecting }) => {
    if (isIntersecting) {
      setActiveSection(nr)
    }
  }

  return (
    <Observer
      onChange={handleIntersection}
      rootMargin="-25% 0% -25% 0%"
      threshold={0}
    >
      <Wrapper video={video} id={`section-${nr}`}>
        {video && (
          <VideoWrapper>
            <Video autoPlay loop muted playsInline>
              <source
                src="//videos.ctfassets.net/pbrj6jtwg849/j7qCb94g9yMOi8MYIw40U/405d516b9e9cb3557906237cab5836be/SaaS_Video_3.mp4"
                type="video/mp4"
              />
            </Video>
          </VideoWrapper>
        )}
        <ContentWrapper video={video}>{children}</ContentWrapper>
      </Wrapper>
    </Observer>
  )
}

Section.prototype.propTypes = {
  video: propTypes.bool,
  children: propTypes.node.isRequired,
  nr: propTypes.number.isRequired
}

export default Section
