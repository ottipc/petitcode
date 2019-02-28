import React from 'react'
import propTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Observer from '@researchgate/react-intersection-observer'

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
    children: propTypes.node.isRequired,
    nr: propTypes.number.isRequired
  }

  state = {
    intersectInfo: 'none'
  }

  handleIntersection = (event) => {
    const { isIntersecting, intersectionRatio } = event

    // console.log(`nr: ${this.props.nr}`, intersectionRatio, event)

    if (isIntersecting) {
      // let intersectInfo = 'none'
      if (intersectionRatio >= 0.8) {
        console.log(
          `nr: ${this.props.nr}`,
          this.props.video ? 'white header' : 'black header'
        )
      }
      if (intersectionRatio >= 0.4) {
        console.log(
          `nr: ${this.props.nr}`,
          this.props.video ? 'white menu' : 'black menu'
        )
      }
      if (intersectionRatio >= 0.05) {
        console.log(
          `nr: ${this.props.nr}`,
          this.props.video ? 'white footer' : 'black footer'
        )
      }
      // console.log({ nr: this.props.nr, intersectInfo })
      // this.setState({ intersectInfo })
    }
  }

  render() {
    const { video, children } = this.props
    return (
      <Observer
        onChange={this.handleIntersection}
        // rootMargin="-200px 0px -200px 0px"
        threshold={[0.05, 0.5, 0.85]}
      >
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
          <ContentWrapper video={video}>{children}</ContentWrapper>
        </Wrapper>
      </Observer>
    )
  }
}
