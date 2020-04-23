import React from 'react'
import propTypes from 'prop-types'

const SlideItem = (props) => {
  return (
    <div style={{ height: 200, display: 'flex', justifyContent: 'center' }}>
      {props.children}
    </div>
  )
}

SlideItem.propTypes = {
  children: propTypes.any
}

export default SlideItem
