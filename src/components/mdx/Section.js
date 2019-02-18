import React from 'react'
import propTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Observer from '@researchgate/react-intersection-observer'

const Wrapper = styled.div`
  position: relative;
`

const VideoWrapper = styled.div`
  position: absolute;
  z-index: 50;
  top: 0;
  left: 0;
`

const SectionWrapper = styled.article`
  position: relative;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-direction: column;

  background-color: #fff;
  color: #000;

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
    padding-left: 10vw;
    padding-right: 10vw;

    &:not(:last-child) {
      padding-bottom: 5vh;
    }
  }

  & > h1 {
    font-size: 12vmin;
  }

  & > :first-child {
    padding-top: 20vh;
  }

  & > :last-child {
    padding-bottom: 20vh;
  }

  ${({ video }) =>
    video &&
    css`
      background: transparent;
      color: #fff;
    `}
`

export default class Section extends React.PureComponent {
  static propTypes = {
    video: propTypes.bool,
    children: propTypes.node.isRequired
  }

  handleIntersection = (event) => {
    if (event.isIntersecting) {
      console.log(this.props.video ? 'white' : 'black')
    }
  }

  render() {
    const { video, children } = this.props
    return (
      <Observer onChange={this.handleIntersection}>
        <Wrapper>
          {video && (
            <VideoWrapper>
              <video autoPlay loop muted playsInline>
                <source
                  src="//videos.ctfassets.net/pbrj6jtwg849/j7qCb94g9yMOi8MYIw40U/405d516b9e9cb3557906237cab5836be/SaaS_Video_3.mp4"
                  type="video/mp4"
                />
              </video>
            </VideoWrapper>
          )}
          <SectionWrapper video={video}>{children}</SectionWrapper>
        </Wrapper>
      </Observer>
    )
  }
}
