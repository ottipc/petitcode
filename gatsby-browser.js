import React from 'react'
import propTypes from 'prop-types'

import Global from './src/components/Global'

export const wrapPageElement = ({ element, props: { location } }) => {
  return <Global location={location}>{element}</Global>
}

wrapPageElement.propTypes = {
  element: propTypes.node.isRequired,
  props: propTypes.object.isRequired
}
