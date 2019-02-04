import React from 'react'
import propTypes from 'prop-types'
import styled, { css } from 'styled-components'
import Observer from '@researchgate/react-intersection-observer'
import { MDXProvider } from '@mdx-js/tag'

const SectionWrapper = styled.article`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-direction: column;

  color: #fff;

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

  ${({ design }) => {
    if (design === 'cutout') {
      return css`
        background-color: #fff;
        color: #000;
        /* min-height: 100vh; */

        & > * {
          background-color: #fff;
        }

        & > h1 {
          font-weight: bold;
          text-transform: uppercase;

          /* This makes the cutout text possible */
          background-color: #fff;
          color: #000;
          mix-blend-mode: screen;
        }
      `
    }
  }}
`

export default class Section extends React.PureComponent {
  static propTypes = {
    design: propTypes.string,
    children: propTypes.node.isRequired
  }

  handleIntersection = (event) => {
    if (event.isIntersecting) {
      console.log(this.props.design === 'cutout' ? 'black' : 'white')
    }
  }

  render() {
    const { design, children } = this.props
    return (
      <Observer onChange={this.handleIntersection}>
        <SectionWrapper design={design}>
          <MDXProvider>{children}</MDXProvider>
        </SectionWrapper>
      </Observer>
    )
  }
}
