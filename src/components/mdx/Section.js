import React, { useContext } from 'react'
import propTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Observer from '@researchgate/react-intersection-observer'

import { SectionContext } from '../../utils/Contexts'

const Wrapper = styled.section`
  position: relative;
  min-height: 60vh;
  background: ${({ theme }) => theme.colors.bg};

  border-bottom: 2px solid black;

  ${({ video }) =>
    !video &&
    css`
      &:first-of-type {
        padding-top: ${({ theme }) => theme.elements.headerHeight}px;
      }
    `}
  ${({ inverted }) =>
    inverted &&
    css`
      color: ${({ theme }) => theme.colors.white};
      background: ${({ theme }) => theme.colors.black};

      & a:after {
        background: ${({ theme }) => theme.colors.white};
      }

      & button {
        border-color: ${({ theme }) => theme.colors.white};
      }

      & .MuiInputBase-root {
        color: ${({ theme }) => theme.colors.white};
      }

      & .MuiFormLabel-root {
        color: ${({ theme }) => theme.colors.grey500};
      }

      & .MuiFormControl-root:hover .MuiFormLabel-root {
        color: ${({ theme }) => theme.colors.white};
      }

      & .MuiInput-underline:before {
        border-bottom-color: ${({ theme }) => theme.colors.grey500};
      }

      & .MuiInput-underline:hover:not(.Mui-disabled):before {
        border-bottom-color: ${({ theme }) => theme.colors.white};
      }
    `}
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

  ${({ video }) =>
    video &&
    css`
      color: #fff;

      h1 {
        font-size: calc(40px + 80 * ((100vw - 320px) / 1400));

        @media (min-width: 1400px) {
          font-size: 120px;
        }
      }
    `}
`

function Section({ video, inverted, children, nr }) {
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
      <Wrapper video={video} inverted={inverted} id={`section-${nr}`}>
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
  inverted: propTypes.bool,
  children: propTypes.node.isRequired,
  nr: propTypes.number.isRequired
}

export default Section
