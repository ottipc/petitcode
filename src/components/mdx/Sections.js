import React from 'react'
import propTypes from 'prop-types'

export default class Sections extends React.PureComponent {
  static propTypes = {
    children: propTypes.node.isRequired
  }
  render() {
    const { children } = this.props
    return children
  }
}
