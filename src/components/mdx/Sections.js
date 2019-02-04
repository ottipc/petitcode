import React from 'react'
import propTypes from 'prop-types'
import { MDXProvider } from '@mdx-js/tag'

export default class Sections extends React.PureComponent {
  static propTypes = {
    children: propTypes.node.isRequired
  }
  render() {
    const { children } = this.props
    return <MDXProvider>{children}</MDXProvider>
  }
}
