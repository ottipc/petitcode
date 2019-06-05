import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { createLocalizedPath } from '../../utils/i18n'
import { LocationContext, GlobalContext } from '../../utils/Contexts'

const StyledLink = styled(Link)``

export default function MdxLink({ humanId, title = null, children, ...props }) {
  const { activeLocale } = useContext(LocationContext)
  const { langs, defaultLocale, pages } = useContext(GlobalContext)

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
    const {
      fields: { slug, locale, title: pageTitle },
      parent: { sourceInstanceName }
    } = page
    const prefix = sourceInstanceName !== 'page' ? sourceInstanceName : null

    const path = createLocalizedPath({
      prefix,
      slug,
      locale
    })
    return (
      <StyledLink to={path} title={title || pageTitle} {...props}>
        {children || title || pageTitle}
      </StyledLink>
    )
  }

  return null
}

MdxLink.propTypes = {
  humanId: propTypes.string.isRequired,
  title: propTypes.string,
  children: propTypes.node
}
