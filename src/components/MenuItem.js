import React from 'react'
import propTypes from 'prop-types'
import { Link } from 'gatsby'

import { createLocalizedPath } from '../utils/i18n'

class MenuItem extends React.PureComponent {
  static propTypes = {
    pages: propTypes.array.isRequired,
    id: propTypes.string.isRequired,
    locale: propTypes.string.isRequired,
    className: propTypes.string
  }
  static defaultProptypes = {
    className: null
  }
  render() {
    const { pages, id, locale, className } = this.props
    const page = pages.find(
      (entry) => entry.node.id === id && entry.node.locale === locale
    )

    if (page) {
      const { slug, title } = page.node
      return (
        <Link
          className={className}
          activeClassName="active"
          to={createLocalizedPath({ locale, slug })}
        >
          {title}
        </Link>
      )
    }

    return null
  }
}

export default MenuItem
