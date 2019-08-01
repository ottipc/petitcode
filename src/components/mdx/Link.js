import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { Link } from 'gatsby'

import { GlobalContext } from '../../utils/Contexts'

export default function MdxLink({
  contentfulId,
  href,
  target = null,
  title,
  className = null,
  hash,
  children,
  ...linkProps
}) {
  if (href) {
    return (
      <a className={className} href={href} target={target}>
        {children || title}
      </a>
    )
  }
  const { pages, activeLocale } = useContext(GlobalContext)
  if (!Object.prototype.hasOwnProperty.call(pages, contentfulId)) {
    console.warn(`Unable to render menu link for ${contentfulId}`)
    return null
  }

  const page = pages[contentfulId][activeLocale]

  if (page) {
    const { path, title: pageTitle } = page
    if (!path) {
      console.error({ page })
    }
    const to = [path, hash ? `#${hash}` : null].filter(Boolean).join('')
    return (
      <Link
        className={className}
        activeClassName="active"
        to={to}
        target={target}
        {...linkProps}
      >
        {children || title || pageTitle}
      </Link>
    )
  }

  return null
}

MdxLink.propTypes = {
  contentfulId: propTypes.string,
  href: propTypes.string,
  className: propTypes.string,
  hash: propTypes.string,
  title: propTypes.string,
  target: propTypes.string,
  children: propTypes.node
}
