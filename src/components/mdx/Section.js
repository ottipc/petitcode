import React, { useContext } from 'react'
import propTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Observer from '@researchgate/react-intersection-observer'

import { SectionContext, GlobalContext } from '../../utils/Contexts'

const OuterWrapper = styled.div`
  ${({ video }) =>
    !video &&
    css`
      &:first-of-type {
        padding-top: ${({ theme }) => theme.elements.headerHeight}px;
      }
    `}
`

const Wrapper = styled.section`
  position: relative;
  min-height: 60vh;
  background: ${({ theme }) => theme.colors.bg};

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
        color: ${({ theme }) => theme.colors.white};
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
      & .MuiRadio-colorSecondary.Mui-checked {
        color: ${({ theme }) => theme.colors.white};
      }

      & .MuiRadio-root {
        color: ${({ theme }) => theme.colors.grey500};
      }
    `}

    & img, svg {
      filter: grayscale(100%);
      transition: 1s filter linear, 0.5s opacity linear !important;

      &:hover {
        filter: grayscale(0%);
      }
    }
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
  filter: grayscale(50%);
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
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    `}
`

function Section({ video, inverted, children, nr, scrollId = null }) {
  const { setActiveSection } = useContext(SectionContext)
  const { videos } = useContext(GlobalContext)

  const handleIntersection = ({ isIntersecting }) => {
    if (isIntersecting) {
      setActiveSection(nr)
    }
  }

  const videoData = videos.find((v) => v.contentful_id === video)

  return (
    <OuterWrapper id={scrollId} video={video}>
      <Observer
        onChange={handleIntersection}
        rootMargin="-25% 0% -25% 0%"
        threshold={0}
      >
        <Wrapper video={video} inverted={inverted} id={`section-${nr}`}>
          {video && videoData && (
            <VideoWrapper>
              <Video autoPlay loop muted playsInline>
                <source src={videoData.file.url} type="video/mp4" />
              </Video>
            </VideoWrapper>
          )}
          <ContentWrapper video={video}>{children}</ContentWrapper>
        </Wrapper>
      </Observer>
    </OuterWrapper>
  )
}

Section.prototype.propTypes = {
  video: propTypes.bool,
  inverted: propTypes.bool,
  children: propTypes.node.isRequired,
  nr: propTypes.number.isRequired,
  scrollId: propTypes.string
}

export default Section
