import React from 'react'
import { navigate } from 'gatsby'

const styles = {
  wrapper: {
    position: 'absolute',
    width: '100%',
    zIndex: '205',
    bottom: '0',
    textAlign: 'center'
  },
  btn: {
    // width: '30px',
    height: '30px',
    cursor: 'pointer',
    userSelect: 'none',
    position: 'absolute',
    bottom: '-40px',
    font: '1rem sans-serif',
    color: 'black',
    lineHeight: '1.75rem',
    fontWeight: 'bold'
  },
  left: {
    left: '0'
  },
  right: {
    right: '0'
  }
}

export default function Buttons(props) {
  const prevBtnStyle = Object.assign({}, styles.btn, styles.left)
  const nextBtnStyle = Object.assign({}, styles.btn, styles.right)
  const {
    index,
    total,
    loop,
    csvData,
    prevHandler,
    nextHandler,
    activeFilters
  } = props

  const filterFinish = () => {
    navigate('/en/talents', {
      state: { activeFilters, csvData }
    })
  }

  return (
    <div style={styles.wrapper}>
      {(loop || index !== 0) && (
        <div className='swiper-btn-previous' style={prevBtnStyle} onClick={prevHandler}>
          Previous
        </div>
      )}
      {(loop || index !== total - 1) && (
        <div className='swiper-btn-next' style={nextBtnStyle} onClick={nextHandler}>
          Next
        </div>
      )}
      {(loop || index === total - 1) && (
        <div className='swiper-btn-finish' style={nextBtnStyle} onClick={() => filterFinish()}>
          Finish
        </div>
      )}
    </div>
  )
}
