import React from 'react'
import propTypes from 'prop-types'
import GatsbyLink from 'gatsby-link'

class Link extends React.PureComponent {
  propTypes = {
    children: propTypes.node.isRequired,
    to: propTypes.string.isRequired
  }

  render() {
    const { children, to, ...other } = this.props
    const internal = /^\/(?!\/)/.test(to)

    if (internal) {
      return (
        <GatsbyLink to={to} {...other}>
          {children}
        </GatsbyLink>
      )
    }

    return (
      <a href={to} {...other}>
        {children}
      </a>
    )
  }
}

export default Link
