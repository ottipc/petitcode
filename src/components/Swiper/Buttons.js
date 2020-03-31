import React from 'react'
import { navigate } from 'gatsby'

const styles = {
  wrapper: {
    position: 'absolute',
    width: '100%',
    zIndex: '5',
    bottom: '0',
    textAlign: 'center'
  },
  btn: {
    //width: '30px',
    height: '30px',
    cursor: 'pointer',
    userSelect: 'none',
    position: 'absolute',
    bottom: '0',
    font: '12px sans-serif',
    color: 'black'
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
  const { index, total, loop, csvData, prevHandler, nextHandler, activeFilters } = props

  const filterFinish = () => {
    navigate('/en/freelancers',
      {
        state: { activeFilters, csvData },
      }
    );
  }

  return (
    <div style={styles.wrapper}>
      {(loop || index !== 0) && (
        <div style={prevBtnStyle} onClick={prevHandler}>
          Previous
        </div>
      )}
      {(loop || index !== total - 1) && (
        <div style={nextBtnStyle} onClick={nextHandler}>
          Next
        </div>
      )}
      {(loop || index === total - 1) && (
        <div style={nextBtnStyle} onClick={() => filterFinish()}>
          Finish
        </div>
      )}
    </div>
  )
}