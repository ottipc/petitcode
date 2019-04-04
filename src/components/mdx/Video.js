import React from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import Youtube from 'react-youtube'

const VideoWrapper = styled.div`
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacings.s1};
`

const PlayerWrapper = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 4px 30px 43px rgba(0, 0, 0, 0.18);

  &:before {
    content: '';
    display: block;
    padding-top: 56.25%;
  }

  & iframe {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    margin: 0;
  }
`

const Description = styled.p`
  color: ${({ theme }) => theme.colors.grey500};
  text-align: center;
  width: 80%;
  margin: ${({ theme }) => theme.spacings.s3} auto 0;
`

export default function Video({ youtubeId, description }) {
  return (
    <VideoWrapper>
      <PlayerWrapper>
        <Youtube videoId={youtubeId} />
      </PlayerWrapper>
      {description && <Description>{description}</Description>}
    </VideoWrapper>
  )
}

Video.propTypes = {
  youtubeId: propTypes.string.isRequired,
  description: propTypes.string
}
