import React from 'react'
import styled from 'styled-components'

const H1OutterWrapper = styled.div`
  background-color: #fff;
  padding: 5vh 0;
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
  z-index: 50;
`

const KnockoutH1 = styled.h1`
  position: relative;
  z-index: 100;
  margin: 0;
  padding: 0;
  background-color: white;
  color: black;
  font-size: 10vmin;
  mix-blend-mode: screen;
  font-weight: bold;
`

const KnockoutText = (props) => {
  return (
    <H1OutterWrapper>
      <H1Wrapper>
        <VideoWrapper>
          <video autoPlay loop muted playsInline>
            <source
              src="//videos.ctfassets.net/pbrj6jtwg849/j7qCb94g9yMOi8MYIw40U/405d516b9e9cb3557906237cab5836be/SaaS_Video_3.mp4"
              type="video/mp4"
            />
          </video>
        </VideoWrapper>
        <KnockoutH1 {...props} />
      </H1Wrapper>
    </H1OutterWrapper>
  )
}

export default KnockoutText
