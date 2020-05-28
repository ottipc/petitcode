import React from 'react'
import propTypes from 'prop-types'
import { navigate } from 'gatsby'
import styled from 'styled-components';

const styles = {
  wrapper: {
    position: 'absolute',
    width: '100%',
    zIndex: '205',
    bottom: '0',
    textAlign: 'center'
  },
  btn: {
    width: '30px',
    height: '30px',
    cursor: 'pointer',
    userSelect: 'none',
    position: 'absolute',
    bottom: '-40px',
    font: '3rem sans-serif',
    color: 'white',
    lineHeight: '1.75rem',
    fontWeight: 'bold',
    fontFamily: 'Noto Sans,Helvetica Neue,Segoe UI,Helvetica,Arial,sans-serif',
  },
  left: {
    left: '0'
  },
  right: {
    right: '0'
  }
}

const Wrapper = styled.div `
  @media (max-width: 767px) {
    bottom: -100px !important;
  }
`

export default function Buttons(props) {
  const prevBtnStyle = Object.assign({}, styles.btn, styles.left)
  const nextBtnStyle = Object.assign({}, styles.btn, styles.right)
  const {
    index,
    total,
    loop,
    csvData,
    page,
    prevHandler,
    nextHandler,
    activeFilters
  } = props

  const filterFinish = () => {
    if (page && page === 'freelancer') {
      typeof localStorage !== 'undefined' &&
        localStorage.setItem('activeFilters', JSON.stringify(activeFilters))
      navigate('/en/specialists', {
        state: { csvData, page }
      })
    }
    else {
      typeof localStorage !== 'undefined' &&
        localStorage.setItem('activeFilters', JSON.stringify(activeFilters))
      navigate('/en/fte', {
        state: { csvData, page }
      })
    }
  }

  return (
    <Wrapper style={styles.wrapper}>
      {(loop || index !== 0) && (
        <div
          className="swiper-btn-previous"
          style={prevBtnStyle}
          onClick={prevHandler}
        >
          {"<"}
        </div>
      )}
      {(loop || index !== total - 1) && (
        <div
          className="swiper-btn-next"
          style={nextBtnStyle}
          onClick={nextHandler}
        >
          {">"}
        </div>
      )}
      {(loop || index === total - 1) && (
        <div
          className="swiper-btn-finish"
          style={nextBtnStyle}
          onClick={() => filterFinish()}
        >
          {">"}
        </div>
      )}
    </Wrapper>
  )
}

Buttons.propTypes = {
  index: propTypes.any,
  total: propTypes.any,
  loop: propTypes.any,
  csvData: propTypes.any,
  prevHandler: propTypes.any,
  nextHandler: propTypes.any,
  activeFilters: propTypes.any
}
