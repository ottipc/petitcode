import React, { useContext } from 'react'
import propTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Observer from '@researchgate/react-intersection-observer'

import GridWrapper from '../GridWrapper'
import { SectionContext } from '../../utils/Contexts'

const Wrapper = styled.section`
  position: relative;
  scroll-snap-align: start;
  min-height: 100vh;
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

  padding: 10vh 0;

  ${({ video }) =>
    video &&
    css`
      background: transparent;
      color: #fff;
    `}
`

const ContentGridWrapper = styled(GridWrapper)`
  & > h1,
  & > h2,
  & > h3,
  & > h4,
  & > h5,
  & > h6,
  & > p,
  & > div {
    position: relative;
    z-index: 100;
    margin: 0;

    &:not(:last-child) {
      padding-bottom: 5vh;
    }
  }

  & > h1 {
    font-size: 12vmin;
  }
`

function Section({ video, children, nr }) {
  const { setActiveSection } = useContext(SectionContext)

  const handleIntersection = (event) => {
    const { isIntersecting } = event

    if (isIntersecting) {
      console.log({
        nr: nr,
        color: video ? 'white' : 'black'
      })
      setActiveSection(nr)
    }
  }

  return (
    <Observer onChange={handleIntersection} threshold={0.7}>
      <Wrapper>
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
        <ContentWrapper video={video}>
          <ContentGridWrapper>{children}</ContentGridWrapper>
        </ContentWrapper>
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
