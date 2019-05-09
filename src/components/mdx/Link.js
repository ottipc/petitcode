import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { createLocalizedPath } from '../../utils/i18n'
import {
  NavigationContext,
  LocationContext,
  GlobalContext
} from '../../utils/Contexts'

const StyledLink = styled(Link)``

export default function MdxLink({
  className = null,
  humanId,
  title = null,
  children
}) {
  const { pages } = useContext(NavigationContext)
  const { activeLocale } = useContext(LocationContext)
  const { langs, defaultLocale } = useContext(GlobalContext)

  let page = pages.find(
    (page) =>
      page.fields.humanId === humanId && page.fields.locale === activeLocale
  )

  // Fallback to default locale if translation is not available
  if (!page) {
    page = pages.find(
      (page) =>
        page.fields.humanId === humanId && page.fields.locale === defaultLocale
    )
  }

  // Fallback if no version with default locale is available
  if (!page) {
    page = pages.find(
      (page) =>
        page.fields.humanId === humanId && page.fields.locale === langs[0]
    )
  }

  if (page) {
    const { slug, locale, title: pageTitle } = page.fields
    return (
      <StyledLink
        className={className}
        to={createLocalizedPath({ locale, slug })}
      >
        {children || title || pageTitle}
      </StyledLink>
    )
  }

  return null
}

MdxLink.propTypes = {
  humanId: propTypes.string.isRequired,
  title: propTypes.string,
  className: propTypes.string,
  children: propTypes.node
}
