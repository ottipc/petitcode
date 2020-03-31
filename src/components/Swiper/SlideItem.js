import React from 'react'

const SlideItem = (props) => {
  return <div style={{ height: 200, display: 'flex', justifyContent: 'center' }}>{props.children}</div>
}

export default SlideItem
