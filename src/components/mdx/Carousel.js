import React, { useState, useEffect } from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'

const SliderWrapper = styled.div`
  padding-top: 2rem;
  margin: 2rem 0;

  & .slick-list {
    top: 2rem;
  }

  & .slick-dots {
    position: absolute;
    top: -2rem;
    left: 0;
    right: 0;
    display: flex !important;
    list-style: none;
    margin: 0;
    overflow: scroll;

    padding-bottom: 1rem; /* allows proper scrollbar placement */

    &:after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      left: 0;
      width: 10%;
      display: block;
      background: red;
    }

    & li {
      padding: 0;
      margin: 0;
      margin-right: 2rem;

      &.slick-active button {
        border-bottom-color: ${({ theme }) => theme.colors.black};
        color: ${({ theme }) => theme.colors.black};
      }
    }

    & button {
      background: transparent;
      padding: 0;
      height: 2rem;
      line-height: 2rem;
      border: none;
      outline: none;
      border-bottom: 1px solid transparent;
      color: ${({ theme }) => theme.colors.grey600};
      cursor: pointer;
      white-space: nowrap;
    }
  }
`

export function Carousel({ children }) {
  const [main, setMain] = useState(null)

  let slider1

  useEffect(() => {
    if (!main) {
      setMain(slider1)
    }
  })

  const Nav = children.find(
    (child) => child.type.displayName === 'Carousel__CarouselNavigation'
  )

  const Main = children.find(
    (child) => child.type.displayName === 'Carousel__CarouselSlides'
  )

  const settings = {
    ref: (slider) => (slider1 = slider),
    customPaging: (i) => (
      <button onClick={() => main.slickGoTo(i)}>{Nav.props.children[i]}</button>
    ),
    arrows: false,
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  return (
    <>
      <SliderWrapper>
        <Slider {...settings}>{Main.props.children}</Slider>
      </SliderWrapper>
    </>
  )
}

Carousel.propTypes = {
  children: propTypes.node.isRequired
}

export const CarouselNavigation = styled.div``

export const CarouselSlides = styled.div``

export const CarouselSlide = styled.div``
