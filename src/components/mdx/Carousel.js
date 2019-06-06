import React, { useState, useEffect } from 'react'
import propTypes from 'prop-types'
import styled from 'styled-components'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'

const SliderWrapper = styled.div`
  margin: ${({ theme }) => theme.spacings.s2} 0;
`

const NavWrapper = styled.div`
  & .slick-slide {
    padding: 0 ${({ theme }) => theme.spacings['s1.5']};
    height: 2rem;
    line-height: 2rem;
    border-bottom: 1px solid transparent;
    color: ${({ theme }) => theme.colors.grey400};
    cursor: pointer;
    white-space: nowrap;

    & p:focus {
      outline: none;
    }

    &.slick-active {
      border-bottom-color: ${({ theme }) => theme.colors.black};
      color: ${({ theme }) => theme.colors.black};
    }
  }
`
const MainWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacings.s4};
`

export function Carousel({ children }) {
  const [main, setMain] = useState(null)
  const [nav, setNav] = useState(null)

  let slider1
  let slider2

  useEffect(() => {
    if (!main) {
      setMain(slider1)
    }
    if (!nav) {
      setNav(slider2)
    }
  })

  const Nav = children.find(
    (child) => child.props.mdxType === 'CarouselNavigation'
  )

  const Main = children.find(
    (child) => child.props.mdxType === 'CarouselSlides'
  )

  const mainSettings = {
    ref: (slider) => (slider1 = slider),
    arrows: false,
    dots: false,
    infinite: true,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: nav
  }

  const navSettings = {
    ref: (slider) => (slider2 = slider),
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    variableWidth: true,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    asNavFor: main
  }

  return (
    <>
      <SliderWrapper>
        <NavWrapper>
          <Slider {...navSettings}>{Nav.props.children}</Slider>
        </NavWrapper>
        <MainWrapper>
          <Slider {...mainSettings}>{Main.props.children}</Slider>
        </MainWrapper>
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
