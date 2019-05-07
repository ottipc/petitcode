import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import Observer from '@researchgate/react-intersection-observer'

const H1OutterWrapper = styled.div`
  background-color: #fff;
  margin-bottom: ${({ theme }) => theme.spacings.s2};
`

const H1Wrapper = styled.div`
  position: relative;
  overflow: hidden;
`

const VideoWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
  background: #000;
`

const Video = styled.video`
  display: block;
  position: relative;
  z-index: 51;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const KnockoutH1 = styled.h1`
  position: relative;
  margin: 0;
  padding: 0;
  color: black;
  font-weight: bold !important;
  z-index: 100;
  background-color: white;
  mix-blend-mode: screen;

  font-size: 32px !important;
  @media (min-width: ${({ theme }) => theme.breakpoints.small}) {
    font-size: 7vw !important;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.huge}) {
    font-size: 130px !important;
  }

  /* css hack to get chrome render the knockout text properly */
  transition: 0.5s z-index;
  ${({ isVisible }) =>
    isVisible &&
    css`
      z-index: 200;
    `}

  ${({ centered }) =>
    centered &&
    css`
      text-align: center;
    `}
`

const KnockoutText = (props) => {
  const [isVisible, setIsVisible] = useState(false)

  const handleIntersection = (event) => {
    const { isIntersecting } = event

    if (isIntersecting) {
      return setIsVisible(true)
    }
    setIsVisible(false)
  }

  return (
    <Observer onChange={handleIntersection}>
      <H1OutterWrapper>
        <H1Wrapper>
          <VideoWrapper>
            {isVisible && (
              <Video autoPlay loop muted playsInline>
                <source
                  src="//videos.ctfassets.net/pbrj6jtwg849/j7qCb94g9yMOi8MYIw40U/405d516b9e9cb3557906237cab5836be/SaaS_Video_3.mp4"
                  type="video/mp4"
                />
              </Video>
            )}
          </VideoWrapper>
          <KnockoutH1 {...props} isVisible={isVisible} />
        </H1Wrapper>
      </H1OutterWrapper>
    </Observer>
  )
}

export default React.memo(KnockoutText)
